// Merge caption/tags/prompt (and any extra keys) into assets.metadata JSON, in place.
// The single writer for every caption/tag pass — preserves existing metadata keys.
//
//   node scripts/annotate-assets.mjs annotations.json
//   cat annotations.json | node scripts/annotate-assets.mjs -
//
// Input: JSON array of objects, each MUST have `id` (the assets.id). Every other key
// (caption, tags, prompt, ...) is merged into that row's metadata. Unknown ids are skipped
// and reported. Idempotent: re-running overwrites the same keys.

import fs from 'fs'
import { getDb } from '../src/utils/sqlite.js'

const arg = process.argv[2]
if (!arg) {
  console.error('Usage: node scripts/annotate-assets.mjs <annotations.json | ->')
  process.exit(1)
}

const raw = arg === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(arg, 'utf8')
let rows
try {
  rows = JSON.parse(raw)
} catch (err) {
  console.error('Invalid JSON:', err.message)
  process.exit(1)
}
if (!Array.isArray(rows)) {
  console.error('Expected a JSON array of {id, caption, tags, ...} objects')
  process.exit(1)
}

const db = getDb()
const get = db.prepare('SELECT metadata FROM assets WHERE id = ?')
const upd = db.prepare('UPDATE assets SET metadata = ? WHERE id = ?')

let updated = 0
const missing = []
const apply = db.transaction(items => {
  for (const item of items) {
    const { id, ...patch } = item
    if (!id) continue
    const existing = get.get(id)
    if (!existing) { missing.push(id); continue }
    let meta = {}
    try { meta = existing.metadata ? JSON.parse(existing.metadata) : {} } catch { meta = {} }
    Object.assign(meta, patch)
    upd.run(JSON.stringify(meta), id)
    updated++
  }
})
apply(rows)

console.log(`✓ annotated ${updated}/${rows.length} asset(s)`)
if (missing.length) {
  console.log(`⚠ ${missing.length} id(s) not found, e.g.: ${missing.slice(0, 3).join(', ')}`)
}
