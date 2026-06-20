// Stage curated highlight-reel images from docs/ (gitignored Rafiki runs +
// presentation assets) into public/highlight-reel/ so Vite can serve them.
// Copies real bytes (sources are gitignored — a symlink would dangle elsewhere).
// Re-runnable + idempotent. Fails loudly if any source is missing.
//
//   node scripts/stage-reel-assets.mjs   (or: npm run stage:reel)

import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CLUBS = 'docs/design/prompts/clubs'
const PRES = 'docs/presentation/assets'
const OUT = 'public/highlight-reel'

// Curated picks (v2/v3 runs, per each club's rafiki/STARRED.md). Swoosh-free:
// the China Creek "two locals" shot is intentionally excluded (trademark).
const MANIFEST = [
  // ── Nardwuar FC ── flats run-151152, graphics run-151049
  [`${CLUBS}/nardwuar-fc/rafiki/images/run-20260620-151152/01-home-hero-full-front-flat.png`, 'nardwuar-01-home-front.png'],
  [`${CLUBS}/nardwuar-fc/rafiki/images/run-20260620-151152/02-home-hero-full-back-flat.png`, 'nardwuar-02-home-back.png'],
  [`${CLUBS}/nardwuar-fc/rafiki/images/run-20260620-151049/04-collage-crest-host-city-shield.png`, 'nardwuar-03-crest.png'],
  [`${CLUBS}/nardwuar-fc/rafiki/images/run-20260620-151049/06-who-benefits-who-pays-sponsor-bar.png`, 'nardwuar-04-who-benefits-bar.png'],
  [`${CLUBS}/nardwuar-fc/rafiki/images/run-20260620-151049/08-fair-play-badge-spoof.png`, 'nardwuar-05-fair-play-badge.png'],
  [`${CLUBS}/nardwuar-fc/rafiki/images/run-20260620-151049/09-ransom-note-nameplate.png`, 'nardwuar-06-nameplate.png'],
  [`${CLUBS}/nardwuar-fc/rafiki/images/run-20260620-151152/10-complete-home-kit-flat-lay.png`, 'nardwuar-07-complete-kit.png'],

  // ── Number Five Orange ── flats run-142025, graphics run-141856
  [`${CLUBS}/number-five-orange/rafiki/images/run-20260620-142025/01-away-hero-full-front-flat.png`, 'n5-01-away-front.png'],
  [`${CLUBS}/number-five-orange/rafiki/images/run-20260620-142025/02-away-hero-full-back-flat.png`, 'n5-02-away-back.png'],
  [`${CLUBS}/number-five-orange/rafiki/images/run-20260620-142025/09-number-close-up-the-reveal.png`, 'n5-03-number-reveal.png'],
  [`${CLUBS}/number-five-orange/rafiki/images/run-20260620-142025/10-complete-away-kit-flat-lay.png`, 'n5-04-complete-kit.png'],
  [`${CLUBS}/number-five-orange/rafiki/images/run-20260620-141856/04-marquee-crest-host-city-shield.png`, 'n5-05-crest.png'],
  [`${CLUBS}/number-five-orange/rafiki/images/run-20260620-141856/06-work-is-work-sponsor-bar.png`, 'n5-06-work-is-work-bar.png'],
  [`${CLUBS}/number-five-orange/rafiki/images/run-20260620-141856/13-scathing-tagline-bank-sponsor-board-copy.png`, 'n5-07-scathing-tagline.png'],

  // ── China Creek ── flats run-151848, lookbook run-151940, graphics run-152006
  [`${CLUBS}/china-creek/rafiki/images/run-20260620-151848/02-front-flat-caution-yellow-colorway-hero.png`, 'china-creek-01-yellow-front.png'],
  [`${CLUBS}/china-creek/rafiki/images/run-20260620-151848/01-front-flat-concrete-colorway-hero.png`, 'china-creek-02-concrete-front.png'],
  [`${CLUBS}/china-creek/rafiki/images/run-20260620-151848/03-back-flat-number-79.png`, 'china-creek-03-back-79.png'],
  [`${CLUBS}/china-creek/rafiki/images/run-20260620-151848/05-complete-kit.png`, 'china-creek-04-complete-kit.png'],
  [`${CLUBS}/china-creek/rafiki/images/run-20260620-151940/02-back-of-player-at-the-bowl.png`, 'china-creek-05-lookbook-bowl.png'],
  [`${CLUBS}/china-creek/rafiki/images/run-20260620-152006/01-hero-all-over-pattern-tile.png`, 'china-creek-06-pattern-tile.png'],
  [`${CLUBS}/china-creek/rafiki/images/run-20260620-152006/02-crest-bowl-and-coping-shield.png`, 'china-creek-07-crest.png'],
  [`${CLUBS}/china-creek/rafiki/images/run-20260620-152006/07-number-79.png`, 'china-creek-08-number-79.png'],

  // ── Atmosphere / texture (swoosh-free presentation assets) ──
  [`${PRES}/mood-banknote.png`, 'atmo-01-banknote.png'],
  [`${PRES}/mood-neon.png`, 'atmo-02-neon.png'],
  [`${PRES}/crest.png`, 'atmo-03-crest.png'],
]

mkdirSync(join(ROOT, OUT, 'audio'), { recursive: true })

const missing = []
let copied = 0
for (const [from, to] of MANIFEST) {
  const src = join(ROOT, from)
  if (!existsSync(src)) {
    missing.push(from)
    continue
  }
  copyFileSync(src, join(ROOT, OUT, to))
  copied++
}

console.log(`stage-reel: copied ${copied}/${MANIFEST.length} → ${OUT}/`)
if (missing.length) {
  console.error(`stage-reel: MISSING ${missing.length} source(s):`)
  for (const m of missing) console.error(`  - ${m}`)
  process.exit(1)
}
