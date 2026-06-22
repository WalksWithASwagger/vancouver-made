import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// In-app "making-of" documentation: the captioned/tagged process per concept, staged
// into public/making-of/ by scripts/stage-makingof.mjs. One component serves both the
// index (/making-of) and a per-concept page (/making-of/:slug).

function useJson(url) {
  const [data, setData] = useState(null)
  const [err, setErr] = useState(false)
  useEffect(() => {
    let live = true
    setData(null); setErr(false)
    fetch(url)
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(d => live && setData(d))
      .catch(() => live && setErr(true))
    return () => { live = false }
  }, [url])
  return [data, err]
}

function Shell({ children }) {
  return <div className="grain min-h-screen tartan-canvas text-ink">{children}</div>
}

function Index() {
  const [index] = useJson('/making-of/index.json')
  useEffect(() => { document.title = 'The Making-Of · MADE ON' }, [])
  return (
    <Shell>
      <section className="px-4 py-6 md:px-6 md:py-8">
        <div className="sheet mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan">The receipts behind the kits</p>
        <h1 className="headline text-4xl text-ink md:text-6xl">THE <span className="text-hazard">MAKING-OF</span></h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/80 md:text-base">
          Every kit started as a pile of prompts and a wall of images. This is the process,
          concept by concept — mood, marks, flats, and finally the kit on the body.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(index || []).map(c => (
            <Link key={c.slug} to={`/making-of/${c.slug}`}
              className="group overflow-hidden rounded-xl border border-ink/15 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
              {c.cover && (
                <div className="aspect-[4/5] overflow-hidden bg-zinc-100">
                  <img src={`/making-of/${c.cover}`} alt={c.name} loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
              )}
              <div className="p-4">
                <h2 className="headline text-xl text-ink">{c.name}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/65 line-clamp-3">{c.blurb}</p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-hazard">{c.count} frames →</p>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/" className="mt-14 inline-block text-xs uppercase tracking-[0.2em] text-ink/50 hover:text-ink">← Back to the pitch</Link>
        </div>
      </section>
    </Shell>
  )
}

function Frame({ slug, img, onOpen }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-ink/12 bg-white">
      <button type="button" onClick={onOpen} className="block w-full">
        <img src={`/making-of/${slug}/${img.file}`} alt={img.caption} loading="lazy"
          className="aspect-[4/5] w-full cursor-zoom-in object-cover transition hover:opacity-95" />
      </button>
      <figcaption className="p-3">
        <p className="text-sm font-semibold leading-snug text-ink">{img.caption || '—'}</p>
        {img.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {img.tags.slice(0, 5).map(t => (
              <span key={t} className="rounded-full bg-ink/[0.06] px-2 py-0.5 text-[10px] text-ink/55">{t}</span>
            ))}
          </div>
        )}
        {img.prompt && (
          <details className="mt-2 group">
            <summary className="cursor-pointer list-none text-[10px] uppercase tracking-[0.18em] text-cyan hover:text-ink">Prompt ▾</summary>
            <p className="mt-1.5 whitespace-pre-wrap rounded bg-ink/[0.04] p-2 font-mono text-[11px] leading-relaxed text-ink/70">{img.prompt}</p>
          </details>
        )}
      </figcaption>
    </figure>
  )
}

function Detail({ slug }) {
  const [data, err] = useJson(`/making-of/${slug}/manifest.json`)
  const [open, setOpen] = useState(null) // {file, caption, prompt}
  useEffect(() => { if (data) document.title = `${data.name} · Making-Of · MADE ON` }, [data])

  if (err) return (
    <Shell>
      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="sheet mx-auto max-w-3xl px-6 py-16 text-center md:px-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan">404 · off the record</p>
        <h1 className="headline mt-3 text-4xl text-ink">NO <span className="text-hazard">MAKING-OF</span> HERE</h1>
        <Link to="/making-of" className="mt-8 inline-block border border-hazard px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-hazard hover:bg-hazard hover:text-ink">All concepts →</Link>
        </div>
      </section>
    </Shell>
  )
  if (!data) return <Shell><div className="flex min-h-screen items-center justify-center text-[11px] uppercase tracking-[0.3em] text-bone/70">Loading…</div></Shell>

  return (
    <Shell>
      <section className="px-4 pt-6 pb-3 md:px-6 md:pt-8">
        <div className="sheet mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <Link to="/making-of" className="text-xs uppercase tracking-[0.2em] text-ink/50 hover:text-ink">← The making-of</Link>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-cyan">How it was made</p>
        <h1 className="headline mt-2 text-4xl text-ink md:text-6xl">{data.name}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/80 md:text-base">{data.blurb}</p>
        </div>
      </section>

      {data.stages.map((st, i) => (
        <section key={st.key} className="px-4 py-3 md:px-6">
          <div className={(i % 2 ? 'sheet-paper' : 'sheet') + ' mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16'}>
            <div className="mb-7 flex items-baseline gap-4">
              <span className="headline text-2xl text-hazard">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="headline text-2xl text-ink md:text-3xl">{st.title}</h2>
                <p className="mt-1 text-sm text-ink/65">{st.blurb}</p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {st.images.map(img => <Frame key={img.file} slug={slug} img={img} onOpen={() => setOpen(img)} />)}
            </div>
          </div>
        </section>
      ))}

      <div className="px-4 py-3 md:px-6 md:pb-8">
        <div className="sheet mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
          <Link to="/making-of" className="text-xs uppercase tracking-[0.2em] text-ink/50 hover:text-ink">← All concepts</Link>
          <Link to="/" className="text-xs uppercase tracking-[0.2em] text-hazard hover:text-ink">Back to the pitch →</Link>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4" onClick={() => setOpen(null)}>
          <div className="max-h-full max-w-5xl overflow-auto" onClick={e => e.stopPropagation()}>
            <img src={`/making-of/${slug}/${open.file}`} alt={open.caption} className="mx-auto max-h-[78vh] w-auto rounded-lg" />
            <div className="mx-auto mt-3 max-w-3xl text-center">
              <p className="text-sm font-semibold text-bone">{open.caption}</p>
              {open.prompt && <p className="mt-2 whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-bone/70">{open.prompt}</p>}
            </div>
          </div>
          <button type="button" onClick={() => setOpen(null)} aria-label="Close"
            className="absolute right-4 top-4 text-2xl text-bone/70 hover:text-bone">×</button>
        </div>
      )}
    </Shell>
  )
}

export default function MakingOf() {
  const { slug } = useParams()
  return slug ? <Detail slug={slug} /> : <Index />
}
