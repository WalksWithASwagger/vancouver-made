import { useEffect, lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom'
import Clubs from './components/Clubs.jsx'
import Collection from './components/Collection.jsx'
import HeroKits from './components/HeroKits.jsx'
import TheMove from './components/TheMove.jsx'
import WhyItWins from './components/WhyItWins.jsx'
import Nav from './components/Nav.jsx'
import ShareQR from './components/ShareQR.jsx'
import PresenterControls from './components/PresenterControls.jsx'
import { brand } from './data/collection.js'
import { slogans } from './brand/tokens.js'
import nardwuar from './data/directions/nardwuar.js'

// slug → manifest map; extend as new directions land
const DIRECTION_MANIFESTS = {
  'nardwuar-fc': nardwuar,
}

// Code-split the secondary routes so the initial pitch view paints fast.
const DirectionPage = lazy(() => import('./components/DirectionPage.jsx'))
const ReceiptsEngine = lazy(() => import('./components/ReceiptsEngine.jsx'))
const HallOfFame = lazy(() => import('./components/HallOfFame.jsx'))
const AssetTracker = lazy(() => import('./components/AssetTracker.jsx'))
const Process = lazy(() => import('./components/Process.jsx'))
const Store = lazy(() => import('./components/Store.jsx'))
const HighlightReel = lazy(() => import('./components/HighlightReel.jsx'))
const GenerativeWall = lazy(() => import('./components/GenerativeWall.jsx'))
const Journey = lazy(() => import('./components/Journey.jsx'))
const Gallery = lazy(() => import('./components/Gallery.jsx'))
import ProductStrip from './components/ProductStrip.jsx'
import HeroShowcase from './components/HeroShowcase.jsx'

// Wraps DirectionPage so the route can pass the manifest from the slug map.
// Unknown slugs fall back to nardwuar (only one exists for now).
function KitRoute() {
  const { slug } = useParams()
  const manifest = DIRECTION_MANIFESTS[slug] ?? nardwuar
  return <DirectionPage data={manifest} />
}

function RouteFallback() {
  return (
    <div className="grain flex min-h-screen items-center justify-center bg-bone text-[11px] uppercase tracking-[0.3em] text-ink/40">
      Loading…
    </div>
  )
}

const TITLES = {
  '/': 'MADE ON — Whose Cup Is It Anyway?',
  '/journey': 'The Journey — MADE ON',
  '/gallery': 'The Gallery — MADE ON',
  '/engine': 'We Made the Receipt — MADE ON',
  '/hall-of-fame': 'Hall of Fame — MADE ON',
  '/process': 'Our Process — MADE ON',
  '/store': 'The Store — MADE ON',
  '/tracker': 'Asset Tracker — MADE ON',
  '/kit/nardwuar-fc': 'Nardwuar FC — Deep Cut — MADE ON',
}

function Marquee() {
  const line = slogans.join('   ✦   ') + '   ✦   '
  return (
    <div className="tartan-dark overflow-hidden border-y-2 border-ink py-3">
      <div className="marquee text-bone text-sm font-bold tracking-widest [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
        <span>{line}</span>
        <span aria-hidden="true">{line}</span>
      </div>
    </div>
  )
}

function MadeOnSite() {
  return (
    <div className="grain min-h-screen bg-bone text-ink">
      <PresenterControls />

      {/* HERO — the MADE ON statement + a lookbook of the actual kits */}
      <section id="hero" className="relative w-full overflow-hidden border-b border-ink/10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:gap-14 md:py-24">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-ink/55">
              {brand.parent} · {brand.name}
            </p>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-cyan">
              {brand.kind} · not a sponsor
            </p>
            <h1 className="headline text-5xl text-ink md:text-7xl lg:text-8xl">
              MADE
              <br />
              <span className="text-hazard">ON</span> WHAT?
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/80 md:text-base">
              They asked for the Vancouver story. We finished the sentence.{' '}
              <span className="text-gold">Made on stolen ground. Made on Hogan's
              Alley. Made on $729 million of public money.</span>
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/journey"
                className="inline-block border border-hazard bg-hazard/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-hazard transition hover:bg-hazard hover:text-ink"
              >
                Begin the journey →
              </Link>
              <Link
                to="/gallery"
                className="inline-block border border-ink/25 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-ink/70 transition hover:border-ink hover:text-ink"
              >
                See the gallery →
              </Link>
            </div>
            <p className="mt-7 text-xs uppercase tracking-[0.2em] text-ink/45">
              ↻ Everyone else made a souvenir. We made the receipt.
            </p>
          </div>

          <div className="mx-auto w-full max-w-sm md:max-w-md">
            <HeroShowcase />
          </div>
        </div>
      </section>

      <Marquee />

      {/* TERRITORIAL STATEMENT */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <h2 className="headline mb-8 text-3xl text-gold md:text-5xl">
          THE TERRITORIAL STATEMENT
        </h2>
        <div className="space-y-5 text-sm leading-relaxed text-ink/85 md:text-base">
          <p className="headline text-xl text-ink md:text-2xl">
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
          <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
            {brand.author} · {brand.land}
          </p>
        </div>
      </section>

      {/* THE MOVE — souvenir vs. receipt, the thesis as one image */}
      <TheMove />

      {/* THE COLLECTION — 9 kits, two racks + the receipts wall */}
      <Collection />

      {/* HERO KITS — 01 / 03 / 09 built to spec, with code-drawn flats */}
      <HeroKits />

      {/* THE STORE — the drop, woven into the pitch (not a siloed tab) */}
      <ProductStrip heading="THE DROP" />


      {/* DEEP DIVE — the club-card method behind the kits */}
      <Clubs />

      {/* WHY IT WINS — the rubric, with proof links into the site */}
      <WhyItWins />

      {/* THE CLOSER — scan to open the live site */}
      <section className="border-t border-ink/10 bg-rain/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">Take it with you</p>
          <h2 className="headline max-w-2xl text-2xl text-ink md:text-4xl">
            THE PART THAT DOESN'T FIT ON A <span className="text-hazard">SOUVENIR.</span>
          </h2>
          <ShareQR />
        </div>
      </section>

      <footer className="border-t border-ink/10 px-6 py-10 text-center text-xs uppercase tracking-[0.3em] text-ink/40">
        <p className="mb-5 text-[11px] font-bold tracking-[0.2em] text-gold">
          🥈🥈 Double silver · BCIT Tech Collider 2026 — 2nd, Devin Technical Hackathon &amp; 2nd, Formme Design Challenge
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          <Link to="/" className="text-ink/60 hover:text-ink transition">Pitch Site</Link>
          <span className="text-ink/20">·</span>
          <Link to="/engine" className="text-ink/60 hover:text-ink transition">The Receipts</Link>
          <span className="text-ink/20">·</span>
          <Link to="/hall-of-fame" className="text-ink/60 hover:text-ink transition">Hall of Fame</Link>
          <span className="text-ink/20">·</span>
          <Link to="/process" className="text-ink/60 hover:text-ink transition">Process</Link>
          <span className="text-ink/20">·</span>
          <Link to="/tracker" className="text-ink/60 hover:text-ink transition">Asset Tracker</Link>
        </div>
        {brand.name} · {brand.parent} · You asked for the Vancouver story — this is the
        part that doesn't fit on a souvenir.
      </footer>
    </div>
  )
}

function NotFound() {
  return (
    <div className="grain flex min-h-screen flex-col items-center justify-center bg-bone px-6 text-center text-ink">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan">404 · off the record</p>
      <h1 className="headline mt-3 text-5xl text-ink md:text-7xl">
        NO <span className="text-hazard">RECEIPT</span> FOUND
      </h1>
      <p className="mt-4 max-w-md text-sm text-ink/70">
        This page isn't in the public record. Everything that is starts at the top.
      </p>
      <Link
        to="/"
        className="mt-8 border border-hazard px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-hazard transition hover:bg-hazard hover:text-ink"
      >
        Back to the pitch
      </Link>
    </div>
  )
}

// Scrolls to a #hash target after navigation (so cross-page anchor links work),
// or to the top on a plain route change. Also keeps document.title per route.
function PitchLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = TITLES[pathname] ?? 'MADE ON — VANCOUVER MADE'
  }, [pathname])

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        // next frame so the target has rendered after a cross-page nav
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:border focus:border-hazard focus:bg-bone focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-hazard"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main-content">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PitchLayout />}>
          <Route path="/" element={<MadeOnSite />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/engine" element={<ReceiptsEngine />} />
          <Route path="/hall-of-fame" element={<HallOfFame />} />
          <Route path="/process" element={<Process />} />
          <Route path="/store" element={<Store />} />
          <Route path="/kit/:slug" element={<KitRoute />} />
        </Route>
        <Route
          path="/highlight-reel"
          element={
            <Suspense fallback={<RouteFallback />}>
              <HighlightReel />
            </Suspense>
          }
        />
        <Route
          path="/wall"
          element={
            <Suspense fallback={<RouteFallback />}>
              <GenerativeWall />
            </Suspense>
          }
        />
        <Route
          path="/tracker"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AssetTracker />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
