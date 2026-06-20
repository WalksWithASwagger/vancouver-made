// Tier-2 mp4 export: drive the live /highlight-reel?record=1 page with Playwright,
// record a 1920×1080 video of one clean pass, then transcode to H.264 mp4 with ffmpeg
// (muxing public/highlight-reel/audio/reel.mp3 if present).
//
// Prereqs (kept out of package.json so a normal install stays lean):
//   npm i -D playwright && npx playwright install chromium
//   ffmpeg on PATH
// Run the dev server first (npm run dev), then:  npm run record:reel
//
// Tier-1 (zero-dep) alternative: open /highlight-reel?record=1 and screen-record
// with QuickTime/OBS. Both are documented in the plan.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import beats from '../src/data/highlightReel.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.env.REEL_BASE || 'http://localhost:5173'
const OUT_DIR = join(ROOT, 'dist')
const WEBM = join(OUT_DIR, 'highlight-reel.webm')
const MP4 = join(OUT_DIR, 'highlight-reel.mp4')
const AUDIO = join(ROOT, 'public/highlight-reel/audio/reel.mp3')
const SIZE = { width: 1920, height: 1080 }
const totalMs = beats.reduce((n, b) => n + b.ms, 0)

let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  console.error('record-reel: playwright not installed.\n  npm i -D playwright && npx playwright install chromium')
  process.exit(1)
}

mkdirSync(OUT_DIR, { recursive: true })

console.log(`record-reel: capturing ${BASE}/highlight-reel?record=1 (~${Math.round(totalMs / 1000)}s)`)
const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: SIZE,
  recordVideo: { dir: OUT_DIR, size: SIZE },
})
const page = await context.newPage()
await page.goto(`${BASE}/highlight-reel?record=1`, { waitUntil: 'load' })
// Wait for the player to signal a finished pass (with a safety margin).
await page.waitForFunction('window.__REEL_DONE__ === true', { timeout: totalMs + 15000 }).catch(() => {
  console.warn('record-reel: __REEL_DONE__ not seen; using duration fallback')
})
const video = page.video()
await context.close() // flushes the webm
await browser.close()
const src = video ? await video.path() : null
if (src && src !== WEBM) execFileSync('mv', [src, WEBM])
console.log(`record-reel: raw video → ${WEBM}`)

// Transcode + mux music (if a track exists).
const hasAudio = existsSync(AUDIO)
const ff = ['-y', '-i', WEBM]
if (hasAudio) ff.push('-i', AUDIO)
ff.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart')
if (hasAudio) ff.push('-c:a', 'aac', '-shortest')
ff.push(MP4)
try {
  execFileSync('ffmpeg', ff, { stdio: 'inherit' })
  console.log(`record-reel: done → ${MP4}${hasAudio ? ' (with music)' : ' (silent — drop a track at public/highlight-reel/audio/reel.mp3)'}`)
} catch {
  console.error('record-reel: ffmpeg failed or not on PATH. The raw .webm is still at', WEBM)
  process.exit(1)
}
