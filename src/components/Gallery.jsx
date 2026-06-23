import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { groups } from '../data/gallery.js'
import SafeImage from './SafeImage'

// Flat index so the lightbox can move across the whole shown set with arrow keys.
function flatten(shown) {
  return shown.flatMap((g) => g.items.map((it) => ({ ...it, concept: g.concept })))
}

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null) // index into the flat list, or null

  const shown = filter === 'all' ? groups : groups.filter((g) => g.concept === filter)
  const flat = useMemo(() => flatten(shown), [shown])
  const total = groups.reduce((n, g) => n + g.items.length, 0)

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      else if (e.key === 'ArrowRight') setActive((i) => (i + 1) % flat.length)
      else if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + flat.length) % flat.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, flat.length])

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (active === null) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [active])

  const cur = active === null ? null : flat[active]

  return (
    <div className="grain min-h-screen tartan-canvas text-ink">
      <section className="px-4 py-6 md:px-6 md:py-8">
        <header className="sheet mx-auto max-w-6xl px-6 py-10 md:px-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan">Vancouver Made · MADE ON</p>
          <h1 className="headline text-4xl text-ink md:text-6xl">THE <span className="text-hazard">GALLERY</span></h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/80 md:text-base">
            The strongest of the generations, rated down from hundreds to these. The kits, the
            crests, the sponsor boards, the textures. Click any frame to enlarge.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em]">
            <button
              onClick={() => setFilter('all')}
              className={'inline-flex items-center min-h-[44px] rounded border px-3.5 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hazard ' + (filter ==='all' ? 'border-hazard bg-hazard/10 text-hazard' : 'border-ink/20 text-ink/60 hover:text-ink')}
            >
              All · {total}
            </button>
            {groups.map((g) => (
              <button
                key={g.concept}
                onClick={() => setFilter(g.concept)}
                className={'inline-flex items-center min-h-[44px] rounded border px-3.5 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hazard ' + (filter ===g.concept ? 'border-hazard bg-hazard/10 text-hazard' : 'border-ink/20 text-ink/60 hover:text-ink')}
              >
                {g.concept}
              </button>
            ))}
          </div>
        </header>
      </section>

      <section className="px-4 pb-8 md:px-6">
        <div className="sheet mx-auto max-w-6xl px-6 py-10 md:px-10">
          {shown.map((g) => {
            const offset = flat.findIndex((f) => f.concept === g.concept)
            return (
              <div key={g.concept} className="mb-16">
                <div className="mb-5 max-w-2xl">
                  <h2 className="headline text-2xl text-gold md:text-3xl">{g.concept}</h2>
                  <p className="mt-1 text-sm text-ink/70">{g.blurb}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {g.items.map((it, i) => (
                    <figure
                      key={it.src}
                      className="group overflow-hidden rounded-lg border border-ink/12 bg-ink/[0.04] shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => setActive(offset + i)}
                        aria-label={`View ${it.caption}`}
                        className="w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-hazard focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
                      >
                        <SafeImage
                          src={it.src}
                          alt={it.caption}
                          loading="lazy"
                          className="aspect-square w-full object-cover transition group-hover:scale-[1.03] group-hover:opacity-90"
                        />
                      </button>
                      <figcaption className="px-2 py-2 text-[11px] leading-snug text-ink/55">{it.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )
          })}

          <div className="border-t border-ink/10 pt-10 text-center">
            <Link to="/journey" className="text-xs uppercase tracking-[0.2em] text-ink/60 transition hover:text-hazard">
              ← back to the journey
            </Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {cur && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={cur.caption}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setActive((i) => (i - 1 + flat.length) % flat.length) }}
            className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-2 text-2xl text-bone/60 hover:text-bone"
            aria-label="Previous"
          >‹</button>
          <figure onClick={(e) => e.stopPropagation()} className="flex max-h-full max-w-5xl flex-col items-center">
            <SafeImage src={cur.src} alt={cur.caption} className="max-h-[80vh] w-auto rounded-lg object-contain" />
            <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.15em] text-bone/70">
              {cur.concept} · {cur.caption}
            </figcaption>
          </figure>
          <button
            onClick={(e) => { e.stopPropagation(); setActive((i) => (i + 1) % flat.length) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-2 text-2xl text-bone/60 hover:text-bone"
            aria-label="Next"
          >›</button>
          <button
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 text-xs uppercase tracking-[0.2em] text-bone/60 hover:text-bone"
            aria-label="Close"
          >Close ✕</button>
        </div>
      )}
    </div>
  )
}
