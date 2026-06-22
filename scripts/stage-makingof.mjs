// Stage per-concept "making-of" imagery + manifest for the in-app /making-of/:slug pages.
// Reads the captioned/tagged tracker DB, classifies each concept's images into four
// stages (mood → graphics → flats → lifestyle), picks the best (liked-first, capped),
// downscales them into public/making-of/<slug>/<stage>/, and writes a manifest.json the
// MakingOf component fetches at runtime. Also writes public/making-of/index.json.
//
//   node scripts/stage-makingof.mjs            # all configured concepts
//   node scripts/stage-makingof.mjs china-creek
//
// public/ is deployed (the raw archive is gitignored), so this is what makes the
// captioned process visible on the live site.

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { getDb } from '../src/utils/sqlite.js'

const ROOT = process.cwd()
const OUT = join(ROOT, 'public/making-of')
const db = getDb()

// route slug → { concept (tracker), name, blurb }
const CONCEPTS = {
  'nardwuar-fc':      { concept: 'nardwuar-fc',     name: 'Nardwuar FC',     blurb: 'Research as protest, the receipt as weapon — a punk-zine archive worn as a host-nation home kit.' },
  'china-creek':      { concept: 'china-creek',      name: 'China Creek',     blurb: 'They banned the board, then sold the bowl. A defended-public-space manifesto in concrete grey and caution yellow.' },
  'pump-and-dump-fc': { concept: '09-pump-and-dump', name: 'Pump & Dump FC', blurb: 'Hype the asset, socialize the cost, privatize the exit — speculation city as a blackout third kit.' },
}

const STAGES = [
  { key: 'mood',      title: 'The Mood',      blurb: 'Moodboards — the texture, palette and references the kit grows from.' },
  { key: 'graphics',  title: 'The Marks',     blurb: 'Crests, patterns, nameplates, numbers and typography — the language of the kit.' },
  { key: 'flats',     title: 'The Flats',     blurb: 'Technical jersey flats — front, back, the complete kit laid out.' },
  { key: 'lifestyle', title: 'On the Body',   blurb: 'Editorial lifestyle — the kit in the world, on people.' },
]
const CAP = { mood: 6, graphics: 8, flats: 8, lifestyle: 8 }

const has = (tags, set) => tags.some(t => set.has(t))
const G = new Set(['jersey-flat', 'jersey-front', 'jersey-back', 'complete-kit', 'product-render'])
const L = new Set(['lifestyle', 'on-body', 'editorial'])
const M = new Set(['moodboard'])

function stageOf(batch, tags) {
  if (batch === 'lifestyle' || batch === 'hero' || has(tags, L)) return 'lifestyle'
  if (batch === 'moodboard' || has(tags, M)) return 'mood'
  if (batch === 'jersey-flats' || has(tags, G)) return 'flats'
  if (batch === 'graphic-elements') return 'graphics'
  return 'graphics' // crests, patterns, nameplates, numbers, typography, textures, patches…
}

const slugs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(CONCEPTS)
const index = []

for (const slug of slugs) {
  const cfg = CONCEPTS[slug]
  if (!cfg) { console.error(`unknown slug: ${slug}`); continue }
  const rows = db.prepare(
    `SELECT a.id, a.path, a.batch, a.metadata, COALESCE(r.liked,0) AS liked
     FROM assets a LEFT JOIN ratings r ON a.id = r.assetId
     WHERE a.concept = ? AND a.batch != 'refs'
     ORDER BY r.liked DESC, a.batch, a.filename`).all(cfg.concept)

  const buckets = { mood: [], graphics: [], flats: [], lifestyle: [] }
  for (const r of rows) {
    let m = {}; try { m = r.metadata ? JSON.parse(r.metadata) : {} } catch { m = {} }
    const tags = Array.isArray(m.tags) ? m.tags : []
    buckets[stageOf(r.batch, tags)].push({ path: r.path, caption: m.caption || m.promptLabel || '', tags, prompt: m.prompt || '' })
  }

  const dir = join(OUT, slug)
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })

  const stages = []
  for (const st of STAGES) {
    const picks = buckets[st.key].slice(0, CAP[st.key]).filter(p => existsSync(p.path))
    if (!picks.length) continue
    mkdirSync(join(dir, st.key), { recursive: true })
    const images = []
    picks.forEach((p, i) => {
      const file = `${st.key}/${String(i + 1).padStart(2, '0')}.jpg`
      try {
        execFileSync('sips', ['-s', 'format', 'jpeg', '-Z', '1400', p.path, '--out', join(dir, file)], { stdio: 'ignore' })
        images.push({ file, caption: p.caption, tags: p.tags.slice(0, 8), prompt: p.prompt })
      } catch { /* skip unreadable */ }
    })
    if (images.length) stages.push({ key: st.key, title: st.title, blurb: st.blurb, images })
  }

  writeFileSync(join(dir, 'manifest.json'), JSON.stringify({ slug, name: cfg.name, blurb: cfg.blurb, stages }, null, 0))
  const total = stages.reduce((n, s) => n + s.images.length, 0)
  index.push({ slug, name: cfg.name, blurb: cfg.blurb, count: total, cover: stages[0]?.images[0]?.file ? `${slug}/${stages[0].images[0].file}` : null })
  console.log(`✓ ${slug}: ${total} images across ${stages.length} stages [${stages.map(s => `${s.key}:${s.images.length}`).join(', ')}]`)
}

mkdirSync(OUT, { recursive: true })
writeFileSync(join(OUT, 'index.json'), JSON.stringify(index, null, 0))
console.log(`done → ${OUT}`)
