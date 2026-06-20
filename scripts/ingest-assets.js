// Ingest MADE ON Midjourney generations from to-ingest/ into a metadata manifest
// (and optionally the tracker SQLite DB with --db).
//
// Every file is <prompt-slug>_<mj-job-uuid>_<quadrant>.png. We map the prompt
// slug back to its library prompt (kit / batch / number) via SIGNATURES below,
// read dimensions with `sips`, group the 4-up sets by job id, and emit
// docs/design/prompts/ingest-manifest.json.
//
// Idempotent: assetId = `${concept}/${batch}/${jobId}/${quadrant}` and saveAsset
// is INSERT OR REPLACE, so re-running never duplicates.
//
// Usage:  node scripts/ingest-assets.js          # manifest only
//         node scripts/ingest-assets.js --db      # also load into SQLite

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const INGEST_DIR = path.join(ROOT, 'to-ingest')
const MANIFEST_PATH = path.join(ROOT, 'docs', 'design', 'prompts', 'ingest-manifest.json')

const LOAD_DB = process.argv.includes('--db')

// prompt signature (matched against the start-of-prompt filename slug) -> metadata.
// Order matters only for safety; signatures are distinctive. concept = kit folder slug.
const SIGNATURES = [
  // 01 MADE ON SILENCE — only moodboard #1 (the redacted FOI document) was run
  ['RELEASED_UNDER_FIPPA', '01-made-on-silence', 'moodboard', 1, 'Redacted FOI document'],
  ['white_paper_black_censorship_bars', '01-made-on-silence', 'moodboard', 1, 'Redacted FOI document'],
  ['most_lines_blacked_out', '01-made-on-silence', 'moodboard', 1, 'Redacted FOI document'],
  ['freedom-of-information_response_document', '01-made-on-silence', 'moodboard', 1, 'Redacted FOI document'],
  ['bureaucratic_withholding_aesthetic', '01-made-on-silence', 'moodboard', 1, 'Redacted FOI document'],

  // 09 PUMP & DUMP — moodboard
  ['close-up_macro_of_intricately_engraved_banknote', '09-pump-and-dump', 'moodboard', 1, 'Engraved banknote close-up'],
  ['flat_lay_of_official_FIFA_2026_World_Cup_marketing', '09-pump-and-dump', 'moodboard', 2, 'FIFA official collateral'],
  ['open_pages_of_financial_prospectus', '09-pump-and-dump', 'moodboard', 3, 'Prospectus / financial document'],
  ['toxic_teal_and_magenta_neon', '09-pump-and-dump', 'moodboard', 4, 'Neon against blackout'],
  ['iridescent_holographic_material', '09-pump-and-dump', 'moodboard', 5, 'Holographic hype material'],
  ['macro_shot_of_candlestick_chart', '09-pump-and-dump', 'moodboard', 6, 'Candlestick chart close-up'],
  ['silhouette_of_modern_condo_tower_skyline', '09-pump-and-dump', 'moodboard', 7, 'Lit/dark condo skyline'],
  ['overhead_view_of_dense_high-rise_condo', '09-pump-and-dump', 'moodboard', 8, 'Aerial condo development'],
  ['series_of_rubber_stamp_marks_in_stamp_red', '09-pump-and-dump', 'moodboard', 9, 'Red stamp marks (VACANT/SOLD)'],

  // 09 PUMP & DUMP — graphic elements
  ['seamless_repeating_pattern_candlestick_charts', '09-pump-and-dump', 'graphic-elements', 1, 'Candlestick all-over repeat'],
  ['seamless_repeating_pattern_of_modern_high-rise_condo', '09-pump-and-dump', 'graphic-elements', 2, 'Condo tower + vacancy pattern'],
  ['repeating_geometric_guilloch', '09-pump-and-dump', 'graphic-elements', 3, 'Banknote guilloché overlay'],
  ['heraldic_shield_split_vertically_in_half', '09-pump-and-dump', 'graphic-elements', 4, 'Split soccer/candlestick crest'],
  ['heraldic_shield_split_design_left_stacked_condo', '09-pump-and-dump', 'graphic-elements', 5, 'Condo tower + chart shield'],
  ['professional_sponsor_bar', '09-pump-and-dump', 'graphic-elements', 6, 'PUMP & DUMP CAPITAL sponsor bar'],
  ['official_sponsortagline_bar', '09-pump-and-dump', 'graphic-elements', 7, 'Secondary tagline banner'],
  ['official_Fair_Play_style_circular_badge', '09-pump-and-dump', 'graphic-elements', 8, 'Fair Play / badge variant'],
  ['athletic_jersey_nameplate_style_reads_DEVELOPER', '09-pump-and-dump', 'graphic-elements', 9, 'Role-based nameplate'],
  ['technical_jersey_number_rendered_from_building_floor-plan', '09-pump-and-dump', 'graphic-elements', 10, 'Floor-plan number'],
  ['repeating_red_rubber_stamp_marks_spelling_VACANT', '09-pump-and-dump', 'graphic-elements', 11, 'VACANT stamp pattern'],
  ['large_bold_numerals_22x_and_33x', '09-pump-and-dump', 'graphic-elements', 12, 'Price-to-income ratios'],
  ['FIFA_World_Cup_trophy_silhouette_stylized', '09-pump-and-dump', 'graphic-elements', 15, 'Trophy silhouette variation'],

  // 09 PUMP & DUMP — jersey flats
  ['technical_flat-lay_fashion_illustration_of_unisex_soccer_jers', '09-pump-and-dump', 'jersey-flats', 1, 'Full front flat'],
  ['technical_flat-lay_fashion_illustration_of_jersey_back', '09-pump-and-dump', 'jersey-flats', 2, 'Full back flat'],
  ['technical_fashion_flat_of_complete_jersey_showing_side', '09-pump-and-dump', 'jersey-flats', 3, 'Side / sleeve detail'],
  ['technical_flat-lay_jersey_illustration_base_midnight_navy', '09-pump-and-dump', 'jersey-flats', 4, 'Navy + teal colorway'],
  ['technical_flat-lay_jersey_midnight_navy_base_toxic_magenta', '09-pump-and-dump', 'jersey-flats', 5, 'Navy + magenta colorway'],
  ['technical_flat-lay_soccer_jersey_illustration_midnight_navy', '09-pump-and-dump', 'jersey-flats', 6, 'Hybrid candlestick + towers'],
  ['close-up_technical_illustration_of_heraldic_shield_crest', '09-pump-and-dump', 'jersey-flats', 7, 'Crest detail close-up'],
  ['close-up_of_jersey_sponsor_bar_placement_reads_PUMP', '09-pump-and-dump', 'jersey-flats', 8, 'Sponsor bar close-up'],
  ['close-up_technical_illustration_of_jersey_back_nameplate', '09-pump-and-dump', 'jersey-flats', 9, 'Back nameplate close-up'],
  ['technical_flat-lay_illustration_of_complete_soccer_kit', '09-pump-and-dump', 'jersey-flats', 10, 'Complete kit (jersey + shorts + socks)'],
]

