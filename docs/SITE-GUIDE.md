# Site guide: MADE ON / Vancouver Made

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for how the React app is wired together.

The site runs ~15 routes: the pitch surfaces (`/`, `/journey`, `/gallery`, `/kit/:slug`, `/store`, `/engine`, `/process`, `/making-of` + `/making-of/:slug`, `/hall-of-fame`, `/awards`, `/why`) share `Nav.jsx` and a `PitchLayout` wrapper; the standalone / cinematic routes (`/highlight-reel`, `/wall`, `/tracker`, plus the 404) render outside it by design. The live look is the **bold Nardwuar Tartan Canvas** — red Vancouver-tartan plaid as the page ground with all content on cream "sheets" (text never sits on raw tartan); the cinematic and internal routes stay fully dark on purpose. See `docs/design/brand-system.md` for the palette.

---

## Pitch surfaces

### / : the pitch site

The main surface. The hero is the MADE ON statement beside a crossfading lookbook of the flagship kits (`HeroShowcase.jsx`), followed by the territorial statement, the nine-kit collection, code-drawn jersey flats, the club gateway grid, the homepage store strip ("THE DROP"), the double-silver awards band, and the shared `Footer`. The 3D World Portal (`<Stage />`) was removed entirely in #39 — there's no `src/scene/` or React-Three-Fiber left in the repo.

### /journey : the narrative arc

A scroll-driven story of how the collection came to be — from the point of view to the locked kit lineup. Contextualises *why* the protest collection exists before the viewer hits the gallery.

### /gallery : the full collection grid

All nine MADE ON kits laid out as a browsable grid. Each card shows the kit name, the receipt it's built on, and the claim on the hem. Entry point to the per-direction detail pages.

### /kit/:slug : per-direction kit page

One immersive "world" per direction, addressed by slug — 4 live: `nardwuar-fc` (flagship), `pump-and-dump-fc`, `number-five-orange`, `china-creek`. Rendered by the reusable `DirectionPage` template from a manifest (`src/data/directions/<slug>.js`, registered via `getDirection`); concept/citations come from `src/data/clubs.js`. Flagship is `/kit/nardwuar-fc` (the Designathon winner). Hogan's Alley FC is back-burnered.

### /store : the drop

25-product catalog (patches · stickers · prints · jerseys · lookbook), built from STARRED, logo-free art. Nardwuar pieces are gated `blessing-pending`. No live checkout by design; data is Shopify-ready. `src/components/Store.jsx`; images in `public/store/`.

### /engine : the receipts engine

One civic receipt rendered three ways: stitched on a kit hem (MADE ON), pasted as a poster (FEEFA), shot like couture (World Cup Fashion Cake). Pick any receipt from the sidebar and all three voices update live. This is the argument made concrete: same truth, three rooms, harder to look away. Data lives in `src/data/receipts.js`; the transform functions are in `src/data/voices.js`.

### /process : the method

The seven-stage walkthrough of how one kit (Pump & Dump FC) moved from point of view to locked tech pack. The thesis: "The human bookends the machine." Voice and judgment are human; generation is the machine accelerant between. See `src/data/process.js` for the full stage data and the HANDS legend (human / handoff / machine / gate).

### /hall-of-fame : reference gallery

The curated visual library the collection draws from. Two tabs: "The Whole Story" (protest kits, athlete dissent, Olympics appropriation, subvertising, Vancouver context) and "Best Kits" (the greatest jersey designs ever cut). Filter by category. Rights-honest: freely-licensed works are archived locally; rights-restricted items are reference cards that link out. Data is in `src/data/hallOfFame.js` and `src/data/kitGallery.js`.

### /awards : what we won

Documents the competition outcomes — double silver at BCIT Tech Collider 2026 (2nd in the Devin Technical Hackathon and 2nd in the Formme Design Challenge). Mirrors `docs/AWARDS.md`.

### /making-of : per-concept process pages

In-app "making of" pages (`/making-of`, `/making-of/:slug`) walking through how each concept was developed. `src/components/MakingOf.jsx`.

### /why : why it won

The judge-facing rubric reframed post-win ("WHY IT WON") — the four criteria with on-site proof links. Linked from the `Footer`, kept out of the main nav. `src/components/WhyItWins.jsx`.

---

## Standalone / internal

### /highlight-reel : cinematic showcase

A full-screen, auto-advancing, scored showcase of the kits. Full-hype cut: today's ALLEY LEAGUE club gens (Nardwuar · No.5 Orange · China Creek) plus flagships 03 Public Dime and 09 Pump and Dump. Renders live `KitFlat` SVGs. Built for presentation and mp4 export (`npm run record:reel`). Stays fully dark by design.

### /wall : generative wall

A live generative display surface — the `GenerativeWall` feature. Cycles through the STARRED kit imagery in a gallery-wall presentation. Stays fully dark by design. `src/components/GenerativeWall.jsx`; images in `public/wall/`.

### /tracker : asset tracker (local only)

A workbench for rating generated images: scan a folder, ingest via `scripts/ingest-dir.js`, star on the grid, push to Notion. Requires the local Express API (`npm run server` on port 3001) and a populated SQLite database (`src/db/ratings.db`). The tracker does not deploy with the static site. It runs only on a machine where the images and the database live.
