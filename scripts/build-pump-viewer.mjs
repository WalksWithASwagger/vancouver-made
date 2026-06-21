// Builds a self-contained prompt+image viewer for PUMP & DUMP FC, matching the
// rafiki club viewers (Nardwuar / China Creek / Number Five Orange). Pump & Dump's
// imagery came through the asset tracker (Midjourney), not rafiki, so this pairs each
// tracked image with the prompt that generated it (via assets.promptId -> the prompt
// markdown) and reuses the rafiki viewer template verbatim for an identical look.
//
// Output: public/wall/pump-prompts/{moodboard,graphic-elements,jersey-flats}/*.jpg + viewer.html
// Run: node scripts/build-pump-viewer.mjs   (needs sqlite3 + macOS sips)

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const DB = join(ROOT, 'src/db/ratings.db')
const TEMPLATE = join(ROOT, 'docs/design/prompts/clubs/nardwuar-fc/rafiki/images/viewer.html')
const OUTDIR = join(ROOT, 'public/wall/pump-prompts')
const CONCEPT = '09-pump-and-dump'
const PER_PROMPT_CAP = 4

// presentation order: mood -> graphics -> flats
const FILES = [
  { base: 'moodboard',        title: 'THE MOODBOARD',   ar: '4:5' },
  { base: 'graphic-elements', title: 'GRAPHIC ELEMENTS', ar: '1:1' },
  { base: 'jersey-flats',     title: 'JERSEY FLATS',    ar: '3:4' },
]

// 1. parse each prompt markdown into `${base}#${n}` -> { label, text }
const promptMap = {}
for (const { base } of FILES) {
  const md = readFileSync(join(ROOT, 'docs/design/prompts', CONCEPT, `${base}.md`), 'utf8')
  const re = /^###\s+Prompt\s+(\d+):\s*(.+?)\s*$/gm
  const marks = []
  let m
  while ((m = re.exec(md))) marks.push({ n: +m[1], label: m[2], idx: m.index })
  marks.forEach((mk, i) => {
    const seg = md.slice(mk.idx, i + 1 < marks.length ? marks[i + 1].idx : md.length)
    const code = seg.match(/```[\s\S]*?\n([\s\S]*?)```/)
    promptMap[`${base}#${mk.n}`] = { label: mk.label, text: code ? code[1].trim() : '' }
  })
}

// 2. pull tracked Pump & Dump images, liked first
const rows = JSON.parse(execFileSync('sqlite3', ['-json', DB,
  `SELECT a.path, a.promptId, a.metadata, COALESCE(r.liked,0) AS liked
   FROM assets a LEFT JOIN ratings r ON a.id = r.assetId
   WHERE a.concept='${CONCEPT}' ORDER BY r.liked DESC, a.imported ASC`
], { encoding: 'utf8', maxBuffer: 1e8 }) || '[]')

// 3. stage images per file group, capped per prompt, build the RUNS array
rmSync(OUTDIR, { recursive: true, force: true })
mkdirSync(OUTDIR, { recursive: true })

const RUNS = []
let staged = 0
for (const { base, title, ar } of FILES) {
  const dir = base
  mkdirSync(join(OUTDIR, dir), { recursive: true })
  const seen = {}
  const images = []
  for (const row of rows) {
    const key = (row.promptId || '').replace(`${CONCEPT}/`, '')
    if (!key.startsWith(`${base}#`)) continue
    seen[key] = (seen[key] || 0) + 1
    if (seen[key] > PER_PROMPT_CAP) continue
    const meta = row.metadata ? JSON.parse(row.metadata) : {}
    const pm = promptMap[key] || {}
    const file = `${String(images.length + 1).padStart(3, '0')}.jpg`
    try {
      execFileSync('sips', ['-s', 'format', 'jpeg', '-Z', '1200', row.path, '--out', join(OUTDIR, dir, file)], { stdio: 'ignore' })
    } catch { continue }
    images.push({
      name: (meta.promptLabel || pm.label || base) + (row.liked ? ' ★' : ''),
      prompt: pm.text || '(prompt text not found in markdown)',
      file, ok: true, state: 'succeeded', liked: !!row.liked,
    })
    staged++
  }
  RUNS.push({ id: dir, dir, timestamp: `${images.length} images`, model: title, style: 'pump-and-dump', aspect_ratio: ar, prompt_file: `${base}.md`, images })
}

// 4. inject data into a verbatim copy of the rafiki viewer template
const lines = readFileSync(TEMPLATE, 'utf8').split('\n')
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('const RUNS = ')) lines[i] = `const RUNS = ${JSON.stringify(RUNS)};`
  else if (lines[i].startsWith('const PROJECT = ')) lines[i] = `const PROJECT = "${CONCEPT}";`
}
let html = lines.join('\n')
  .replace(/<title>.*?<\/title>/, '<title>PUMP &amp; DUMP FC — Prompts</title>')
  .replace(/<h1>Images<\/h1>/, '<h1>PUMP &amp; DUMP — Prompts</h1>')
  .replace(/(<span class="pill" id="run-pill">)[^<]*(<\/span>)/, `$1${RUNS.length} groups$2`)
writeFileSync(join(OUTDIR, 'viewer.html'), html)

console.log(`groups: ${RUNS.length} | images staged: ${staged}`)
RUNS.forEach(r => console.log(`  ${r.model}: ${r.images.length}`))
