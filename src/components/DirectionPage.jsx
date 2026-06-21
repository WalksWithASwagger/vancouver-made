// Direction landing page — scrollytelling case-study for a single kit direction.
// Driven entirely by a direction manifest (src/data/directions/*.js).
// Pattern sources: Journey.jsx (reveal hook), Gallery.jsx (lightbox), Clubs.jsx (who-benefits).

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Journey.css'

// ── Reveal-on-scroll ─────────────────────────────────────────────────────────
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

// ── Shared lightbox ───────────────────────────────────────────────────────────
// images = [{ src, caption }]; active = index | null; setActive = fn
function Lightbox({ images, active, setActive }) {
  const len = images.length

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      else if (e.key === 'ArrowRight') setActive((i) => (i + 1) % len)
      else if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + len) % len)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, len, setActive])

  if (active === null) return null
  const cur = images[active]

  return (
    <div
      onClick={() => setActive(null)}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={cur.caption}
    >
      <button
        onClick={(e) => { e.stopPropagation(); setActive((i) => (i - 1 + len) % len) }}
        className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-4 text-3xl text-bone/50 transition hover:text-bone"
        aria-label="Previous"
      >
        ‹
      </button>
      <figure onClick={(e) => e.stopPropagation()} className="flex max-h-full max-w-5xl flex-col items-center">
        <img
          src={cur.src}
          alt={cur.caption}
          className="max-h-[82vh] w-auto rounded object-contain"
        />
        <figcaption className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-bone/60">
          {cur.caption}
        </figcaption>
      </figure>
      <button
        onClick={(e) => { e.stopPropagation(); setActive((i) => (i + 1) % len) }}
        className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-4 text-3xl text-bone/50 transition hover:text-bone"
        aria-label="Next"
      >
        ›
      </button>
      <button
        onClick={() => setActive(null)}
        className="absolute right-4 top-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50 transition hover:text-bone"
        aria-label="Close lightbox"
      >
        Close ✕
      </button>
      <span className="absolute bottom-4 right-6 font-mono text-[10px] text-bone/30">
        {active + 1} / {len}
      </span>
    </div>
  )
}

// ── Small reusable atoms ─────────────────────────────────────────────────────
function Eyebrow({ children, color }) {
  return (
    <p
      className="mb-3 font-mono text-[11px] uppercase tracking-[0.35em]"
      style={{ color: color ?? 'var(--cyan, #0f857a)' }}
    >
      {children}
    </p>
  )
}

function SectionDivider() {
  return <div className="tartan h-[6px] w-full" aria-hidden="true" />
}

