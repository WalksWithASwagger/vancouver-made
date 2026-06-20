// Curation contact sheet. Reads the ingest manifest and emits a single static
// contact-sheet.html: every generated asset in a grid, grouped by concept -> batch ->
// prompt, so you can eyeball all of them in one file (no servers) and pick.
//
// Run from the repo root (where to-ingest/ lives, so image paths resolve):
//   node scripts/contact-sheet.js
// Then open contact-sheet.html in a browser. Re-run as more generations land.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = path.join(root, 'docs/design/prompts/ingest-manifest.json')
const outPath = path.join(root, 'contact-sheet.html')

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const assets = manifest.assets || []

// group: concept -> batch -> promptLabel -> [assets]
const tree = {}
for (const a of assets) {
  const c = a.concept || 'unsorted'
  const b = a.batch || 'misc'
  const p = a.promptLabel || a.promptId || 'untitled'
  ;((tree[c] ??= {})[b] ??= {})[p] ??= []
  tree[c][b][p].push(a)
}

const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]))

let body = ''
for (const concept of Object.keys(tree).sort()) {
  const batches = tree[concept]
  const count = Object.values(batches).flatMap((b) => Object.values(b)).flat().length
  body += `<section class="concept"><h2>${esc(concept)} <span class="dim">${count}</span></h2>`
  for (const batch of Object.keys(batches).sort()) {
    body += `<h3>${esc(batch)}</h3>`
    for (const label of Object.keys(batches[batch]).sort()) {
      const cells = batches[batch][label]
      body += `<h4>${esc(label)} <span class="dim">${cells.length}</span></h4><div class="grid">`
      for (const a of cells) {
        const src = esc(a.path || `to-ingest/${a.filename}`)
        body += `<figure><img loading="lazy" src="${src}" alt="${esc(a.filename)}"><figcaption>${esc(a.filename)}</figcaption></figure>`
      }
      body += `</div>`
    }
  }
  body += `</section>`
}

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Contact Sheet · ${assets.length} generations</title>
<style>
  :root{--ink:#0a0a0a;--bone:#f4f1ea;--hazard:#ff3b00;--gold:#d9a521}
  *{box-sizing:border-box}body{margin:0;background:var(--ink);color:var(--bone);
    font-family:"Space Mono",ui-monospace,monospace;padding:2rem}
  h1{font-family:"Archivo Black",Impact,sans-serif;font-size:1.6rem}
  h2{margin-top:2.5rem;border-bottom:2px solid var(--hazard);padding-bottom:.4rem;text-transform:uppercase;letter-spacing:.1em}
  h3{margin-top:1.5rem;color:var(--gold);text-transform:uppercase;letter-spacing:.15em;font-size:.85rem}
  h4{margin:1rem 0 .5rem;font-size:.8rem;color:rgba(244,241,234,.7);font-weight:400}
  .dim{color:rgba(244,241,234,.4);font-size:.75rem}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem}
  figure{margin:0;background:#000;border:1px solid rgba(244,241,234,.12);border-radius:6px;overflow:hidden}
  img{width:100%;aspect-ratio:1;object-fit:cover;display:block;background:#111}
  figcaption{padding:.4rem .5rem;font-size:.62rem;color:rgba(244,241,234,.5);word-break:break-all;line-height:1.3}
  header{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:1rem}
</style></head><body>
<header><h1>CONTACT SHEET</h1><span class="dim">${assets.length} generations · open, scan, pick · re-run scripts/contact-sheet.js to refresh</span></header>
${body}
</body></html>`

fs.writeFileSync(outPath, html)
console.log(`✓ wrote ${outPath} (${assets.length} assets)`)
