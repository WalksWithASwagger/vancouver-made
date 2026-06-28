// Static prerender for SEO + social sharing. Boots `vite preview` over the built
// dist/, drives headless Chromium through every public route, and writes each route's
// settled DOM — page content plus the per-route <head> meta that useSeo applies — to
// dist/<route>/index.html. Crawlers and social scrapers read that static HTML; real
// users still get the SPA, which re-renders over the snapshot on mount.
//
// Mirrors scripts/record-reel.mjs (the house Playwright pattern). Runs after
// `vite build`. Chromium can't run in Vercel's build container, so this runs in CI
// (.github/workflows/qa.yml) or locally via `npm run build:seo`; the prebuilt dist/
// is what gets deployed.
//
// Prereq: playwright (devDependency) + `npx playwright install chromium`.

import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PUBLIC_ROUTES } from '../src/data/routes.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const PORT = process.env.PRERENDER_PORT || '4188'
const BASE = `http://127.0.0.1:${PORT}`

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('prerender: dist/index.html missing — run `vite build` first.')
  process.exit(1)
}

let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  console.error('prerender: playwright not installed.\n  npm i -D playwright && npx playwright install chromium')
  process.exit(1)
}

// Boot `vite preview` against dist/ on IPv4 loopback (matches BASE). Readiness is
// detected by polling HTTP rather than parsing stdout — stdout buffers unpredictably
// when it isn't a TTY (e.g. in CI), which makes log-scraping flaky.
function startPreview() {
  const server = spawn(
    'node',
    ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { cwd: ROOT },
  )
  server.stdout.on('data', () => {})
  server.stderr.on('data', () => {})
  server.on('error', (e) => console.error(`prerender: vite preview error — ${e.message}`))
  return server
}

async function waitForReady(url, attempts = 60, delayMs = 500) {
  for (let i = 0; i < attempts; i++) {
    try {
      await fetch(url) // any HTTP response means the server is accepting connections
      return
    } catch {
      await new Promise((r) => setTimeout(r, delayMs))
    }
  }
  throw new Error(`vite preview did not answer at ${url} within ${(attempts * delayMs) / 1000}s`)
}

const outPath = (route) =>
  route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html')

const preview = startPreview()
await waitForReady(`${BASE}/`)
const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await ctx.newPage()

// Snapshot all routes into memory first, then write — so a route we write doesn't
// change what `vite preview` serves to a later route in the same run.
const snapshots = []
let failed = 0
for (const route of PUBLIC_ROUTES) {
  try {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 30_000 })
    await page.waitForSelector('h1', { timeout: 15_000 })
    await page.waitForTimeout(350) // let the useSeo effect + lazy chunk settle
    snapshots.push([route, await page.content()])
    console.log(`  ✓ ${route}`)
  } catch (err) {
    failed++
    console.error(`  ✗ ${route} — ${err.message}`)
  }
}

await ctx.close()
await browser.close()
preview.kill()

for (const [route, html] of snapshots) {
  const file = outPath(route)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

console.log(`prerender: wrote ${snapshots.length}/${PUBLIC_ROUTES.length} routes → dist/`)
if (failed) process.exit(1)
