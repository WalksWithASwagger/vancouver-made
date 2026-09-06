import assert from 'node:assert/strict'
import { PUBLIC_ROUTES } from '../src/data/routes.js'
import { resolveSeo, SITE_URL } from '../src/data/seo.js'

const base = new URL(process.argv[2] || SITE_URL)
async function document(path) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) })
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`)
  return response.text()
}
for (const route of PUBLIC_ROUTES) {
  const html = await document(route)
  const expected = resolveSeo(route)
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${route}: expected one H1`)
  assert(html.includes(`href="${expected.canonical}"`), `${route}: wrong canonical`)
  assert(html.includes(`<title>${expected.title.replaceAll('&', '&amp;')}</title>`), `${route}: wrong title`)
  console.log(`PASS ${route}`)
}
const sitemap = await document('/sitemap.xml')
for (const route of PUBLIC_ROUTES) assert(sitemap.includes(`<loc>${SITE_URL}${route}</loc>`), `sitemap: ${route}`)
assert((await document('/robots.txt')).includes(`Sitemap: ${SITE_URL}/sitemap.xml`))
console.log('PASS sitemap and robots')
