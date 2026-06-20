import Stage from './scene/Stage.jsx'
import Clubs from './components/Clubs.jsx'
import { slogans, club } from './brand/tokens.js'

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
      {/* HERO — the World Portal */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0">
          <Stage />
        </div>

        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
          <header className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-bone/70">
            <span>{club.name}</span>
            <span className="hidden md:inline">Vancouver · 2026</span>
          </header>

          <div className="max-w-3xl">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan">
              A protest brand · not a sponsor
            </p>
            <h1 className="headline text-5xl text-bone md:text-8xl">
              WHOSE CUP
              <br />
              IS IT <span className="text-hazard">ANYWAY?</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-bone/80 md:text-base">
              The world's biggest sporting spectacle is coming to Vancouver. So are
              the cost overruns, the sweeps, the displacement, and the corporate
              flags planted over a city that was already struggling to house its own.
              {' '}
              <span className="text-gold">VANCOUVER MADE</span> is the kit for the
              other team — the one that lives here.
            </p>
          </div>

          <div className="flex items-end justify-between text-xs uppercase tracking-[0.2em] text-bone/50">
            <span>↻ Drag-free · auto-orbit · the game is rigged</span>
            <span className="hidden md:inline">{club.motto}</span>
          </div>
        </div>
      </section>

      <Marquee />

      {/* MANIFESTO */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <h2 className="headline mb-8 text-3xl text-gold md:text-5xl">THE MANIFESTO</h2>
        <div className="space-y-5 text-sm leading-relaxed text-bone/85 md:text-base">
          <p>
            This is not a protest of artificial intelligence. AI is just the brush.
            This is a protest of <strong className="text-bone">international sports
            greed</strong> — of the machine that rolls into a city, extracts the
            spectacle, privatizes the profit, socializes the cost, and leaves.
          </p>
          <p>
            Vancouver knows this script. We have run it before. Mega-events arrive
            with promises and leave with bills, while the people pushed off the
            sidewalk to make the broadcast look clean never get a ticket to the
            party they paid for.
          </p>
          <p>
            <span className="text-hazard">VANCOUVER MADE</span> wears the language of
            the tournament against itself: the jerseys, the kits, the trophy, the
            fan-zone portal — all of it reissued as <em>evidence</em>. We are the
            home side. We speak truth to power. We are not for sale.
          </p>
        </div>
      </section>

      {/* THE KIT DROP — the three flagship clubs */}
      <Clubs />

      <footer className="border-t border-bone/10 px-6 py-10 text-center text-xs uppercase tracking-[0.3em] text-bone/40">
        {club.name} · {club.founded} · Made in Vancouver, not Vancouver Sold
      </footer>
    </div>
  )
}
