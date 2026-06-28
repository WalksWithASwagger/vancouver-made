import { Link } from 'react-router-dom'
import SafeImage from './SafeImage.jsx'
import Footer from './Footer.jsx'
import { brand } from '../data/collection.js'
import { directions } from '../data/directions/index.js'

// Press / media kit — summaries a journalist can lift without emailing, the
// double-silver recognition, downloadable kit cards, credits, contact, and the
// independence disclaimer. Same canvas grammar as Awards.jsx; shared Footer.
const CONTACT = 'feelmoreplants@gmail.com'
const KITS = Object.values(directions)

const SUMMARIES = [
  {
    label: 'One line',
    body: 'MADE ON is a World Cup 2026 protest kit collection for Vancouver — everyone else made a souvenir, we made the receipt.',
  },
  {
    label: 'Short',
    body: "MADE ON is an independent protest collection for FIFA World Cup 2026 by Kris Krüg. Five fictional Vancouver clubs turn civic receipts — public money, stolen land, labour, displacement — into football kits, posters, and source-backed arguments. It won double silver at the Vancouver Made Designathon.",
  },
  {
    label: 'Long',
    body: "MADE ON / VANCOUVER MADE is a protest collection staged against the FIFA World Cup 2026. Where a host-city souvenir flattens a place into friendly merch, MADE ON does the opposite: it mimics the official polish of a national kit, inverts the payload, and stitches in the receipt. Five fictional clubs — Nardwuar FC, Pump & Dump FC, Number Five Orange, China Creek, and Hogan's Alley FC — each take a thread of Vancouver's record (a $729M public bill, the speculation economy, criminalized nightlife and skate culture, and the Black neighbourhood paved over for the viaduct the Cup now drives its fans across) and wear it as evidence. Every factual claim is cited; the Receipts Engine shows one civic number landing three ways. The work is by Kris Krüg, a settler artist, made on unceded Musqueam, Squamish and Tsleil-Waututh territory.",
  },
]

const CREDITS = [
  ['Artist', brand.author],
  ['Project', `${brand.name} · ${brand.parent}`],
  ['Context', brand.event],
  ['Recognition', 'Double silver — Devin Open Hackathon (2nd) · Formmé Fashion Design (2nd, five kits manufactured)'],
  ['Amplifies', "Hogan's Alley Society · Ethọ́s Lab (for the Hogan's Alley FC kit)"],
]

function Eyebrow({ children }) {
  return <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan">{children}</p>
}

