import { Link } from 'react-router-dom'
import { heroKits } from '../data/heroKits.js'
import { getDirection } from '../data/directions/index.js'
import KitFlat from './KitFlat.jsx'

const SLEEVE_LABEL = { short: 'short sleeve', long: 'long sleeve', raglan: '¾ raglan' }

function Swatch({ hex }) {
  return <span className="inline-block h-3 w-3 rounded-sm border border-ink/30" style={{ background: hex }} />
}

function WorldLink({ slug, colorway }) {
  const direction = getDirection(slug)
  if (!direction) return null
  return (
    <Link
      to={`/kit/${slug}`}
      className="group mt-5 flex items-center justify-between border border-ink/20 bg-bone px-4 py-3 transition-colors hover:border-ink/50"
      style={{ borderColor: `${colorway.primary}40` }}
    >
      <span
        className="text-[11px] font-bold uppercase tracking-[0.2em] transition-colors group-hover:opacity-100"
        style={{ color: colorway.primary, opacity: 0.7 }}
      >
        Enter the world
      </span>
      <span
        className="translate-x-0 text-[11px] font-bold uppercase tracking-[0.2em] transition-transform group-hover:translate-x-1"
        style={{ color: colorway.primary }}
      >
        →
      </span>
    </Link>
  )
}

function HeroKit({ kit }) {
  const c = kit.colorway
  return (
    <article className="overflow-hidden border border-ink/15 bg-bone">
      <div
        className="flex items-center justify-between px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ background: c.primary, color: c.body }}
      >
        <span>KIT {kit.no} · {kit.styleNo}</span>
        <span>HERO · BUILT TODAY</span>
      </div>

      {/* the flat */}
      <div className="px-5 pt-5" style={{ background: `${c.body}` }}>
        <KitFlat kit={kit} />
      </div>

      <div className="p-5">
        <h3 className="headline text-2xl" style={{ color: c.primary }}>{kit.name}</h3>
        <p className="mt-1 text-sm italic text-ink/80">"{kit.theLine}"</p>
        <p className="mt-3 text-sm leading-relaxed text-ink/80">{kit.concept}</p>

        {/* the line / hem receipt */}
        <div className="mt-4 border-l-2 pl-3" style={{ borderColor: c.accent }}>
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40">Hem citation (the receipt)</p>
          <p className="mt-1 font-mono text-[11px] text-ink/85">{kit.hemCitation.text}</p>
          <p className="mt-1 font-mono text-[10px] text-cyan">
            {kit.hemCitation.source}
          </p>
        </div>

        {/* artwork & placement */}
        <dl className="mt-4 space-y-1.5 text-xs text-ink/70">
          <Row label="Crest" v={kit.crest} />
          <Row label="Sponsor bar" v={kit.sponsorBar} />
          <Row label="Nameplate / №" v={`${kit.nameplate} · ${kit.number}`} />
          <Row label="Back line" v={kit.backLine} />
          <Row label="Allover" v={kit.allover} />
          <Row label="Serial" v={kit.serial} />
          <Row label="Silhouette" v={SLEEVE_LABEL[kit.silhouette] || 'short sleeve'} />
          <Row label="Fabric" v={kit.fabric} />
        </dl>

        {/* colorway */}
        <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-wider text-ink/50">
          <span className="flex items-center gap-1"><Swatch hex={c.body} /> body</span>
          <span className="flex items-center gap-1"><Swatch hex={c.primary} /> primary</span>
          <span className="flex items-center gap-1"><Swatch hex={c.secondary} /> sec</span>
          <span className="flex items-center gap-1"><Swatch hex={c.accent} /> accent</span>
        </div>

        <p className="mt-4 text-xs text-ink/65">
          <span className="font-bold uppercase tracking-wider" style={{ color: c.primary }}>Why it wins: </span>
          {kit.whyItWins}
        </p>

        {/* manifesto card — the hangtag that ships with the kit */}
        <div className="mt-4 border-t border-ink/10 pt-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40">Manifesto card (the hangtag)</p>
          <p className="mt-1 text-xs leading-relaxed text-ink/70">{kit.manifestoCard}</p>
        </div>

        {/* gateway link — only renders when a direction world exists for this kit's club */}
        {kit.club && <WorldLink slug={kit.club} colorway={c} />}
      </div>
    </article>
  )
}

function Row({ label, v }) {
  return (
    <div className="flex gap-2">
      <dt className="w-24 shrink-0 uppercase tracking-wide text-ink/40">{label}</dt>
      <dd className="text-ink/80">{v}</dd>
    </div>
  )
}

export default function HeroKits() {
  return (
    <section id="hero-kits" className="scroll-mt-20 border-t border-ink/10 bg-rain/20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan">Built today · hero kits</p>
          <h2 className="headline mt-2 text-3xl text-ink md:text-5xl">THE RECEIPTS, WORN</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink/70">
            Three kits resolved to spec — front + back flats drawn from the same data
            that fills the tech pack. Mimic the polish, invert the payload, bake in the receipt.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {heroKits.map((kit) => (
            <HeroKit key={kit.id} kit={kit} />
          ))}
        </div>
      </div>
    </section>
  )
}
