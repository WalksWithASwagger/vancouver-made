import Stage from './scene/Stage.jsx'
import Clubs from './components/Clubs.jsx'
import Collection from './components/Collection.jsx'
import { brand } from './data/collection.js'
import { slogans } from './brand/tokens.js'

function Marquee() {
  const line = slogans.join('   ✦   ')
  return (
    <div className="overflow-hidden border-y border-hazard/40 bg-ink py-3">
      <div className="marquee text-hazard text-sm font-bold tracking-widest">
        {line}   ✦   {line}   ✦{'  '}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="grain min-h-screen bg-ink text-bone">
      {/* HERO — the World Portal + the MADE ON statement */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0">
          <Stage />
        </div>

        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
          <header className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-bone/70">
            <span>{brand.parent} · {brand.name}</span>
            <span className="hidden md:inline">{brand.event}</span>
          </header>

          <div className="max-w-3xl">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan">
              {brand.kind} · not a sponsor
            </p>
            <h1 className="headline text-5xl text-bone md:text-8xl">
              MADE
              <br />
              <span className="text-hazard">ON</span> WHAT?
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-bone/80 md:text-base">
              They asked for the Vancouver story. We finished the sentence.{' '}
              <span className="text-gold">Made on stolen ground. Made on Hogan's
              Alley. Made on $729 million of public money.</span>
            </p>
          </div>

          <div className="flex items-end justify-between text-xs uppercase tracking-[0.2em] text-bone/50">
            <span>↻ Everyone else made a souvenir. We made the receipt.</span>
            <span className="hidden md:inline">{brand.author}</span>
          </div>
        </div>
      </section>

      <Marquee />

      {/* TERRITORIAL STATEMENT */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <h2 className="headline mb-8 text-3xl text-gold md:text-5xl">
          THE TERRITORIAL STATEMENT
        </h2>
        <div className="space-y-5 text-sm leading-relaxed text-bone/85 md:text-base">
          <p className="headline text-xl text-bone md:text-2xl">
            Made on stolen ground. Made on Hogan's Alley. Made on $729 million of
            public money.
          </p>
          <p>
            The unceded Musqueam, Squamish and Tsleil-Waututh land the stadium sits
            on. The Black neighbourhood paved for the viaduct this World Cup drives
            its fans across. A public bill of up to $729M — $242M of it security —
            while California cities ran the same tournament on private money.
          </p>
          <p>
            <span className="text-hazard">We borrowed no sacred imagery.</span> We
            used the coloniser's own paperwork instead: the receipt, the redaction,
            the banknote. A settler artist's refusal to make the celebration jersey.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-bone/50">
            {brand.author} · {brand.land}
          </p>
        </div>
      </section>

      {/* THE COLLECTION — 9 kits, two racks + the receipts wall */}
      <Collection />

      {/* DEEP DIVE — three kits, fully built */}
      <Clubs />

      <footer className="border-t border-bone/10 px-6 py-10 text-center text-xs uppercase tracking-[0.3em] text-bone/40">
        {brand.name} · {brand.parent} · You asked for the Vancouver story — this is the
        part that doesn't fit on a souvenir.
      </footer>
    </div>
  )
}
