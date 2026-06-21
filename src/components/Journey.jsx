import { useEffect, useRef, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { lineage, acts } from '../data/journey.js'
import KitFlat from './KitFlat.jsx'
import { heroKits } from '../data/heroKits.js'
import './Journey.css'

const Stage = lazy(() => import('../scene/Stage.jsx'))
const heroKit = heroKits.find((k) => k.id === 'pump-and-dump') || heroKits[0]

// Reveal-on-scroll: add .in to any .j-reveal as it enters the viewport.
function useReveal() {
  const root = useRef(null)
  useEffect(() => {
    const els = root.current?.querySelectorAll('.j-reveal') ?? []
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.18 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return root
}

function Kicker({ children }) {
  return <p className="mb-4 text-xs uppercase tracking-[0.35em] text-cyan">{children}</p>
}

export default function Journey() {
  const root = useReveal()

  return (
    <div ref={root} className="grain bg-ink text-bone">
      {/* 0 — PORTAL OPENER */}
      <section className="relative flex h-[92svh] min-h-[34rem] w-full flex-col justify-between overflow-hidden">
        <div className="absolute inset-0">
          <Suspense fallback={<div className="h-full w-full bg-ink" />}>
            <Stage />
          </Suspense>
        </div>
        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-bone/70">
            Vancouver Made · MADE ON · not a sponsor
          </p>
          <div className="max-w-3xl">
            <h1 className="headline text-4xl leading-[0.95] text-bone md:text-7xl">
              They asked for the Vancouver story.
              <br />
              <span className="text-hazard">We finished the sentence.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-bone/80 md:text-base">
              A guided tour of protest at the world games, and the kit we made for 2026.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-bone/50">Scroll to begin ↓</p>
        </div>
      </section>

      {/* 1 — THE PROVOCATION */}
      <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <div className="j-reveal">
          <Kicker>{acts.provocation.kicker}</Kicker>
          <h2 className="headline text-3xl text-gold md:text-5xl">{acts.provocation.title}</h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-bone/85 md:text-base">
            {acts.provocation.body}
          </p>
          <ul className="mt-8 space-y-2">
            {acts.provocation.receipts.map((r) => (
              <li key={r} className="headline text-xl text-bone md:text-2xl">{r}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2 — THE LINEAGE */}
      <section className="border-t border-bone/10 bg-rain/10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="j-reveal mb-16 max-w-2xl">
            <Kicker>{acts.lineage.kicker}</Kicker>
            <h2 className="headline text-3xl text-bone md:text-5xl">{acts.lineage.title}</h2>
            <p className="mt-5 text-sm leading-relaxed text-bone/80 md:text-base">{acts.lineage.body}</p>
          </div>

          <ol className="space-y-16 md:space-y-24">
            {lineage.map((b, i) => (
              <li
                key={b.title}
                className={
                  'j-reveal grid items-center gap-6 md:grid-cols-2 md:gap-12 ' +
                  (i % 2 ? 'md:[&>figure]:order-2' : '')
                }
              >
                {b.img ? (
                  <figure className="overflow-hidden rounded-lg border border-bone/15 bg-black/40">
                    <img src={b.img} alt={b.title} loading="lazy" className="h-full w-full object-cover" />
                  </figure>
                ) : (
                  <figure className="flex aspect-[4/3] items-center justify-center rounded-lg border border-hazard/30 bg-ink">
                    <span className="headline text-5xl text-hazard/80 md:text-7xl">{b.year}</span>
                  </figure>
                )}
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
                    {b.year} · {b.place}
                  </p>
                  <h3 className="headline mt-2 text-2xl text-bone md:text-3xl">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone/80 md:text-base">{b.line}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="j-reveal mt-16 text-center">
            <Link
              to="/hall-of-fame"
              className="inline-block border border-bone/25 px-5 py-2 text-xs uppercase tracking-[0.2em] text-bone/70 transition hover:border-hazard hover:text-hazard"
            >
              The full Hall of Fame, 1968 to 2026 →
            </Link>
          </div>
        </div>
      </section>

      {/* 3 — THE METHOD */}
      <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <div className="j-reveal">
          <Kicker>{acts.method.kicker}</Kicker>
          <h2 className="headline text-3xl text-cyan md:text-5xl">{acts.method.title}</h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-bone/85 md:text-base">
            {acts.method.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em]">
            <Link to="/process" className="border border-bone/25 px-4 py-2 text-bone/70 transition hover:border-bone hover:text-bone">
              See the process →
            </Link>
            <Link to="/engine" className="border border-bone/25 px-4 py-2 text-bone/70 transition hover:border-bone hover:text-bone">
              Run the receipts →
            </Link>
          </div>
        </div>
      </section>

      {/* 4 — THE WORK */}
      <section className="border-t border-bone/10 bg-rain/10 px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="j-reveal">
            <Kicker>{acts.work.kicker}</Kicker>
            <h2 className="headline text-3xl text-bone md:text-5xl">{acts.work.title}</h2>
            <p className="mt-6 text-sm leading-relaxed text-bone/85 md:text-base">{acts.work.body}</p>
            <p className="headline mt-6 text-xl text-hazard md:text-2xl">{acts.work.punch}</p>
            <Link
              to="/#hero-kits"
              className="mt-8 inline-block border border-bone/25 px-5 py-2 text-xs uppercase tracking-[0.2em] text-bone/70 transition hover:border-hazard hover:text-hazard"
            >
              See all nine kits →
            </Link>
            <Link
              to="/gallery"
              className="mt-4 ml-0 inline-block border border-bone/25 px-5 py-2 text-xs uppercase tracking-[0.2em] text-bone/70 transition hover:border-hazard hover:text-hazard md:ml-3"
            >
              The gallery →
            </Link>
          </div>
          <div className="j-reveal rounded-lg border border-bone/15 bg-black/30 p-4">
            <KitFlat kit={heroKit} />
            <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-bone/50">
              {heroKit.name} · code-drawn from the same data as the tech pack
            </p>
          </div>
        </div>
      </section>

      {/* 5 — CLOSE */}
      <section className="border-t border-bone/10 px-6 py-24 text-center md:py-32">
        <div className="j-reveal mx-auto max-w-3xl">
          <Kicker>{acts.close.kicker}</Kicker>
          <h2 className="headline text-4xl text-bone md:text-6xl">
            WE MADE THE <span className="text-hazard">RECEIPT.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-bone/80 md:text-base">
            {acts.close.body}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.2em]">
            <a href="https://feefa.ai" target="_blank" rel="noreferrer" className="border border-bone/25 px-4 py-2 text-bone/70 transition hover:border-bone hover:text-bone">feefa.ai ↗</a>
            <a href="https://world-cup-fashion-cake.vercel.app" target="_blank" rel="noreferrer" className="border border-bone/25 px-4 py-2 text-bone/70 transition hover:border-bone hover:text-bone">fashion cake ↗</a>
            <Link to="/engine" className="border border-hazard px-4 py-2 font-bold text-hazard transition hover:bg-hazard hover:text-ink">Open the engine →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
