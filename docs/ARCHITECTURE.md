# Architecture — how MADE ON is laid out

A single map of the site: the routes, what kind of surface each is, and how data flows from
`src/data/` to the screen. For deploy see [`DEPLOY.md`](DEPLOY.md); for the local dev/tracker setup
see [`../DEVELOPMENT.md`](../DEVELOPMENT.md).

## Stack

React 18 + Vite · React Router · Tailwind (tokens from `src/brand/tokens.js`) · React-Three-Fiber
(the retiring 3D portal) · a small Express + better-sqlite3 API for the **local-only** asset tracker.
Static build deploys to Vercel; `main` auto-promotes to production.

## Routes (from `src/App.jsx`)

**Pitch surfaces** — share `PitchLayout` (persistent `Nav` + scroll-to-hash + per-route `<title>`):

| Route | Component | What it is |
|-------|-----------|-----------|
| `/` | `MadeOnSite` | The pitch: hero → territorial statement → TheMove → Collection → HeroKits → ProductStrip → Clubs → WhyItWins → ShareQR closer → footer |
| `/journey` | `Journey` | Reveal-on-scroll narrative (provocation → lineage → method → work → close) |
| `/gallery` | `Gallery` | Concept-filtered image lightbox |
| `/kit/:slug` | `DirectionPage` | **Per-direction "design world" landing page** (flagship: `/kit/nardwuar-fc`) |
| `/store` | `Store` | The product catalog (patches · stickers · prints · jerseys · lookbook) |
| `/engine` | `ReceiptsEngine` | One civic receipt → three counter-spectacle voices |
| `/process` | `Process` | The method, 7 stages |
| `/hall-of-fame` | `HallOfFame` | Reference library (protest kits + design canon) |
| `/awards` | `Awards` | 🥈🥈 the double-silver win |

**Standalone surfaces** (no pitch nav):

| Route | Component | What it is |
|-------|-----------|-----------|
| `/highlight-reel` | `HighlightReel` | Full-screen cinematic reel (`?record=1` capture mode) |
| `/wall` | `GenerativeWall` | "THE DEVELOPING" — generative montage of all the work |
| `/tracker` | `AssetTracker` | **Internal tool** — Midjourney rating/curation workbench (needs the local Express API; degrades gracefully on the static deploy) |
| `*` | `NotFound` | 404 |

Most secondary routes are **lazy-loaded** (separate chunks) so the pitch view paints fast.

## Data flow

Content is data-driven — components render from `src/data/`, so visual changes rarely touch data:

- `src/data/collection.js` — the 9-kit collection + brand spine
- `src/data/heroKits.js` — hero-kit specs (01 Silence · 03 Public Dime · 09 Pump & Dump · NW-01 Nardwuar "Deep Cut")
- `src/data/clubs.js` — the 5 ALLEY LEAGUE clubs (concept, palette, who-benefits/pays, citations, ethics)
- `src/data/products.js` — store SKUs (+ per-club `TINT`)
- `src/data/rubric.js` · `gallery.js` · `highlightReel.js` · `journey.js` — per-surface content
- `src/data/directions/<slug>.js` — **the per-direction page manifest** (sections → curated images + copy); reads concept/citations from `clubs.js`. `nardwuar.js` is the first.

`KitFlat.jsx` code-draws spec-accurate SVG jersey flats from `heroKits.js` (no raster needed).

## The `/kit/:slug` direction-page model (the redesign centerpiece)

Each design direction gets an immersive case study rendered by the reusable `DirectionPage` template
from a manifest. Spine: hero → provocation → kit up close → on-body lookbook → the system/derivatives →
method timeline → cited receipts → ethics. Reuses the `Gallery` lightbox + `Journey` reveal-on-scroll
patterns. Imagery is staged into `public/kit/<slug>/`. Generalizing this scaffold is issue #57; the
roadmap to all five directions is [`ROADMAP.md`](ROADMAP.md) (epic #56).

## Brand surface

Cream "Tartan Paper" theme — surface `bone`/`paper`, text warm `ink`, tartan-red/green/gold accents
(`src/brand/tokens.js`). The `.grain` halftone overlay + `.tartan` plaid bands live in `src/index.css`.
The 3D World Portal was retired from the home in favor of a kit lookbook (`HeroShowcase`); the
`src/scene/` R3F code and the three/drei dependencies were removed in #39.
Full visual direction: [`design/brand-system.md`](design/brand-system.md).
