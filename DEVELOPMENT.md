# Building MADE ON

This is the working doc for the repo: how to run it, how the asset tracker works, and
where everything lives. The collection itself, the why, and the lineup are in the root
`README.md`. This is the how.

Two things run here:

- **The pitch site** at `/`. React + Vite. The hero kit-lookbook, the territorial
  statement, the collection, the code-drawn kit flats, the deep-dive method. Plus the
  **Receipts Engine** (`/engine`), the **Process** walkthrough (`/process`), and the
  **Hall of Fame** reference gallery (`/hall-of-fame`).
- **The asset tracker** at `/tracker`. A workbench for the generated images: scan or
  ingest a folder, star inline on the grid, push ratings to Notion. Local-first, fast,
  no cloud required to use it.

## Status

- [x] Double-silver win; pitch site live on vancouver-made.vercel.app.
- [x] Prompt library written for the full collection. See `docs/design/prompts/`.
- [x] Asset tracker: inline grid starring, folder ingest, caption + tags on cards, Notion sync.
- [x] Generations ingested + captioned + tagged across all concepts (Midjourney + Rafiki).
- [x] In-app `/making-of` process pages staged for all 7 concepts (see `docs/CURATION-WORKFLOW.md`).
- [ ] Production run + social launch (KK-led). Notion sync is a documented handoff.

## Run it

You need Node 18 or newer. That's it for the pitch site. The tracker adds a Notion key
if you want sync.

```bash
npm install
```

Copy the env template and fill in what you have:

```bash
cp .env.example .env.local
```

```env
VITE_NOTION_API_KEY=...
VITE_NOTION_PROMPTS_DB_ID=...
VITE_NOTION_RATINGS_DB_ID=...
IMAGE_SCAN_DIR=~/Downloads/midjourney
```

Get a Notion key at https://www.notion.com/my-integrations. You can skip all the Notion
vars and still run the site and rate images locally. Sync just won't fire.

Build the local database (SQLite, one file at `src/db/ratings.db`):

```bash
npm run db:init
```

That makes two tables: `assets` (the images it finds) and `ratings` (your scores, likes,
notes, sync state).

Then boot both processes together:

```bash
npm run dev:all    # API on :3001 + Vite on :5173
```

Or run them separately if you need independent logs:

```bash
npm run server     # http://localhost:3001
npm run dev        # http://localhost:5173
```

Pitch site is at `/`, tracker is at `/tracker`. Footer links jump between them.

## The asset tracker

The loop is: generate, scan or ingest, caption + tag, star, sync — then export to the
per-project folders and the `/making-of` pages. The caption/tag, reclassify, by-project and
making-of steps are documented in full in [`docs/CURATION-WORKFLOW.md`](docs/CURATION-WORKFLOW.md);
this section covers run/scan/ingest/star/sync.

**Generate.** Prompts live in `docs/design/prompts/`, one folder per kit. Each kit has
`moodboard.md`, `graphic-elements.md`, and `jersey-flats.md`. Pump & Dump (09) and the
Public Dime (03) are written out; the rest of the lineup is indexed in
`docs/design/prompts/README.md`. Run them in Midjourney, save the PNGs.

**Scan.** Drop the images in `IMAGE_SCAN_DIR` (default `~/Downloads/midjourney`). The
scanner reads concept and batch from the folder layout, so name the folders like the
kits:

```
~/Downloads/midjourney/
├── pump-and-dump/
│   ├── mood-board/
│   ├── graphics-elements/
│   └── jersey-flats/
└── public-dime/
    └── mood-board/
```

Hit "Scan Folder" in the tracker. New images show up in the gallery.

**Ingest (other sources).** For non-Midjourney images (Rafiki renders, re-rolls), ingest
a folder straight into the DB under a concept/batch:

```bash
node scripts/ingest-dir.js <folder> <concept> [batch]
# e.g. node scripts/ingest-dir.js docs/design/prompts/clubs/nardwuar-fc/rafiki/images/run-X nardwuar-fc run-X
```

Re-runnable (INSERT OR REPLACE on a stable id). The tracker holds seven concepts today:
`09-pump-and-dump`, `03-public-dime`, `01-made-on-silence`, `nardwuar-fc`,
`number-five-orange`, `china-creek`, and a small `unsorted` remainder. The Rafiki kit PNGs
live under `docs/design/prompts/**/rafiki/images/` (gitignored, local only; referenced by
absolute path).

