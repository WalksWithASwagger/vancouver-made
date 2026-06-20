import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { categories as storyCategories, entries as storyEntries } from '../data/hallOfFame.js'
import { categories as kitCategories, entries as kitEntries } from '../data/kitGallery.js'

// One accent per thread — drawn from the brand palette, lightly extended so the
// seven filters stay legible against ink.
const CAT_COLOR = {
  // The Whole Story
  'design-canon': '#d9a521',    // gold
  'protest-kits': '#ff3b00',    // hazard
  'athlete-protest': '#21d9c9', // cyan
  'olympics': '#8ab38f',        // brightened cedar
  'fifa-2026': '#f4f1ea',       // bone
  'subvertising': '#ff8a5b',    // coral
  'merch-swag': '#c6a4db',      // lilac
  // Best Kits
  'intl-classics': '#d9a521',   // gold
  'club-icons': '#21d9c9',      // cyan
  'keeper-weird': '#ff8a5b',    // coral
  'modern-fashion': '#c6a4db',  // lilac
}
const colorFor = (id) => CAT_COLOR[id] ?? '#f4f1ea'

const TABS = [
  { id: 'story', label: 'The Whole Story', categories: storyCategories, entries: storyEntries },
  { id: 'kits', label: 'Best Kits', categories: kitCategories, entries: kitEntries },
]
const LABELS = Object.fromEntries(
  [...storyCategories, ...kitCategories].map((c) => [c.id, c.label]),
)
const labelFor = (id) => LABELS[id] ?? id

function FilterButton({ active, color, label, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition"
      style={
        active
          ? { background: color, color: '#0a0a0a', borderColor: color }
          : { borderColor: `${color}99`, color }
      }
    >
      {label} <span className="opacity-50">{count}</span>
    </button>
  )
}

function ReferencePlaceholder({ entry, color, large }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center p-4 text-center"
      style={{ background: `linear-gradient(160deg, #0a0a0a 50%, ${color}26)` }}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[0.3em]"
        style={{ color }}
      >
        Reference ↗
      </span>
      <span
        className={`headline mt-2 leading-tight text-bone/85 ${large ? 'text-xl' : 'text-sm'}`}
      >
        {entry.title}
      </span>
      <span className="mt-2 font-mono text-[9px] uppercase tracking-wider text-bone/40">
        linked at source
      </span>
    </div>
  )
}

