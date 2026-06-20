/**
 * API smoke test — plain Node ESM, no test framework.
 * Spawns the Express server on an ephemeral port, hits three routes,
 * then closes the server and exits.
 *
 * Usage: node scripts/smoke-test.js
 * npm script: npm run test:smoke
 */

import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const serverPath = path.join(root, 'src', 'server', 'api.js')

let failures = 0
let server = null

function pass(label) {
  console.log(`PASS  ${label}`)
}

function skip(label, reason) {
  console.log(`SKIP  ${label} — ${reason}`)
}

function fail(label, detail) {
  console.error(`FAIL  ${label} — ${detail}`)
  failures++
}

function startServer() {
  return new Promise((resolve, reject) => {
    // Use a fixed ephemeral-range port unlikely to conflict with dev servers.
    // PORT=0 with app.listen() would pick a free port, but the server log prints
    // the env var value (0) rather than the actual bound port, so we use a
    // specific port instead.
    const TEST_PORT = process.env.SMOKE_PORT || '3099'

    server = spawn('node', [serverPath], {
      env: { ...process.env, PORT: TEST_PORT },
      cwd: root,
    })

    let ready = false

    server.stdout.on('data', (chunk) => {
      const text = chunk.toString()
      // The server prints: "🚀 API server running on http://localhost:<port>"
      const match = text.match(/http:\/\/localhost:(\d+)/)
      if (match && !ready) {
        ready = true
        resolve(parseInt(match[1], 10))
      }
    })

    server.stderr.on('data', (chunk) => {
      // Suppress stderr noise in test output unless it's fatal
    })

    server.on('error', reject)
    server.on('exit', (code) => {
      if (!ready) reject(new Error(`Server exited with code ${code} before signalling ready`))
    })

    // Safety timeout
    setTimeout(() => {
      if (!ready) reject(new Error('Server did not signal ready within 10 seconds'))
    }, 10_000)
  })
}

async function runTests(port) {
  const base = `http://localhost:${port}`

  // 1. Health check
  {
    const label = 'GET /api/health returns {status:"ok"}'
    try {
      const res = await fetch(`${base}/api/health`)
      if (res.status !== 200) {
        fail(label, `HTTP ${res.status}`)
      } else {
        const body = await res.json()
        if (body.status === 'ok') {
          pass(label)
        } else {
          fail(label, `body was ${JSON.stringify(body)}`)
        }
      }
    } catch (err) {
      fail(label, err.message)
    }
  }

  // 2. Assets list
  {
    const label = 'GET /api/assets returns JSON array'
    let assets = null
    try {
      const res = await fetch(`${base}/api/assets`)
      if (res.status !== 200) {
        fail(label, `HTTP ${res.status}`)
      } else {
        const body = await res.json()
        if (!Array.isArray(body)) {
          fail(label, `expected array, got ${typeof body}`)
        } else {
          pass(label)
          assets = body
        }
      }
    } catch (err) {
      fail(label, err.message)
    }

    // 3. Raw image route — only if at least one asset exists with a real file
    const label3 = 'GET /api/asset/:id/raw returns 200 image/png'
    if (!assets || assets.length === 0) {
      skip(label3, 'no assets in DB')
    } else {
      const first = assets[0]
      try {
        const res = await fetch(`${base}/api/asset/${first.id}/raw`)
        if (res.status === 404) {
          skip(label3, `asset file not on disk (id: ${first.id})`)
        } else if (res.status !== 200) {
          fail(label3, `HTTP ${res.status}`)
        } else {
          const ct = res.headers.get('content-type') || ''
          if (!ct.includes('image/')) {
            fail(label3, `unexpected content-type: ${ct}`)
          } else {
            pass(label3)
          }
        }
      } catch (err) {
        fail(label3, err.message)
      }
    }
  }
}

async function main() {
  let port
  try {
    port = await startServer()
    console.log(`\nSmoke test running against http://localhost:${port}\n`)
  } catch (err) {
    console.error(`FAIL  Could not start server: ${err.message}`)
    process.exit(1)
  }

  try {
    await runTests(port)
  } finally {
    if (server) server.kill()
  }

  console.log()
  if (failures > 0) {
    console.error(`${failures} test(s) failed.`)
    process.exit(1)
  } else {
    console.log('All checks passed.')
    process.exit(0)
  }
}

main()
