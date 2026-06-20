// MADE ON — full-screen cinematic highlight reel. Auto-advancing, CSS-only motion.
// Beats come from src/data/highlightReel.js; flagships render the live KitFlat SVG.
// ?record=1 → clean single-pass capture mode (no chrome) for the mp4 export.

import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import beats from '../data/highlightReel.js'
import { heroKits } from '../data/heroKits.js'
import KitFlat from './KitFlat.jsx'

const RECORD =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('record') === '1'

const REDUCED =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

const beatMs = (beat) => (REDUCED && !RECORD ? beat.ms + 1000 : beat.ms)
const motionClass = (beat) =>
  beat.motion === 'kenburns-in' ? 'kb-in' : beat.motion === 'kenburns-pan' ? 'kb-pan' : ''

export default function HighlightReel() {
  const navigate = useNavigate()
  const total = beats.length
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [hasAudio, setHasAudio] = useState(true)
  const [chrome, setChrome] = useState(!RECORD)
  const audioRef = useRef(null)
  const idle = useRef(null)

  const beat = beats[index]
  const pal = beat.palette
  const kitObj = beat.kind === 'kitflat' ? heroKits.find((k) => k.id === beat.kitId) : null
  const centered = beat.kind === 'title' || beat.kind === 'outro' || beat.kind === 'slogans'

  // Auto-advance (per-beat duration → setTimeout, not setInterval). Loops; single
  // pass + stop in record mode so the capture has a clean start and end.
  useEffect(() => {
    if (!playing) return
    const id = setTimeout(() => {
      setIndex((i) => {
        const nextI = i + 1
        if (nextI >= total) {
          if (RECORD) {
            window.__REEL_DONE__ = true
            setPlaying(false)
            return i
          }
          return 0
        }
        return nextI
      })
    }, beatMs(beat))
    return () => clearTimeout(id)
  }, [index, playing, beat, total])

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total])
  const restart = useCallback(() => {
    setIndex(0)
    setPlaying(true)
  }, [])
  const exit = useCallback(() => navigate('/'), [navigate])

  // Keyboard: space/k play-pause, arrows seek, r restart, esc/q exit.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault()
        setPlaying((p) => !p)
      } else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'r') restart()
      else if (e.key === 'Escape' || e.key === 'q') exit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, restart, exit])

  // Lock page scroll while the player owns the screen.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  // Expose the current beat index for deterministic capture/export tooling.
  useEffect(() => {
    window.__REEL_INDEX__ = index
  }, [index])

  // Idle-fade the control chrome.
  const wake = useCallback(() => {
    if (RECORD) return
    setChrome(true)
    clearTimeout(idle.current)
    idle.current = setTimeout(() => setChrome(false), 2600)
  }, [])
  useEffect(() => {
    wake()
    return () => clearTimeout(idle.current)
  }, [index, wake])

  const toggleSound = useCallback((e) => {
    e.stopPropagation()
    const a = audioRef.current
    if (!a) return
    a.muted = !a.muted
    if (!a.muted) a.play().catch(() => {})
    setMuted(a.muted)
  }, [])

  return (
    <div
      className="grain fixed inset-0 select-none overflow-hidden text-bone"
      style={{ background: `radial-gradient(125% 125% at 50% 28%, ${pal.base} 0%, ${pal.ink} 76%)` }}
      onClick={() => setPlaying((p) => !p)}
      onMouseMove={wake}
    >
      <audio
        ref={audioRef}
        src="/highlight-reel/audio/reel.mp3"
        autoPlay
        loop
        muted
        onError={() => setHasAudio(false)}
      />

      {/* ── Visual layer (keyed → CSS animations restart each beat) ── */}
      {beat.kind === 'image' && (
        <div className="absolute inset-0">
          <img
            src={beat.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-10">
            <img
              key={index}
              src={beat.image}
              alt={beat.title || beat.eyebrow || 'MADE ON design'}
              className={`reel-img max-h-full max-w-full object-contain drop-shadow-2xl ${motionClass(beat)}`}
              style={{ animationDuration: `${beat.ms}ms` }}
            />
          </div>
        </div>
      )}

      {beat.kind === 'kitflat' && kitObj && (
        <div className="absolute inset-0">
          {beat.texture && (
            <img
              src={beat.texture}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-xl"
            />
          )}
          <div className="absolute inset-0 flex items-start justify-center px-6 pt-[7vh] md:pt-[9vh]">
            <div
              key={index}
              className="reel-rise w-[min(82vw,500px)] rounded-2xl border p-5 shadow-2xl md:p-7"
              style={{ borderColor: `${pal.accent}55`, background: `${pal.ink}cc` }}
            >
              <KitFlat kit={kitObj} />
              <p
                className="mt-3 text-center text-[10px] uppercase tracking-[0.3em]"
                style={{ color: `${pal.signal}aa` }}
              >
                Code-drawn flat · live from spec
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Type overlay ── */}
      {centered ? (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          {beat.kind === 'slogans' ? (
            <div className="flex flex-col items-center gap-2 md:gap-3">
              {beat.slogans.map((s, i) => (
                <p
                  key={`${index}-${i}`}
                  className="headline reel-rise text-xl md:text-4xl"
                  style={{ animationDelay: `${i * 110}ms`, color: i % 2 ? pal.signal : '#f4f1ea' }}
                >
                  {s}
                </p>
              ))}
            </div>
          ) : (
            <div key={index} className="reel-punch max-w-4xl">
              {beat.eyebrow && (
                <p
                  className="mb-3 text-xs font-bold uppercase tracking-[0.4em] md:text-sm"
                  style={{ color: pal.signal }}
                >
                  {beat.eyebrow}
                </p>
              )}
              {beat.title && (
                <h1 className="headline text-5xl text-bone md:text-8xl">{beat.title}</h1>
              )}
              {beat.line && (
                <p className="mx-auto mt-5 max-w-2xl text-base md:text-2xl" style={{ color: pal.accent }}>
                  {beat.line}
                </p>
              )}
              {beat.receipt && (
                <p
                  className="mt-6 inline-block border px-4 py-2 font-mono text-[11px] tracking-wide md:text-sm"
                  style={{ borderColor: `${pal.accent}66`, color: '#f4f1ea', background: '#0a0a0a99' }}
                >
                  {beat.receipt}
                </p>
              )}
              {beat.slogan && (
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-hazard md:text-sm">
                  {beat.slogan}
                </p>
              )}
              {beat.credit && (
                <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-bone/40">
                  {beat.credit}
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 pb-10 md:p-12 md:pb-16">
          <div key={index} className="reel-rise max-w-4xl">
            {beat.eyebrow && (
              <p
                className="mb-2 text-[11px] font-bold uppercase tracking-[0.35em] md:text-xs"
                style={{ color: pal.signal }}
              >
                {beat.eyebrow}
              </p>
            )}
            {beat.title && (
              <h2 className="headline text-4xl text-bone md:text-7xl">{beat.title}</h2>
            )}
            {beat.line && (
              <p className="mt-3 text-lg md:text-2xl" style={{ color: pal.accent }}>
                {beat.line}
              </p>
            )}
            {beat.receipt && (
              <p
                className="mt-4 inline-block border px-3 py-1.5 font-mono text-[11px] tracking-wide md:text-sm"
                style={{ borderColor: `${pal.accent}66`, color: '#f4f1ea', background: '#0a0a0aaa' }}
              >
                {beat.receipt}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Chrome (hidden in record mode) ── */}
      {!RECORD && (
        <div
          className="transition-opacity duration-500"
          style={{ opacity: chrome ? 1 : 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* progress segments */}
          <div className="absolute inset-x-0 top-0 z-30 flex gap-1 p-3">
            {beats.map((b, i) => (
              <div key={b.id} className="h-[3px] flex-1 overflow-hidden rounded bg-white/15">
                {i < index && <div className="h-full w-full bg-white/80" />}
                {i === index && (
                  <div
                    key={index}
                    className="reel-bar-fill h-full w-full bg-white/90"
                    style={{ animationDuration: `${beat.ms}ms`, animationPlayState: playing ? 'running' : 'paused' }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* exit */}
          <button
            onClick={exit}
            className="absolute right-4 top-6 z-30 border border-bone/30 bg-ink/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] text-bone/70 transition hover:text-bone"
          >
            ✕ Pitch site
          </button>

          {/* transport */}
          <div className="absolute inset-x-0 bottom-5 z-30 flex items-center justify-center gap-3 text-bone/80">
            <Ctl label="⟸" onClick={prev} title="Previous" />
            <Ctl label={playing ? '❚❚' : '▶'} onClick={() => setPlaying((p) => !p)} title="Play / pause" wide />
            <Ctl label="⟹" onClick={next} title="Next" />
            <Ctl label="↻" onClick={restart} title="Restart" />
            {hasAudio && (
              <Ctl label={muted ? '♪ off' : '♪ on'} onClick={toggleSound} title="Sound" wide />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Ctl({ label, onClick, title, wide }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick(e)
      }}
      title={title}
      className={`border border-bone/25 bg-ink/70 py-2 text-xs uppercase tracking-widest text-bone/80 transition hover:border-bone/60 hover:text-bone ${
        wide ? 'px-4' : 'px-3'
      }`}
    >
      {label}
    </button>
  )
}
