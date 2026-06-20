// mp4 export for /highlight-reel. Steps a headless 1920x1080 Chromium through every
// beat as a still (live KitFlat flagships included), then ffmpeg-concats them
// on-beat and muxes public/highlight-reel/audio/reel.mp3 → dist/highlight-reel.mp4.
//
// Deterministic by design: it drives the player beat-by-beat via the
// window.__REEL_INDEX__ hook rather than recording live playback (Playwright's
// headless video capture truncates unreliably).
//
// Prereqs (kept out of package.json so a normal install stays lean):
//   npm i -D playwright && npx playwright install chromium
//   ffmpeg on PATH, and the dev server running (npm run dev).
// Run:  npm run record:reel      (override target with REEL_BASE=...)
//
// Tier-1, zero-dep alternative: open /highlight-reel?record=1 and screen-record
// with QuickTime/OBS.

import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import beats from '../src/data/highlightReel.js'

const ROOT = process.cwd()
const BASE = process.env.REEL_BASE || 'http://localhost:5173'
const FR = join(ROOT, '.reel-frames')
const OUT = join(ROOT, 'dist', 'highlight-reel.mp4')
const AUDIO = join(ROOT, 'public/highlight-reel/audio/reel.mp3')
const pad = (i) => String(i).padStart(2, '0')

let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  console.error('record-reel: playwright not installed.\n  npm i -D playwright && npx playwright install chromium')
  process.exit(1)
}

rmSync(FR, { recursive: true, force: true })
mkdirSync(FR, { recursive: true })
mkdirSync(join(ROOT, 'dist'), { recursive: true })

console.log(`record-reel: shooting ${beats.length} beats from ${BASE}/highlight-reel?record=1`)
const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
const page = await ctx.newPage()
await page.goto(`${BASE}/highlight-reel?record=1`, { waitUntil: 'load' })
await page.waitForTimeout(900)
await page.keyboard.press('k') // pause
for (let n = 0; n < 24; n++) {
  if ((await page.evaluate('window.__REEL_INDEX__')) === 0) break
  await page.keyboard.press('ArrowLeft')
  await page.waitForTimeout(110)
}
for (let i = 0; i < beats.length; i++) {
  await page.waitForTimeout(820) // settle the entry animation
  await page.screenshot({ path: join(FR, `f${pad(i)}.png`) })
  if (i < beats.length - 1) {
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(160)
  }
}
await ctx.close()
await browser.close()

let list = ''
for (let i = 0; i < beats.length; i++) {
  list += `file '${join(FR, `f${pad(i)}.png`)}'\nduration ${(beats[i].ms / 1000).toFixed(3)}\n`
}
list += `file '${join(FR, `f${pad(beats.length - 1)}.png`)}'\n`
const listPath = join(FR, 'list.txt')
writeFileSync(listPath, list)

const hasAudio = existsSync(AUDIO)
const args = ['-y', '-f', 'concat', '-safe', '0', '-i', listPath]
if (hasAudio) args.push('-i', AUDIO)
args.push('-vf', 'fps=30,format=yuv420p', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-movflags', '+faststart')
if (hasAudio) args.push('-c:a', 'aac', '-b:a', '192k', '-shortest')
args.push(OUT)
try {
  execFileSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'inherit'] })
} catch {
  console.error('record-reel: ffmpeg failed or not on PATH. Frames are in .reel-frames/')
  process.exit(1)
}
rmSync(FR, { recursive: true, force: true })
console.log(`record-reel: done → ${OUT}${hasAudio ? ' (with music)' : ' (silent — add public/highlight-reel/audio/reel.mp3)'}`)
