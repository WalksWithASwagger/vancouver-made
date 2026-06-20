import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/products.js'

function Price({ value, currency }) {
  if (value == null) return null
  return (
    <span className="font-mono">
      ${value} <span className="text-[10px] opacity-70">{currency}</span>
    </span>
  )
}

function Cta({ status }) {
  if (status === 'lookbook') {
    return (
      <span className="text-[11px] font-bold uppercase tracking-wider text-bone/40">
        Lookbook
      </span>
    )
  }
  if (status === 'blessing-pending') {
    return (
      <button
        type="button"
        disabled
        className="cursor-not-allowed border border-bone/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-bone/40"
      >
        Blessing pending
      </button>
    )
  }
  return (
    <button
      type="button"
      className="bg-hazard px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink transition hover:opacity-80"
      title="Pre-orders open with the drop — checkout isn't live yet"
    >
      Pre-order →
    </button>
  )
}

function ProductCard({ p }) {
  const [imgError, setImgError] = useState(false)
  return (
    <article
      className="flex flex-col overflow-hidden border border-bone/15 bg-ink"
      title={p.description || p.blurb}
    >
      <div
        className="flex items-center justify-between px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em]"
        style={{ background: p.tint.bar, color: p.tint.ink }}
      >
        <span className="truncate">{p.category}</span>
        {p.ethicsNote && <span title={p.ethicsNote}>✦</span>}
      </div>

      {/* product art — flats/graphics ride on a paper-cream panel */}
      <div className="flex aspect-square items-center justify-center bg-bone p-2">
        {imgError ? (
          <span className="px-2 text-center font-mono text-[10px] uppercase tracking-wider text-ink/40">
            {p.title}
          </span>
        ) : (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="max-h-full max-w-full object-contain"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="headline text-sm leading-tight text-bone">{p.title}</h3>
        {p.blurb && (
          <p className="line-clamp-2 text-[11px] italic leading-snug text-bone/55">“{p.blurb}”</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="text-sm text-bone">
            <Price value={p.price} currency={p.currency} />
          </span>
          <Cta status={p.status} />
        </div>
      </div>
    </article>
  )
}

export default function Store() {
  const [filter, setFilter] = useState('all')

  const shownCategories = useMemo(
    () => (filter === 'all' ? categories : categories.filter((c) => c.key === filter)),
    [filter],
  )

  return (
    <div className="grain min-h-screen bg-ink text-bone">
      {/* HEADER */}
      <section className="border-b border-bone/10">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan">
            The store · MADE ON
          </p>
          <h1 className="headline mt-2 text-4xl text-bone md:text-6xl">
            THE <span className="text-hazard">RECEIPT</span>, WORN
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-bone/70">
            Everyone else made a souvenir. The drop you can actually wear: patches, stickers,
            prints and kits pulled from the same artwork that fills the tech pack. Mimic the
            polish, invert the payload, bake in the receipt.
          </p>
          <p className="mt-3 max-w-2xl font-mono text-[11px] leading-relaxed text-bone/45">
            Preview drop — checkout isn’t live yet. Pre-orders open with the release. Pieces marked{' '}
            <span className="text-gold">blessing pending</span> are homages to living people and
            won’t be sold until that blessing is given.
          </p>

          {/* FILTER */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className="border px-4 py-2 text-xs font-bold uppercase tracking-wider transition"
              style={
                filter === 'all'
                  ? { background: '#ff3b00', color: '#0a0a0a', borderColor: '#ff3b00' }
                  : { borderColor: '#ff3b0066', color: '#f4f1ea' }
              }
            >
              All <span className="opacity-50">{products.length}</span>
            </button>
            {categories.map((c) => {
              const count = products.filter((p) => p.category === c.key).length
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setFilter(c.key)}
                  className="border px-4 py-2 text-xs font-bold uppercase tracking-wider transition"
                  style={
                    filter === c.key
                      ? { background: '#ff3b00', color: '#0a0a0a', borderColor: '#ff3b00' }
                      : { borderColor: '#ff3b0066', color: '#f4f1ea' }
                  }
                >
                  {c.label} <span className="opacity-50">{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      {shownCategories.map((cat) => {
        const items = products.filter((p) => p.category === cat.key)
        if (items.length === 0) return null
        return (
          <section key={cat.key} className="border-b border-bone/10">
            <div className="mx-auto max-w-6xl px-6 py-8">
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <h2 className="headline text-2xl text-bone md:text-3xl">{cat.label}</h2>
                <p className="hidden text-sm text-bone/55 sm:block">{cat.blurb}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {items.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <footer className="border-t border-bone/10 px-6 py-10 text-center text-xs uppercase tracking-[0.3em] text-bone/40">
        <div className="mb-4 flex flex-wrap justify-center gap-6">
          <Link to="/" className="text-bone/60 transition hover:text-bone">
            Pitch Site
          </Link>
          <span className="text-bone/20">·</span>
          <Link to="/hall-of-fame" className="text-bone/60 transition hover:text-bone">
            Hall of Fame
          </Link>
          <span className="text-bone/20">·</span>
          <Link to="/process" className="text-bone/60 transition hover:text-bone">
            Process
          </Link>
          <span className="text-bone/20">·</span>
          <span className="text-bone">Store</span>
        </div>
        Everyone else made a souvenir. We made the receipt — this is the part you can wear.
      </footer>
    </div>
  )
}
