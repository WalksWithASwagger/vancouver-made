import { heroKits } from '../data/heroKits.js'
import KitFlat from './KitFlat.jsx'

// The thesis as one image: what they asked for (a souvenir) vs. what we made
// (the receipt). The right side reuses the code-drawn flat — no new art.
const receiptKit = heroKits.find((k) => k.id === 'public-dime') ?? heroKits[0]

function SouvenirTile() {
  // A deliberately glossy, empty "official" keepsake — the expected output.
  return (
    <div className="relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-sm border border-bone/15 bg-gradient-to-br from-cyan/20 via-bone/5 to-gold/20 p-6 text-center">
      <span className="text-[10px] uppercase tracking-[0.3em] text-bone/50">
        Official Fan Souvenir
      </span>
      <span className="headline mt-4 text-4xl text-bone/90 md:text-5xl">
        I <span className="text-hazard">♥</span>
        <br />
        VANCOUVER
      </span>
      <span className="mt-3 text-xs uppercase tracking-[0.25em] text-gold">
        World Cup 2026
      </span>
      <span className="mt-6 text-[10px] uppercase tracking-[0.2em] text-bone/40">
        Made in a factory · forgotten by Monday
      </span>
      <span
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(120% 80% at 30% 0%, #fff, transparent 60%)' }}
        aria-hidden="true"
      />
    </div>
  )
}

export default function TheMove() {
  return (
    <section id="the-move" className="scroll-mt-20 border-t border-bone/10 bg-rain/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan">The move</p>
        <h2 className="headline mt-2 max-w-3xl text-3xl text-bone md:text-5xl">
          THEY ASKED FOR A SOUVENIR.
          <br />
          WE HANDED BACK THE <span className="text-hazard">RECEIPT.</span>
        </h2>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
          {/* what they asked for */}
          <div className="flex flex-col">
            <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-bone/50">
              What they asked for
            </p>
            <SouvenirTile />
            <p className="mt-3 text-xs text-bone/60">
              A keepsake that celebrates the spectacle and asks nothing of it.
            </p>
          </div>

          {/* what we made */}
          <div className="flex flex-col">
            <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-hazard">
              What we made
            </p>
            <div
              className="rounded-sm border border-bone/15 p-5"
              style={{ background: receiptKit.colorway.body }}
            >
              <KitFlat kit={receiptKit} />
            </div>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-bone/70">
              {receiptKit.hemCitation.text}
            </p>
            <p className="mt-1 font-mono text-[10px] text-cyan">
              {receiptKit.hemCitation.source}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
