import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Persistent top nav across the pitch surfaces, so /, /engine and /hall-of-fame
// read as one site instead of three siloed pages. In-page anchors (/#id) are
// resolved by the scroll-to-hash effect in App's PitchLayout.
const LINKS = [
  { label: 'The Journey', to: '/journey' },
  { label: 'The Gallery', to: '/gallery' },
  { label: 'Awards', to: '/awards' },
  { label: 'The Collection', to: '/#collection' },
  { label: 'Hero Kits', to: '/#hero-kits' },
  { label: 'The Receipts', to: '/engine' },
  { label: 'Store', to: '/store' },
  { label: 'Reel', to: '/highlight-reel' },
  { label: 'Wall', to: '/wall' },
  { label: 'Process', to: '/process' },
  { label: 'Hall of Fame', to: '/hall-of-fame' },
]

function isActive(pathname, to) {
  const path = to.split('#')[0] || '/'
  if (path === '/') return false // home anchors shouldn't claim "active"
  return pathname === path
}

export default function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="nav-tartan sticky top-0 z-50 border-b-2 border-ink">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-6">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="headline text-sm tracking-tight text-bone transition hover:text-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          MADE <span className="text-hazard">ON</span>
        </Link>

        {/* desktop */}
        <ul className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.2em] md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                aria-current={isActive(pathname, l.to) ? 'page' : undefined}
                className={
                  'transition hover:text-bone focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink ' +
                  (isActive(pathname, l.to) ? 'text-gold' : 'text-bone/70')
                }
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-xs uppercase tracking-[0.2em] text-bone/80 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:hidden"
        >
          {open ? '✕ Close' : 'Menu ☰'}
        </button>
      </nav>

      {/* mobile drawer */}
      {open && (
        <ul className="nav-tartan border-t border-bone/15 px-5 pb-4 pt-1 text-xs uppercase tracking-[0.2em] md:hidden">
          {LINKS.map((l) => (
            <li key={l.to} className="border-b border-bone/10">
              <Link
                to={l.to}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, l.to) ? 'page' : undefined}
                className={
                  'block py-3 transition hover:text-bone focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink ' +
                  (isActive(pathname, l.to) ? 'text-gold' : 'text-bone/75')
                }
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
