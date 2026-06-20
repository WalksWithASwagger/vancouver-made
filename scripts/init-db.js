import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'src', 'db', 'ratings.db')

console.log(`Initializing database at ${dbPath}...`)

const db = new Database(dbPath)

// Create ratings table
db.exec(`
  CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assetId TEXT UNIQUE NOT NULL,
    concept TEXT,
    batch TEXT,
    score INTEGER,
    liked BOOLEAN DEFAULT 0,
    notes TEXT,
    notionSyncId TEXT,
    synced BOOLEAN DEFAULT 0,
    syncedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_assetId ON ratings(assetId);
  CREATE INDEX IF NOT EXISTS idx_concept ON ratings(concept);
  CREATE INDEX IF NOT EXISTS idx_batch ON ratings(batch);
  CREATE INDEX IF NOT EXISTS idx_synced ON ratings(synced);

  CREATE TABLE IF NOT EXISTS assets (
    id TEXT PRIMARY KEY,
    concept TEXT NOT NULL,
    batch TEXT NOT NULL,
    filename TEXT NOT NULL,
    path TEXT NOT NULL,
    promptId TEXT,
    imported TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    width INTEGER,
    height INTEGER,
    filesize INTEGER,
    metadata TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_concept_batch ON assets(concept, batch);
`)

db.close()
console.log('✅ Database initialized successfully')
