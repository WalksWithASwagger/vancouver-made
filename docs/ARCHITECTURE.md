# Architecture — how MADE ON is laid out

A single map of the site: the routes, what kind of surface each is, and how data flows from
`src/data/` to the screen. For deploy see [`DEPLOY.md`](DEPLOY.md); for the local dev/tracker setup
see [`../DEVELOPMENT.md`](../DEVELOPMENT.md).

## Stack

React 18 + Vite · React Router · Tailwind (tokens from `src/brand/tokens.js`) · a small Express +
better-sqlite3 API for the **local-only** asset tracker. The 3D World Portal (React-Three-Fiber) was
retired in #39 — the hero is now `HeroShowcase` (image crossfade); no `src/scene/` or three/drei in
the repo. Static build deploys to Vercel; `main` auto-promotes to production.

## Routes (from `src/App.jsx`)

**Pitch surfaces** — share `PitchLayout` (persistent `Nav` + scroll-to-hash + per-route `<title>`):

| Route | Component | What it is |
|-------|-----------|-----------|
| `/` | `MadeOnSite` | The pitch: hero → territorial statement → TheMove → Collection → HeroKits → ProductStrip → Clubs → awards band → ShareQR closer → `Footer` |
| `/journey` | `Journey` | Reveal-on-scroll narrative (provocation → lineage → method → work → close) |
| `/gallery` | `Gallery` | Concept-filtered image lightbox |
| `/kit/:slug` | `DirectionPage` | **Per-direction "design world" landing page** — 4 live: `nardwuar-fc` (flagship), `pump-and-dump-fc`, `number-five-orange`, `china-creek` |
| `/store` | `Store` | The product catalog (patches · stickers · prints · jerseys · lookbook) + a QuickLook modal |
| `/engine` | `ReceiptsEngine` | One civic receipt → three counter-spectacle voices |
| `/process` | `Process` | The method, 7 stages |
| `/making-of` · `/making-of/:slug` | `MakingOf` | In-app per-concept "making of" process pages |
| `/hall-of-fame` | `HallOfFame` | Reference library (protest kits + design canon) |
| `/awards` | `Awards` | 🥈🥈 the double-silver win |
| `/why` | `WhyItWins` | "Why it won" — the rubric case, footer-linked (out of nav) |

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
- `src/data/heroKits.js` — hero-kit specs (01 Silence · 03 Public Dime · 09 Pump & Dump)
- `src/data/clubs.js` — the 4 ALLEY LEAGUE clubs (concept, palette, who-benefits/pays, citations, ethics)
- `src/data/products.js` — store SKUs (+ per-club `TINT`)
- `src/data/rubric.js` · `gallery.js` · `highlightReel.js` · `journey.js` — per-surface content
- `src/data/directions/<slug>.js` + `index.js` (`getDirection` registry) — **the per-direction page manifests** (sections → curated images + copy); read concept/citations from `clubs.js`. 4 live: `nardwuar`, `pump-and-dump`, `number-five-orange`, `china-creek`.

`KitFlat.jsx` code-draws spec-accurate SVG jersey flats from `heroKits.js` (no raster needed).

## The `/kit/:slug` direction-page model (the redesign centerpiece)

Each design direction gets an immersive case study rendered by the reusable `DirectionPage` template
from a manifest, registered in `src/data/directions/index.js` and resolved by `getDirection(slug)`.
Spine: hero → provocation → kit up close → on-body lookbook → the system/derivatives → method timeline →
cited receipts → ethics. `DirectionPage` is defensive — sparser manifests skip missing sections. Reuses
the `Gallery` lightbox + `Journey` reveal patterns; manifests reference already-served `public/` assets.
The Clubs + Hero Kits gateways auto-link any slug `getDirection` knows. The scaffold (#57) shipped; 4 of
the 5 epic directions (#56) are live — Hogan's Alley FC is back-burnered.

## Brand surface

**Bold Nardwuar Tartan Canvas** (#75) — the red Vancouver-tartan plaid is the whole-page ground, and
all readable content floats on cream `.sheet` / `.sheet-paper` cards; nav, marquee and footer ride a
dark `.nav-tartan` band. **Invariant: text never sits on raw tartan** — it's always on a sheet, an ink
chip, or a dark card. Classes live in `src/index.css` (`.tartan-canvas`, `.sheet`, `.sheet-paper`,
`.nav-tartan`), palette tokens in `src/brand/tokens.js`; a faint `body::after` tartan + the `.grain`
halftone stay as subtle texture on the sheets. Kept full-bleed dark (off the canvas): the DirectionPage
kit hero, the ReceiptsEngine "hem" card, the Journey opener, the lightboxes, and the cinematic routes
(`/highlight-reel`, `/wall`, `/tracker`). The 3D World Portal was removed in #39 (hero = `HeroShowcase`).
Full visual direction: [`design/brand-system.md`](design/brand-system.md).
