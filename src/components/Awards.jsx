import { Link } from 'react-router-dom'

// The double-silver result, the certificates, the winning kit, and the event itself.
// Assets served from public/awards/. Event facts from the Luma listing.
const TRACKS = [
  {
    track: 'Devin Open Hackathon',
    place: '2nd of ~100',
    prize: '$300',
    note: 'For the build: the receipts work and three live surfaces that mimic the official look, invert it, and cite the public record.',
    cert: '/awards/devin-hackathon-2nd.jpg',
    sponsor: 'Devin by Cognition',
    url: 'https://devin.ai',
  },
  {
    track: 'Formmé Fashion Design',
    place: '2nd of ~50',
    prize: 'Five kits manufactured',
    note: 'For the kit: Nardwuar FC, the red Vancouver-tartan deep cut. Research as the protest, the receipt as the weapon.',
    cert: '/awards/formme-design-2nd.jpg',
    sponsor: 'Formmé',
    url: 'https://www.formme.io',
  },
]

function Eyebrow({ children }) {
  return <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan">{children}</p>
}

export default function Awards() {
  return (
    <div className="grain min-h-screen bg-bone text-ink">
      {/* HERO */}
      <section className="border-b border-ink/10 px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Eyebrow>Vancouver Made · World Cup Designathon · BCIT Tech Collider · June 20 2026</Eyebrow>
          <h1 className="headline text-5xl text-ink md:text-8xl">
            DOUBLE <span className="text-hazard">SILVER</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink/80 md:text-base">
            Second place in both tracks. We entered the developer hackathon and the jersey design
            challenge, and placed second in each. The design prize is production:{' '}
            <span className="text-gold">Formmé manufactures five of the kits.</span>
          </p>
        </div>
      </section>

      {/* RESULTS + CERTIFICATES */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-10">
          {TRACKS.map((t) => (
            <article key={t.track} className="flex flex-col rounded-lg border border-ink/15 bg-paper/50 p-5">
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h2 className="headline text-xl text-ink md:text-2xl">{t.track}</h2>
                <span className="shrink-0 rounded border border-hazard px-2 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-hazard">
                  {t.place}
                </span>
              </div>
              <a href={t.cert} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded border border-ink/15 bg-ink/[0.04]">
                <img src={t.cert} alt={`Second place certificate, ${t.track}`} loading="lazy" className="w-full transition group-hover:opacity-95" />
              </a>
              <p className="headline mt-4 text-lg text-gold">{t.prize}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{t.note}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-ink/45">
                Sponsored by{' '}
                <a href={t.url} target="_blank" rel="noreferrer" className="text-ink/70 underline-offset-2 hover:text-hazard hover:underline">
                  {t.sponsor}
                </a>
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* THE WINNING KIT */}
      <section className="border-t border-ink/10 bg-paper/40 px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>The winning kit</Eyebrow>
            <h2 className="headline text-3xl text-ink md:text-5xl">NARDWUAR FC</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/80 md:text-base">
              Red Vancouver tartan. Research as the protest, the receipt as the weapon. Who benefits?
              Who pays? This is the kit Formmé is putting into production.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em]">
              <Link to="/gallery" className="border border-ink/25 px-4 py-2 text-ink/70 transition hover:border-hazard hover:text-hazard">The gallery →</Link>
              <Link to="/#hero-kits" className="border border-ink/25 px-4 py-2 text-ink/70 transition hover:border-hazard hover:text-hazard">The collection →</Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-ink/15 bg-gradient-to-b from-white to-zinc-200 shadow-lg">
            <img src="/gallery/nw-front.jpg" alt="Nardwuar FC red Vancouver-tartan kit" loading="lazy" className="w-full object-contain" />
          </div>
        </div>
      </section>

      {/* ABOUT THE EVENT + POSTER */}
      <section className="border-t border-ink/10 px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
          <div>
            <Eyebrow>The event</Eyebrow>
            <h2 className="headline text-3xl text-ink md:text-4xl">VANCOUVER MADE</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-ink/55">Design the city. Wear the game.</p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/80 md:text-base">
              A World Cup Designathon and Hackathon, first edition. One day, two tracks: the Devin Open
              Hackathon and the Formmé Fashion Design challenge. The winning design gets manufactured.
            </p>
            <dl className="mt-6 space-y-1 font-mono text-xs uppercase tracking-wide text-ink/70">
              <div><dt className="inline text-ink/45">When </dt><dd className="inline">June 20 2026 · 9:00 to 7:30</dd></div>
              <div><dt className="inline text-ink/45">Where </dt><dd className="inline">BCIT Tech Collider · 555 Seymour St, Vancouver</dd></div>
              <div><dt className="inline text-ink/45">Hosts </dt><dd className="inline">Students@AI · Young Guns Studio</dd></div>
              <div><dt className="inline text-ink/45">Sponsors </dt><dd className="inline">Devin by Cognition · Formmé</dd></div>
            </dl>
            <a href="https://luma.com/erjpeza4" target="_blank" rel="noreferrer" className="mt-7 inline-block border border-hazard bg-hazard/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-hazard transition hover:bg-hazard hover:text-bone">
              The event page →
            </a>
          </div>
          <figure className="self-start">
            <div className="overflow-hidden rounded-lg border border-ink/15 bg-ink/[0.04]">
              <img src="/awards/event-poster.jpg" alt="Vancouver Made Designathon event poster" loading="lazy" className="w-full object-contain" />
            </div>
            <figcaption className="mt-2 text-[11px] leading-snug text-ink/45">
              Event poster by Vancouver Made · Digital Arts, Media &amp; Design @ BCIT. Photographed at the event.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CLOSER */}
      <section className="border-t border-ink/10 px-6 py-14 text-center">
        <p className="headline text-2xl text-ink md:text-3xl">
          Everyone else made a souvenir. <span className="text-hazard">We made the receipt.</span>
        </p>
        <Link to="/" className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-ink/60 transition hover:text-hazard">
          ← back to the pitch
        </Link>
      </section>
    </div>
  )
}
