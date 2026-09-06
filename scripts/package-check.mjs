import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { PUBLIC_ROUTES } from '../src/data/routes.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const output = join(root, '.vercel/output')
const config = JSON.parse(readFileSync(join(output, 'config.json'), 'utf8'))
assert.equal(config.version, 3)
const filesystem = config.routes.findIndex((rule) => rule.handle === 'filesystem')
assert.equal(filesystem, PUBLIC_ROUTES.length)

for (const route of PUBLIC_ROUTES) {
  const expected = route === '/' ? '/index.html' : `${route}/index.html`
  for (const path of new Set([route, `${route.replace(/\/$/, '')}/`])) {
    const matches = config.routes.slice(0, filesystem).filter((rule) => new RegExp(rule.src).test(path))
    assert.equal(matches.length, 1, `one explicit route for ${path}`)
    assert.equal(matches[0].dest, expected)
  }
  const html = readFileSync(join(output, 'static', expected), 'utf8')
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, route)
  assert.match(html, /rel="canonical"/, route)
}

function files(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name)
    return statSync(path).isDirectory() ? files(path) : [path]
  })
}
const original = files(dist).map((file) => relative(dist, file)).sort()
const packaged = files(join(output, 'static')).map((file) => relative(join(output, 'static'), file)).sort()
assert.deepEqual(packaged, original, 'package contains exactly the verified build')
for (const file of original) {
  assert(readFileSync(join(dist, file)).equals(readFileSync(join(output, 'static', file))), file)
}
const fallback = config.routes.at(-1)
for (const path of ['/making-of/nardwuar-fc', '/wall', '/highlight-reel', '/tracker']) {
  assert(new RegExp(fallback.src).test(path), `${path} retains client routing`)
}
for (const path of ['/assets/missing.js', '/og/missing.jpg', '/missing.png']) {
  assert(!new RegExp(fallback.src).test(path), `${path} must not receive HTML`)
}
console.log(`PASS: ${PUBLIC_ROUTES.length} clean routes, static handling, client fallback and ${original.length} byte-identical files`)

// Exercise our routing rules over HTTP; this does not emulate Vercel infrastructure.
const server = createServer((request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname
  let file
  for (const rule of config.routes) {
    if (rule.handle === 'filesystem') {
      if (packaged.includes(path.slice(1))) file = path
    } else if (new RegExp(rule.src).test(path)) file = rule.dest
    if (file) break
  }
  if (!file || !packaged.includes(file.slice(1))) return response.writeHead(404).end()
  response.writeHead(200).end(readFileSync(join(output, 'static', file)))
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
try {
  const base = `http://127.0.0.1:${server.address().port}`
  const child = spawn(process.execPath, [join(root, 'scripts/deployment-check.mjs'), base], { stdio: 'inherit' })
  const code = await new Promise((resolve, reject) => {
    child.on('exit', resolve)
    child.on('error', reject)
  })
  assert.equal(code, 0, 'HTTP delivery checks pass')
  for (const path of ['/assets/missing.js', '/og/missing.jpg']) {
    assert.equal((await fetch(`${base}${path}`)).status, 404)
  }
} finally {
  await new Promise((resolve) => server.close(resolve))
}
