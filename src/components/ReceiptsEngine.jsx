import { useState } from 'react'
import { Link } from 'react-router-dom'
import { receipts } from '../data/receipts.js'
import { properties, madeOnHem, feefaPoster, fashionEditorial } from '../data/voices.js'

function PropTag({ p }) {
  const inner = (
    <span className="text-bone/80 hover:text-bone transition">
      {p.name} <span className="text-bone/40">· {p.role}</span>
    </span>
  )
  return p.url.startsWith('http') ? (
    <a href={p.url} target="_blank" rel="noreferrer">{inner}</a>
  ) : (
    <Link to={p.url}>{inner}</Link>
  )
}

export default function ReceiptsEngine() {
  const [active, setActive] = useState(receipts[0])
  const hem = madeOnHem(active)
  const poster = feefaPoster(active)
  const ed = fashionEditorial(active)

  return (
    <div className="grain min-h-screen bg-ink text-bone">
      {/* HEADER */}
      <header className="border-b border-bone/10 px-6 py-10 md:px-10">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan">
          Vancouver Made · Devin Open Hackathon
        </p>
        <h1 className="headline text-4xl text-bone md:text-6xl">
          THE <span className="text-hazard">RECEIPTS</span> ENGINE
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bone/80 md:text-base">
          One Vancouver civic receipt goes in. Three counter-spectacle artifacts come out,
          each in its property's house voice, each carrying the same citation. Not three
          projects. One pipeline pointed at three surfaces.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em]">
          {Object.values(properties).map((p) => (
            <PropTag key={p.key} p={p} />
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-0 md:grid-cols-[320px_1fr]">
        {/* RECEIPT PICKER */}
        <aside className="border-b border-bone/10 p-6 md:border-b-0 md:border-r">
          <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-bone/50">
            Pick a receipt
          </h2>
          <ul className="space-y-2">
            {receipts.map((r) => {
              const on = r.id === active.id
              return (
                <li key={r.id}>
                  <button
                    onClick={() => setActive(r)}
                    className={
                      'w-full rounded border p-3 text-left transition ' +
                      (on
                        ? 'border-hazard bg-hazard/10'
                        : 'border-bone/15 hover:border-bone/40')
                    }
                  >
                    <span className="font-mono text-base font-bold text-gold">{r.stat}</span>
                    <span className="mt-1 block text-xs leading-snug text-bone/70">
                      {r.claim}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="mt-6 font-mono text-[11px] leading-relaxed text-bone/40">
            Source data: <code>src/data/receipts.js</code>. Every figure is public record,
            flagged for primary-source confirmation before publish.
          </p>
        </aside>

        {/* THREE VOICES */}
        <main className="space-y-6 p-6 md:p-10">
          {/* MADE ON — the hem */}
          <article className="rounded-lg border border-bone/15 bg-black/40 p-6">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="text-xs uppercase tracking-[0.3em] text-hazard">
                MADE ON · the hem
              </h3>
              <Link to="/" className="text-[11px] uppercase tracking-widest text-bone/40 hover:text-bone">
                the kit ↗
              </Link>
            </div>
            <img src="/engine/voice-madeon.png" alt="redacted public document" className="mb-4 h-28 w-full rounded border border-bone/10 object-cover" />
            <p className="font-mono text-[11px] uppercase leading-relaxed tracking-wide text-bone/90">
              {hem.body}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-bone/40">
              {hem.source}
            </p>
          </article>

          {/* FEEFA — the poster */}
          <article className="rounded-lg border border-hazard/40 bg-ink p-6">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="text-xs uppercase tracking-[0.3em] text-hazard">
                FEEFA · the poster
              </h3>
              <a
                href={properties.feefa.url}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] uppercase tracking-widest text-bone/40 hover:text-bone"
              >
                feefa.ai ↗
              </a>
            </div>
            <img src="/engine/voice-feefa.png" alt="dense condo development" className="mb-4 h-28 w-full rounded border border-hazard/20 object-cover" />
            <p className="headline text-4xl leading-none text-hazard md:text-6xl">{poster.big}</p>
            <p className="mt-4 max-w-xl text-lg leading-snug text-bone">{poster.charge}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-bone/60">{poster.brand}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-bone/40">
              {poster.stamp} · {poster.source}
            </p>
          </article>

          {/* FASHION CAKE — the editorial */}
          <article className="rounded-lg border border-bone/15 bg-bone p-6 text-ink">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="text-xs uppercase tracking-[0.3em] text-rain">
                Fashion Cake · the editorial
              </h3>
              <a
                href={properties.cake.url}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] uppercase tracking-widest text-ink/40 hover:text-ink"
              >
                the editorial ↗
              </a>
            </div>
            <img src="/engine/voice-cake.png" alt="engraved banknote detail" className="mb-4 h-28 w-full rounded border border-ink/10 object-cover" />
            <p className="max-w-xl text-lg italic leading-relaxed text-ink/90">{ed.caption}</p>
            <p className="mt-3 text-base italic text-ink/60">{ed.coda}</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-ink/40">
              src: {ed.source}
            </p>
          </article>
        </main>
      </div>

      {/* PROCESS / FOOTER */}
      <footer className="border-t border-bone/10 px-6 py-10 md:px-10">
        <h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan">The process</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-bone/80">
          The novelty is not any one site. It is the move: take the World Cup's official
          spectacle, turn its own language back on it, and let AI do the production while
          cited Vancouver receipts and human taste hold the line. The same civic fact
          becomes a hem, a poster, and an editorial. A repeatable way of making, not a
          one-off. Built today, AI-assisted, on real public-record data.
        </p>
        <div className="mt-5 flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-bone/50">
          <Link to="/" className="hover:text-bone">Pitch site</Link>
          <Link to="/tracker" className="hover:text-bone">Asset tracker</Link>
          <a href={properties.feefa.url} target="_blank" rel="noreferrer" className="hover:text-bone">feefa.ai ↗</a>
          <a href={properties.cake.url} target="_blank" rel="noreferrer" className="hover:text-bone">fashion cake ↗</a>
        </div>
      </footer>
    </div>
  )
}
