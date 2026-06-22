import { Link } from 'react-router-dom'
import { rubric } from '../data/rubric.js'

// Full-page post-win case: leads with the double-silver result, then walks the
// four judging criteria as "why the work holds up" — same rubric data and
// proof deep-links as before, but framed past-tense. Reachable via footer only.
export default function WhyItWins() {
  return (
    <div className="grain min-h-screen tartan-canvas text-ink">

      {/* Header band */}
      <div className="tartan-dark border-b-2 border-ink/30">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <Link
            to="/"
            className="inline-block mb-8 text-[10px] uppercase tracking-[0.3em] text-bone/50 transition hover:text-bone"
          >
            ← Back to pitch
          </Link>

          <p className="text-[10px] uppercase tracking-[0.35em] text-hazard/80 mb-3">
            BCIT Tech Collider 2026 · Post-mortem
          </p>
          <h1 className="headline text-4xl text-bone md:text-6xl lg:text-7xl [text-shadow:0_3px_10px_rgba(0,0,0,0.7)]">
            WHY IT <span className="text-hazard">WON</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-bone/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            They asked for the Vancouver story. We finished the sentence. We
            took silver in both tracks.
          </p>

          {/* Double-silver summary */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-2xl">
            <div className="border border-hazard/30 bg-hazard/10 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-hazard/70 mb-1">
                Track 1
              </p>
              <p className="headline text-lg text-bone [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                🥈 Devin Technical Hackathon
              </p>
              <p className="mt-1 text-xs text-bone/60">
                2nd place · $300 prize
              </p>
            </div>
            <div className="border border-hazard/30 bg-hazard/10 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-hazard/70 mb-1">
                Track 2
              </p>
              <p className="headline text-lg text-bone [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                🥈 Formme Design Challenge
              </p>
              <p className="mt-1 text-xs text-bone/60">
                2nd place · 5 kits manufactured
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro + Rubric */}
      <section className="px-4 py-6 md:px-6 md:py-8">
        <div className="sheet mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan mb-3">
              The rubric, reviewed
            </p>
            <h2 className="headline text-2xl text-ink md:text-4xl">
              FOUR CRITERIA.{' '}
              <span className="text-hazard">ONE METHOD THAT HIT ALL OF THEM.</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink/75 max-w-2xl">
              The judging rubric asked for novelty of process, the best Vancouver
              narrative, visible method, and strong use of AI tools. Here's how the
              work answered each. The proof is still live on the site, not
              just claimed on a slide.
            </p>
          </div>

          {/* Rubric cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {rubric.map((r, i) => (
              <article
                key={r.id}
                className="flex flex-col border border-ink/15 p-7 transition hover:border-ink/35 hover:bg-paper/50"
              >
                <div className="flex items-start justify-between gap-4 mb-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                    {r.ask}
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-ink/25 shrink-0">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="headline mt-2 text-xl text-ink md:text-2xl">
                  {r.crit}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">
                  {r.delivery}
                </p>
                <Link
                  to={r.proof.to}
                  className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-hazard transition hover:text-ink"
                >
                  {r.proof.label} →
                </Link>
              </article>
            ))}
          </div>

          {/* Closing note */}
          <div className="mt-16 border-t border-ink/10 pt-12 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/40 mb-4">
              The settler's position
            </p>
            <p className="text-sm leading-relaxed text-ink/70">
              This was a settler artist's refusal to make the celebration jersey.
              No sacred imagery borrowed. The coloniser's own paperwork, the
              receipt, the redaction, the banknote, turned into the kit. The land
              the stadium sits on named in the hem text. That framing wasn't
              incidental; it was the brief.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/awards"
                className="inline-block border border-hazard bg-hazard/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-hazard transition hover:bg-hazard hover:text-bone"
              >
                See the awards page →
              </Link>
              <Link
                to="/process"
                className="inline-block border border-ink/25 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-ink/70 transition hover:border-ink hover:text-ink"
              >
                See the process →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
