// mp4 export for /wall — records the live generative loop (HUD hidden via
// ?record=1) to a silent 1920x1080 H.264 file: dist/wall.mp4.
//
// Prereqs: npm i -D playwright && npx playwright install chromium, ffmpeg on PATH,
// dev server running (npm run dev). Run: npm run record:wall
//   WALL_SECS=180 (default) controls length; WALL_BASE overrides the host.
//
// Tier-1 alternative: open /wall?record=1 full-screen and screen-record with
// QuickTime/OBS — fine for a generative ambient loop, zero deps.

import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const BASE = process.env.WALL_BASE || 'http://localhost:5173'
const SECS = Number(process.env.WALL_SECS || 180)
const VID = join(ROOT, '.wall-capture')
const OUT = join(ROOT, 'dist', 'wall.mp4')

let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  console.error('record-wall: playwright not installed.\n  npm i -D playwright && npx playwright install chromium')
  process.exit(1)
}

rmSync(VID, { recursive: true, force: true })
mkdirSync(VID, { recursive: true })
mkdirSync(join(ROOT, 'dist'), { recursive: true })

console.log(`record-wall: capturing ${SECS}s of ${BASE}/wall?record=1 …`)
const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: VID, size: { width: 1920, height: 1080 } },
})
const page = await ctx.newPage()
await page.goto(`${BASE}/wall?record=1`, { waitUntil: 'domcontentloaded', timeout: 60000 })
await page.waitForTimeout(2500) // let the wall populate
await page.waitForTimeout(SECS * 1000)
await ctx.close()
await browser.close()

const webm = readdirSync(VID)
  .filter((f) => f.endsWith('.webm'))
  .map((f) => join(VID, f))[0]
if (!webm || !existsSync(webm)) {
  console.error('record-wall: no video captured')
  process.exit(2)
}
console.log(`record-wall: raw webm ${(statSync(webm).size / 1e6).toFixed(1)}MB → encoding`)
try {
  execFileSync(
    'ffmpeg',
    ['-y', '-i', webm, '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', OUT],
    { stdio: ['ignore', 'ignore', 'inherit'] }
  )
} catch {
  console.error('record-wall: ffmpeg failed or not on PATH. Raw webm kept at', webm)
  process.exit(1)
}
rmSync(VID, { recursive: true, force: true })
console.log('record-wall: done →', OUT)
