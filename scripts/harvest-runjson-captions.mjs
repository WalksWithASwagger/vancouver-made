// Harvest the free per-image captions + prompts that already live in each Gemini club run's
// run.json, and emit them as annotations for annotate-assets.mjs. Zero vision cost.
//
//   node scripts/harvest-runjson-captions.mjs | node scripts/annotate-assets.mjs -
//
// Club assets carry metadata.dir (the original run folder). That folder's run.json has an
// images[] array with {name, prompt, file}. We match file === asset.filename and emit
// {id, caption: name, prompt}. Images with no run.json match are skipped (reported on stderr).

import fs from 'fs'
import path from 'path'
import { getDb } from '../src/utils/sqlite.js'

const ROOT = process.cwd()
const CLUBS = ['nardwuar-fc', 'number-five-orange', 'china-creek']

const db = getDb()
const assets = db
  .prepare(`SELECT id, filename, metadata FROM assets WHERE concept IN (${CLUBS.map(() => '?').join(',')})`)
  .all(...CLUBS)

const runCache = {}
function loadRun(dir) {
  if (!(dir in runCache)) {
    const p = path.resolve(ROOT, dir, 'run.json')
    try { runCache[dir] = JSON.parse(fs.readFileSync(p, 'utf8')) } catch { runCache[dir] = null }
  }
  return runCache[dir]
}

const out = []
let noMeta = 0, noMatch = 0
for (const a of assets) {
  let meta = {}
  try { meta = a.metadata ? JSON.parse(a.metadata) : {} } catch { meta = {} }
  if (!meta.dir) { noMeta++; continue }
  const run = loadRun(meta.dir)
  const hit = run?.images?.find(im => im.file === a.filename)
  if (!hit) { noMatch++; continue }
  out.push({ id: a.id, caption: hit.name || a.filename, prompt: hit.prompt || '' })
}

process.stderr.write(`harvested ${out.length}/${assets.length} club captions (no-dir: ${noMeta}, no-match: ${noMatch})\n`)
process.stdout.write(JSON.stringify(out))
