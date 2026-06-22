import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import SafeImage from './SafeImage.jsx'

// Compact drop teaser — woven into the pitch site + process page.
// Cards link through to /store. On hover: image scales, tint bar shifts opacity.
// Mirrors the elevated card language now used in Store.jsx.

const FEATURED = [
  'jersey-nardwuar-home',
  'patch-deep-research',
  'jersey-five-orange-home',
  'print-who-benefits',
  'sticker-ransom-nameplate',
  'patch-collage-crest',
  'jersey-pump-and-dump',
  'sticker-interview-your-city',
  'print-work-is-work',
  'patch-trophy-mark',
]

// Status micro-badge — minimal, mono, consistent with Store's Cta atom
function StatusBadge({ status }) {
  if (status === 'lookbook') {
    return (
      <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/30">
        Lookbook
      </span>
    )
  }
  if (status === 'blessing-pending') {
    return (
      <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-gold/60">
        ✦ Pending
      </span>
    )
  }
  return (
    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-hazard/80">
      Pre-order
    </span>
  )
}

function StripCard({ p }) {
  return (
    <Link
      to="/store"
      className="group flex flex-col overflow-hidden border border-ink/12 bg-bone transition-all duration-250 hover:-translate-y-px hover:border-ink/28 hover:shadow-[0_6px_20px_rgba(26,20,16,0.09)] focus-visible:ring-2 focus-visible:ring-hazard focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
      title={p.title}
    >
      {/* tint bar — consistent with Store cards */}
      <div
        className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em] opacity-90 transition-opacity group-hover:opacity-100"
        style={{ background: p.tint.bar, color: p.tint.ink }}
      >
        {p.category}
      </div>

      {/* product art */}
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-bone p-2.5">
        <SafeImage
          src={p.image}
          alt={p.title}
          fallbackText={p.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-400 group-hover:scale-[1.05]"
        />
      </div>

      {/* meta row */}
      <div className="flex flex-col gap-0.5 px-2.5 py-2">
        <span className="truncate text-[11px] font-bold leading-snug text-ink/85">
          {p.title}
        </span>
        <div className="flex items-center justify-between gap-1">
          <StatusBadge status={p.status} />
          {p.price != null && (
            <span className="shrink-0 font-mono text-[10px] text-ink/50">${p.price}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function ProductStrip({ heading = 'THE STORE', count = 10 }) {
  const byId = Object.fromEntries(products.map((p) => [p.id, p]))
  const picked = FEATURED.map((id) => byId[id]).filter(Boolean)
  const items = (picked.length ? picked : products).slice(0, count)

  return (
    <section className="px-4 py-6 md:px-6 md:py-8">
      <div className="sheet relative mx-auto max-w-6xl py-14 md:py-20">
      {/* left tartan rule — mirrors Store hero accent */}
      <div className="tartan absolute bottom-0 left-0 top-0 w-[5px]" aria-hidden="true" />

      <div className="px-8 md:pl-14">
        {/* header row */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan">
              {heading} · MADE ON
            </p>
            <h2 className="headline mt-2 text-3xl text-ink md:text-5xl">
              THE <span className="text-hazard">RECEIPT</span>, WORN
            </h2>
            <p className="mt-2 max-w-sm font-mono text-[10px] leading-relaxed text-ink/40">
              {products.length} pieces · preview drop · pre-orders open with the release
            </p>
          </div>
          <Link
            to="/store"
            className="shrink-0 border border-hazard/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition hover:bg-hazard hover:text-bone focus-visible:ring-2 focus-visible:ring-hazard focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
          >
            Shop all {products.length} →
          </Link>
        </div>

        {/* card grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
          {items.map((p) => (
            <StripCard key={p.id} p={p} />
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
