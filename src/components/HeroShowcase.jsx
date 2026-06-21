import { useState, useEffect } from 'react'

// The hero: a slow crossfade through the flagship kits on a studio-white card
// (the source flats are on white, so they blend into the card seamlessly).
// Auto-advance pauses for reduced-motion.
// All four load eagerly: they're small and above the fold, and a lazy frame that
// isn't ready yet would let the outgoing kit linger under the new caption.
const SHOTS = [
  { src: '/gallery/pd-front.jpg', label: 'Pump & Dump FC' },
  { src: '/gallery/nw-front.jpg', label: 'Nardwuar FC' },
  { src: '/gallery/n5-away.jpg', label: 'Number Five Orange' },
  { src: '/gallery/pd-crest.jpg', label: 'The crest' },
]

export default function HeroShowcase() {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(0) // label index, lags to the crossfade midpoint

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((n) => (n + 1) % SHOTS.length), 3800)
    return () => clearInterval(t)
  }, [])

  // Swap the caption only once the new image is the dominant one, so the label
  // never names a kit that isn't on screen yet.
  useEffect(() => {
    const t = setTimeout(() => setShown(i), 350)
    return () => clearTimeout(t)
  }, [i])

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-ink/15 bg-gradient-to-b from-white to-zinc-200 shadow-2xl">
      {SHOTS.map((s, n) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.label}
          loading="eager"
          className={
            'absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ' +
            (n === i ? 'opacity-100' : 'opacity-0')
          }
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/85 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-bone backdrop-blur">
        <span className="font-bold text-hazard">{SHOTS[shown].label}</span>
        <span className="flex gap-1.5">
          {SHOTS.map((s, n) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show ${s.label}`}
              className={'h-1.5 w-1.5 rounded-full transition ' + (n === i ? 'bg-hazard' : 'bg-bone/40 hover:bg-bone/70')}
            />
          ))}
        </span>
      </div>
    </div>
  )
}
