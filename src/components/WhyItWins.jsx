import { Link } from 'react-router-dom'
import { rubric } from '../data/rubric.js'

// The judge-facing section: how MADE ON hits every criterion, each card
// deep-linking to the on-site proof. Mirrors the deck's Rubric slide.
export default function WhyItWins() {
  return (
    <section id="why-it-wins" className="scroll-mt-20 border-t border-bone/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan">For the judges</p>
        <h2 className="headline mt-2 max-w-3xl text-3xl text-bone md:text-5xl">
          WHY IT <span className="text-hazard">WINS</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-bone/70">
          Four criteria. One method that answers all of them — and the proof is live on
          this site, not just claimed on a slide.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {rubric.map((r) => (
            <article
              key={r.id}
              className="flex flex-col border border-bone/15 bg-rain/10 p-6 transition hover:border-bone/35"
            >
              <p className="text-[11px] uppercase tracking-[0.25em] text-gold">{r.ask}</p>
              <h3 className="headline mt-2 text-xl text-bone">{r.crit}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-bone/80">{r.delivery}</p>
              <Link
                to={r.proof.to}
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-hazard transition hover:text-bone"
              >
                {r.proof.label} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
