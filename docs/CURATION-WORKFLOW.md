# Curation workflow

The loop for working images from generation to shortlist: generate, ingest, star, read picks.

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

## Sync to Notion

The tracker header shows how many ratings are unsynced. Click sync and they push to the Ratings database in Notion (one-way: local is the source of truth). Requires `VITE_NOTION_API_KEY` and `VITE_NOTION_RATINGS_DB_ID` in `.env.local`. See `DEVELOPMENT.md` for the full Notion setup.