**Star.** Star right on the grid: click 1-5 stars (or the heart to "keep") on each
thumbnail. Saves to the DB on click, no modal. Use **starred only** and **sort by score**
at the top of the grid to converge. Click a thumbnail for the lightbox if you want the
full image + notes.

**Read the picks.** The starred shortlist is one SQLite query (no app needed):

```bash
sqlite3 src/db/ratings.db "SELECT a.concept,a.batch,a.filename,r.score,r.liked \
  FROM ratings r JOIN assets a ON a.id=r.assetId \
  WHERE r.score>=4 OR r.liked=1 ORDER BY a.concept,r.score DESC"
```

For a zero-server visual scan of the Midjourney set, `node scripts/contact-sheet.js`
writes a static `contact-sheet.html` grid.

**Sync.** The header shows how many ratings haven't gone to Notion yet. Click sync and
they push up. This is one-way: local is the source of truth, Notion is the shared view.

## Notion setup

Two databases. Make them in Notion, share them with your integration, drop the IDs in
`.env.local` (the ID is the chunk in the database URL).

**Prompts**: where the Midjourney prompts live so the tracker can show them next to the
image.

| Property | Type | Holds |
|----------|------|-------|
| Name | Title | Prompt name |
| Concept | Select | `pump-and-dump-fc`, `made-on-public-dime`, etc. |
| Batch | Select | `mood-board`, `graphics-elements`, `jersey-flats` |
| PromptId | Text | Stable id, e.g. `pd-moodboard-01` |
| PromptText | Rich text | The full prompt |
| Status | Select | `draft`, `ready`, `generated`, `locked` |
| Category | Select | Optional grouping |

**Ratings**: where your picks land for a shared view.

| Property | Type | Holds |
|----------|------|-------|
| AssetId | Title | The image id |
| Score | Number | 1-5 |
| Liked | Checkbox | The heart |
| Notes | Text | Your note |
| SyncedAt | Date | Last push |

## Where things live

```
src/
├── App.jsx                  Router: / · /journey · /gallery · /kit/:slug · /store · /engine · /process · /making-of · /making-of/:slug · /hall-of-fame · /awards · /why · /highlight-reel · /wall · /tracker · 404
├── components/
│   ├── Nav.jsx              Shared sticky nav across the pitch surfaces
│   ├── TheMove.jsx / WhyItWins.jsx / ShareQR.jsx / PresenterControls.jsx   Pitch sections + closer
│   ├── ReceiptsEngine.jsx / HallOfFame.jsx / Process.jsx   The /engine, /hall-of-fame, /process pages
│   ├── MakingOf.jsx / GenerativeWall.jsx   The /making-of and /wall pages
│   ├── AssetTracker.jsx     Tracker shell: sidebar + gallery
│   ├── ImageGallery.jsx     Thumbnail grid
│   ├── LightboxViewer.jsx   Image detail + rating + prompt
│   ├── RatingPanel.jsx      Stars / like / notes
│   ├── PromptDetails.jsx    Prompt text, copy button
│   ├── ConceptFilter.jsx    Sidebar filters
│   ├── SyncStatus.jsx       Notion sync indicator
│   ├── Collection / KitGateway / KitFlat / Crest   The pitch site
│   └── *.css
├── server/api.js            Express API on :3001
├── utils/
│   ├── sqlite.js            DB queries
│   ├── notion.js            Notion client
│   └── imageScanner.js      Folder scanner
├── db/ratings.db            SQLite (created by init-db.js)
├── data/                    collection.js, receipts.js, heroKits.js, clubs.js, kitGateway.js, directions/
├── hooks/useReveal.js       Shared scroll-reveal (IntersectionObserver → .reveal/.in)
└── brand/tokens.js          Palette (feeds Tailwind) + slogan bank

docs/
├── design/
│   ├── submission-brief.md  Pump & Dump FC, the locked concept
│   ├── brand-system.md      The visual system
│   ├── prompts/             Midjourney prompt library, one folder per kit
│   ├── clubs/               The ALLEY LEAGUE deep-dive briefs (Nardwuar, China Creek, N5 Orange, Pump & Dump, Hogan's Alley)
│   └── kits/                Filled tech-pack briefs (MO-01 / 03 / 09)
├── presentation/            Deck outline
├── deliverables/            Board (PDF), pitch deck (PPTX), tech pack (PDF), mockups/
└── research/                Knowledge base: 8 source docs + analyses + synthesis

scripts/init-db.js                 Builds src/db/ratings.db
scripts/ingest-assets.js           Imports Midjourney 4-up sets from to-ingest/ (+ manifest)
scripts/ingest-dir.js              Imports any folder of images under a concept/batch
scripts/contact-sheet.js           Writes a static contact-sheet.html for a zero-server scan
scripts/harvest-runjson-captions.mjs  Pulls captions/prompts from Rafiki run.json → annotations
scripts/annotate-assets.mjs        Merges {caption, tags, excluded, ...} into assets.metadata
scripts/reclassify-assets.mjs      Moves assets to a different concept (e.g. emptying 'unsorted')
scripts/build-by-project.mjs       Mirrors assets into archive/<date>/by-project/ (hard-linked)
scripts/stage-makingof.mjs         Stages curated images → public/making-of/ for the /making-of pages
scripts/stage-wall-assets.mjs / stage-reel-assets.mjs   Stage public/wall + public/highlight-reel
```

