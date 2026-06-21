// Stage web copies of ALL generated MADE ON design images for the generative
// /wall montage. Pulls the to-ingest pool from the Asset Tracker DB (concept +
// batch/phase already tagged) AND the gitignored rafiki club runs (China Creek +
// lifestyle), classifies each by phase, downscales to web size with `sips`, and
// writes public/wall/ + a manifest.json. Sources are gitignored, so the staged
// copies are what ships to the deploy.
//
//   node scripts/stage-wall-assets.mjs   (or: npm run stage:wall)

import Database from 'better-sqlite3'
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync, rmSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const OUT = join(ROOT, 'public/wall')
const MAX_W = 680
const JPEG_Q = 52
const CAPS = { mood: 40, mark: 36, flat: 14, wear: 40 } // per concept per phase

// concept → palette (clubs.js / heroKits.js / collection.js)
const PALETTES = {
  '01-made-on-silence': { base: '#0E0E0E', accent: '#C0392B', glow: '#f4f1ea' },
  '03-public-dime': { base: '#1B4D3E', accent: '#B8924A', glow: '#EDE6D8' },
  '09-pump-and-dump': { base: '#0b1437', accent: '#21f0d0', glow: '#ff2bd6' },
  'nardwuar-fc': { base: '#c8102e', accent: '#1d7a46', glow: '#e8c531' },
  'number-five-orange': { base: '#ff6a00', accent: '#ff2d6f', glow: '#d9a521' },
  'china-creek': { base: '#5b6770', accent: '#f2c200', glow: '#cdbfa6' },
  unsorted: { base: '#1c2b33', accent: '#ff3b00', glow: '#d9a521' },
}
const TITLES = {
  '01-made-on-silence': 'MADE ON SILENCE',
  '03-public-dime': 'THE PUBLIC DIME',
  '09-pump-and-dump': 'PUMP AND DUMP',
  'nardwuar-fc': 'NARDWUAR FC',
  'number-five-orange': 'NUMBER FIVE ORANGE',
  'china-creek': 'CHINA CREEK',
  unsorted: 'THE PILE',
}

function phaseOf(batch = '', filename = '') {
  const s = `${batch} ${filename}`.toLowerCase()
  if (/lookbook|on-body|on_body|player|locals|court|three-quarter|torso|hero-studio|worn|lifestyle/.test(s)) return 'wear'
  if (/mood|texture|laminate|merch|facade|riso|engrav|banknote|guilloche|skyline|bowl-contour/.test(s)) return 'mood'
  if (/element|crest|sponsor|badge|nameplate|number|microtext|patch|serial|pattern|tag|wordmark|trophy|stamp|marquee|ransom/.test(s)) return 'mark'
  if (/flat|complete-kit|kit-flat|full-front|full-back|front-flat|back-flat|jersey/.test(s)) return 'flat'
  return 'mark'
}

// ── collect (concept, phase, srcPath) candidates ──
const candidates = []

// 1) Asset Tracker DB (to-ingest pool)
try {
  const db = new Database(join(ROOT, 'src/db/ratings.db'), { readonly: true })
  const rows = db
    .prepare(
      `SELECT a.concept, a.batch, a.path, a.filename, COALESCE(r.liked,0) liked, COALESCE(r.score,0) score
       FROM assets a LEFT JOIN ratings r ON r.assetId = a.id`
    )
    .all()
  for (const r of rows) {
    if (!existsSync(r.path)) continue
    candidates.push({ concept: r.concept || 'unsorted', phase: phaseOf(r.batch, r.filename), src: r.path, liked: r.liked, score: r.score })
  }
  db.close()
} catch (e) {
  console.warn('stage-wall: DB read skipped —', e.message)
}

// 2) rafiki club runs (gitignored on disk) — China Creek + latest lifestyle/flats
const CLUBS = join(ROOT, 'docs/design/prompts/clubs')
for (const club of ['nardwuar-fc', 'number-five-orange', 'china-creek']) {
  const imgs = join(CLUBS, club, 'rafiki/images')
  if (!existsSync(imgs)) continue
  for (const run of readdirSync(imgs)) {
    if (run === 'latest') continue
    const dir = join(imgs, run)
    if (!statSync(dir).isDirectory()) continue
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.png')) continue
      candidates.push({ concept: club, phase: phaseOf(run, f), src: join(dir, f), liked: 0, score: 0 })
    }
  }
}

// ── cap per (concept, phase): prefer liked/higher-score first ──
const buckets = new Map()
for (const c of candidates) {
  const k = `${c.concept}|${c.phase}`
  if (!buckets.has(k)) buckets.set(k, [])
  buckets.get(k).push(c)
}
const chosen = []
for (const [k, arr] of buckets) {
  const phase = k.split('|')[1]
  arr.sort((a, b) => b.liked - a.liked || b.score - a.score)
  chosen.push(...arr.slice(0, CAPS[phase] ?? 40))
}

// ── downscale + write ──
rmSync(OUT, { recursive: true, force: true })
for (const p of ['mood', 'mark', 'flat', 'wear']) mkdirSync(join(OUT, p), { recursive: true })

const manifest = { groups: {}, mood: [], mark: [], flat: {}, wear: {} }
for (const [id, pal] of Object.entries(PALETTES)) manifest.groups[id] = { title: TITLES[id], palette: pal }

const counters = {}
let done = 0
for (const c of chosen) {
  const n = (counters[`${c.phase}|${c.concept}`] = (counters[`${c.phase}|${c.concept}`] || 0) + 1)
  const rel = `${c.phase}/${c.concept}__${String(n).padStart(3, '0')}.jpg`
  const outPath = join(OUT, rel)
  try {
    execFileSync('sips', ['-Z', String(MAX_W), '-s', 'format', 'jpeg', '-s', 'formatOptions', String(JPEG_Q), c.src, '--out', outPath], { stdio: 'ignore' })
  } catch {
    continue
  }
  const web = `/wall/${rel}`
  const entry = { src: web, concept: c.concept }
  if (c.phase === 'mood' || c.phase === 'mark') manifest[c.phase].push(entry)
  else {
    if (!manifest[c.phase][c.concept]) manifest[c.phase][c.concept] = []
    manifest[c.phase][c.concept].push(web)
  }
  if (++done % 50 === 0) console.log(`  …${done} staged`)
}

// shuffle the storm pools (deterministic-ish, index-based) so concepts interleave
const interleave = (a) => a.map((v, i) => [v, (i * 97) % a.length]).sort((x, y) => x[1] - y[1]).map((x) => x[0])
manifest.mood = interleave(manifest.mood)
manifest.mark = interleave(manifest.mark)

writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 0))
const counts = `mood ${manifest.mood.length} · mark ${manifest.mark.length} · flat ${Object.values(manifest.flat).reduce((n, a) => n + a.length, 0)} · wear ${Object.values(manifest.wear).reduce((n, a) => n + a.length, 0)}`
console.log(`stage-wall: ${done} images staged → public/wall/  [${counts}]`)
