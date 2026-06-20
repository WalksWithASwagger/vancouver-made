import { heroKits } from '../data/heroKits.js'
import KitFlat from './KitFlat.jsx'

function Swatch({ hex }) {
  return <span className="inline-block h-3 w-3 rounded-sm border border-bone/30" style={{ background: hex }} />
}

function HeroKit({ kit }) {
  const c = kit.colorway
  return (
    <article className="overflow-hidden border border-bone/15 bg-ink">
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
        <p className="mt-1 text-sm italic text-bone/80">“{kit.theLine}”</p>
        <p className="mt-3 text-sm leading-relaxed text-bone/80">{kit.concept}</p>

        {/* the line / hem receipt */}
        <div className="mt-4 border-l-2 pl-3" style={{ borderColor: c.accent }}>
          <p className="text-[10px] uppercase tracking-[0.2em] text-bone/40">Hem citation (the receipt)</p>
          <p className="mt-1 font-mono text-[11px] text-bone/85">{kit.hemCitation.text}</p>
          <p className="mt-1 font-mono text-[10px] text-cyan">
            {kit.hemCitation.source} {kit.hemCitation.confirm && <span className="text-hazard">· [confirm]</span>}
          </p>
        </div>

        {/* artwork & placement */}
        <dl className="mt-4 space-y-1.5 text-xs text-bone/70">
          <Row label="Crest" v={kit.crest} />
          <Row label="Sponsor bar" v={kit.sponsorBar} />
          <Row label="Nameplate / №" v={`${kit.nameplate} · ${kit.number}`} />
          <Row label="Back line" v={kit.backLine} />
          <Row label="Allover" v={kit.allover} />
          <Row label="Serial" v={kit.serial} />
        </dl>

        {/* colorway */}
        <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-wider text-bone/50">
          <span className="flex items-center gap-1"><Swatch hex={c.body} /> body</span>
          <span className="flex items-center gap-1"><Swatch hex={c.primary} /> primary</span>
          <span className="flex items-center gap-1"><Swatch hex={c.secondary} /> sec</span>
          <span className="flex items-center gap-1"><Swatch hex={c.accent} /> accent</span>
        </div>

        <p className="mt-4 text-xs text-bone/65">
          <span className="font-bold uppercase tracking-wider" style={{ color: c.primary }}>Why it wins: </span>
          {kit.whyItWins}
        </p>
      </div>
    </article>
  )
}

function Row({ label, v }) {
  return (
    <div className="flex gap-2">
      <dt className="w-24 shrink-0 uppercase tracking-wide text-bone/40">{label}</dt>
      <dd className="text-bone/80">{v}</dd>
    </div>
  )
}

export default function HeroKits() {
  return (
    <section id="hero-kits" className="border-t border-bone/10 bg-rain/20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan">Built today · hero kits</p>
          <h2 className="headline mt-2 text-3xl text-bone md:text-5xl">THE RECEIPTS, WORN</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-bone/70">
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
