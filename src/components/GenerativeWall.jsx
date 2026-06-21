// THE DEVELOP — a generative, looping studio wall built from every MADE ON
// generation. Three phases over a ~3-min loop, re-seeded each cycle:
//   STORM   — moodboards + graphic marks tile up: the raw generative chaos
//   RESOLVE — the chaos settles into the hero flats, concept by concept
//   WEAR    — the kits in the world (lifestyle / on-body)
// Manifest staged by scripts/stage-wall-assets.mjs → /wall/manifest.json.
//
// Robust design: a FIXED pool of N self-recycling slots. Each slot always holds
// one tile; when its develop→hold→fade animation ends it picks a fresh image +
// position from the current phase. CSS animations (and animationend) keep running
// even when the tab is backgrounded, so the wall never goes empty. ?record=1 hides
// the HUD for clean capture.

import { useState, useEffect, useRef } from 'react'
import './GenerativeWall.css'

const RECORD =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('record') === '1'

const LOOP_MS = 180000
const STORM_END = 0.52 // ~94s
const RESOLVE_END = 0.86 // ~155s
const N = 42 // live tiles

const rnd = (a, b) => a + Math.random() * (b - a)
const pick = (arr) => arr[(Math.random() * arr.length) | 0]
const clampIdx = (x, len) => Math.max(0, Math.min(len - 1, x | 0))

export default function GenerativeWall() {
  const [m, setM] = useState(null)
  const [slots, setSlots] = useState([])
  const [hud, setHud] = useState({ phase: 'storm', title: 'DEVELOPING', sub: 'moodboards · graphic marks', base: '#14141a' })
  const start = useRef(0)
  const mk = useRef(null)

  useEffect(() => {
    fetch('/wall/manifest.json')
      .then((r) => r.json())
      .then(setM)
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!m) return
    const storm = [...m.mood, ...m.mark]
    const flats = Object.keys(m.flat).filter((c) => m.flat[c]?.length)
    const wears = Object.keys(m.wear).filter((c) => m.wear[c]?.length)
    const pal = (c) => (m.groups[c] || m.groups.unsorted).palette
    const titleOf = (c) => (m.groups[c] || m.groups.unsorted).title
    start.current = performance.now()

    // build a fresh tile config from whatever phase we're in right now
    mk.current = () => {
      const t = ((performance.now() - start.current) % LOOP_MS) / LOOP_MS
      let src, concept, wR, life, central
      if (t < STORM_END) {
        const it = pick(storm)
        src = it.src
        concept = it.concept
        wR = [150, 330]
        life = [4200, 7200]
        central = false
      } else if (t < RESOLVE_END) {
        const rp = (t - STORM_END) / (RESOLVE_END - STORM_END)
        concept = flats[clampIdx(rp * flats.length, flats.length)]
        src = pick(m.flat[concept])
        wR = [300, 540]
        life = [6000, 9000]
        central = true
      } else {
        const wp = (t - RESOLVE_END) / (1 - RESOLVE_END)
        concept = wears[clampIdx(wp * wears.length, wears.length)] || wears[0]
        src = pick(m.wear[concept])
        wR = [440, 720]
        life = [7500, 10500]
        central = true
      }
      return {
        src,
        accent: pal(concept).accent,
        w: rnd(wR[0], wR[1]),
        left: central ? rnd(8, 92) : rnd(-3, 97),
        top: central ? rnd(16, 68) : rnd(-4, 96),
        rot: central ? rnd(-3, 3) : rnd(-9, 9),
        lifeMs: rnd(life[0], life[1]),
      }
    }

    // seed N slots with staggered negative delays so they don't pulse in sync
    setSlots(Array.from({ length: N }, (_, id) => ({ id, gen: 0, delay: -rnd(0, 6000), ...mk.current() })))

    // slow HUD/phase clock (throttling when hidden is fine — it just lags)
    const iv = setInterval(() => {
      const t = ((performance.now() - start.current) % LOOP_MS) / LOOP_MS
      if (t < STORM_END) setHud({ phase: 'storm', title: 'DEVELOPING', sub: 'moodboards · graphic marks', base: '#14141a' })
      else if (t < RESOLVE_END) {
        const c = flats[clampIdx(((t - STORM_END) / (RESOLVE_END - STORM_END)) * flats.length, flats.length)]
        setHud({ phase: 'resolve', title: titleOf(c), sub: 'the kit resolves', base: pal(c).base })
      } else {
        const c = wears[clampIdx(((t - RESOLVE_END) / (1 - RESOLVE_END)) * wears.length, wears.length)] || wears[0]
        setHud({ phase: 'wear', title: titleOf(c), sub: 'in the world', base: pal(c).base })
      }
    }, 400)
    return () => clearInterval(iv)
  }, [m])

  const recycle = (id, animName) => {
    if (animName !== 'wall-tile' || !mk.current) return // ignore the inner drift's end
    setSlots((prev) => prev.map((s) => (s.id === id ? { id, gen: s.gen + 1, delay: 0, ...mk.current() } : s)))
  }

  if (!m) {
    return (
      <div className="grain fixed inset-0 flex items-center justify-center bg-ink text-[11px] uppercase tracking-[0.3em] text-bone/40">
        Loading the wall…
      </div>
    )
  }

  return (
    <div className="grain fixed inset-0 overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-[2500ms]"
        style={{ background: `radial-gradient(125% 125% at 50% 42%, ${hud.base}33 0%, #050505 80%)` }}
      />

      {slots.map((s) => (
        <div
          key={`${s.id}-${s.gen}`}
          className="wall-tile absolute"
          onAnimationEnd={(e) => recycle(s.id, e.animationName)}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.w}px`,
            transform: `translate(-50%, -50%) rotate(${s.rot}deg)`,
            animationDuration: `${s.lifeMs}ms`,
            animationDelay: `${s.delay}ms`,
          }}
        >
          <img
            src={s.src}
            alt=""
            className="wall-img block w-full rounded-sm"
            style={{ animationDuration: `${s.lifeMs}ms`, boxShadow: `0 8px 40px #000a, 0 0 0 1px ${s.accent}55` }}
          />
        </div>
      ))}

      {!RECORD && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-6 md:p-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-bone/50">MADE ON · the develop</p>
            <h2 className="headline text-3xl text-bone md:text-5xl">{hud.title}</h2>
            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-hazard">{hud.sub}</p>
          </div>
          <p className="hidden text-right text-[10px] uppercase tracking-[0.3em] text-bone/40 md:block">
            everyone else made a souvenir
            <br />
            we made the receipt
          </p>
        </div>
      )}
    </div>
  )
}