The caption/tag → by-project → making-of pipeline (and the Notion sync runbook) is documented
in [`docs/CURATION-WORKFLOW.md`](docs/CURATION-WORKFLOW.md).

## API routes

Express, on `http://localhost:3001`. The Notion routes return 503 until you've set the
matching database ID.

| Method | Route | Does |
|--------|-------|------|
| GET | `/api/health` | Liveness check |
| GET | `/api/assets` | List assets (filter: `concept`, `batch`) |
| GET | `/api/assets/concepts` | Distinct concepts in the DB |
| GET | `/api/assets/batches` | Batches for a concept |
| POST | `/api/scan-folder` | Scan `scanDir` (or `IMAGE_SCAN_DIR`) and import |
| POST | `/api/import-image` | Import one image by path |
| GET | `/api/prompts` | Prompts from Notion (filter: `concept`, `batch`) |
| GET | `/api/prompts/:promptId` | One prompt by id |
| GET | `/api/prompts-metadata/concepts` | Concepts from the Notion prompts DB |
| GET | `/api/prompts-metadata/batches` | Batches for a concept (Notion) |
| GET | `/api/ratings` | List ratings (filter: `concept`, `batch`) |
| GET | `/api/ratings/:assetId` | One rating |
| POST | `/api/ratings` | Save or update a rating |
| GET | `/api/ratings-stats` | Count and averages (filter: `concept`) |
| GET | `/api/sync-status` | How many ratings are unsynced |
| POST | `/api/sync-notion` | Push unsynced ratings to Notion |

## The database

It's just a SQLite file. Query it straight when you want a quick read:

```bash
# everything you've imported
sqlite3 src/db/ratings.db "SELECT * FROM assets"

# how each concept is scoring
sqlite3 src/db/ratings.db "SELECT concept, COUNT(*) total, AVG(score) avg FROM ratings GROUP BY concept"

# pull the keepers
sqlite3 src/db/ratings.db ".mode csv" "SELECT * FROM ratings WHERE liked = 1" > liked.csv
```

Start over:

```bash
rm src/db/ratings.db && npm run db:init
```

## Build and deploy

```bash
npm run build      # into dist/
npm run preview    # serve that build
```

`dist/` is a static bundle. Push to Vercel or any static host. The tracker's API
(`src/server/api.js`) is a local tool and does not deploy with the site; it's for working
on a machine where the images and the database live.

## When it breaks

**Images don't show after a scan.** Check the path resolves
(`file:///full/path/image.png`), the format is PNG/JPG/WEBP, and the browser console for
errors.

**Notion sync fails.** Key right in `.env.local`? Database IDs right (the chunk from the
Notion URL)? Integration actually shared into both databases? All three have to be true.

**"Database locked."** Only one thing can write at a time. Close other SQLite clients,
make sure a single API server is running, restart it.

**API not answering.** Confirm `npm run server` is up on 3001. Check nothing else
grabbed the port: `lsof -i :3001`.

## Deployment

The pitch site (`/`) is a static Vite build: run `npm run build` and push `dist/` to
Vercel or any static host. No server required.

The Asset Tracker (`/tracker`) is local-only. It depends on the Express API
(`src/server/api.js`), the SQLite database (`src/db/ratings.db`), and the image files on
your local machine. None of those travel with a static deploy, so the tracker is not
intended to be hosted remotely.