// ── Section: HERO ─────────────────────────────────────────────────────────────
function HeroSection({ data }) {
  return (
    <section className="relative flex min-h-[92svh] w-full flex-col justify-between overflow-hidden">
      {/* full-bleed hero image on dark tartan ground */}
      <div className="absolute inset-0 tartan-dark">
        <img
          src={data.hero.image}
          alt={`${data.name} kit — hero`}
          className="h-full w-full object-cover object-center opacity-70 transition-opacity duration-700"
          style={{ mixBlendMode: 'luminosity' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0208]/95 via-[#1a0208]/55 to-[#1a0208]/30" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-between p-6 md:p-12">
        {/* eyebrow */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-bone/60">
            {data.hero.eyebrow ?? 'Design direction'} · No.{data.number}
          </p>
        </div>

        {/* body copy */}
        <div className="max-w-4xl">
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.25em] text-hazard">
            № {data.number} · {data.kitName}
          </p>
          <h1 className="headline text-5xl leading-[0.9] text-bone md:text-8xl">
            {data.name}
          </h1>
          <p className="mt-5 max-w-xl font-mono text-sm italic leading-relaxed text-bone/75 md:text-base">
            "{data.tagline}"
          </p>
          {data.award && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
              {data.award}
            </p>
          )}
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bone/65 md:text-base">
            {data.hero.line}
          </p>
        </div>

        {/* scroll cue */}
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40">
          Scroll to explore ↓
        </p>
      </div>
    </section>
  )
}

// ── Section: THE PROVOCATION ──────────────────────────────────────────────────
function ProvocationSection({ concept, palette }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <div className="j-reveal">
        <Eyebrow>The provocation</Eyebrow>
        <h2 className="headline text-3xl text-ink md:text-5xl" style={{ color: palette.base }}>
          THE TARGET
        </h2>
        <p className="mt-2 max-w-lg font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
          {concept.target}
        </p>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink/85 md:text-base">
          {concept.summary}
        </p>
      </div>

      {/* WHO BENEFITS / WHO PAYS — mirrors Clubs.jsx layout */}
      <div
        className="j-reveal mt-10 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 text-sm"
        style={{ borderColor: `${palette.base}30` }}
      >
        <div className="bg-bone p-5 md:p-7">
          <p
            className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: palette.signal ?? '#b8841a' }}
          >
            Who benefits ↑
          </p>
          <ul className="space-y-2 text-xs text-ink/75 md:text-sm">
            {concept.whoBenefits.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span className="mt-0.5 text-[10px]" style={{ color: palette.signal ?? '#b8841a' }}>↑</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-paper p-5 md:p-7">
          <p
            className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: palette.accent ?? '#d11f2a' }}
          >
            Who pays ↓
          </p>
          <ul className="space-y-2 text-xs text-ink/75 md:text-sm">
            {concept.whoPays.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span className="mt-0.5 text-[10px]" style={{ color: palette.accent ?? '#d11f2a' }}>↓</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ── Section: THE KIT UP CLOSE ────────────────────────────────────────────────
function KitSection({ kit, palette }) {
  const allImages = [...kit.flats, ...kit.details]
  const [active, setActive] = useState(null)

  return (
    <section className="border-t border-ink/10 bg-paper">
      <Lightbox images={allImages} active={active} setActive={setActive} />
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="j-reveal mb-12">
          <Eyebrow>The kit, up close</Eyebrow>
          <h2 className="headline text-3xl text-ink md:text-5xl">THE WORK</h2>
        </div>

        {/* hero flats — front / back / 3D large */}
        <div className="j-reveal grid gap-4 md:grid-cols-3">
          {kit.flats.map((img, i) => (
            <figure
              key={img.src}
              onClick={() => setActive(i)}
              className="group cursor-pointer overflow-hidden border border-ink/12 bg-bone shadow-sm"
              style={{ borderColor: `${palette.base}22` }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-ink/[0.03]">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04] group-hover:opacity-90"
                />
              </div>
              <figcaption className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/50">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* craft details gallery */}
        <div className="j-reveal mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {kit.details.map((img, i) => (
            <figure
              key={img.src}
              onClick={() => setActive(kit.flats.length + i)}
              className="group cursor-pointer overflow-hidden border border-ink/12 bg-bone"
              style={{ borderColor: `${palette.base}18` }}
            >
              <div className="aspect-square overflow-hidden bg-ink/[0.03]">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-400 group-hover:scale-[1.05]"
                />
              </div>
              <figcaption className="px-2 py-1.5 font-mono text-[9px] uppercase leading-snug tracking-[0.12em] text-ink/45">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Section: ON THE BODY ──────────────────────────────────────────────────────
function LifestyleSection({ lifestyle, palette }) {
  const [active, setActive] = useState(null)

  // Varied column spans for editorial masonry feel (3-col grid, span 2 on alternates)
  const spanMap = [2, 1, 1, 2, 1, 2, 1, 1]

  return (
    <section className="border-t border-ink/10">
      <Lightbox images={lifestyle} active={active} setActive={setActive} />
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="j-reveal mb-12">
          <Eyebrow color={palette.signal ?? '#b8841a'}>On the body</Eyebrow>
          <h2 className="headline text-3xl text-ink md:text-5xl">THE LOOKBOOK</h2>
          <p className="mt-3 max-w-lg font-mono text-[11px] text-ink/50">
            Click any frame to enlarge. ←→ to navigate.
          </p>
        </div>

        <div className="j-reveal grid grid-cols-2 gap-3 md:grid-cols-3">
          {lifestyle.map((img, i) => {
            const span = spanMap[i % spanMap.length]
            return (
              <figure
                key={img.src}
                onClick={() => setActive(i)}
                className={
                  'group cursor-pointer overflow-hidden border border-ink/10 bg-ink/[0.03] shadow-sm ' +
                  (span === 2 ? 'col-span-2 md:col-span-2' : '')
                }
              >
                <div className={span === 2 ? 'aspect-[2/1]' : 'aspect-square'} style={{ overflow: 'hidden' }}>
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04] group-hover:brightness-[0.92]"
                  />
                </div>
                <figcaption className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45">
                  {img.caption}
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Section: THE SYSTEM ────────────────────────────────────────────────────────
function CollectionSection({ collection, palette }) {
  const [active, setActive] = useState(null)

  return (
    <section className="border-t border-ink/10 bg-paper">
      <Lightbox images={collection} active={active} setActive={setActive} />
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="j-reveal mb-10">
          <Eyebrow color={palette.base}>The system</Eyebrow>
          <h2 className="headline text-3xl text-ink md:text-5xl">THE COLLECTION</h2>
        </div>

        <div className="j-reveal grid grid-cols-2 gap-3 sm:grid-cols-3">
          {collection.map((img, i) => (
            <figure
              key={img.src}
              onClick={() => setActive(i)}
              className="group cursor-pointer overflow-hidden border border-ink/12 bg-bone shadow-sm"
              style={{ borderColor: `${palette.base}1a` }}
            >
              <div className="aspect-square overflow-hidden bg-ink/[0.03]">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Section: THE METHOD ────────────────────────────────────────────────────────
function ProcessSection({ process, palette }) {
  return (
    <section className="border-t border-ink/10">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="j-reveal mb-14">
          <Eyebrow color="#0f857a">The method</Eyebrow>
          <h2 className="headline text-3xl text-ink md:text-5xl">HOW IT GOT MADE</h2>
          <p className="mt-6 max-w-2xl text-sm italic leading-relaxed text-ink/80 md:text-base">
            "{process.line}"
          </p>
        </div>

        {/* numbered vertical timeline */}
        <ol className="j-reveal relative space-y-0 pl-0">
          {process.steps.map((step, i) => (
            <li key={step.label} className="relative flex gap-6 pb-12 last:pb-0">
              {/* vertical rule */}
              {i < process.steps.length - 1 && (
                <div
                  className="absolute left-[17px] top-8 bottom-0 w-px"
                  style={{ background: `${palette.base}30` }}
                  aria-hidden="true"
                />
              )}
              {/* step number node */}
              <div
                className="relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border-2 font-mono text-[10px] font-bold"
                style={{ borderColor: palette.base, color: palette.base, background: '#f4f1ea' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <p
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: palette.base }}
                >
                  {step.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* faux sponsor bank */}
        {process.sponsorBank?.length > 0 && (
          <div className="j-reveal mt-14">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/35">
              Faux sponsor bank
            </p>
            <div className="flex flex-wrap gap-2">
              {process.sponsorBank.map((s) => (
                <span
                  key={s}
                  className="border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
                  style={{ borderColor: palette.base, color: palette.base }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ── Section: THE RECEIPTS ─────────────────────────────────────────────────────
function CitationsSection({ citations, palette }) {
  return (
    <section className="border-t border-ink/10 tartan-dark">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="j-reveal mb-10">
          <Eyebrow color="#e8c531">The receipts</Eyebrow>
          <h2 className="headline text-3xl text-bone md:text-5xl">CITED.</h2>
          <p className="mt-3 font-mono text-[11px] text-bone/40">
            Every claim sourced. The kit is the receipt — here's the paper trail.
          </p>
        </div>

        <ul className="j-reveal space-y-4">
          {citations.map((c) => (
            <li
              key={c.id}
              className="border border-bone/10 bg-bone/[0.04] p-5 font-mono"
            >
              <p
                className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ color: palette.signal ?? '#e8c531' }}
              >
                {c.id}
              </p>
              <p className="text-xs leading-relaxed text-bone/75">{c.claim}</p>
              {c.source && (
                <p className="mt-2 text-[10px] text-bone/40">Source: {c.source}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── Section: ETHICS ────────────────────────────────────────────────────────────
function EthicsSection({ ethics }) {
  return (
    <section className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="j-reveal border border-gold/30 bg-bone p-6 md:p-8">
          <Eyebrow color="#b8841a">Ethics note</Eyebrow>
          <p className="text-sm leading-relaxed text-ink/80 md:text-base">{ethics}</p>
        </div>
      </div>
    </section>
  )
}

// ── Section: FOOTER ────────────────────────────────────────────────────────────
function DirectionFooter({ name }) {
  return (
    <footer className="border-t border-ink/10 bg-bone px-6 py-12 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/30">
        {name} · Vancouver Made · MADE ON
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-[0.2em]">
        <Link to="/" className="text-ink/55 transition hover:text-hazard">
          ← Pitch site
        </Link>
        <span className="text-ink/20">·</span>
        <Link to="/store" className="text-ink/55 transition hover:text-ink">
          The store →
        </Link>
        <span className="text-ink/20">·</span>
        <Link to="/gallery" className="text-ink/55 transition hover:text-ink">
          Gallery →
        </Link>
      </div>
      <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.25em] text-ink/25">
        Everyone else made a souvenir. We made the receipt.
      </p>
    </footer>
  )
}

// ── Root component ─────────────────────────────────────────────────────────────
export default function DirectionPage({ data }) {
  const root = useReveal()

  return (
    <div ref={root} className="grain min-h-screen bg-bone text-ink">
      <HeroSection data={data} />

      <SectionDivider />

      <ProvocationSection concept={data.concept} palette={data.palette} />

      <SectionDivider />

      <KitSection kit={data.kit} palette={data.palette} />

      <SectionDivider />

      <LifestyleSection lifestyle={data.lifestyle} palette={data.palette} />

      <SectionDivider />

      <CollectionSection collection={data.collection} palette={data.palette} />

      <SectionDivider />

      <ProcessSection process={data.process} palette={data.palette} />

      <SectionDivider />

      <CitationsSection citations={data.citations} palette={data.palette} />

      <SectionDivider />

      {data.ethics && <EthicsSection ethics={data.ethics} />}

      <DirectionFooter name={data.name} />
    </div>
  )
}
