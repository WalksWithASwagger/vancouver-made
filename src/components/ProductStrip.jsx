import { Link } from 'react-router-dom'
import { products } from '../data/products.js'

// Compact, reusable store teaser — woven into the pitch site + process page so the
// store isn't a siloed tab. Cards link through to /store. Curated featured order;
// falls back to the first N products if an id is missing.
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

export default function ProductStrip({ heading = 'THE STORE', count = 10 }) {
  const byId = Object.fromEntries(products.map((p) => [p.id, p]))
  const picked = FEATURED.map((id) => byId[id]).filter(Boolean)
  const items = (picked.length ? picked : products).slice(0, count)

  return (
    <section className="border-y border-ink/10 bg-bone py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan">
              {heading} · MADE ON
            </p>
            <h2 className="headline mt-2 text-3xl text-ink md:text-5xl">
              THE <span className="text-hazard">RECEIPT</span>, WORN
            </h2>
          </div>
          <Link
            to="/store"
            className="shrink-0 border border-hazard/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-hazard hover:text-ink"
          >
            Shop all {products.length} →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {items.map((p) => (
            <Link
              key={p.id}
              to="/store"
              className="group flex flex-col overflow-hidden border border-ink/15 bg-bone transition hover:border-ink/40"
              title={p.title}
            >
              <div className="flex aspect-square items-center justify-center bg-bone p-2">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-2 py-1.5">
                <span className="truncate text-[11px] text-ink/80">{p.title}</span>
                {p.price != null && (
                  <span className="shrink-0 font-mono text-[11px] text-ink/50">${p.price}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
