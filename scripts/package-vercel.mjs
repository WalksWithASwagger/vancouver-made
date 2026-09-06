import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PUBLIC_ROUTES } from '../src/data/routes.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const output = join(root, '.vercel/output')
const destination = (route) => route === '/' ? '/index.html' : `${route}/index.html`

for (const file of [...PUBLIC_ROUTES.map(destination), '/robots.txt', '/sitemap.xml']) {
  if (!existsSync(join(dist, file))) throw new Error(`Missing dist${file}; run build:seo and test:seo first`)
}

const config = {
  version: 3,
  routes: [
    ...PUBLIC_ROUTES.map((route) => ({
      src: route === '/' ? '^/$' : `^${route}/?$`,
      dest: destination(route),
    })),
    { handle: 'filesystem' },
    // Presentation and dynamic client routes still need the SPA shell.
    { src: '^/(?!assets/|og/|.*\\.[^/]+$).*$', dest: '/index.html' },
  ],
}

rmSync(output, { recursive: true, force: true })
mkdirSync(output, { recursive: true })
cpSync(dist, join(output, 'static'), { recursive: true })
writeFileSync(join(output, 'config.json'), `${JSON.stringify(config, null, 2)}\n`)
console.log(`Packaged ${PUBLIC_ROUTES.length} prerendered routes into .vercel/output`)
