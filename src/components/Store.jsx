import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/products.js'

function Price({ value, currency }) {
  return (
    <span className="font-mono">
      ${value} <span className="text-[10px] opacity-70">{currency}</span>
    </span>
  )
}

function Cta({ status }) {
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
      className="bg-hazard px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition hover:opacity-80"
      title="Pre-orders open with the drop — checkout isn't live yet"
    >
      Pre-order →
    </button>
  )
}

function ProductCard({ p }) {
  const [imgError, setImgError] = useState(false)
  return (
    <article className="flex flex-col overflow-hidden border border-bone/15 bg-ink">
      <div
        className="flex items-center justify-between px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ background: p.tint.bar, color: p.tint.ink }}
      >
        <span>{p.category}</span>
        <span><Price value={p.price} currency={p.currency} /></span>
      </div>

      {/* product art — flats/graphics ride on a paper-cream panel */}
      <div className="flex aspect-[4/3] items-center justify-center bg-bone p-4">
        {imgError ? (
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink/40">
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

      <div className="flex flex-1 flex-col p-5">
        <h3 className="headline text-lg leading-tight text-bone">{p.title}</h3>
        <p className="mt-1 text-sm italic text-bone/80">“{p.blurb}”</p>
        <p className="mt-3 text-sm leading-relaxed text-bone/70">{p.description}</p>

        {p.sizes && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.sizes.map((s) => (
              <span
                key={s}
                className="border border-bone/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-bone/60"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {p.ethicsNote && (
          <p className="mt-4 border-l-2 border-gold pl-3 font-mono text-[11px] leading-relaxed text-gold/90">
            {p.ethicsNote}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between pt-2">
          <span className="text-lg text-bone">
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
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
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
            <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
              <div className="mb-8">
                <h2 className="headline text-2xl text-bone md:text-3xl">{cat.label}</h2>
                <p className="mt-1 text-sm text-bone/55">{cat.blurb}</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
