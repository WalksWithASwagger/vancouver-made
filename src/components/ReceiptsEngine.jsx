import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { receipts } from '../data/receipts.js'
import { properties, madeOnHem, feefaPoster, fashionEditorial } from '../data/voices.js'
import SafeImage from './SafeImage.jsx'
import './Journey.css'

// Reveal-on-scroll — borrowed from Journey.jsx / DirectionPage.jsx pattern.
function useReveal() {
  const root = useRef(null)
  useEffect(() => {
    const els = root.current?.querySelectorAll('.j-reveal') ?? []
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.14 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return root
}

function PropTag({ p }) {
  const inner = (
    <span className="text-ink/70 hover:text-ink transition-colors">
      {p.name} <span className="text-ink/35">· {p.role}</span>
    </span>
  )
  return p.url.startsWith('http') ? (
    <a href={p.url} target="_blank" rel="noreferrer">{inner}</a>
  ) : (
    <Link to={p.url}>{inner}</Link>
  )
}

// The active-receipt "billboard" — the giant stat that changes when you pick a receipt.
// Keyed on active.id so React unmounts/remounts, triggering the CSS fade-in on switch.
function StatBillboard({ r }) {
  return (
    <div
      key={r.id}
      className="border-b border-ink/10 bg-paper px-6 py-10 md:px-10 md:py-14"
      style={{ animation: 'engine-fadein 320ms cubic-bezier(0.2,0.7,0.2,1) both' }}
    >
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.35em] text-ink/50">
        Active receipt · {r.id}
      </p>
      <p
        className="headline leading-none text-gold"
        style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
      >
        {r.stat}
      </p>
      <p className="mt-4 max-w-3xl text-base leading-snug text-ink/80 md:text-lg">
        {r.claim}
      </p>
      <p className="mt-3 font-mono text-xs text-ink/40 md:text-sm">{r.detail}</p>
    </div>
  )
}

// Horizontal receipt rail — scrollable on mobile, wraps on wider screens.
function ReceiptRail({ receipts, active, setActive }) {
  return (
    <nav
      className="border-b border-ink/10 overflow-x-auto"
      aria-label="Receipt selector"
    >
      <div className="flex min-w-max px-6 py-4 gap-2 md:min-w-0 md:flex-wrap md:px-10">
        {receipts.map((r) => {
          const on = r.id === active.id
          return (
            <button
              key={r.id}
              onClick={() => setActive(r)}
              className={
                'shrink-0 border px-4 py-2.5 text-left transition-all duration-200 ' +
                (on
                  ? 'border-hazard bg-hazard/10 shadow-sm'
                  : 'border-ink/15 bg-bone hover:border-ink/40 hover:bg-ink/[0.03]')
              }
            >
              <span
                className={
                  'font-mono text-sm font-bold block leading-tight ' +
                  (on ? 'text-hazard' : 'text-gold')
                }
              >
                {r.stat}
              </span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-ink/50 leading-snug max-w-[18ch]">
                {r.id}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// ── Voice card: MADE ON · the hem ─────────────────────────────────────────────
// Typographic register: mono all-caps, redacted-document feel, tartan-dark ground.
function HemCard({ hem, activeId }) {
  return (
    <article
      key={activeId}
      className="j-reveal tartan-dark"
      style={{ animation: 'engine-fadein 380ms cubic-bezier(0.2,0.7,0.2,1) both' }}
    >
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
        {/* label row */}
        <div className="mb-8 flex items-baseline justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-hazard">
              Room I
            </p>
            <h3 className="headline mt-1 text-2xl text-bone md:text-3xl">
              MADE ON · the hem
            </h3>
          </div>
          <Link
            to="/"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/40 transition hover:text-bone"
          >
            the kit ↗
          </Link>
        </div>

        {/* image — full-width strip, proper height */}
        <div className="mb-8 overflow-hidden border border-bone/10">
          <SafeImage
            src="/engine/voice-madeon.png"
            alt="Redacted public document, MADE ON the hem"
            className="h-64 w-full object-cover opacity-80 md:h-80"
          />
        </div>

        {/* source label */}
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-bone/30">
          {hem.label}
        </p>

        {/* body — dense redacted microtext */}
        <p
          className="font-mono text-sm uppercase leading-loose tracking-[0.12em] text-bone/90 md:text-base"
          style={{ wordBreak: 'break-word' }}
        >
          {hem.body}
        </p>

        {/* citation */}
        <div className="mt-8 border-t border-bone/10 pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/35">
            {hem.source}
          </p>
        </div>
      </div>
    </article>
  )
}

// ── Voice card: FEEFA · the poster ────────────────────────────────────────────
// Typographic register: huge hazard headline, agitprop, bone ground.
function PosterCard({ poster, activeId }) {
  return (
    <article
      key={activeId}
      className="j-reveal px-4 py-6 md:px-6 md:py-8"
      style={{ animation: 'engine-fadein 380ms cubic-bezier(0.2,0.7,0.2,1) both 60ms' }}
    >
      <div className="sheet mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
        {/* label row */}
        <div className="mb-8 flex items-baseline justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-hazard">
              Room II
            </p>
            <h3 className="headline mt-1 text-2xl text-ink md:text-3xl">
              FEEFA · the poster
            </h3>
          </div>
          <a
            href={properties.feefa.url}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 transition hover:text-ink"
          >
            feefa.ai ↗
          </a>
        </div>

        {/* image */}
        <div className="mb-10 overflow-hidden border border-hazard/15">
          <SafeImage
            src="/engine/voice-feefa.png"
            alt="Dense Vancouver condo development, FEEFA agitprop poster"
            className="h-64 w-full object-cover md:h-80"
          />
        </div>

        {/* big stat — the poster number */}
        <p
          className="headline leading-none text-hazard"
          style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
        >
          {poster.big}
        </p>

        {/* charge line */}
        <p className="mt-6 max-w-2xl text-xl leading-snug text-ink md:text-2xl">
          {poster.charge}
        </p>

        {/* brand / stamp row */}
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-ink/10 pt-5">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink/70 md:text-sm">
            {poster.brand}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
            {poster.stamp} · {poster.source}
          </p>
        </div>
      </div>
    </article>
  )
}

// ── Voice card: Fashion Cake · the editorial ──────────────────────────────────
// Typographic register: lowercase italic, couture caption, wide elegant margins.
function EditorialCard({ ed, activeId }) {
  return (
    <article
      key={activeId}
      className="j-reveal px-4 py-6 md:px-6 md:py-8"
      style={{ animation: 'engine-fadein 380ms cubic-bezier(0.2,0.7,0.2,1) both 120ms' }}
    >
      <div className="sheet-paper mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
        {/* label row */}
        <div className="mb-8 flex items-baseline justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-rain">
              Room III
            </p>
            <h3 className="headline mt-1 text-2xl text-ink md:text-3xl">
              Fashion Cake · the editorial
            </h3>
          </div>
          <a
            href={properties.cake.url}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 transition hover:text-ink"
          >
            the editorial ↗
          </a>
        </div>

        {/* image */}
        <div className="mb-10 overflow-hidden border border-ink/10">
          <SafeImage
            src="/engine/voice-cake.png"
            alt="Engraved banknote detail, Fashion Cake editorial"
            className="h-64 w-full object-cover md:h-80"
          />
        </div>

        {/* editorial caption — elegant italic, wide */}
        <p className="max-w-2xl text-2xl italic leading-relaxed text-ink/90 md:text-3xl">
          {ed.caption}
        </p>

        <p className="mt-5 text-lg italic text-ink/50">{ed.coda}</p>

        {/* source */}
        <div className="mt-8 border-t border-ink/10 pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
            src: {ed.source}
          </p>
        </div>
      </div>
    </article>
  )
}

export default function ReceiptsEngine() {
  const [active, setActive] = useState(receipts[0])
  const root = useReveal()

  const hem = madeOnHem(active)
  const poster = feefaPoster(active)
  const ed = fashionEditorial(active)

  return (
    <>
      {/* Keyframe for receipt-switch fade — injected once as a style tag. */}
      <style>{`
        @keyframes engine-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes engine-fadein {
            from { opacity: 1; transform: none; }
            to   { opacity: 1; transform: none; }
          }
        }
      `}</style>

      <div ref={root} className="grain min-h-screen tartan-canvas text-ink">

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <header className="px-4 py-6 md:px-6 md:py-8">
          <div className="sheet mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16">
            <Link
              to="/"
              className="mb-5 inline-block font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50 transition hover:text-ink"
            >
              ← MADE ON
            </Link>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
              Vancouver Made · MADE ON · not a sponsor
            </p>
            <h1 className="headline text-5xl leading-none text-ink md:text-7xl">
              WE MADE THE <span className="text-hazard">RECEIPT.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink/75 md:text-base">
              Pick a number this World Cup would rather keep off the jumbotron. Watch the same
              truth land three ways: stitched on a kit's hem, pasted up as a poster, shot like
              couture. Same receipt. Three rooms. Harder to look away.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em]">
              {Object.values(properties).map((p) => (
                <PropTag key={p.key} p={p} />
              ))}
            </div>
          </div>
        </header>

        {/* ── RECEIPT RAIL + BILLBOARD + SOURCE NOTE ──────────────────────── */}
        <section className="px-4 py-6 md:px-6 md:py-8">
          <div className="sheet mx-auto max-w-6xl">
            <ReceiptRail receipts={receipts} active={active} setActive={setActive} />
            <StatBillboard r={active} key={active.id + '-billboard'} />
            <div className="border-b border-ink/10 px-6 py-3 md:px-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">
                Source data: <code className="normal-case">src/data/receipts.js</code>. Every figure is public record,
                flagged for primary-source confirmation before publish.
              </p>
            </div>
          </div>
        </section>

        {/* ── THREE ROOMS ─────────────────────────────────────────────────── */}
        <HemCard hem={hem} activeId={active.id + '-hem'} />
        <PosterCard poster={poster} activeId={active.id + '-poster'} />
        <EditorialCard ed={ed} activeId={active.id + '-cake'} />

        {/* ── FOOTER / MANIFESTO ──────────────────────────────────────────── */}
        <footer className="px-4 py-6 md:px-6 md:py-8">
          <div className="sheet mx-auto max-w-4xl px-6 py-14 md:px-10">
            <div className="j-reveal">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.35em] text-cyan">
                Why we made this
              </p>
              <p className="max-w-3xl text-sm leading-relaxed text-ink/75 md:text-base">
                This isn't a protest about AI. AI's just the brush. The subject is greed,
                displacement, and who pays the public bill. They asked for the Vancouver story.
                We finished the sentence: made on stolen ground, made on Hogan's Alley, made on
                $729 million of public money. Everyone else made a souvenir. We made the receipt,
                and we put the source on the hem so you can check our math.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/40">
              <Link to="/" className="transition hover:text-ink">Pitch site</Link>
              <Link to="/tracker" className="transition hover:text-ink">Asset tracker</Link>
              <a href={properties.feefa.url} target="_blank" rel="noreferrer" className="transition hover:text-ink">
                feefa.ai ↗
              </a>
              <a href={properties.cake.url} target="_blank" rel="noreferrer" className="transition hover:text-ink">
                fashion cake ↗
              </a>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
