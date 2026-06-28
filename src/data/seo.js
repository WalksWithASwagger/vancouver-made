// Per-route SEO source of truth. resolveSeo(pathname) returns the merged metadata
// for any public route; useSeo() applies it to <head>, the prerender script bakes
// it into the static HTML, and gen-sitemap consumes SITE_URL. Static-route copy is
// kept short and on-voice; kit metadata is derived from the direction manifests.
import { directions } from './directions/index.js'

// The canonical origin (custom domain, registered on Porkbun). Feeds every canonical
// URL, absolute OG image, and the sitemap — change here and rebuild to move hosts.
export const SITE_URL = 'https://unofficial.city'

// Base fallback for every route (title/description/image/type). Open Graph title and
// description fall back to each route's own title/description; only the homepage
// overrides them (in STATIC_SEO) to keep its hand-tuned social card.
export const DEFAULT_SEO = {
  title: 'MADE ON: Whose Cup Is It Anyway?',
  description:
    'MADE ON / VANCOUVER MADE: a protest collection for FIFA World Cup 2026. Everyone else made a souvenir; we made the receipt. Mega-event capitalism and displacement in Vancouver, every claim cited.',
  image: '/og.jpg',
  type: 'website',
}

export const STATIC_SEO = {
  '/': {
    ...DEFAULT_SEO,
    ogTitle: "MADE ON: the part that doesn't fit on a souvenir",
    ogDescription:
      'A protest collection for FIFA World Cup 2026. Everyone else made a souvenir; we made the receipt. Every claim cited, on the hem.',
  },
  '/journey': {
    title: 'The Journey · MADE ON',
    description:
      "How a World Cup souvenir brief became a protest collection — the research lineage from 1968 to Vancouver's own culture-jam history, act by act.",
  },
  '/gallery': {
    title: 'The Gallery · MADE ON',
    description:
      'Every kit up close: flats, crests, lookbook and matchday imagery across all five MADE ON design worlds. Filter by concept.',
  },
  '/engine': {
    title: 'We Made the Receipt · MADE ON',
    description:
      'The Receipts Engine: pick a civic number and watch one cited fact land three ways — a garment hem, a protest poster, an editorial caption. Mimic, invert, cite.',
  },
  '/hall-of-fame': {
    title: 'Hall of Fame · MADE ON',
    description:
      'The reference library: the protest-kit canon and design lineage MADE ON is built on, from Smith & Carlos to Brandalism — every entry cited.',
  },
  '/process': {
    title: 'Our Process · MADE ON',
    description:
      'Show your work: how a prompt becomes a kit — brief, moodboard, generate, curate, then the receipt. The method behind the collection.',
  },
  '/making-of': {
    title: 'The Making-Of · MADE ON',
    description:
      'Mood, marks, flats, then the kit on the body — the captioned process behind each MADE ON concept, image by image.',
  },
  '/store': {
    title: 'The Store · MADE ON',
    description:
      'The drop: kits, patches, prints and zines from the MADE ON protest collection. Every piece cites its source.',
  },
  '/awards': {
    title: 'Awards · Double Silver · MADE ON',
    description:
      'Double silver at the Vancouver Made Designathon — 2nd in the Devin Open Hackathon and 2nd in the Formmé Fashion Design challenge, five kits into production.',
  },
  '/why': {
    title: 'Why It Wins · MADE ON',
    description:
      'The full case: why a cited protest collection beats a souvenir — the argument, the receipts, and the method, held against the brief.',
  },
  '/press': {
    title: 'Press · MADE ON',
    description:
      'Press kit: summaries, credits, double-silver recognition, downloadable images and contact for MADE ON, the Vancouver World Cup 2026 protest collection by Kris Krüg.',
  },
}

function clamp(text, max) {
  const t = String(text || '').replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  return t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'
}

function absUrl(p) {
  if (!p) return undefined
  return /^https?:\/\//.test(p) ? p : SITE_URL + p
}

function normalize(pathname) {
  const p = String(pathname || '/').replace(/\/+$/, '')
  return p === '' ? '/' : p
}

// Build a kit's metadata from its direction manifest.
export function seoForKit(manifest) {
  return {
    title: `${manifest.name} · ${manifest.kitName} · MADE ON`,
    description: clamp(manifest.concept?.summary || manifest.tagline || manifest.hero?.line, 180),
    image: `/og/kit-${manifest.slug}.jpg`,
    type: 'article',
  }
}

// Resolve the full, absolute metadata for any public route.
export function resolveSeo(pathname) {
  const path = normalize(pathname)
  let base = STATIC_SEO[path]
  if (!base && path.startsWith('/kit/')) {
    const manifest = directions[path.slice(5)]
    if (manifest) base = seoForKit(manifest)
  }
  const seo = { ...DEFAULT_SEO, ...(base || {}) }
  const url = path === '/' ? `${SITE_URL}/` : SITE_URL + path
  return {
    title: seo.title,
    description: seo.description,
    ogTitle: seo.ogTitle || seo.title,
    ogDescription: seo.ogDescription || seo.description,
    type: seo.type || 'website',
    canonical: url,
    url,
    image: absUrl(seo.image),
  }
}
