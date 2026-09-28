# Agent instructions — vancouver-made

Front door for coding agents. Headings match the kk-agents agent-surface standard.
Human docs win for depth: [`README.md`](README.md), [`DEVELOPMENT.md`](DEVELOPMENT.md),
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/DEPLOY.md`](docs/DEPLOY.md).
When a doc and `src/data/` disagree, **the data file wins**.

## Purpose and Authority

**VANCOUVER MADE / MADE ON** is a FIFA World Cup 2026 protest kit collection and
pitch site (BCIT Tech Collider; double silver). Nine kits, two racks, cited
receipts on the hem. Not a sponsor, not a souvenir.

The repo is two runtimes:

- **Pitch site** (`/` and public routes) — static Vite + React 18 app. This is
  what deploys.
- **Asset tracker** (`/tracker` + Express on `:3001`) — local Midjourney/Rafiki
  curation. Does not ship with the static host.

**Stack (from `package.json`):** Vite 5, React 18, React Router 7, Tailwind 3,
Express 5, better-sqlite3, `@notionhq/client`. Dev: Playwright, concurrently,
PostCSS/Autoprefixer. No TypeScript, no ESLint/Prettier scripts, no Makefile,
no `npm test`. Language is JS/JSX.

**Node:** `DEVELOPMENT.md` says 18+. CI (`.github/workflows/qa.yml`) uses 24.
Package manager is npm (`package-lock.json`). No `engines` field.

**Hosts as documented today:** Git auto-deploy from `main` to
https://vancouver-made.vercel.app. Intended public domain is
https://unofficial.city — verified Actions production is **gated**; see
`docs/DEPLOY.md`. TODO for KK: which URL agents should treat as canonical.

## Capability Ownership

```
src/                 Pitch site + local API
  App.jsx            Router
  brand/tokens.js    Palette + slogan bank (feeds Tailwind)
  components/        Surfaces (KitGateway, DirectionPage, tracker, …)
  data/              Source of truth for kits, receipts, clubs, SEO, routes
  data/directions/   Per-kit world manifests (`getDirection`)
  data/routes.js     Public crawlable routes (prerender / sitemap / SEO)
  hooks/             SEO, reveal, reduced-motion
  server/api.js      Local Express API (`:3001`; Vite proxies `/api`)
  utils/             SQLite, Notion, folder scanner
  db/ratings.db      Local tracker DB (gitignored; `npm run db:init`)
public/              Static assets served as-is
scripts/             Build, SEO, packaging, ingest, reel/wall capture
docs/                Research, design, deliverables, deploy
  deliverables/      Canonical board / deck / tech pack
  research/          Sources + analysis; design from `analysis/SYNTHESIS.md`
  design/            Brand, kit briefs, clubs, Midjourney prompts
