import { brand, racks } from '../data/collection.js'
import { receipts } from '../data/receipts.js'

function KitRow({ kit }) {
  return (
    <li className="flex items-baseline gap-3 border-b border-bone/10 py-2.5">
      <span className="headline w-8 shrink-0 text-gold">{kit.no}</span>
      <div>
        <span className="text-sm font-bold uppercase tracking-wide text-bone">
          {kit.name}
        </span>
        {kit.worked && (
          <span className="ml-2 text-[9px] uppercase tracking-wider text-cyan">worked example</span>
        )}
        {kit.club && (
          <span className="ml-2 text-[9px] uppercase tracking-wider text-hazard">built ↓</span>
        )}
        <p className="text-xs text-bone/60">{kit.line}</p>
      </div>
    </li>
  )
}

export default function Collection() {
  return (
    <section id="collection" className="border-t border-bone/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* the move */}
        <p className="text-xs uppercase tracking-[0.3em] text-cyan">The collection</p>
        <h2 className="headline mt-2 max-w-3xl text-3xl text-bone md:text-5xl">
          EVERYONE ELSE MADE A SOUVENIR.
          <br />
          WE MADE THE <span className="text-hazard">RECEIPT.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-bone/70">
          One collection. Two racks. One argument. We borrowed no sacred imagery — we
          used the coloniser's own paperwork instead: the receipt, the redaction, the banknote.
        </p>

        {/* two racks */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {racks.map((rack) => (
            <div key={rack.name}>
              <div className="mb-2 flex items-baseline justify-between">
                <h3 className="headline text-xl text-bone">{rack.name}</h3>
                <span className="text-[11px] uppercase tracking-wider text-bone/50">
                  {rack.subtitle}
                </span>
              </div>
              <ul>
                {rack.kits.map((kit) => (
                  <KitRow key={kit.no} kit={kit} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* the receipts wall */}
        <div className="mt-16 border border-bone/15 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            The receipts — all public record
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {receipts.map((r) => (
              <div key={r.id} className="border-l-2 border-hazard pl-3">
                <p className="headline text-2xl leading-none text-bone">{r.stat}</p>
                <p className="mt-1 text-xs text-bone/75">{r.claim}</p>
                <p className="mt-1 text-[11px] text-bone/50">{r.detail}</p>
                <p className="mt-1 font-mono text-[10px] text-cyan">
                  {r.source} {r.confirm && <span className="text-hazard">· [confirm]</span>}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-bone/40">
            Process — {brand.process.join('  →  ')}
          </p>
        </div>
      </div>
    </section>
  )
}
