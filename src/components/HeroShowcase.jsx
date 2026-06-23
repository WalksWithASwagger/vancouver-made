import { useState, useEffect } from 'react'

// The hero showcase: a slow cinematic crossfade through the flagship kits on a dark
// "lightbox" stage (matching the KitGateway), with a colorway glow that shifts per kit
// and a gentle Ken Burns drift on the active frame. Auto-advance + drift pause for
// reduced motion. Same gallery renders the gateway uses (full-frame, object-cover).
const SHOTS = [
  { src: '/gallery/nw-front.jpg', label: 'Nardwuar FC', accent: '#c8102e' },
  { src: '/gallery/cc-front.jpg', label: 'China Creek', accent: '#1f9e8a' },
  { src: '/gallery/pd-front.jpg', label: 'Pump & Dump FC', accent: '#21f0d0' },
  { src: '/gallery/n5-away.jpg', label: 'Number Five Orange', accent: '#ff6a00' },
  { src: '/gallery/pd-crest.jpg', label: 'The crest', accent: '#b8841a' },
]

export default function HeroShowcase() {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(0) // label index, lags to the crossfade midpoint

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((n) => (n + 1) % SHOTS.length), 4200)
    return () => clearInterval(t)
  }, [])

  // Swap the caption only once the new image is the dominant one, so the label
  // never names a kit that isn't on screen yet.
  useEffect(() => {
    const t = setTimeout(() => setShown(i), 350)
    return () => clearTimeout(t)
  }, [i])

  const accent = SHOTS[shown].accent

  return (
    <div
      className="hero-stage relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-ink/15 shadow-2xl"
      style={{ '--glow': `${accent}40` }}
    >
      {SHOTS.map((s, n) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.label}
          loading="eager"
          className={
            'hero-shot absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ' +
            (n === i ? 'opacity-100 is-active' : 'opacity-0')
          }
        />
      ))}

      {/* caption + colorway dots */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/85 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-bone backdrop-blur">
        <span className="flex items-center gap-2 font-bold">
          <span className="h-2 w-2 rounded-full" style={{ background: accent }} aria-hidden="true" />
          {SHOTS[shown].label}
        </span>
        <span className="flex gap-1.5">
          {SHOTS.map((s, n) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show ${s.label}`}
              className={
                'h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone ' +
                (n === i ? 'w-5 bg-hazard' : 'w-1.5 bg-bone/40 hover:bg-bone/70')
              }
            />
          ))}
        </span>
      </div>
    </div>
  )
}
