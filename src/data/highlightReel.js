// MADE ON — highlight-reel beat sheet. Single source of truth for HighlightReel.jsx.
// Full-hype cut: today's ALLEY LEAGUE club gens (Nardwuar / Number Five Orange /
// China Creek) + flagships 03 Public Dime & 09 Pump and Dump. Memorial kits 02/04/07
// are intentionally out (see docs/design/prompts/README.md sensitivity notes).
//
// Images are staged into /public/highlight-reel/ by scripts/stage-reel-assets.mjs.
// Flagship beats render the live KitFlat SVG (kind:'kitflat') — never the swooshed PNGs.

import { slogans } from '../brand/tokens.js'

const IMG = '/highlight-reel'

// Per-segment palettes (clubs.js / heroKits.js colorways, plus the brand spine).
const P = {
  brand: { base: '#0a0a0a', ink: '#050505', accent: '#ff3b00', signal: '#d9a521' },
  nardwuar: { base: '#c8102e', ink: '#0a0a0a', accent: '#1d7a46', signal: '#e8c531' },
  n5: { base: '#ff6a00', ink: '#0a0a0a', accent: '#d9a521', signal: '#ff2d6f' },
  chinaCreek: { base: '#5b6770', ink: '#0a0a0a', accent: '#f2c200', signal: '#cdbfa6' },
  publicDime: { base: '#1B4D3E', ink: '#0E0E0E', accent: '#B8924A', signal: '#EDE6D8' },
  pumpDump: { base: '#0b1437', ink: '#050608', accent: '#21f0d0', signal: '#ff2bd6' },
}

