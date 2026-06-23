// THE RECEIPTS, WORN — the single kit gateway (merges the old HeroKits + Clubs sections).
// All seven MADE ON concepts in one grid; each card is a doorway with a real interaction:
// the code-drawn flat crossfades into the real kit (or flips front/back), then links to its
// world or making-of. Data: src/data/kitGateway.js. CSS: KitGateway.css.

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { kitGateway, flatSpecById } from '../data/kitGateway.js'
import { Jersey } from './KitFlat.jsx'
import SafeImage from './SafeImage.jsx'
import Crest from './Crest.jsx'
import './KitGateway.css'

// ── colour safety: keep header/name/CTA readable on any colorway ────────────────
const hexToRgb = (h) => {
  let s = (h || '#000').replace('#', '')
  if (s.length === 3) s = s.split('').map((c) => c + c).join('')
  const n = parseInt(s, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const lum = (h) =>
  hexToRgb(h)
    .map((v) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4 })
    .reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0)
const readableOn = (h) => (lum(h) > 0.45 ? '#1a1410' : '#f4f1ea')
const inkSafe = (h) => (lum(h) > 0.6 ? '#1a1410' : h) // too light to read on bone → ink

// ── reveal-on-scroll (adds .in to .kit-reveal) ──────────────────────────────────
function useReveal() {
  const root = useRef(null)
  useEffect(() => {
    const els = root.current?.querySelectorAll('.kit-reveal') ?? []
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.18 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return root
}

const HINT = { crossfade: '⇄ see it real', flip: '⇄ front · back', schematic: '⇄ the mood' }

function Stage({ entry, flipped, onToggle }) {
  const glow = `${entry.palette.primary}33`
  const ring = inkSafe(entry.palette.primary)

  // Memorial: a single quiet layer, no flip, no speculative jersey render.
  if (entry.tier === 'memorial') {
    return (
      <div className="kit-stage" style={{ '--glow': glow, cursor: 'default' }} aria-hidden="true">
        <div className="kit-layer kit-layer--render">
          <SafeImage src={entry.memorialImage} alt="" loading="lazy" />
        </div>
        <div className="kit-layer" style={{ pointerEvents: 'none' }}>
          <Crest
            palette={{ base: entry.palette.primary, ink: entry.palette.headerInk, accent: entry.palette.accent, signal: entry.palette.accent }}
            number={entry.number}
          />
        </div>
      </div>
    )
  }

  const flat = entry.flatId ? flatSpecById[entry.flatId] : null
  const layerA =
    entry.tier === 'flip' ? (
      <SafeImage src={entry.render.front} alt={`${entry.name} front`} loading="lazy" />
    ) : (
      <Jersey kit={flat} side="front" draw />
    )
  const layerB = (
    <SafeImage
      src={entry.tier === 'flip' ? entry.render.back : entry.render.front}
      alt={`${entry.name} ${entry.tier === 'flip' ? 'back' : 'kit'}`}
      loading="lazy"
    />
  )

  return (
    <button
      type="button"
      className={'kit-stage' + (flipped ? ' is-flipped' : '')}
      style={{ '--glow': glow, '--ring': ring }}
      onClick={onToggle}
      aria-pressed={flipped}
      aria-label={`${entry.name}: toggle ${entry.tier === 'flip' ? 'front and back' : 'flat and kit'}`}
    >
      <div className={'kit-layer kit-layer--a' + (entry.tier === 'flip' ? ' kit-layer--render' : '')}>{layerA}</div>
      <div className="kit-layer kit-layer--b kit-layer--render">{layerB}</div>
      <span className="kit-hint">{HINT[entry.tier]}</span>
    </button>
  )
}

function KitCard({ entry, index }) {
  const [flipped, setFlipped] = useState(false)
  const { primary, headerInk, accent } = entry.palette
  const accentSafe = inkSafe(primary)

  return (
    <article
      className="kit-reveal group flex flex-col overflow-hidden border border-ink/15 bg-bone shadow-sm"
      style={{ transitionDelay: `${index * 90}ms`, borderTopWidth: '3px', borderTopColor: primary }}
    >
      {/* header bar */}
      <div
        className="flex items-center justify-between px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ background: primary, color: readableOn(primary) }}
      >
        <span>№ {entry.number}</span>
        <span>{entry.kitName}</span>
      </div>

      <Stage entry={entry} flipped={flipped} onToggle={() => setFlipped((f) => !f)} />

      <div className="flex flex-1 flex-col p-5">
        {entry.award && (
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: accentSafe }}>
            {entry.award}
          </p>
        )}
        <h3 className="headline text-2xl leading-tight text-ink">{entry.name}</h3>
        <p className="mt-1 text-sm italic text-ink/70">"{entry.line}"</p>

        {/* the receipt — cited, like a printed slip */}
        <div className="mt-4 border-l-2 pl-3" style={{ borderColor: accent }}>
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/40">The receipt</p>
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-ink/85">{entry.receipt.text}</p>
          {entry.receipt.source && (
            <p className="mt-1 font-mono text-[10px] text-cyan">{entry.receipt.source}</p>
          )}
        </div>

        {/* one CTA */}
        <Link
          to={entry.destination}
          className="mt-auto flex items-center justify-between border-t border-ink/10 pt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
          style={{ color: accentSafe }}
        >
          <span>{entry.cta}</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  )
}

export default function KitGateway() {
  const root = useReveal()
  return (
    <section id="hero-kits" ref={root} className="scroll-mt-20 px-4 py-6 md:px-6 md:py-8">
      <div className="sheet mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan">Seven kits · seven receipts</p>
          <h2 className="headline mt-2 text-3xl text-ink md:text-5xl">THE RECEIPTS, WORN</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            Each kit is a receipt you can wear, drawn from the same public-record data that fills the tech
            pack. Hover or tap a card to watch the schematic resolve into the kit, then step into its world.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {kitGateway.map((entry, i) => (
            <KitCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-ink/30">
          No Game Without the Ground
        </p>
      </div>
    </section>
  )
}