export default function Press() {
  return (
    <div className="grain min-h-screen tartan-canvas text-ink">
      {/* HERO */}
      <section className="px-4 py-6 md:px-6 md:py-8">
        <div className="sheet mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <Eyebrow>Press · Media kit</Eyebrow>
          <h1 className="headline text-5xl text-ink md:text-8xl">
            THE <span className="text-hazard">PRESS</span> KIT
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink/80 md:text-base">
            Everything a journalist, curator, or judge needs to write about MADE ON without sending
            an email: copy you can lift, the recognition, downloadable images, and contact.
          </p>
        </div>
      </section>

      {/* SUMMARIES */}
      <section className="px-4 py-4 md:px-6 md:py-5">
        <div className="sheet mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <Eyebrow>Copy you can quote</Eyebrow>
          <h2 className="headline text-3xl text-ink md:text-4xl">DESCRIPTIONS</h2>
          <div className="mt-8 space-y-6">
            {SUMMARIES.map((s) => (
              <div key={s.label} className="grid gap-2 border-l-2 border-hazard pl-4 md:grid-cols-[120px_1fr] md:gap-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink/45">{s.label}</p>
                <p className="text-sm leading-relaxed text-ink/85">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECOGNITION */}
      <section className="px-4 py-4 md:px-6 md:py-5">
        <div className="sheet-paper mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <Eyebrow>Recognition · BCIT Tech Collider · June 20 2026</Eyebrow>
          <h2 className="headline text-3xl text-ink md:text-5xl">
            DOUBLE <span className="text-hazard">SILVER</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/80 md:text-base">
            Second place in both tracks of the Vancouver Made Designathon: the Devin Open Hackathon and
            the Formmé Fashion Design challenge. The design prize is production —{' '}
            <span className="text-gold">Formmé manufactures five of the kits.</span>
          </p>
          <Link
            to="/awards"
            className="mt-6 inline-block border border-hazard bg-hazard/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-hazard transition hover:bg-hazard hover:text-bone focus-visible:ring-2 focus-visible:ring-hazard focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
          >
            The full awards page →
          </Link>
        </div>
      </section>

      {/* IMAGES — the five kits, downloadable share cards */}
      <section className="px-4 py-4 md:px-6 md:py-5">
        <div className="sheet mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <Eyebrow>Images · the five kits</Eyebrow>
          <h2 className="headline text-3xl text-ink md:text-4xl">DOWNLOAD</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">
            Share cards (1200×630). Click a kit to open its world, or download the card for press use.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {KITS.map((kit) => (
              <article key={kit.slug} className="flex flex-col overflow-hidden rounded-lg border border-ink/15 bg-paper/50">
                <Link to={`/kit/${kit.slug}`} className="group block overflow-hidden border-b border-ink/10 focus-visible:ring-2 focus-visible:ring-hazard focus-visible:ring-offset-2 focus-visible:ring-offset-bone">
                  <SafeImage
                    src={`/og/kit-${kit.slug}.jpg`}
                    alt={`${kit.name} — ${kit.kitName} share card`}
                    loading="lazy"
                    className="aspect-[1200/630] w-full object-cover transition group-hover:opacity-95"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="headline text-lg text-ink">{kit.name}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink/50">{kit.kitName}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.18em]">
                    <Link to={`/kit/${kit.slug}`} className="text-ink/70 underline-offset-2 transition hover:text-hazard hover:underline focus-visible:ring-2 focus-visible:ring-hazard focus-visible:ring-offset-2 focus-visible:ring-offset-bone">
                      Open kit →
                    </Link>
                    <a href={`/og/kit-${kit.slug}.jpg`} download className="text-ink/70 underline-offset-2 transition hover:text-hazard hover:underline focus-visible:ring-2 focus-visible:ring-hazard focus-visible:ring-offset-2 focus-visible:ring-offset-bone">
                      Download card ↓
                    </a>
                  </div>
                </div>
              </article>
            ))}
            <article className="flex flex-col overflow-hidden rounded-lg border border-ink/15 bg-paper/50">
              <a href="/og.jpg" download className="group block overflow-hidden border-b border-ink/10 focus-visible:ring-2 focus-visible:ring-hazard focus-visible:ring-offset-2 focus-visible:ring-offset-bone">
                <SafeImage src="/og.jpg" alt="MADE ON double-silver share card" loading="lazy" className="aspect-[1200/630] w-full object-cover transition group-hover:opacity-95" />
              </a>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="headline text-lg text-ink">MADE ON</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink/50">Collection card</p>
                <a href="/og.jpg" download className="mt-3 text-[11px] uppercase tracking-[0.18em] text-ink/70 underline-offset-2 transition hover:text-hazard hover:underline focus-visible:ring-2 focus-visible:ring-hazard focus-visible:ring-offset-2 focus-visible:ring-offset-bone">
                  Download card ↓
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CREDITS + CONTACT */}
      <section className="px-4 py-4 md:px-6 md:py-5">
        <div className="sheet mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
            <div>
              <Eyebrow>Credits</Eyebrow>
              <h2 className="headline text-3xl text-ink md:text-4xl">WHO MADE IT</h2>
              <dl className="mt-6 space-y-3 text-sm">
                {CREDITS.map(([k, v]) => (
                  <div key={k} className="grid gap-1 md:grid-cols-[130px_1fr] md:gap-4">
                    <dt className="text-[11px] uppercase tracking-[0.2em] text-ink/45">{k}</dt>
                    <dd className="leading-relaxed text-ink/80">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="self-start rounded-lg border border-ink/15 bg-paper/50 p-6">
              <Eyebrow>Contact</Eyebrow>
              <p className="text-sm leading-relaxed text-ink/80">
                Press, exhibition, and collaboration enquiries:
              </p>
              <a
                href={`mailto:${CONTACT}`}
                className="mt-3 inline-block font-mono text-sm text-hazard underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-hazard focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
              >
                {CONTACT}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="px-4 py-4 pb-8 md:px-6 md:py-5 md:pb-10">
        <div className="sheet-paper mx-auto max-w-5xl px-6 py-14 md:px-10">
          <Eyebrow>Independent project</Eyebrow>
          <p className="max-w-3xl text-sm leading-relaxed text-ink/75">
            MADE ON is an independent art and protest project. It is not affiliated with, endorsed by,
            sponsored by, or approved by FIFA, the FIFA World Cup, the City of Vancouver, or any official
            host body. It uses no official marks, trophy imagery, or licensed-merchandise signals.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ink/45">
            Not a FIFA sponsor · Not anti-football · Anti-amnesia
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
