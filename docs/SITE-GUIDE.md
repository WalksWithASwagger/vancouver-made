# Site guide: MADE ON / Vancouver Made

Five routes. The first four share `Nav.jsx` and a `PitchLayout` wrapper. The tracker is separate: it renders outside the shared layout because it needs the local Express API to function.

## / : the pitch site

The main submission surface, in the light "Tartan Paper" theme (cream paper, warm near-black text, tartan-red accents). The hero is the MADE ON statement beside a crossfading lookbook of the flagship kits (`HeroShowcase.jsx`), followed by the territorial statement, the full nine-kit collection, code-drawn jersey flats, and the club-card deep-dive method. The old 3D World Portal (`<Stage />`) is retired from the home and journey openers; it survives only off the public pitch surfaces. See `docs/design/brand-system.md` for the palette.

## /engine : the receipts engine

One civic receipt rendered three ways: stitched on a kit hem (MADE ON), pasted as a poster (FEEFA), shot like couture (World Cup Fashion Cake). Pick any receipt from the sidebar and all three voices update live. This is the argument made concrete: same truth, three rooms, harder to look away. Data lives in `src/data/receipts.js`; the transform functions are in `src/data/voices.js`.

## /hall-of-fame : reference gallery

The curated visual library the collection draws from. Two tabs: "The Whole Story" (protest kits, athlete dissent, Olympics appropriation, subvertising, Vancouver context) and "Best Kits" (the greatest jersey designs ever cut). Filter by category. Rights-honest: freely-licensed works are archived locally; rights-restricted items are reference cards that link out. Data is in `src/data/hallOfFame.js` and `src/data/kitGallery.js`.

## /process : the method

The seven-stage walkthrough of how one kit (Pump & Dump FC) moved from point of view to locked tech pack. The thesis: "The human bookends the machine." Voice and judgment are human; generation is the machine accelerant between. See `src/data/process.js` for the full stage data and the HANDS legend (human / handoff / machine / gate).

## /tracker : asset tracker (local only)

A workbench for rating generated images: scan a folder, ingest via `scripts/ingest-dir.js`, star on the grid, push to Notion. Requires the local Express API (`npm run server` on port 3001) and a populated SQLite database (`src/db/ratings.db`). The tracker does not deploy with the static site. It runs only on a machine where the images and the database live.
