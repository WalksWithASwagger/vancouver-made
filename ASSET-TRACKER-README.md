# Midjourney Asset Tracker + Notion Companion

A utility for tracking, rating, and organizing Midjourney-generated images with integration to Notion for prompts and ratings.

## Features

- **Auto-scan folder** — Import images from ~/Downloads/midjourney or any folder
- **Gallery view** — Browse images organized by concept and batch
- **Rating system** — Star ratings, like/heart, and notes on each image
- **Prompt browser** — View associated prompts pulled from Notion database
- **Notion sync** — Bidirectional sync of ratings to Notion
- **Fast local DB** — SQLite for instant searches and ratings

## Quick Start

### 1. Prerequisites

- Node 18+
- Notion API key (get one at https://www.notion.com/my-integrations)
- A Notion workspace with Prompts and Ratings databases set up

### 2. Environment Setup

```bash
# Copy the example env file
cp .env.example .env.local

# Edit .env.local with your values
VITE_NOTION_API_KEY=your_notion_api_key_here
VITE_NOTION_PROMPTS_DB_ID=your_db_id_here
VITE_NOTION_RATINGS_DB_ID=your_db_id_here
IMAGE_SCAN_DIR=~/Downloads/midjourney
```

### 3. Initialize Database

```bash
node scripts/init-db.js
```

### 4. Run the API Server

In one terminal:
```bash
node src/server/api.js
```

This will start the API on `http://localhost:3001`

### 5. Run the Dev Server

In another terminal:
```bash
npm run dev
```

Navigate to `http://localhost:5173` and look for the Asset Tracker link in the app.

## Setting Up Notion Databases

### Prompts Database

Create a new Notion database with these properties:

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Prompt name |
| Concept | Select | pump-and-dump-fc, number-five-orange, nardwuar-fc, made-on-public-dime, etc. |
| Batch | Select | mood-board, graphics-elements, jersey-flats, on-body |
| PromptId | Text | Unique identifier (e.g., moodboard-1) |
| PromptText | Rich Text | The full Midjourney prompt |
| Status | Select | draft, ready, generated, locked |
| Category | Select | (optional) grouping |

### Ratings Database

Create a new Notion database with these properties:

| Property | Type | Description |
|----------|------|-------------|
| AssetId | Title | Image asset ID |
| Score | Number | 1-5 rating |
| Liked | Checkbox | Heart/like indicator |
| Notes | Text | User notes |
| SyncedAt | Date | Last sync timestamp |

Link the Ratings database to the Prompts database (optional, for richer Notion views).

## Workflow

1. **Generate images** in Midjourney → save to ~/Downloads/midjourney
2. **Scan folder** in the Asset Tracker UI → imports new images
3. **Browse gallery** → filter by concept and batch
4. **Click image** → open lightbox with:
   - Full image view
   - Associated prompt (if linked)
   - Rating controls (stars, heart, notes)
5. **Rate images** → saved to local SQLite instantly
6. **Sync to Notion** → click "Sync to Notion" button to push unsynced ratings

## File Organization

The image scanner will try to infer concept and batch from folder structure:

```
~/Downloads/midjourney/
├── pump-and-dump/
│   ├── mood-board/
│   │   ├── pump-dump-mood-01.png
│   │   └── pump-dump-mood-02.png
│   └── graphics-elements/
│       └── pump-dump-graphic-01.png
├── number-five-orange/
│   └── jersey-flats/
│       └── no5-jersey-01.png
└── nardwuar-fc/
    └── mood-board/
        └── nardwuar-mood-01.png
```

Or you can upload images individually with concept/batch tags in the UI.

## Database Queries

All assets and ratings are stored in `src/db/ratings.db` (SQLite). You can query it directly:

```bash
# List all assets
sqlite3 src/db/ratings.db "SELECT * FROM assets"

# Get ratings stats
sqlite3 src/db/ratings.db "SELECT concept, COUNT(*) as total, AVG(score) as avg_score FROM ratings GROUP BY concept"

# Export liked images
sqlite3 src/db/ratings.db ".mode csv" "SELECT * FROM ratings WHERE liked = 1" > liked-images.csv
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/assets` | List all assets (filters: concept, batch) |
| GET | `/api/assets/concepts` | Get all concept names |
| GET | `/api/assets/batches` | Get batches for a concept |
| POST | `/api/scan-folder` | Scan folder and import images |
| GET | `/api/prompts` | Get prompts from Notion (filters: concept, batch) |
| POST | `/api/ratings` | Save/update a rating |
| GET | `/api/ratings/:assetId` | Get rating for an image |
| POST | `/api/sync-notion` | Push unsynced ratings to Notion |
| GET | `/api/sync-status` | Check how many ratings are unsynced |

## Troubleshooting

### Images not appearing after scan
- Check that the image paths are correct: `file:///path/to/image.png`
- Ensure images are in a supported format (PNG, JPG, WEBP)
- Check browser console for errors

### Notion sync not working
- Verify your API key in `.env.local`
- Confirm the database IDs are correct (check URL in Notion)
- Ensure the Notion integration has permissions for the database

### Database locked error
- Make sure only one process is accessing `src/db/ratings.db`
- Close any other SQLite clients
- Restart the API server

## Advanced

### Bulk Import from CSV

Create a CSV with concept, batch, and file paths, then import:

```bash
node scripts/bulk-import.js assets.csv
```

### Export Ratings Report

```bash
node scripts/export-ratings.js --concept pump-and-dump-fc --format json > ratings.json
```

### Reset Database

```bash
rm src/db/ratings.db
node scripts/init-db.js
```

## Next Steps

- [ ] Build the bulk-import CLI
- [ ] Add export-ratings script
- [ ] Create Notion template database export
- [ ] Add image comparison view (side-by-side)
- [ ] Add tagging system
- [ ] Build desktop app wrapper (Tauri)