DEVELOPMENT.md       How to run the site + tracker
docs/ARCHITECTURE.md Routes and data flow
docs/DEPLOY.md       Vercel + gated Actions production
.env.example         Env **names** only — not a secret store
```

Do not invent a second kit lineup, a live checkout, or a hosted tracker.
Store CTAs are placeholders. The tracker needs the local API, SQLite, and
images on disk.

## Routing and Context Loading

Read only what the task needs:

| Task | Start here |
|------|------------|
| What this is / voice | `README.md` (working principles) |
| Run site or tracker | `DEVELOPMENT.md` |
| Routes, data flow | `docs/ARCHITECTURE.md`, `src/App.jsx`, `src/data/routes.js` |
| Kit / receipt copy | `src/data/collection.js`, `receipts.js`, `clubs.js`, `heroKits.js`, `directions/` |
| Design from research | `docs/research/analysis/SYNTHESIS.md` |
| Deploy / QA gate | `docs/DEPLOY.md`, `.github/workflows/qa.yml` |
| Curation loop | `docs/CURATION-WORKFLOW.md` |
| Docs map | `docs/README.md` |

Do not ingest the whole `docs/research/sources/` tree unless the task is
research. Do not load Rafiki image binaries (`docs/design/prompts/**/rafiki/images/`
is gitignored).

## Verification

Commands below exist in `package.json` or `.github/workflows/qa.yml`. There is
no Makefile and no catch-all `npm test`.

Install / run:

```bash
npm install          # or npm ci (CI + docs/DEPLOY.md)
npm run dev          # Vite → http://localhost:5173
npm run dev:all      # API :3001 + Vite :5173 (tracker)
npm run server       # API only
npm run db:init      # create src/db/ratings.db
npm run build        # dist/
npm run preview      # serve dist/ (--host)
```

Checks (run the matching gate, not all of them):

```bash
npm run test:smoke         # local Express health
npm run build:seo          # vite build + prerender + sitemap
npm run test:seo           # prerendered HTML / titles / canonicals
npm run test:kit-reading   # Nardwuar Deep Cut fragments
npm run package:vercel     # Build Output API v3 into .vercel/output
npm run test:package       # package integrity
npm run test:deployment -- https://example.invalid   # live delivery; needs a real URL
```

CI `seo` job (PRs and `main`):

```bash
npm ci
npx playwright install --with-deps chromium
npm run build:seo
npm run test:seo
npm run test:kit-reading
npm run package:vercel
npm run test:package
git diff --exit-code -- public docs/deliverables
```

Also in `package.json` (not the default PR gate): `prerender`, `gen:sitemap`,
`ingest`, `assets:social` (Python + Pillow), `stage:reel` / `record:reel`,
`stage:wall` / `record:wall`. `record:*` needs Playwright, ffmpeg, and a
running dev server.

Pitch-site work does not need Notion or SQLite. Tracker work does
(`npm run db:init`; Notion vars optional).

## Safety and Human Gates

### Content

1. Punch up, never down. Institutions are the target; the displaced are the home team.
2. Every factual claim on a garment or receipt carries a citation. Unverified
   stats stay `[confirm]` until checked (`docs/research/analysis/05-receipts-verification.md`).
3. No borrowed sacred imagery. Critique systems with paperwork, redaction, receipts.
4. Land acknowledgement is substance. Made on unceded xʷməθkʷəy̓əm, Sḵwx̱wú7mesh,
   səlilwətaɬ territory.
5. **Text never sits on raw tartan** — sheets, ink chips, or dark cards
   (`src/index.css`, `docs/ARCHITECTURE.md`).
6. Generated images are design visualizations, not documentary photos. Say so
   when the UI talks about them.

### Secrets

**This repo has no `.env.schema`.** TODO for KK: add a Varlock schema when you
want a committed contract here.

Env vars are managed with Varlock (`.env.schema` + `varlock run`) or Cursor
Cloud secrets. Do not introduce other secret managers. Never write real values
into files, issues, logs, or PR bodies. Never read `.env`, `.env.local`, or
other value files. Names only:

From `.env.example` (local tracker / Notion; site runs without them):

- `VITE_NOTION_API_KEY`
- `VITE_NOTION_PROMPTS_DB_ID`
- `VITE_NOTION_RATINGS_DB_ID`
- `IMAGE_SCAN_DIR`

Also referenced in code (not in `.env.example`):

- `VITE_IMAGE_SCAN_DIR` — tracker UI default path (`AssetTracker.jsx`)
- `PORT` — API listen port (default `3001`)
- `SMOKE_PORT`, `PRERENDER_PORT`, `KIT_CHECK_PORT` — script ports
- `REEL_BASE`, `WALL_BASE`, `WALL_SECS` — capture scripts

GitHub Actions production job (values live in repo / Production environment
secrets or Cursor Cloud — never in source):

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Repo **variable** (not a secret): `PRODUCTION_DEPLOY_OWNER`. Leave unset unless
KK is activating Actions as the production owner (`docs/DEPLOY.md`).

`DEVELOPMENT.md` still describes `cp .env.example .env.local` for a human
laptop. Agents do not create or open that file. Vite reads `VITE_*` from env;
the API uses `dotenv/config`. TODO for KK: one load path + `.env.schema`.

### Do not

- Change code, CI, Vercel config, or dependencies on a docs-only task.
- Commit `.env*`, `src/db/*.db`, `to-ingest/`, `archive/`, Rafiki `images/`,
  or `.vercel/`.
- Host or “fix” the tracker for production. It is local-only.
- Activate Actions production, flip `git.deploymentEnabled`, or set
  `PRODUCTION_DEPLOY_OWNER` without an explicit human ask.
- Push to `main`, merge, or enable auto-merge.
- Claim Nardwuar blessing, Formme production, or a live unofficial.city
  cutover that `docs/DEPLOY.md` still marks gated.
- Overwrite source social artwork via `assets:social` inside QA.

## Delivery

- Trunk is `main`. Feature branches; PRs get Vercel previews.
- `main` Git-deploys the Vite app to Vercel. The verified prerender artifact
  and https://unofficial.city cutover are a separate, human-gated path
  (`docs/DEPLOY.md`, issue #92).
- Implementation PRs start as drafts. Land your own branch; do not merge it.
- Stage only the paths you changed. Never `git add -A` in a dirty shared tree.
- Keep changes small. Prefer editing `src/data/` over restyling around stale copy.
