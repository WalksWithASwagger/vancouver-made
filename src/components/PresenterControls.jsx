import { useEffect, useState } from 'react'

// Demo affordances for walking an audience through the pitch on `/`:
// a top scroll-progress bar + ←/→ (and ↑/↓) to jump between sections.
const SECTIONS = ['hero', 'the-move', 'collection', 'hero-kits', 'clubs', 'why-it-wins']

export default function PresenterControls() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const root = document.documentElement
    const onScroll = () => {
      const max = root.scrollHeight - root.clientHeight
      setPct(max > 0 ? Math.min(100, (root.scrollTop / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.target?.matches?.('input, textarea, select, [contenteditable]')) return
      const fwd = e.key === 'ArrowRight' || e.key === 'ArrowDown'
      const back = e.key === 'ArrowLeft' || e.key === 'ArrowUp'
      if (!fwd && !back) return

      // current section = the last one whose top has passed the viewport top
      let cur = 0
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 8) cur = i
      })
      const next = Math.min(SECTIONS.length - 1, Math.max(0, cur + (fwd ? 1 : -1)))
      const el = document.getElementById(SECTIONS[next])
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-hazard transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