function Tile({ entry, onOpen }) {
  const [imgError, setImgError] = useState(false)
  const color = colorFor(entry.category)
  const hasImage = entry.src && !imgError

  return (
    <button
      type="button"
      onClick={() => onOpen(entry)}
      className="group block overflow-hidden border border-bone/15 bg-ink text-left transition hover:border-bone/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-rain/30">
        {hasImage ? (
          <img
            src={entry.src}
            alt={entry.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <ReferencePlaceholder entry={entry} color={color} />
        )}
        <span
          className="absolute left-2 top-2 inline-block h-2 w-2 rounded-full"
          style={{ background: color }}
          aria-hidden="true"
        />
        <span className="absolute right-2 top-2 bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] text-bone/75">
          {entry.year}
        </span>
      </div>

      <div className="p-3">
        <h3 className="headline text-sm leading-tight text-bone">{entry.title}</h3>
        <p
          className="mt-1 text-[10px] uppercase tracking-wider"
          style={{ color }}
        >
          {labelFor(entry.category)}
        </p>
        <p className="mt-1.5 text-[11px] leading-snug text-bone/60">{entry.why}</p>
      </div>
    </button>
  )
}

function Lightbox({ entry, onClose }) {
  useEffect(() => {
    if (!entry) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [entry, onClose])

  if (!entry) return null
  const color = colorFor(entry.category)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={entry.title}
    >
      <div
        className="relative grid max-h-[88vh] w-full max-w-5xl overflow-hidden border border-bone/20 bg-ink md:grid-cols-[1.4fr_1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex min-h-[38vh] items-center justify-center bg-rain/30 md:min-h-full">
          {entry.src ? (
            <img
              src={entry.src}
              alt={entry.title}
              className="max-h-[88vh] w-full object-contain"
            />
          ) : (
            <ReferencePlaceholder entry={entry} color={color} large />
          )}
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto p-6">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color }}
          >
            {labelFor(entry.category)} · {entry.year}
          </span>
          <h3 className="headline text-2xl leading-tight text-bone">{entry.title}</h3>
          <p className="text-sm leading-relaxed text-bone/85">{entry.why}</p>

          {entry.tags?.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {entry.tags.map((t) => (
                <span
                  key={t}
                  className="border border-bone/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-bone/55"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto space-y-2 border-t border-bone/10 pt-4">
            <p className="text-[11px] text-bone/50">{entry.rights}</p>
            <a
              href={entry.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[11px] font-bold uppercase tracking-wider"
              style={{ color }}
            >
              View source ↗
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-bone/20 bg-ink/70 text-bone/70 transition hover:border-bone/50 hover:text-bone"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default function HallOfFame() {
  const [tabId, setTabId] = useState('story')
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  const tab = TABS.find((t) => t.id === tabId)
  const { categories, entries } = tab

  const shown = useMemo(
    () => (filter === 'all' ? entries : entries.filter((e) => e.category === filter)),
    [filter, entries],
  )
  const localCount = entries.filter((e) => e.src).length

  const selectTab = (id) => {
    setTabId(id)
    setFilter('all')
  }

  return (
    <div className="grain min-h-screen bg-ink text-bone">
      {/* HEADER */}
      <section className="border-b border-bone/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan">
            Reference library · MADE ON
          </p>
          <h1 className="headline mt-2 text-4xl text-bone md:text-6xl">
            THE HALL OF <span className="text-hazard">FAME</span>
          </h1>

          {/* TABS */}
          <div className="mt-6 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTab(t.id)}
                className="border px-4 py-2 text-xs font-bold uppercase tracking-wider transition"
                style={
                  tabId === t.id
                    ? { background: '#ff3b00', color: '#0a0a0a', borderColor: '#ff3b00' }
                    : { borderColor: '#ff3b0066', color: '#f4f1ea' }
                }
              >
                {t.label} <span className="opacity-50">{t.entries.length}</span>
              </button>
            ))}
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-bone/70">
            {tabId === 'story'
              ? `The loudest podiums, the cleanest brand hijacks, the kits that refused to stay quiet — the lineage MADE ON draws from. ${entries.length} works across ${categories.length} threads, weighted toward protest.`
              : `The greatest jersey designs ever cut — protest and otherwise. ${entries.length} kits across ${categories.length} threads, from the Aztec calendar to the carbon-neutral terrace.`}
          </p>
          <p className="mt-3 max-w-2xl font-mono text-[11px] leading-relaxed text-bone/45">
            Rights-honest: {localCount} freely-licensed works archived here ·{' '}
            {entries.length - localCount} rights-restricted gems linked at source.
          </p>

          {/* FILTER */}
          <div className="mt-6 flex flex-wrap gap-2">
            <FilterButton
              active={filter === 'all'}
              color="#f4f1ea"
              label="All"
              count={entries.length}
              onClick={() => setFilter('all')}
            />
            {categories.map((c) => (
              <FilterButton
                key={c.id}
                active={filter === c.id}
                color={colorFor(c.id)}
                label={c.label}
                count={entries.filter((e) => e.category === c.id).length}
                onClick={() => setFilter(c.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((e) => (
              <Tile key={e.id} entry={e} onOpen={setActive} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-bone/10 px-6 py-10 text-center text-xs uppercase tracking-[0.3em] text-bone/40">
        <div className="mb-4 flex flex-wrap justify-center gap-6">
          <Link to="/" className="text-bone/60 transition hover:text-bone">
            Pitch Site
          </Link>
          <span className="text-bone/20">·</span>
          <Link to="/tracker" className="text-bone/60 transition hover:text-bone">
            Asset Tracker
          </Link>
          <span className="text-bone/20">·</span>
          <span className="text-bone">Hall of Fame</span>
        </div>
        All works © their respective holders · archived items under the noted licence ·
        shown for study and commentary.
      </footer>

      <Lightbox entry={active} onClose={() => setActive(null)} />
    </div>
  )
}
