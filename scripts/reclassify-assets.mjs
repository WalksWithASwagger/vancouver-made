// Reassign assets to a different concept (e.g. emptying the 'unsorted' bucket once the images
// have been eyeballed). Takes a JSON array of {id, concept}; updates assets.concept and any
// matching ratings.concept. Stable ids are kept as-is. Idempotent.
//
//   node scripts/reclassify-assets.mjs reclass.json
//   cat reclass.json | node scripts/reclassify-assets.mjs -

import fs from 'fs'
import { getDb } from '../src/utils/sqlite.js'

const arg = process.argv[2]
if (!arg) { console.error('Usage: node scripts/reclassify-assets.mjs <reclass.json | ->'); process.exit(1) }
const raw = arg === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(arg, 'utf8')
let rows
try { rows = JSON.parse(raw) } catch (e) { console.error('Invalid JSON:', e.message); process.exit(1) }
if (!Array.isArray(rows)) { console.error('Expected array of {id, concept}'); process.exit(1) }

const db = getDb()
const get = db.prepare('SELECT concept FROM assets WHERE id = ?')
const updA = db.prepare('UPDATE assets SET concept = ? WHERE id = ?')
const updR = db.prepare('UPDATE ratings SET concept = ? WHERE assetId = ?')

let moved = 0, same = 0
const missing = []
const apply = db.transaction(items => {
  for (const { id, concept } of items) {
    if (!id || !concept) continue
    const cur = get.get(id)
    if (!cur) { missing.push(id); continue }
    if (cur.concept === concept) { same++; continue }
    updA.run(concept, id)
    updR.run(concept, id)
    moved++
  }
})
apply(rows)

console.log(`✓ reclassified ${moved} asset(s) (${same} unchanged)`)
if (missing.length) console.log(`⚠ ${missing.length} id(s) not found, e.g. ${missing.slice(0, 3).join(', ')}`)
