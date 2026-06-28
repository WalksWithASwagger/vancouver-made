// Generates dist/sitemap.xml and dist/robots.txt from the public route inventory and
// SITE_URL — single-sourced (src/data/routes.js + src/data/seo.js) so they never drift
// from what the app and the prerender step ship. Runs after `vite build`.
import { writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PUBLIC_ROUTES } from '../src/data/routes.js'
import { SITE_URL } from '../src/data/seo.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

if (!existsSync(DIST)) {
  console.error('gen-sitemap: dist/ missing — run `vite build` first.')
  process.exit(1)
}

const loc = (route) => `${SITE_URL}${route === '/' ? '/' : route}`
const urls = PUBLIC_ROUTES.map((r) => `  <url><loc>${loc(r)}</loc></url>`).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
writeFileSync(join(DIST, 'sitemap.xml'), sitemap)

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
writeFileSync(join(DIST, 'robots.txt'), robots)

console.log(`gen-sitemap: wrote dist/sitemap.xml (${PUBLIC_ROUTES.length} urls) + dist/robots.txt`)
