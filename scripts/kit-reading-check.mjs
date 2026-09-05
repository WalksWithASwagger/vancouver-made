import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'
import { chromium } from 'playwright'
import { KIT_ROUTES } from '../src/data/routes.js'
import { getDirection } from '../src/data/directions/index.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PORT = process.env.KIT_CHECK_PORT || '4192'
const BASE = `http://127.0.0.1:${PORT}`
const KIT = '/kit/nardwuar-fc'
const IDS = ['detail-97', 'detail-deep-research', 'detail-who-benefits']
const SOURCES = [
  'https://www.serviette.ca/nardwuar-com/vs/jean_chretien/index.html',
  'https://archive.news.ubc.ca/ubcreports/2006/06dec07/incubator.html',
]

assert(existsSync(join(ROOT, 'dist', KIT, 'index.html')), 'Run build, prerender and gen:sitemap first')
const server = spawn('node', [
  'node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', PORT, '--strictPort',
], { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] })
let serverOutput = ''
server.stdout.on('data', (data) => { serverOutput += data })
server.stderr.on('data', (data) => { serverOutput += data })

async function atDetail(page, id) {
  await page.waitForFunction((target) => {
    const el = document.getElementById(target)
    if (!el) return false
    const top = el.getBoundingClientRect().top
    const header = document.querySelector('header').getBoundingClientRect().bottom
    return document.activeElement === el && top >= header && top <= 140
  }, id)
  assert.equal(new URL(page.url()).hash, `#${id}`)
}

async function readable(page) {
  for (const id of IDS) {
    assert(await page.locator(`#${id}`).isVisible(), `${id} is visible`)
    assert(await page.locator(`#${id}`).evaluate((el) => {
      for (let node = el; node; node = node.parentElement) {
        if (getComputedStyle(node).opacity === '0') return false
      }
      return true
    }), `${id} has no transparent ancestor`)
  }
  for (const source of SOURCES) {
    const link = page.locator(`article a[href="${source}"]`)
    assert.equal(await link.count(), 1, `inline source: ${source}`)
    assert(await link.isVisible())
  }
  assert(await page.getByText('Exhibition study · AI-generated design visualizations', { exact: true }).isVisible())
  assert(await page.locator('#detail-who-benefits').innerText().then((text) => text.includes('not a Nardwuar quotation')))
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow')
}

