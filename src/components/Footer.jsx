import { Link } from 'react-router-dom'
import { brand } from '../data/collection.js'

const NAV_LINKS = [
  { label: 'Pitch Site', to: '/' },
  { label: 'Journey', to: '/journey' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Store', to: '/store' },
  { label: 'Engine', to: '/engine' },
  { label: 'Process', to: '/process' },
  { label: 'Hall of Fame', to: '/hall-of-fame' },
  { label: 'Awards', to: '/awards' },
]

// Shared site footer — renders at the bottom of MadeOnSite and any page that
// includes it explicitly. tartan-dark ground, cream type, grain.
export default function Footer() {
  return (
    <footer className="grain tartan-dark border-t-2 border-ink/30">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">

        {/* Top row — wordmark + tagline + double-silver badge */}
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-bone/50 mb-2">
              {brand.parent}
            </p>
            <h2 className="headline text-3xl text-bone md:text-4xl [text-shadow:0_2px_6px_rgba(0,0,0,0.6)]">
              MADE <span className="text-hazard">ON</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
              {brand.hook}
            </p>
          </div>

          {/* Double-silver badge */}
          <div className="flex flex-col justify-start gap-1 md:items-end md:text-right">
            <p className="text-[10px] uppercase tracking-[0.3em] text-bone/50">
              BCIT Tech Collider · 2026
            </p>
            <p className="headline text-xl text-hazard [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
              🥈🥈 Double Silver
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-bone/70 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
              2nd, Devin Technical Hackathon · 2nd, Formme Design Challenge
            </p>
            <Link
              to="/awards"
              className="mt-2 inline-block border border-hazard/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-hazard transition hover:border-hazard hover:bg-hazard hover:text-bone"
            >
              See the awards →
            </Link>
          </div>
        </div>

        {/* Middle — three-column grid: nav / land acknowledgement / case link */}
        <div className="grid gap-10 border-t border-bone/10 pt-10 md:grid-cols-3 md:gap-12">

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-bone/45">
              Navigate
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-xs uppercase tracking-[0.15em] text-bone/60 transition hover:text-bone"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-bone/10 mt-2">
                <Link
                  to="/why"
                  className="text-xs font-bold uppercase tracking-[0.15em] text-gold transition hover:text-bone"
                >
                  The full case →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Land acknowledgement */}
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-bone/45">
              Land Acknowledgement
            </p>
            <p className="text-xs leading-relaxed text-bone/70 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
              {brand.author}: this work was made on the unceded, ancestral, and
              traditional territories of the{' '}
              <span className="text-bone/90">xʷməθkʷəy̓əm (Musqueam)</span>,{' '}
              <span className="text-bone/90">Sḵwx̱wú7mesh (Squamish)</span>, and{' '}
              <span className="text-bone/90">səlilwətaɬ (Tsleil-Waututh)</span>{' '}
              peoples.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-bone/55">
              The stadium that hosted these games sits on this same ground. The
              viaduct built over Hogan's Alley, the Black neighbourhood demolished
              for it, runs through it. That context is the work, not the
              disclaimer.
            </p>
          </div>

          {/* About the project */}
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-bone/45">
              About
            </p>
            <p className="text-xs leading-relaxed text-bone/70">
              {brand.kind} · {brand.event}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-bone/55">
              Everyone else made a souvenir. We made the receipt. A protest
              collection that cites its sources, shows its process, and names the
              numbers. Stitched into the hem, not printed on a poster.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-bone/55">
              {brand.move}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-bone/10 pt-8 md:flex-row md:items-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-bone/35">
            {brand.name} · {brand.parent} · {brand.land}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-bone/25">
            Not a FIFA sponsor · Not anti-football · Anti-amnesia
          </p>
        </div>

      </div>
    </footer>
  )
}
