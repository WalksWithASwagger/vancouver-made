# Curation workflow

The loop for working images from generation to shortlist to publish: generate, ingest, caption & tag, star, read picks, then export to per-project folders and the in-app making-of pages.

## Generate

Prompts live in `docs/design/prompts/`, one folder per kit. Each kit has `moodboard.md`, `graphic-elements.md`, and `jersey-flats.md`. Run them in Midjourney or Rafiki; save the PNGs.

## Ingest: Midjourney (Scan Folder)

Drop images into `IMAGE_SCAN_DIR` (set in `.env.local`; default `~/Downloads/midjourney`). Name subfolders by concept and batch:

```
~/Downloads/midjourney/
├── pump-and-dump/
│   ├── mood-board/
│   ├── graphics-elements/
│   └── jersey-flats/
```

Hit "Scan Folder" in the tracker UI. The API calls `POST /api/scan-folder`, reads the folder layout to infer concept and batch, and imports the images into `src/db/ratings.db`.

## Ingest: other sources (ingest-dir.js)

For non-Midjourney images (Rafiki renders, re-rolls, external references), use `scripts/ingest-dir.js`:

```bash
node scripts/ingest-dir.js <dir> <concept> [batch]
# e.g.
node scripts/ingest-dir.js docs/design/prompts/clubs/nardwuar-fc/rafiki/images/run-X nardwuar-fc run-X
```

Re-runnable: uses INSERT OR REPLACE on a stable id, so re-ingesting the same folder updates rather than duplicates. Images are stored by absolute path and viewed locally only.

## Zero-server scan (contact-sheet.js)

To eyeball the whole Midjourney set without running a server, use `scripts/contact-sheet.js`:

```bash
node scripts/contact-sheet.js
```

Reads `docs/design/prompts/ingest-manifest.json`, writes a static `contact-sheet.html` at the repo root grouped by concept, batch, and prompt. Open it in a browser. Re-run as more generations land.

## Caption & tag

Each asset's `metadata` JSON can carry a `caption`, a `tags` array, and the full `prompt`. These render on the cards and in the lightbox at `/tracker`, and feed both the per-project folders and the making-of pages.

`scripts/annotate-assets.mjs` is the single writer — it merges `{id, caption, tags, ...}` records into each row's `metadata`, preserving existing keys (idempotent):

```bash
node scripts/annotate-assets.mjs annotations.json   # or: ... | node scripts/annotate-assets.mjs -
```

- **Club captions (free):** `scripts/harvest-runjson-captions.mjs` pulls each Rafiki club image's `name` + `prompt` from its run's `run.json` and pipes them to the annotator:
  ```bash
  node scripts/harvest-runjson-captions.mjs | node scripts/annotate-assets.mjs -
  ```
- **Vision pass (eyeballs):** for tags + descriptive captions, look at the images and emit `{id, caption, tags}` records (a batch of vision sub-agents over chunked file lists works well at scale), then apply with `annotate-assets.mjs`. Midjourney rows already carry a `promptLabel` that serves as a caption seed.

## Star

In the tracker UI at `/tracker`, click 1-5 stars on any thumbnail to rate it. Click the heart to mark it as a keeper. Ratings save to `src/db/ratings.db` on click, no modal. Use the "Starred only" toggle and "Sort by score" to converge on winners.

## Read the shortlist

Pull the picks directly from SQLite without opening the app:

```bash
sqlite3 src/db/ratings.db "SELECT a.concept,a.batch,a.filename,r.score,r.liked \
  FROM ratings r JOIN assets a ON a.id=r.assetId \
  WHERE r.score>=4 OR r.liked=1 ORDER BY a.concept,r.score DESC"
```

Score >= 4 or liked = 1 is the shortlist. Export to CSV with `.mode csv` before the query.

## Export: per-project folders (build-by-project.mjs)

`scripts/build-by-project.mjs` mirrors the captioned assets into a browsable, hard-linked tree (≈0 extra disk) under `archive/<date>/by-project/<concept>/`, renamed `NNN-<caption-slug>.png`, each folder with an `_index.md` (caption · tags · source path). Midjourney concepts sub-group by batch (moodboard / graphic-elements / jersey-flats); club runs stay flat.

```bash
node scripts/build-by-project.mjs                 # all concepts
node scripts/build-by-project.mjs china-creek     # just one
```

`archive/` is gitignored — this is a local Finder-browsable layer, not deployed.

## Export: making-of pages (stage-makingof.mjs)

`scripts/stage-makingof.mjs` stages the best images per concept into `public/making-of/<slug>/` (downscaled JPEGs + per-concept `manifest.json` + an `index.json`) that power the in-app `/making-of` and `/making-of/:slug` pages. Each image is classified into one of four stages — mood → graphics → flats → lifestyle (by batch for Midjourney, by tags for clubs) — liked-first and capped per stage.

```bash
node scripts/stage-makingof.mjs                   # all configured concepts
```

Unlike `by-project`, this writes into `public/` (deployed), so it is what makes the captioned process visible on the live site. The concept list (route slug → tracker concept) is configured at the top of the script.

## Sync to Notion

The tracker header shows how many ratings are unsynced. Click sync and they push to the Ratings database in Notion (one-way: local is the source of truth).

**Runbook** (the sync needs Notion credentials, which live only on your machine):

1. `cp .env.example .env.local` and fill in `VITE_NOTION_API_KEY` + `VITE_NOTION_RATINGS_DB_ID` (see `DEVELOPMENT.md` for where to get them).
2. Restart the API: `npm run server` (or `npm run dev:all`).
3. Open `/tracker` and click **Sync to Notion** in the header. New ratings are created in Notion; existing ones updated; each is then marked `synced=1` locally.

Check what's pending without the UI:

```bash
sqlite3 src/db/ratings.db "SELECT COUNT(*) FROM ratings WHERE synced=0"
```
