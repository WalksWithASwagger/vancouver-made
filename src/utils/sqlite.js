import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'db', 'ratings.db')

let db = null

export function getDb() {
  if (!db) {
    db = new Database(dbPath)
  }
  return db
}

// Asset operations
export function saveAsset(asset) {
  const db = getDb()
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO assets
    (id, concept, batch, filename, path, promptId, width, height, filesize, metadata)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  return stmt.run(
    asset.id,
    asset.concept,
    asset.batch,
    asset.filename,
    asset.path,
    asset.promptId || null,
    asset.width || null,
    asset.height || null,
    asset.filesize || null,
    asset.metadata ? JSON.stringify(asset.metadata) : null
  )
}

export function getAssets(concept = null, batch = null) {
  const db = getDb()
  let query = 'SELECT * FROM assets'
  const params = []

  if (concept || batch) {
    const conditions = []
    if (concept) {
      conditions.push('concept = ?')
      params.push(concept)
    }
    if (batch) {
      conditions.push('batch = ?')
      params.push(batch)
    }
    query += ' WHERE ' + conditions.join(' AND ')
  }

  query += ' ORDER BY batch, imported DESC'
  const stmt = db.prepare(query)
  return stmt.all(...params)
}

export function getAssetById(id) {
  const db = getDb()
  const stmt = db.prepare('SELECT * FROM assets WHERE id = ?')
  return stmt.get(id)
}

export function getAssetsConcepts() {
  const db = getDb()
  const stmt = db.prepare('SELECT DISTINCT concept FROM assets ORDER BY concept')
  return stmt.all().map(row => row.concept)
}

export function getAssetsBatches(concept = null) {
  const db = getDb()
  let query = 'SELECT DISTINCT batch FROM assets'
  if (concept) {
    query += ' WHERE concept = ?'
    const stmt = db.prepare(query)
    return stmt.all(concept).map(row => row.batch)
  }
  const stmt = db.prepare(query)
  return stmt.all().map(row => row.batch)
}

// Rating operations
export function saveRating(assetId, rating) {
  const db = getDb()
  const stmt = db.prepare(`
    INSERT INTO ratings
    (assetId, concept, batch, score, liked, notes, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(assetId) DO UPDATE SET
      score = excluded.score,
      liked = excluded.liked,
      notes = excluded.notes,
      updatedAt = datetime('now')
  `)
  return stmt.run(
    assetId,
    rating.concept,
    rating.batch,
    rating.score || null,
    rating.liked ? 1 : 0,
    rating.notes || null
  )
}

export function getRating(assetId) {
  const db = getDb()
  const stmt = db.prepare('SELECT * FROM ratings WHERE assetId = ?')
  return stmt.get(assetId)
}

export function getRatings(concept = null, batch = null) {
  const db = getDb()
  let query = 'SELECT * FROM ratings'
  const params = []

  if (concept || batch) {
    const conditions = []
    if (concept) {
      conditions.push('concept = ?')
      params.push(concept)
    }
    if (batch) {
      conditions.push('batch = ?')
      params.push(batch)
    }
    query += ' WHERE ' + conditions.join(' AND ')
  }

  query += ' ORDER BY updatedAt DESC'
  const stmt = db.prepare(query)
  return stmt.all(...params)
}

export function getRatingsNotSynced() {
  const db = getDb()
  const stmt = db.prepare('SELECT * FROM ratings WHERE synced = 0')
  return stmt.all()
}

export function updateRatingSync(assetId, notionSyncId) {
  const db = getDb()
  const stmt = db.prepare(`
    UPDATE ratings
    SET synced = 1, notionSyncId = ?, syncedAt = datetime('now')
    WHERE assetId = ?
  `)
  return stmt.run(notionSyncId, assetId)
}

export function getRatingStats(concept = null) {
  const db = getDb()
  let query = `
    SELECT
      COUNT(*) as total,
      COUNT(CASE WHEN liked = 1 THEN 1 END) as liked,
      COUNT(CASE WHEN score IS NOT NULL THEN 1 END) as scored,
      AVG(CASE WHEN score IS NOT NULL THEN score END) as avgScore
    FROM ratings
  `
  if (concept) {
    query += ' WHERE concept = ?'
    const stmt = db.prepare(query)
    return stmt.get(concept)
  }
  const stmt = db.prepare(query)
  return stmt.get()
}
