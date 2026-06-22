import { Link } from 'react-router-dom'
import { clubs } from '../data/clubs.js'
import { getDirection } from '../data/directions/index.js'
import Crest from './Crest.jsx'

function ClubCard({ club }) {
  const { palette } = club
  const hasPage = Boolean(getDirection(club.id))
  const isWinner = club.id === 'nardwuar-fc'

  const inner = (
    <article
      className={
        'group relative flex flex-col overflow-hidden border bg-bone transition-all duration-300' +
        (hasPage ? ' hover:-translate-y-1 hover:shadow-lg' : '')
      }
      style={{
        borderColor: `${palette.base}40`,
        borderTopWidth: '3px',
        borderTopColor: palette.base,
      }}
    >
      {/* winner marker */}
      {isWinner && (
        <div
          className="absolute right-3 top-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1"
          style={{ background: palette.base, color: palette.ink ?? '#0a0a0a' }}
        >
          🥈 Winner
        </div>
      )}

      {/* crest + identity */}
      <div className="flex flex-col items-center px-6 pt-8 pb-5 text-center">
        <Crest palette={palette} number={club.number} />
        <p
          className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: palette.base }}
        >
          № {club.number} · {club.kitName}
        </p>
        <h3 className="headline mt-2 text-2xl leading-tight text-ink md:text-3xl">
          {club.name}
        </h3>
        <p className="mt-2 text-sm italic text-ink/70">"{club.tagline}"</p>
      </div>

      {/* summary */}
      <div className="flex-1 px-6 pb-5">
        <p className="text-sm leading-relaxed text-ink/80">
          {club.summary.length > 180 ? club.summary.slice(0, 180).trimEnd() + '…' : club.summary}
        </p>
      </div>

      {/* CTA row */}
      <div
        className="mt-auto border-t px-6 py-4"
        style={{ borderColor: `${palette.base}22` }}
      >
        {hasPage ? (
          <span
            className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
            style={{ color: palette.base }}
          >
            Explore the world →
          </span>
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/30">
            Coming soon
          </span>
        )}
      </div>
    </article>
  )

  if (hasPage) {
    return (
      <Link to={`/kit/${club.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-hazard">
        {inner}
      </Link>
    )
  }
  return inner
}

export default function Clubs() {
  return (
    <section id="clubs" className="scroll-mt-20 px-4 py-6 md:px-6 md:py-8">
      <div className="sheet mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        {/* section header */}
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan">
            Four clubs · four arguments
          </p>
          <h2 className="headline mt-3 text-3xl text-ink md:text-5xl">
            HOW A KIT BECOMES A RECEIPT
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            Each club is a different angle on the same question: who really wins when the world's biggest event comes to town? Kit as evidence. Research as protest. The receipt is the point.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-ink/30">
          No Game Without the Ground
        </p>
      </div>
    </section>
  )
}
