// Build a browsable, per-project view of the tracker assets:
//   archive/2026-06-20/by-project/<concept>/NNN-<caption-slug>.<ext>  (+ _index.md)
// Images are HARD-LINKED from their originals (same filesystem → ~0 extra disk; falls back
// to copy across devices). The DB stays the source of truth; this is just a Finder-friendly
// reorganization driven by it.
//
//   node scripts/build-by-project.mjs                       # all concepts
//   node scripts/build-by-project.mjs china-creek nardwuar-fc number-five-orange
//
// Re-runnable: each concept folder is wiped and rebuilt. Reference inputs (batch='refs')
// are excluded — only generated/hero images are placed.

import fs from 'fs'
import path from 'path'
import { getDb } from '../src/utils/sqlite.js'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'archive/2026-06-20/by-project')
const db = getDb()

const concepts = process.argv.slice(2).length
  ? process.argv.slice(2)
  : db.prepare('SELECT DISTINCT concept FROM assets ORDER BY concept').all().map(r => r.concept)

const slug = s => (s || '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'untitled'

function place(src, dest) {
  fs.rmSync(dest, { force: true })
  try { fs.linkSync(src, dest) } catch { fs.copyFileSync(src, dest) }
}

let grand = 0
for (const concept of concepts) {
  const rows = db.prepare(
    `SELECT id, filename, path, batch, metadata FROM assets
     WHERE concept = ? AND batch != 'refs' ORDER BY batch, filename`).all(concept)
  if (!rows.length) { console.log(`(skip ${concept}: no images)`); continue }

  const dir = path.join(OUT, concept)
  fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })

  // Sub-group by batch for the semantic MJ batches (moodboard/graphic-elements/jersey-flats/
  // hero); keep club runs (run-*) flat at the concept root.
  const subdirOf = batch => (batch && !batch.startsWith('run-')) ? batch : ''

  const lines = [`# ${concept} — ${rows.length} images`, '']
  const counters = {}
  let i = 0, missing = 0
  for (const r of rows) {
    if (!fs.existsSync(r.path)) { missing++; continue }
    let meta = {}; try { meta = r.metadata ? JSON.parse(r.metadata) : {} } catch { meta = {} }
    if (meta.excluded) continue // QA-flagged artifacts (trademark/misspelling/likeness)
    const caption = meta.caption || meta.promptLabel || r.filename
    const tags = Array.isArray(meta.tags) ? meta.tags : []
    const ext = path.extname(r.path) || '.png'
    const sub = subdirOf(r.batch)
    if (sub) fs.mkdirSync(path.join(dir, sub), { recursive: true })
    counters[sub] = (counters[sub] || 0) + 1
    const name = `${String(counters[sub]).padStart(3, '0')}-${slug(caption)}${ext}`
    place(r.path, path.join(dir, sub, name))
    i++
    lines.push(`- **${sub ? sub + '/' : ''}${name}** — ${caption}`)
    if (tags.length) lines.push(`  - tags: ${tags.join(', ')}`)
    lines.push(`  - source: \`${r.path}\``)
  }
  fs.writeFileSync(path.join(dir, '_index.md'), lines.join('\n') + '\n')
  console.log(`✓ ${concept}: ${i} placed${missing ? `, ${missing} missing on disk` : ''}`)
  grand += i
}
console.log(`done — ${grand} image(s) across ${concepts.length} concept(s) → ${OUT}`)
