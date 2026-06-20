import { league, clubs } from '../data/clubs.js'
import Crest from './Crest.jsx'

function Chip({ children, color }) {
  return (
    <span
      className="inline-block border px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
      style={{ borderColor: color, color }}
    >
      {children}
    </span>
  )
}

function ClubCard({ club }) {
  const { palette } = club
  const hero = club.kits[club.heroKit.toLowerCase()]
  return (
    <article
      className="relative overflow-hidden border border-bone/15"
      style={{ background: `linear-gradient(160deg, ${palette.ink} 60%, ${palette.base}22)` }}
    >
      {/* counterfeit-official top bar */}
      <div
        className="flex items-center justify-between px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ background: palette.base, color: palette.ink }}
      >
        <span>{club.heroKit} KIT · {club.kitName}</span>
        <span>NO.{club.number}</span>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-start gap-4">
          <Crest palette={palette} number={club.number} />
          <div>
            <h3 className="headline text-2xl leading-none md:text-3xl" style={{ color: palette.base }}>
              {club.name}
            </h3>
            <p className="mt-2 text-sm italic text-bone/80">“{club.tagline}”</p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-bone/50">{club.target}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-bone/85">{club.summary}</p>

        {/* WHO BENEFITS / WHO PAYS */}
        <div className="mt-5 grid grid-cols-2 gap-px border border-bone/10 bg-bone/10 text-xs">
          <div className="bg-ink p-3">
            <p className="mb-2 font-bold uppercase tracking-wider" style={{ color: palette.signal }}>
              Who benefits
            </p>
            <ul className="space-y-1 text-bone/75">
              {club.whoBenefits.map((x) => (
                <li key={x}>↑ {x}</li>
              ))}
            </ul>
          </div>
          <div className="bg-ink p-3">
            <p className="mb-2 font-bold uppercase tracking-wider" style={{ color: palette.accent }}>
              Who pays
            </p>
            <ul className="space-y-1 text-bone/75">
              {club.whoPays.map((x) => (
                <li key={x}>↓ {x}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* faux sponsor bank */}
        <div className="mt-5">
          <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-bone/40">Faux sponsor bank</p>
          <div className="flex flex-wrap gap-1.5">
            {club.sponsorBank.map((s) => (
              <Chip key={s} color={palette.base}>
                {s}
              </Chip>
            ))}
          </div>
        </div>

        {/* hero kit + how it steals the cup */}
        <div className="mt-5 space-y-3 text-xs text-bone/75">
          <p>
            <span className="font-bold uppercase tracking-wider" style={{ color: palette.base }}>
              {club.heroKit} (hero):{' '}
            </span>
            {hero}
          </p>
          <p>
            <span className="font-bold uppercase tracking-wider" style={{ color: palette.signal }}>
              Steals the cup:{' '}
            </span>
            {club.fifaSubversion}
          </p>
          <p>
            <span className="font-bold uppercase tracking-wider" style={{ color: palette.accent }}>
              Patch spoof:{' '}
            </span>
            {club.patchSpoof}
          </p>
          <p>
            <span className="font-bold uppercase tracking-wider" style={{ color: palette.accent }}>
              Trophy misuse:{' '}
            </span>
            {club.trophyMisuse}
          </p>
        </div>

        {/* source cards (receipts) */}
        <div className="mt-5 border-t border-bone/10 pt-4">
          <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-bone/40">
            Receipts (QR source cards)
          </p>
          <ul className="space-y-2">
            {club.sourceCards.map((c) => (
              <li key={c.id} className="text-[11px] leading-snug text-bone/65">
                <span className="font-mono" style={{ color: palette.signal }}>
                  {c.id}
                </span>{' '}
                {c.claim}{' '}
                {c.confirm && <span className="text-hazard">[confirm]</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* back-neck campaign badge */}
        <div className="mt-5 text-center text-[10px] uppercase tracking-[0.3em] text-bone/40">
          ▸ back-neck: {league.campaign}
        </div>
      </div>
    </article>
  )
}

export default function Clubs() {
  return (
    <section id="clubs" className="border-t border-bone/10 bg-rain/20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* counterfeit-official drop header */}
        <div className="mb-10 border border-bone/15 p-5 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan">
            {league.umbrella} · {league.edition}
          </p>
          <h2 className="headline mt-2 text-3xl text-bone md:text-5xl">THE KIT DROP</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-bone/70">{league.thesis}</p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-hazard">
            {league.sharedSpoof.fauxPatch.join(' · ')}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>

        <p className="mt-10 text-center text-[11px] uppercase tracking-[0.3em] text-bone/40">
          Campaign — {league.campaign}
        </p>
      </div>
    </section>
  )
}