export const beats = [
  // ── Cold open ──
  {
    id: 'open',
    kind: 'title',
    eyebrow: 'VANCOUVER MADE · UNOFFICIAL KIT DROP · 26',
    title: 'ALLEY LEAGUE',
    line: 'Most kits turn a city into a logo. These turn it into evidence.',
    slogan: 'NO GAME WITHOUT THE GROUND',
    palette: P.brand,
    motion: 'punch',
    ms: 3600,
  },

  // ── Nardwuar FC (No.97 · HOME) ──
  {
    id: 'nardwuar-front',
    kind: 'image',
    image: `${IMG}/nardwuar-01-home-front.png`,
    eyebrow: 'NARDWUAR FC · No.97 · HOME',
    title: 'NARDWUAR FC',
    line: "Do the research. Then ask power the question it's dodging.",
    palette: P.nardwuar,
    motion: 'kenburns-in',
    ms: 5000,
  },
  {
    id: 'nardwuar-back',
    kind: 'image',
    image: `${IMG}/nardwuar-02-home-back.png`,
    eyebrow: 'THE WALKING ARCHIVE',
    receipt: 'INTERVIEW YOUR CITY LIKE NARDWUAR',
    palette: P.nardwuar,
    motion: 'kenburns-pan',
    ms: 3900,
  },
  {
    id: 'nardwuar-bar',
    kind: 'image',
    image: `${IMG}/nardwuar-04-who-benefits-bar.png`,
    eyebrow: 'SPONSOR BOARD',
    receipt: 'WHO BENEFITS?  WHO PAYS?',
    palette: P.nardwuar,
    motion: 'kenburns-in',
    ms: 3600,
  },
  {
    id: 'nardwuar-nameplate',
    kind: 'image',
    image: `${IMG}/nardwuar-06-nameplate.png`,
    eyebrow: 'RANSOM-NOTE NAMEPLATE',
    receipt: 'RESEARCH IS THE PROTEST · THE RECEIPT IS THE WEAPON',
    palette: P.nardwuar,
    motion: 'kenburns-pan',
    ms: 3500,
  },

  // ── Number Five Orange (No.5 · AWAY) ──
  {
    id: 'n5-front',
    kind: 'image',
    image: `${IMG}/n5-01-away-front.png`,
    eyebrow: 'NUMBER FIVE ORANGE · No.5 · AWAY',
    title: 'NUMBER FIVE ORANGE',
    line: 'The whole city becomes a VIP room.',
    palette: P.n5,
    motion: 'kenburns-in',
    ms: 5000,
  },
  {
    id: 'n5-back',
    kind: 'image',
    image: `${IMG}/n5-02-away-back.png`,
    eyebrow: 'WORK IS WORK',
    receipt: 'COVER CHARGE AT THE DOOR OF YOUR OWN CITY',
    palette: P.n5,
    motion: 'kenburns-pan',
    ms: 3900,
  },
  {
    id: 'n5-bar',
    kind: 'image',
    image: `${IMG}/n5-06-work-is-work-bar.png`,
    eyebrow: 'SPONSOR BOARD',
    receipt: 'PUBLIC LAND / PRIVATE PROFIT',
    palette: P.n5,
    motion: 'kenburns-in',
    ms: 3500,
  },
  {
    id: 'n5-tagline',
    kind: 'image',
    image: `${IMG}/n5-07-scathing-tagline.png`,
    eyebrow: 'THE TAGLINE BANK',
    receipt: 'WORLD-CLASS NIGHTLIFE · WORKING-CLASS WAGES',
    palette: P.n5,
    motion: 'kenburns-pan',
    ms: 4000,
  },

  // ── China Creek (No.79 · HOME) ──
  {
    id: 'cc-front',
    kind: 'image',
    image: `${IMG}/china-creek-01-yellow-front.png`,
    eyebrow: 'CHINA CREEK · No.79 · HOME',
    title: 'CHINA CREEK',
    line: 'Built by use, not permission.',
    palette: P.chinaCreek,
    motion: 'kenburns-in',
    ms: 5000,
  },
  {
    id: 'cc-lookbook',
    kind: 'image',
    image: `${IMG}/china-creek-05-lookbook-bowl.png`,
    eyebrow: 'WORN AT THE BOWL',
    receipt: 'THE BYLAW SAID NO; THE BOWL SAID OTHERWISE',
    palette: P.chinaCreek,
    motion: 'kenburns-pan',
    ms: 4400,
  },
  {
    id: 'cc-back',
    kind: 'image',
    image: `${IMG}/china-creek-03-back-79.png`,
    eyebrow: 'CHINA CREEK BOWLS · 1979',
    receipt: 'PUBLIC SPACE IS MADE, NOT GRANTED',
    palette: P.chinaCreek,
    motion: 'kenburns-in',
    ms: 3600,
  },

  // ── Flagship 03 — Made on the Public Dime (live KitFlat) ──
  {
    id: 'public-dime',
    kind: 'kitflat',
    kitId: 'public-dime',
    texture: `${IMG}/atmo-01-banknote.png`,
    eyebrow: '03 · MADE ON: FLAGSHIP',
    title: 'THE PUBLIC DIME',
    line: '$729M as couture.',
    receipt: 'SECURITY $242M · NET TO BC TAXPAYER UP TO $114M · YOU DIDN\'T',
    palette: P.publicDime,
    motion: 'fade',
    ms: 6000,
  },

  // ── Flagship 09 — Pump and Dump (live KitFlat) ──
  {
    id: 'pump-and-dump',
    kind: 'kitflat',
    kitId: 'pump-and-dump',
    texture: `${IMG}/atmo-02-neon.png`,
    eyebrow: '09 · STREET SERIES: FLAGSHIP',
    title: 'PUMP AND DUMP',
    line: 'Worn as the prospectus.',
    receipt: 'UNSOLD CONDOS ~4,400 (CMHC 2026) · PRICE-TO-INCOME ~12×',
    palette: P.pumpDump,
    motion: 'fade',
    ms: 6000,
  },

  // ── Slogan montage ──
  {
    id: 'slogans',
    kind: 'slogans',
    slogans,
    palette: P.brand,
    motion: 'punch',
    ms: 5000,
  },

  // ── Outro ──
  {
    id: 'outro',
    kind: 'outro',
    title: 'WE MADE THE RECEIPT',
    line: 'Everyone else made a souvenir.',
    eyebrow: 'KRIS KRÜG · SETTLER ARTIST',
    receipt: 'unceded xʷməθkʷəy̓əm · Sḵwx̱wú7mesh · səlilwətaɬ',
    credit: '♫ "NO GAME WITHOUT THE GROUND": original MADE ON anthem',
    palette: P.brand,
    motion: 'punch',
    ms: 5500,
  },
]

export default beats
