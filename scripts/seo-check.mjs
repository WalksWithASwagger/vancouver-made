// SEO QA gate — pure Node, no browser. Validates the prerendered dist/: every public
// route shipped real HTML with a single <h1>, a unique non-generic <title>, a meta
// description, a canonical link, and an og:image; kit pages carry their cited receipts;
// no duplicate titles; sitemap.xml covers every public route. Non-zero exit on any miss.
//
// Counterpart to scripts/smoke-test.js (which covers the local API). Run: npm run test:seo
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PUBLIC_ROUTES, KIT_ROUTES } from '../src/data/routes.js'
import { DEFAULT_SEO } from '../src/data/seo.js'
import nardwuar from '../src/data/directions/nardwuar.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

let failures = 0
const pass = (l) => console.log(`PASS  ${l}`)
const fail = (l, d) => {
  console.error(`FAIL  ${l} — ${d}`)
  failures++
}

const fileFor = (route) => (route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html'))
const titleOf = (html) => (html.match(/<title>([^<]*)<\/title>/i) || [, ''])[1].trim()
const ogTitleOf = (html) => (html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i) || [, ''])[1].trim()
const countH1 = (html) => (html.match(/<h1[\s>]/gi) || []).length

const titles = new Map()

for (const route of PUBLIC_ROUTES) {
  const file = fileFor(route)
  const label = `route ${route}`
  if (!existsSync(file)) {
    fail(label, `no prerendered HTML at ${file.replace(ROOT + '/', '')}`)
    continue
  }
  const html = readFileSync(file, 'utf8')
  const problems = []

  const h1 = countH1(html)
  if (h1 !== 1) problems.push(`expected 1 <h1>, found ${h1}`)

  const title = titleOf(html)
  if (!title) problems.push('missing <title>')
  else if (route !== '/' && title === DEFAULT_SEO.title) problems.push('title is the generic homepage title')

  if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html)) problems.push('missing meta description')
  if (!/<link\s+rel="canonical"\s+href="[^"]+"/i.test(html)) problems.push('missing canonical')
  if (!/<meta\s+property="og:image"\s+content="[^"]+"/i.test(html)) problems.push('missing og:image')

  const ogTitle = ogTitleOf(html)
  if (!ogTitle) problems.push('missing og:title')
  else if (route !== '/' && title && ogTitle !== title) problems.push(`og:title ("${ogTitle}") doesn't match page title`)

  if (title) {
    if (titles.has(title)) problems.push(`duplicate <title> (shared with ${titles.get(title)})`)
    else titles.set(title, route)
  }

  if (problems.length) fail(label, problems.join('; '))
  else pass(label)
}

// Kit pages must carry their cited receipts (the "we made the receipt" promise).
for (const route of KIT_ROUTES) {
  const file = fileFor(route)
  if (!existsSync(file)) continue
  const html = readFileSync(file, 'utf8')
  const label = `receipts on ${route}`
  if (/Source:/i.test(html) || /The receipts/i.test(html) || /Every claim/i.test(html)) pass(label)
  else fail(label, 'no citation/receipt markers found in static HTML')
}

const nardwuarFile = fileFor('/kit/nardwuar-fc')
if (existsSync(nardwuarFile)) {
  const html = readFileSync(nardwuarFile, 'utf8')
  for (const id of ['detail-97', 'detail-deep-research', 'detail-who-benefits']) {
    const article = html.match(new RegExp(`<article[^>]*id="${id}"[^>]*>([\\s\\S]*?)</article>`))?.[1]
    const annotation = nardwuar.kit.annotations.find((item) => item.id === id)
    const citation = nardwuar.citations.find((item) => item.id === annotation?.citationId)
    const problems = []
    if (id !== 'detail-who-benefits' && !citation?.references?.length) problems.push('missing factual reference')
    if (!article?.includes('Our interpretation')) problems.push('missing readable interpretation')
    if (!article?.includes(`href="/kit/nardwuar-fc#${id}"`)) problems.push('missing detail permalink')
    for (const reference of citation?.references ?? []) {
      if (!article?.includes(`href="${reference.url}"`)) problems.push(`missing source link: ${reference.url}`)
      if (!article?.includes(`datetime="${reference.date}"`)) problems.push('missing source date')
    }
    if (problems.length) fail(`Nardwuar ${id}`, problems.join('; '))
    else pass(`Nardwuar ${id}`)
  }
}

// Sitemap coverage.
{
  const label = 'sitemap.xml covers all public routes'
  const sm = join(DIST, 'sitemap.xml')
  if (!existsSync(sm)) {
    fail(label, 'dist/sitemap.xml missing')
  } else {
    const xml = readFileSync(sm, 'utf8')
    const missing = PUBLIC_ROUTES.filter((r) => !xml.includes(`${r === '/' ? '/' : r}</loc>`))
    if (missing.length) fail(label, `missing: ${missing.join(', ')}`)
    else pass(label)
  }
}

console.log()
if (failures) {
  console.error(`${failures} check(s) failed.`)
  process.exit(1)
}
console.log('All SEO checks passed.')
process.exit(0)