let browser
try {
  let ready = false
  let readiness = ''
  for (let attempt = 0; attempt < 60; attempt++) {
    assert(server.exitCode === null, `Preview server exited: ${serverOutput}`)
    try {
      const response = await fetch(`${BASE}/`)
      readiness = `HTTP ${response.status}`
      ready = response.ok
      if (ready) break
    } catch (error) {
      readiness = `${error.message}: ${error.cause?.message ?? ''}`
    }
    await delay(250)
  }
  assert(ready, `Preview server did not become ready (${readiness}): ${serverOutput}`)
  browser = await chromium.launch({ headless: true })
  const errors = []

  for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }, { width: 640, height: 450 }]) {
    const context = await browser.newContext({
      viewport,
      reducedMotion: viewport.width === 1280 ? 'no-preference' : 'reduce',
      deviceScaleFactor: viewport.width === 640 ? 2 : 1,
    })
    // Local verification must not send production analytics events.
    await context.route(/https:\/\/.*(googletagmanager|google-analytics)\.com\//, (route) => route.fulfill({ status: 200, body: '' }))
    const page = await context.newPage()
    page.setDefaultTimeout(8000)
    page.on('pageerror', (error) => errors.push(error.message))
    await page.route('**/assets/DirectionPage-*.js', async (route) => {
      await delay(300)
      await route.continue()
    })

    for (const id of IDS) {
      await page.goto('about:blank')
      assert.equal((await page.goto(`${BASE}${KIT}#${id}`)).status(), 200)
      await atDetail(page, id)
      await readable(page)
      await page.reload()
      await atDetail(page, id)
    }
    console.log(`PASS  ${viewport.width}px: direct fragments, delayed lazy chunk, reload, readable content`)

    await page.goto(BASE)
    await page.locator(`a[href="${KIT}"]`).first().click()
    await page.getByRole('heading', { name: 'READ THE DEEP CUT', exact: true }).waitFor()
    const sectionOrder = await page.locator('main h2').allTextContents()
    assert(sectionOrder.indexOf('READ THE DEEP CUT') < sectionOrder.indexOf('THE TARGET'))
    const jump = page.getByRole('navigation', { name: 'Read the Deep Cut details' })
    await jump.locator('a').first().press('Enter')
    await atDetail(page, IDS[0])
    assert(await page.locator(`#${IDS[0]}`).evaluate((el) => getComputedStyle(el).outlineStyle !== 'none'), 'visible keyboard focus')
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), `${KIT}#${IDS[0]}`)
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => document.activeElement.href), SOURCES[0])
    await jump.locator('a').nth(1).click()
    await atDetail(page, IDS[1])
    await page.goBack()
    await atDetail(page, IDS[0])
    await page.goForward()
    await atDetail(page, IDS[1])
    await page.getByRole('link', { name: 'Link to DEEP RESEARCH detail', exact: true }).click()
    await atDetail(page, IDS[1])
    assert.equal(await page.getByRole('dialog').count(), 0, 'reading never needs a modal')

    for (const alt of ['Home · front', 'Home · back']) {
      const img = page.getByAltText(alt, { exact: true })
      await img.scrollIntoViewIfNeeded()
      await page.waitForFunction((caption) => [...document.images].some((img) => img.alt === caption && img.complete && img.naturalWidth > 0), alt)
    }
    console.log(`PASS  ${viewport.width}px: entry journey, keyboard/source focus, history, permalink, front/back images`)
    await context.close()
  }

  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false })
  // Vite preview falls back to the homepage for clean URLs. #92 owns that mapping;
  // this fixture verifies the actual prerendered kit document at its canonical path.
  await context.route(`${BASE}${KIT}`, (route) => route.fulfill({
    path: join(ROOT, 'dist', KIT, 'index.html'),
    contentType: 'text/html',
  }))
  const page = await context.newPage()
  await page.goto(`${BASE}${KIT}#${IDS[0]}`)
  await readable(page)
  await page.locator(`article a[href="${KIT}#${IDS[2]}"]`).click()
  assert.equal(new URL(page.url()).hash, `#${IDS[2]}`)
  assert(await page.locator(`#${IDS[2]}`).evaluate((el) => el.getBoundingClientRect().top >= 0))
  console.log('PASS  no JavaScript: prerendered document fixture, source links, native fragments (#92 owns clean-URL delivery)')
  await context.close()

  const regressions = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  await regressions.route(/https:\/\/.*(googletagmanager|google-analytics)\.com\//, (route) => route.fulfill({ status: 200, body: '' }))
  regressions.on('pageerror', (error) => errors.push(error.message))
  for (const route of KIT_ROUTES.filter((route) => route !== KIT)) {
    assert.equal((await regressions.goto(`${BASE}${route}`)).status(), 200)
    await regressions.getByRole('heading', { name: getDirection(route.split('/').at(-1)).name, level: 1, exact: true }).waitFor()
    assert.equal(await regressions.getByRole('heading', { name: 'READ THE DEEP CUT', exact: true }).count(), 0)
    assert.equal((await regressions.locator('main h2').allTextContents())[0], 'THE TARGET')
  }
  await regressions.goto(`${BASE}/#hero-kits`)
  const gateway = regressions.locator('#hero-kits')
  await gateway.waitFor()
  assert((await gateway.innerText()).includes('Nardwuar’s APEC interview transcript'))
  assert(await gateway.locator(`a[href="${KIT}"]`).count() > 0)
  console.log('PASS  four other kit worlds and homepage citation consumer')
  assert.deepEqual(errors, [], 'browser runtime errors')
  console.log('All kit reading checks passed.')
} finally {
  if (browser) await browser.close()
  server.kill()
}