const JOB_RE = /_([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})_(\d+)\.png$/i

function parseFilename(filename) {
  const m = filename.match(JOB_RE)
  if (!m) return null
  const jobId = m[1]
  const quadrant = parseInt(m[2], 10)
  const slug = filename.slice(0, m.index)
  return { jobId, quadrant, slug }
}

function lookup(slug) {
  for (const [sig, concept, batch, num, label] of SIGNATURES) {
    if (slug.includes(sig)) {
      return { concept, batch, promptId: `${concept}/${batch}#${num}`, promptLabel: label, promptNum: num }
    }
  }
  return null
}

function dimensions(filePath) {
  try {
    const out = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}"`, { encoding: 'utf8' })
    const w = out.match(/pixelWidth:\s*(\d+)/)
    const h = out.match(/pixelHeight:\s*(\d+)/)
    return { width: w ? +w[1] : null, height: h ? +h[1] : null }
  } catch {
    return { width: null, height: null }
  }
}

if (!fs.existsSync(INGEST_DIR)) {
  console.error(`✗ Ingest directory not found: ${INGEST_DIR}`)
  process.exit(1)
}

const files = fs.readdirSync(INGEST_DIR).filter(f => f.toLowerCase().endsWith('.png')).sort()
const entries = []
const unmapped = []

