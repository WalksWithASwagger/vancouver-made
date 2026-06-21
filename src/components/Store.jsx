import { useState, useMemo, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/products.js'

// ── Shared lightbox / quick-look ─────────────────────────────────────────────
// Lifted from DirectionPage.jsx pattern — same black/92 backdrop, Esc + arrow nav.
function QuickLook({ product, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!product) return null
  const p = product

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/88 p-4 md:items-center md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick look: ${p.title}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden border border-ink/15 bg-bone shadow-2xl"
      >
        {/* tint bar matching the card header */}
        <div
          className="flex items-center justify-between px-4 py-2 text-[9px] font-bold uppercase tracking-[0.22em]"
          style={{ background: p.tint.bar, color: p.tint.ink }}
        >
          <span>{p.category}</span>
          <span>{p.ethicsNote ? '✦ Ethics note' : 'MADE ON'}</span>
        </div>

        <div className="grid gap-0 md:grid-cols-2">
          {/* image panel */}
          <div className="flex aspect-square items-center justify-center bg-paper p-6">
            <QuickLookImage p={p} />
          </div>

          {/* copy panel */}
          <div className="flex flex-col gap-4 p-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">
                {p.club ?? p.category}
              </p>
              <h2 className="headline mt-1 text-2xl leading-tight text-ink">{p.title}</h2>
            </div>

            {p.blurb && (
              <p className="font-mono text-[11px] italic leading-relaxed text-ink/60">
                "{p.blurb}"
              </p>
            )}

            {p.description && (
              <p className="text-sm leading-relaxed text-ink/80">{p.description}</p>
            )}

            {p.ethicsNote && (
              <div className="border border-gold/40 bg-bone p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  ✦ Ethics note
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">{p.ethicsNote}</p>
              </div>
            )}

            <div className="mt-auto flex items-center justify-between gap-3 pt-2">
              <span className="font-mono text-lg text-ink">
                {p.price != null ? (
                  <>
                    ${p.price}{' '}
                    <span className="text-[11px] font-normal opacity-50">{p.currency}</span>
                  </>
                ) : (
                  <span className="text-sm opacity-40">—</span>
                )}
              </span>
              <QuickLookCta status={p.status} />
            </div>

            {p.sizes && (
              <p className="font-mono text-[10px] text-ink/35">
                Sizes: {p.sizes.join(' · ')}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 transition hover:text-ink"
          aria-label="Close quick look"
        >
          Close ✕
        </button>
      </div>
    </div>
  )
}

function QuickLookImage({ p }) {
  const [err, setErr] = useState(false)
  if (err) {
    return (
      <span className="text-center font-mono text-[11px] uppercase tracking-wider text-ink/35">
        {p.title}
      </span>
    )
  }
  return (
    <img
      src={p.image}
      alt={p.title}
      className="max-h-full max-w-full object-contain"
      onError={() => setErr(true)}
    />
  )
}

function QuickLookCta({ status }) {
  if (status === 'lookbook') {
    return (
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/35">
        Lookbook only
      </span>
    )
  }
  if (status === 'blessing-pending') {
    return (
      <span className="border border-gold/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70">
        Blessing pending
      </span>
    )
  }
  return (
    <button
      type="button"
      className="bg-hazard px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone transition hover:opacity-85"
      title="Pre-orders open with the drop — checkout isn't live yet"
    >
      Pre-order →
    </button>
  )
}

// ── Price atom ────────────────────────────────────────────────────────────────
function Price({ value, currency }) {
  if (value == null) return null
  return (
    <span className="font-mono">
      ${value}{' '}
      <span className="text-[10px] opacity-55">{currency}</span>
    </span>
  )
}

// ── Card CTA ─────────────────────────────────────────────────────────────────
function Cta({ status }) {
  if (status === 'lookbook') {
    return (
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35">
        Lookbook
      </span>
    )
  }
  if (status === 'blessing-pending') {
    return (
      <span className="border border-gold/35 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-gold/65">
        Blessing pending
      </span>
    )
  }
  return (
    <span className="bg-hazard px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-bone">
      Pre-order →
    </span>
  )
}

// ── Product card ─────────────────────────────────────────────────────────────
function ProductCard({ p, onQuickLook }) {
  const [imgError, setImgError] = useState(false)

  return (
    <article
      className="group flex cursor-pointer flex-col overflow-hidden border border-ink/12 bg-bone transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_8px_24px_rgba(26,20,16,0.10)]"
      onClick={() => onQuickLook(p)}
      tabIndex={0}
      role="button"
      aria-label={`Quick look: ${p.title}`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onQuickLook(p)}
    >
      {/* category tint bar */}
      <div
        className="flex items-center justify-between px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em]"
        style={{ background: p.tint.bar, color: p.tint.ink }}
      >
        <span className="truncate">{p.category}</span>
        {p.ethicsNote && <span title={p.ethicsNote}>✦</span>}
      </div>

      {/* product art */}
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-bone p-3">
        {imgError ? (
          <span className="px-2 text-center font-mono text-[10px] uppercase tracking-wider text-ink/35">
            {p.title}
          </span>
        ) : (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.06]"
          />
        )}
        {/* quick-look hover reveal */}
        <div className="absolute inset-0 flex items-end justify-center bg-ink/0 pb-3 opacity-0 transition-all duration-300 group-hover:bg-ink/[0.04] group-hover:opacity-100">
          <span className="border border-ink/20 bg-bone/90 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/70 backdrop-blur-sm">
            Quick look
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="headline text-sm leading-tight text-ink">{p.title}</h3>
        {p.blurb && (
          <p className="line-clamp-2 text-[11px] italic leading-snug text-ink/50">
            "{p.blurb}"
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-sm text-ink">
            <Price value={p.price} currency={p.currency} />
          </span>
          <Cta status={p.status} />
        </div>
      </div>
    </article>
  )
}

// ── Store root ────────────────────────────────────────────────────────────────
export default function Store() {
  const [filter, setFilter] = useState('all')
  const [quickLook, setQuickLook] = useState(null)
  const closeQuickLook = useCallback(() => setQuickLook(null), [])

  const shownCategories = useMemo(
    () => (filter === 'all' ? categories : categories.filter((c) => c.key === filter)),
    [filter],
  )

  const countByCategory = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.key, products.filter((p) => p.category === c.key).length])),
    [],
  )

  return (
    <div className="grain min-h-screen bg-bone text-ink">
      {quickLook && <QuickLook product={quickLook} onClose={closeQuickLook} />}

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-ink/10">
        {/* tartan accent band — left edge rule */}
        <div className="tartan absolute bottom-0 left-0 top-0 w-[6px]" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-8 py-12 md:py-16 md:pl-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan">
            The store · MADE ON
          </p>
          <h1 className="headline mt-3 text-5xl text-ink md:text-7xl">
            THE <span className="text-hazard">RECEIPT</span>, WORN
          </h1>

          <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto]">
            <div className="space-y-3">
              <p className="max-w-xl text-sm leading-relaxed text-ink/75">
                Everyone else made a souvenir. The drop you can actually wear: patches, stickers,
                prints and kits pulled from the same artwork that fills the tech pack. Mimic the
                polish, invert the payload, bake in the receipt.
              </p>
              <p className="max-w-xl font-mono text-[10px] leading-relaxed text-ink/45">
                Preview drop — checkout isn't live yet. Pre-orders open with the release. Pieces
                marked{' '}
                <span className="text-gold">blessing pending</span> are homages to living people
                and won't be sold until that blessing is given.
              </p>
            </div>

            {/* drop counts — editorial sidebar detail */}
            <dl className="hidden shrink-0 space-y-1 border-l border-ink/10 pl-6 md:block">
              <dt className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/35">
                The drop
              </dt>
              {[
                { label: 'Total pieces', value: products.length },
                { label: 'Jerseys', value: countByCategory.jerseys ?? 0 },
                { label: 'Editions', value: categories.length },
              ].map(({ label, value }) => (
                <dd key={label} className="flex items-baseline gap-2">
                  <span className="headline text-2xl text-ink">{value}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/40">
                    {label}
                  </span>
                </dd>
              ))}
            </dl>
          </div>

          {/* ── FILTER PILLS ─────────────────────────────────────────────── */}
          <div className="mt-8 flex flex-wrap gap-1.5">
            {[{ key: 'all', label: 'All', count: products.length }, ...categories.map((c) => ({ key: c.key, label: c.label, count: countByCategory[c.key] }))].map(({ key, label, count }) => {
              const active = filter === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={[
                    'border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-150',
                    active
                      ? 'border-hazard bg-hazard text-bone'
                      : 'border-ink/18 bg-transparent text-ink/65 hover:border-ink/40 hover:text-ink',
                  ].join(' ')}
                >
                  {label}{' '}
                  <span className={active ? 'opacity-70' : 'opacity-40'}>{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* tartan divider — matches DirectionPage SectionDivider */}
      <div className="tartan h-[5px] w-full" aria-hidden="true" />

      {/* ── CATALOG ──────────────────────────────────────────────────────────── */}
      {shownCategories.map((cat) => {
        const items = products.filter((p) => p.category === cat.key)
        if (items.length === 0) return null
        return (
          <section key={cat.key} className="border-b border-ink/8">
            <div className="mx-auto max-w-6xl px-6 py-10">
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <div>
                  <h2 className="headline text-2xl text-ink md:text-3xl">{cat.label}</h2>
                  {cat.blurb && (
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
                      {cat.blurb}
                    </p>
                  )}
                </div>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30">
                  {items.length} {items.length === 1 ? 'piece' : 'pieces'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {items.map((p) => (
                  <ProductCard key={p.id} p={p} onQuickLook={setQuickLook} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-ink/10 px-6 py-12 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/30">
          Vancouver Made · MADE ON · The Store
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em]">
          <Link to="/" className="text-ink/50 transition hover:text-hazard">
            ← Pitch site
          </Link>
          <span className="text-ink/20">·</span>
          <Link to="/hall-of-fame" className="text-ink/50 transition hover:text-ink">
            Hall of Fame
          </Link>
          <span className="text-ink/20">·</span>
          <Link to="/process" className="text-ink/50 transition hover:text-ink">
            Process
          </Link>
          <span className="text-ink/20">·</span>
          <span className="text-ink">Store</span>
        </div>
        <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.25em] text-ink/25">
          Everyone else made a souvenir. We made the receipt — this is the part you can wear.
        </p>
      </footer>
    </div>
  )
}
