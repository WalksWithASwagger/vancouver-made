import { Link } from 'react-router-dom'
import { stages, thesis, HANDS, phases, tracks, collaborators } from '../data/process.js'
import ProductStrip from './ProductStrip.jsx'

function HandBadge({ hand }) {
  const h = HANDS[hand]
  return (
    <span
      className="inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
      style={{ borderColor: `${h.color}99`, color: h.color }}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: h.color }} />
      {h.label}
    </span>
  )
}

// The pipeline at a glance — coloured by who holds the pen; gates and the loop marked.
function Rail() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-1 gap-y-2 font-mono text-[10px] uppercase tracking-wider">
      {stages.map((s, i) => {
        const h = HANDS[s.hand]
        return (
          <span key={s.key} className="flex items-center gap-1">
            <a
              href={`#stage-${s.key}`}
              className="flex items-center gap-1.5 border border-bone/15 px-2 py-1 transition hover:border-bone/40"
            >
              <span style={{ color: h.color }}>{s.no}</span>
              <span className="text-bone/70">{s.title}</span>
              {s.loop && <span className="text-cyan">↺</span>}
            </a>
            {i < stages.length - 1 && <span className="text-bone/25">→</span>}
          </span>
        )
      })}
    </div>
  )
}

function Station({ s }) {
  return (
    <article id={`stage-${s.key}`} className="scroll-mt-6 border-t border-bone/10 py-9 md:py-12">
      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <div className="md:pt-1">
          <div className="flex items-center gap-3">
            <span className="headline text-5xl leading-none text-bone/25 md:text-6xl">{s.no}</span>
            <div className="flex flex-col gap-1.5">
              <HandBadge hand={s.hand} />
              {s.loop && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">↺ the loop</span>
              )}
            </div>
          </div>
          <h2 className="headline mt-3 text-2xl text-bone">{s.title}</h2>
          {s.gate && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-hazard">
              ◆ human decision gate
            </p>
          )}
        </div>

        <div>
          <p className="headline text-lg text-gold md:text-xl">{s.lede}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bone/80">{s.body}</p>

          {s.parts?.length > 0 && (
            <ul className="mt-4 space-y-2">
              {s.parts.map((p, i) => (
                <li
                  key={i}
                  className="border-l-2 border-bone/20 pl-3 font-mono text-[11px] leading-relaxed text-bone/70"
                >
                  {p}
                </li>
              ))}
            </ul>
          )}

          {s.images?.length > 0 && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {s.images.map((img) => (
                <figure key={img.src} className="border border-bone/15 bg-rain/20">
                  <div className="flex aspect-[4/3] items-center justify-center p-2">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <figcaption className="border-t border-bone/10 px-2 py-1.5 font-mono text-[9px] uppercase tracking-wider text-bone/50">
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {s.cta && (
            <Link
              to={s.cta.to}
              className="mt-5 inline-block border border-hazard/50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-hazard transition hover:bg-hazard/10"
            >
              {s.cta.label}
            </Link>
          )}

          <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-bone/35">{s.source}</p>
        </div>
      </div>
    </article>
  )
}

// What the linear strip flattens — the three parallel tracks + the roomful of collaborators.
function ClosingBand() {
  return (
    <section className="mt-14 border-t border-bone/20 py-12">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan">
        What the line flattens
      </p>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="headline text-xl text-bone">Three tracks at once</h3>
          <ul className="mt-3 space-y-2">
            {tracks.map((t) => (
              <li key={t.label} className="text-sm text-bone/80">
                <span className="text-gold">{t.label}</span>
                <span className="text-bone/50"> — {t.note}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="headline text-xl text-bone">The collaborators</h3>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {collaborators.map((c) => (
              <li key={c.who} className="font-mono text-[11px] text-bone/70">
                <span className="text-cyan">{c.who}</span>
                <span className="text-bone/40"> · {c.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-bone/70">
        It isn't "using AI." It's conducting a roomful of it — many models, many agents, one
        branch — with a human holding the pen at every gate.
      </p>
    </section>
  )
}

export default function Process() {
  return (
    <div className="grain min-h-screen bg-ink text-bone">
      {/* HEADER */}
      <header className="border-b border-bone/10 px-6 py-12 md:px-10 md:py-16">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan">
          Vancouver Made · the making-of
        </p>
        <h1 className="headline text-4xl text-bone md:text-6xl">
          THE <span className="text-hazard">PROCESS</span> · VOICE → RECEIPT
        </h1>
        <p className="headline mt-4 text-xl text-gold md:text-2xl">{thesis.line}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bone/80 md:text-base">
          {thesis.body}
        </p>
        <Rail />
      </header>

      <main className="mx-auto max-w-5xl px-6 md:px-10">
        {phases.map((ph) => (
          <section key={ph.id}>
            <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan">
              — {ph.label} —
            </p>
            {stages
              .filter((s) => s.phase === ph.id)
              .map((s) => (
                <Station key={s.key} s={s} />
              ))}
          </section>
        ))}
        <ClosingBand />
      </main>

      {/* THE STORE — the receipt, now wearable */}
      <ProductStrip heading="THE DROP" />

      <footer className="border-t border-bone/10 px-6 py-10 text-center text-xs uppercase tracking-[0.3em] text-bone/40">
        <div className="mb-4 flex flex-wrap justify-center gap-6">
          <Link to="/" className="text-bone/60 transition hover:text-bone">Pitch Site</Link>
          <span className="text-bone/20">·</span>
          <Link to="/hall-of-fame" className="text-bone/60 transition hover:text-bone">Hall of Fame</Link>
          <span className="text-bone/20">·</span>
          <Link to="/tracker" className="text-bone/60 transition hover:text-bone">Asset Tracker</Link>
          <span className="text-bone/20">·</span>
          <Link to="/engine" className="text-bone/60 transition hover:text-bone">The Receipts</Link>
          <span className="text-bone/20">·</span>
          <span className="text-bone">Process</span>
        </div>
        Voice in, judgment out — a human hand on every gate between.
      </footer>
    </div>
  )
}
