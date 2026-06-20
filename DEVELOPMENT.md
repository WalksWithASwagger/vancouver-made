# Development Guide — Vancouver Made

## Project Status

**Active Submission:** Pump & Dump FC (Third Kit) for Vancouver Made Designathon

**Deliverables:**
- [x] Concept locked (submission-brief.md)
- [x] Prompt sets written (3 suites: mood-board, graphics-elements, jersey-flats)
- [x] Asset tracker built (Midjourney image management + Notion integration)
- [ ] Mood board generated (in progress)
- [ ] Jersey design finalized (pending)
- [ ] Presentation complete (pending)

---

## Local Development Setup

### Prerequisites
- Node 18+
- npm or yarn
- A Notion workspace with API key

### Install Dependencies

```bash
npm install
```

### Environment Configuration

1. Copy environment template:
```bash
cp .env.example .env.local
```

2. Add your credentials:
```env
VITE_NOTION_API_KEY=your_notion_api_key
VITE_NOTION_PROMPTS_DB_ID=your_prompts_db_id
VITE_NOTION_RATINGS_DB_ID=your_ratings_db_id
IMAGE_SCAN_DIR=~/Downloads/midjourney
```

Get your Notion API key: https://www.notion.com/my-integrations

### Initialize Database

```bash
node scripts/init-db.js
```

Creates SQLite database at `src/db/ratings.db` with:
- `assets` table (images with metadata)
- `ratings` table (scores, likes, notes, sync status)

### Run Development Servers

**Terminal 1 — Backend API (port 3001):**
```bash
node src/server/api.js
```

**Terminal 2 — Frontend (port 5173):**
```bash
npm run dev
```

Access the app at `http://localhost:5173`

---

## App Navigation

- **`/`** — Main pitch site (MADE ON collection, hero kits, club cards)
- **`/tracker`** — Asset Tracker (image gallery, rating UI, Notion sync)

Switch between routes via footer links or direct URL.

---

## Asset Tracker Workflow

### 1. Generate Images

Use prompts from:
- `docs/design/moodboard-prompts.md` (9 images)
- `docs/design/graphic-elements-prompts.md` (15 images)
- `docs/design/jersey-flats-prompts.md` (10 images)

Save to `~/Downloads/midjourney/` organized by concept and batch:
```
pump-and-dump/
├── mood-board/
├── graphics-elements/
└── jersey-flats/
```

### 2. Import & Rate

In the Asset Tracker (`http://localhost:5173/tracker`):

1. Click "Scan Folder" → auto-imports new images
2. Click image thumbnail → opens lightbox
3. Rate: stars (1-5), heart (like), notes (text)
4. Ratings save instantly to SQLite

### 3. Sync to Notion

- Unsynced ratings show in "Sync Status" header
- Click "Sync to Notion" → pushes to your Notion database
- View and organize ratings in Notion alongside prompts

---

## File Structure

```
src/
├── components/
│   ├── AssetTracker.jsx          Main gallery + filters
│   ├── ImageGallery.jsx          Thumbnail grid
│   ├── LightboxViewer.jsx        Image detail view
│   ├── RatingPanel.jsx           Star/like/notes UI
│   ├── PromptDetails.jsx         Prompt display
│   ├── ConceptFilter.jsx         Sidebar filters
│   ├── SyncStatus.jsx            Notion sync indicator
│   ├── [design components]       Pitch site components
│   └── *.css                     Component styles
├── server/
│   └── api.js                    Express API routes
├── utils/
│   ├── sqlite.js                 Database queries
│   ├── notion.js                 Notion API client
│   ├── imageScanner.js           Folder scanner
│   └── [other utils]
├── db/
│   └── ratings.db                SQLite database
├── data/
│   ├── collection.js             MADE ON collection config
│   ├── clubs.js                  Club definitions
│   └── [other data]
├── scene/
│   └── Stage.jsx                 R3F World Portal
└── App.jsx                       Router + main layout

docs/
├── design/
│   ├── submission-brief.md       Pump & Dump FC concept (LOCKED)
│   ├── moodboard-prompts.md      9 mood board Midjourney prompts
│   ├── graphic-elements-prompts.md 15 graphics element prompts
│   ├── jersey-flats-prompts.md   10 jersey flat prompts
│   └── clubs/                    Club briefs (No.5, Nardwuar, P&D)
├── research/
│   ├── KNOWLEDGE-BASE.md         Research index
│   ├── brief.md                  Live facts checklist
│   ├── sources/                  7 imported research docs
│   └── analysis/                 Synthesis + 3-way analysis
└── deliverables/                 Pitch deck, board, tech pack

ASSET-TRACKER-README.md           Full tracker documentation
DEVELOPMENT.md                    This file
```

