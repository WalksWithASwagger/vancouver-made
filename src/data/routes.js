// Single source of truth for the public, crawlable routes — consumed by the
// prerender script, the sitemap generator, and the SEO QA checker so the three
// never drift. Kit routes derive from the directions registry, so adding a design
// world (src/data/directions/index.js) propagates to all three automatically.
// Deliberately omits the local-only / presentation routes (/tracker, /wall,
// /highlight-reel) and the dynamic /making-of/:slug detail pages.
import { directions } from './directions/index.js'

export const STATIC_ROUTES = [
  '/',
  '/journey',
  '/gallery',
  '/engine',
  '/hall-of-fame',
  '/process',
  '/making-of',
  '/store',
  '/awards',
  '/why',
  '/press',
]

export const KIT_ROUTES = Object.keys(directions).map((slug) => `/kit/${slug}`)

export const PUBLIC_ROUTES = [...STATIC_ROUTES, ...KIT_ROUTES]
