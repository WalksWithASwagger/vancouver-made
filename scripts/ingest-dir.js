// Ingest every image in a directory into the tracker DB under a given concept/batch.
// For non-Midjourney sources (e.g. Rafiki renders) and re-rolls.
//
//   node scripts/ingest-dir.js <dir> <concept> [batch]
//   node scripts/ingest-dir.js /Users/kk/Code/rafiki/styles/refs/nardwuar nardwuar-fc refs
//
// Re-runnable: INSERT OR REPLACE on a stable id, so re-ingesting the same folder updates
// rather than duplicates. Images are referenced by absolute path (local-only viewer).

import fs from 'fs'
import path from 'path'
import { saveAsset } from '../src/utils/sqlite.js'

const [dir, concept, batch = 'misc'] = process.argv.slice(2)

if (!dir || !concept) {
  console.error('Usage: node scripts/ingest-dir.js <dir> <concept> [batch]')
  process.exit(1)
}
if (!fs.existsSync(dir)) {
  console.error(`Directory not found: ${dir}`)
  process.exit(1)
}

const IMG = /\.(png|jpe?g|webp)$/i
const files = fs.readdirSync(dir).filter(f => IMG.test(f))

let n = 0
for (const filename of files) {
  const abs = path.resolve(dir, filename)
  const stat = fs.statSync(abs)
  const base = filename.replace(IMG, '')
  const id = `${concept}__${batch}__${base}`.replace(/[^A-Za-z0-9_-]/g, '-')
  saveAsset({
    id,
    concept,
    batch,
    filename,
    path: abs,
    filesize: stat.size,
    metadata: { source: 'ingest-dir', dir }
  })
  n++
}

console.log(`✓ ingested ${n} image(s) from ${dir} → concept "${concept}" / batch "${batch}"`)