---

## API Routes

### Assets
- `GET /api/assets` — List assets (filter: concept, batch)
- `GET /api/assets/concepts` — Get all concepts
- `GET /api/assets/batches?concept=X` — Get batches for concept
- `POST /api/scan-folder` — Scan folder and import
- `POST /api/import-image` — Manual image import

### Prompts (Notion)
- `GET /api/prompts` — List prompts (filter: concept, batch)
- `GET /api/prompts/:promptId` — Get single prompt
- `GET /api/prompts-metadata/concepts` — Get concepts from Notion
- `GET /api/prompts-metadata/batches?concept=X` — Get batches from Notion

### Ratings (SQLite)
- `GET /api/ratings` — List ratings (filter: concept, batch)
- `GET /api/ratings/:assetId` — Get rating for image
- `POST /api/ratings` — Save/update rating

### Sync
- `GET /api/sync-status` — Check unsynced count
- `POST /api/sync-notion` — Push unsynced ratings to Notion

---

## Building for Production

```bash
npm run build
```

Outputs to `dist/`. Can be deployed to Vercel, Netlify, or static host.

---

## Database Operations

### Query SQLite directly

```bash
# List all assets
sqlite3 src/db/ratings.db "SELECT * FROM assets"

# Get rating stats by concept
sqlite3 src/db/ratings.db "SELECT concept, COUNT(*) as total, AVG(score) as avg FROM ratings GROUP BY concept"

# Export liked images
sqlite3 src/db/ratings.db ".mode csv" "SELECT * FROM ratings WHERE liked = 1" > liked.csv
```

### Reset database

```bash
rm src/db/ratings.db
node scripts/init-db.js
```

---

## Troubleshooting

### Images not loading in gallery
- Check file paths are correct (`file:///full/path/to/image.png`)
- Ensure images are PNG, JPG, or WEBP
- Check browser DevTools console for errors

### Notion sync failing
- Verify API key in `.env.local`
- Confirm database IDs are correct (from Notion URL)
- Check that Notion integration has database permissions

### Database locked error
- Ensure only one API server is running
- Close any other SQLite clients
- Restart `node src/server/api.js`

### API not responding
- Check that `node src/server/api.js` is running on port 3001
- Verify no other process is using port 3001: `lsof -i :3001`

---

## Next Steps

1. **Set up Notion** (15 min) — Create Prompts and Ratings databases
2. **Generate images** (30-45 min) — Use prompt sets, save to folders
3. **Import & rate** (15 min) — Scan folder, rate in tracker
4. **Refine design** (ongoing) — Iterate based on ratings
5. **Finalize presentation** (1 hour) — Use top images + concept

---

## Deployment

To go live (Vercel):

```bash
# Push to remote
git push origin claude/vancouver-ai-protest-design-12kdvk

# Create PR to main
gh pr create

# Deploy when ready
vercel --prod
```

Or use GitHub integration: push to `main` → auto-deploys.

---

## Resources

- **Asset Tracker Docs:** ASSET-TRACKER-README.md
- **Submission Brief:** docs/design/submission-brief.md
- **Research KB:** docs/research/KNOWLEDGE-BASE.md
- **Prompt Sets:** docs/design/*-prompts.md
- **Notion API:** https://developers.notion.com