for (const filename of files) {
  const parsed = parseFilename(filename)
  if (!parsed) { unmapped.push(filename); continue }
  const meta = lookup(parsed.slug)
  if (!meta) { unmapped.push(filename); continue }

  const filePath = path.join(INGEST_DIR, filename)
  const { size } = fs.statSync(filePath)
  const { width, height } = dimensions(filePath)

  entries.push({
    assetId: `${meta.concept}__${meta.batch}__${parsed.jobId}__${parsed.quadrant}`,
    concept: meta.concept,
    batch: meta.batch,
    promptId: meta.promptId,
    promptLabel: meta.promptLabel,
    mjJobId: parsed.jobId,
    quadrant: parsed.quadrant,
    filename,
    path: filePath,
    width,
    height,
    filesize: size,
  })
}

// Group into jobs (the 4-up sets) for the manifest summary
const jobsMap = new Map()
for (const e of entries) {
  if (!jobsMap.has(e.mjJobId)) {
    jobsMap.set(e.mjJobId, { mjJobId: e.mjJobId, concept: e.concept, batch: e.batch, promptId: e.promptId, promptLabel: e.promptLabel, quadrants: [] })
  }
  jobsMap.get(e.mjJobId).quadrants.push(e.quadrant)
}
const jobs = [...jobsMap.values()].map(j => ({ ...j, quadrants: j.quadrants.sort((a, b) => a - b) }))

// Per-concept / per-prompt counts
const byConcept = {}
for (const j of jobs) {
  byConcept[j.concept] ??= { jobs: 0, files: 0, prompts: new Set() }
  byConcept[j.concept].jobs += 1
  byConcept[j.concept].prompts.add(j.promptId)
}
for (const e of entries) byConcept[e.concept].files += 1
const conceptSummary = Object.fromEntries(
  Object.entries(byConcept).map(([k, v]) => [k, { jobs: v.jobs, files: v.files, distinctPrompts: v.prompts.size }])
)

const manifest = {
  generatedFrom: 'to-ingest/',
  totals: { files: entries.length, jobs: jobs.length, unmapped: unmapped.length },
  byConcept: conceptSummary,
  jobs,
  assets: entries,
}

fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true })
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))

console.log(`✓ Manifest: ${entries.length} files / ${jobs.length} jobs → ${path.relative(ROOT, MANIFEST_PATH)}`)
console.log('  by concept:', JSON.stringify(conceptSummary))
if (unmapped.length) {
  console.warn(`⚠ ${unmapped.length} unmapped file(s):`)
  unmapped.forEach(f => console.warn('   ', f))
}

if (LOAD_DB) {
  const { saveAsset } = await import('../src/utils/sqlite.js')
  let n = 0
  for (const e of entries) {
    saveAsset({
      id: e.assetId,
      concept: e.concept,
      batch: e.batch,
      filename: e.filename,
      path: e.path,
      promptId: e.promptId,
      width: e.width,
      height: e.height,
      filesize: e.filesize,
      metadata: { mjJobId: e.mjJobId, quadrant: e.quadrant, promptLabel: e.promptLabel },
    })
    n += 1
  }
  console.log(`✓ Loaded ${n} assets into SQLite (idempotent)`)
}
