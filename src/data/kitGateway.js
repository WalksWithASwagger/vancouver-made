// The unified kit gateway — one ordered list of all seven MADE ON concepts, composed
// from clubs.js (the five worlds) + heroKits.js (the code-drawn hero kits). This file adds
// only what the gateway needs on top of the existing data: a destination, a visual TIER,
// the render image(s), and a short "receipt". It does not restate concept copy — name,
// number, kit name, tagline and palette are pulled from the source objects.
//
// Tiers (how each card's two visual layers behave):
//   crossfade — code-drawn flat (A) ⇄ photoreal render (B). The signature. Needs both.
//   flip      — front render (A) ⇄ back render (B). Worlds with full photo ranges.
//   schematic — code-drawn flat (A) ⇄ making-of mood frame (B). No product render exists.
//   memorial  — abstract hero only, no flip, no speculative jersey (Hogan's ethics gate).
import { clubs } from './clubs.js'
import { heroKits } from './heroKits.js'

const club = (id) => clubs.find((c) => c.id === id)
const hero = (id) => heroKits.find((k) => k.id === id)

// Normalize a card palette from either source shape.
const fromClub = (c) => ({ primary: c.palette.base, accent: c.palette.signal ?? c.palette.accent, headerInk: c.palette.ink ?? '#0a0a0a' })
const fromHero = (k) => ({ primary: k.colorway.primary, accent: k.colorway.accent, headerInk: k.colorway.body })

// Each entry: { id, name, number, kitName, line, palette, receipt:{text,source},
//   destination, cta, tier, render:{front,back?}, flatId?, memorialImage? }
export const kitGateway = [
  (() => { const c = club('nardwuar-fc'); return {
    id: c.id, name: c.name, number: c.number, kitName: c.kitName, line: c.tagline,
    palette: fromClub(c), receipt: receiptFromClub(c),
    destination: `/kit/${c.id}`, cta: 'Enter the world', tier: 'flip',
    render: { front: '/gallery/nw-front.jpg', back: '/gallery/nw-back.jpg' },
    award: '🥈 The winning kit',
  } })(),

  (() => { const c = club('china-creek'); return {
    id: c.id, name: c.name, number: c.number, kitName: c.kitName, line: c.tagline,
    palette: fromClub(c), receipt: receiptFromClub(c),
    destination: `/kit/${c.id}`, cta: 'Enter the world', tier: 'flip',
    render: { front: '/gallery/cc-front.jpg', back: '/store/jersey-china-creek-away.png' },
  } })(),

  (() => { const c = club('pump-and-dump-fc'); const k = hero('pump-and-dump'); return {
    id: c.id, name: c.name, number: c.number, kitName: c.kitName, line: c.tagline,
    palette: fromHero(k), receipt: { text: k.hemCitation.text, source: k.hemCitation.source },
    destination: `/kit/${c.id}`, cta: 'Enter the world', tier: 'crossfade',
    flatId: k.id, render: { front: '/gallery/pd-front.jpg', back: '/gallery/pd-back.jpg' },
  } })(),

  (() => { const c = club('number-five-orange'); return {
    id: c.id, name: c.name, number: c.number, kitName: c.kitName, line: c.tagline,
    palette: fromClub(c), receipt: receiptFromClub(c),
    destination: `/kit/${c.id}`, cta: 'Enter the world', tier: 'flip',
    render: { front: '/gallery/n5-home.jpg', back: '/gallery/n5-away.jpg' },
  } })(),

  (() => { const c = club('hogans-alley-fc'); return {
    id: c.id, name: c.name, number: c.number, kitName: c.kitName, line: c.tagline,
    palette: fromClub(c),
    receipt: { text: 'Razed for the Georgia Viaduct, 1970. The block is returning as a community land trust, 2022.', source: "BC Black History Awareness Society · City of Vancouver · Hogan's Alley Society" },
    destination: `/kit/${c.id}`, cta: 'Enter the world', tier: 'memorial',
    memorialImage: '/kit/hogans-alley/hero.jpg',
  } })(),

  (() => { const k = hero('public-dime'); return {
    id: k.id, name: k.name, number: k.no, kitName: k.styleNo, line: k.theLine,
    palette: fromHero(k), receipt: { text: k.hemCitation.text, source: k.hemCitation.source },
    destination: `/making-of/${k.id}`, cta: 'See the making-of', tier: 'schematic',
    flatId: k.id, render: { front: '/making-of/public-dime/mood/01.jpg' },
  } })(),

  (() => { const k = hero('made-on-silence'); return {
    id: k.id, name: k.name, number: k.no, kitName: k.styleNo, line: k.theLine,
    palette: fromHero(k), receipt: { text: k.hemCitation.text, source: k.hemCitation.source },
    destination: `/making-of/${k.id}`, cta: 'See the making-of', tier: 'crossfade',
    flatId: k.id, render: { front: '/gallery/ms-redaction.jpg' },
  } })(),
]

// Compact receipt from a club's first cited source card (clamped for the card).
function receiptFromClub(c) {
  const card = c.sourceCards?.[0]
  if (!card) return { text: c.summary?.slice(0, 150) ?? '', source: '' }
  const text = card.claim.length > 160 ? card.claim.slice(0, 159).trimEnd() + '…' : card.claim
  return { text, source: card.source ?? '' }
}

// Hero-kit specs (for the code-drawn flat) keyed by flatId, so the gateway can hand a
// flat-capable concept straight to <KitFlat kit={...} />.
export const flatSpecById = Object.fromEntries(heroKits.map((k) => [k.id, k]))
