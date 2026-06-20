import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {
  saveAsset,
  getAssets,
  getAssetsConcepts,
  getAssetsBatches,
  saveRating,
  getRating,
  getRatings,
  getRatingsNotSynced,
  updateRatingSync,
  getRatingStats
} from '../utils/sqlite.js'
import {
  initNotionClient,
  getPrompts,
  getPromptById,
  createRating,
  updateRating,
  getConcepts,
  getBatches
} from '../utils/notion.js'
import { scanFolder, importImageFile } from '../utils/imageScanner.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Initialize Notion client
const notionApiKey = process.env.VITE_NOTION_API_KEY
const promptsDatabaseId = process.env.VITE_NOTION_PROMPTS_DB_ID
const ratingsDatabaseId = process.env.VITE_NOTION_RATINGS_DB_ID

if (notionApiKey) {
  try {
    initNotionClient(notionApiKey)
    console.log('✓ Notion client initialized')
  } catch (err) {
    console.warn('⚠ Notion client not available:', err.message)
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Asset routes
app.get('/api/assets', (req, res) => {
  const { concept, batch } = req.query
  const assets = getAssets(concept, batch)
  res.json(assets)
})

app.get('/api/assets/concepts', (req, res) => {
  const concepts = getAssetsConcepts()
  res.json(concepts)
})

app.get('/api/assets/batches', (req, res) => {
  const { concept } = req.query
  const batches = getAssetsBatches(concept)
  res.json(batches)
})

app.post('/api/scan-folder', (req, res) => {
  const scanDir = req.body.scanDir || process.env.IMAGE_SCAN_DIR
  try {
    const result = scanFolder(scanDir)
    res.json({ success: true, ...result })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.post('/api/import-image', (req, res) => {
  const { filePath, concept, batch, promptId } = req.body

  if (!filePath || !concept || !batch) {
    return res.status(400).json({ error: 'Missing required fields: filePath, concept, batch' })
  }

  try {
    const asset = importImageFile(filePath, concept, batch, promptId)
    res.json({ success: true, asset })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Prompts routes
app.get('/api/prompts', async (req, res) => {
  const { concept, batch } = req.query

  if (!promptsDatabaseId) {
    return res.status(503).json({ error: 'Notion prompts database not configured' })
  }

  try {
    const prompts = await getPrompts(promptsDatabaseId, concept, batch)
    res.json(prompts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/prompts/:promptId', async (req, res) => {
  const { promptId } = req.params

  if (!promptsDatabaseId) {
    return res.status(503).json({ error: 'Notion prompts database not configured' })
  }

  try {
    const prompt = await getPromptById(promptsDatabaseId, promptId)
    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found' })
    }
    res.json(prompt)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/prompts-metadata/concepts', async (req, res) => {
  if (!promptsDatabaseId) {
    return res.status(503).json({ error: 'Notion prompts database not configured' })
  }

  try {
    const concepts = await getConcepts(promptsDatabaseId)
    res.json(concepts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/prompts-metadata/batches', async (req, res) => {
  const { concept } = req.query

  if (!promptsDatabaseId) {
    return res.status(503).json({ error: 'Notion prompts database not configured' })
  }

  if (!concept) {
    return res.status(400).json({ error: 'concept query parameter required' })
  }

  try {
    const batches = await getBatches(promptsDatabaseId, concept)
    res.json(batches)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Rating routes
app.get('/api/ratings', (req, res) => {
  const { concept, batch } = req.query
  const ratings = getRatings(concept, batch)
  res.json(ratings)
})

app.get('/api/ratings/:assetId', (req, res) => {
  const { assetId } = req.params
  const rating = getRating(assetId)
  if (!rating) {
    return res.status(404).json({ error: 'Rating not found' })
  }
  res.json(rating)
})

app.post('/api/ratings', (req, res) => {
  const { assetId, concept, batch, score, liked, notes } = req.body

  if (!assetId) {
    return res.status(400).json({ error: 'assetId is required' })
  }

  try {
    saveRating(assetId, { concept, batch, score, liked, notes })
    res.json({ success: true, assetId })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/ratings-stats', (req, res) => {
  const { concept } = req.query
  const stats = getRatingStats(concept)
  res.json(stats)
})

// Sync routes
app.get('/api/sync-status', (req, res) => {
  const unsynced = getRatingsNotSynced()
  res.json({ unsynced: unsynced.length, total: getRatings().length })
})

app.post('/api/sync-notion', async (req, res) => {
  if (!ratingsDatabaseId) {
    return res.status(503).json({ error: 'Notion ratings database not configured' })
  }

  try {
    const unsynced = getRatingsNotSynced()
    const results = []

    for (const rating of unsynced) {
      try {
        let syncId = rating.notionSyncId

        if (!syncId) {
          syncId = await createRating(ratingsDatabaseId, rating)
        } else {
          await updateRating(syncId, rating)
        }

        if (syncId) {
          updateRatingSync(rating.assetId, syncId)
          results.push({ assetId: rating.assetId, synced: true })
        }
      } catch (err) {
        console.error(`Error syncing rating ${rating.assetId}:`, err)
        results.push({ assetId: rating.assetId, synced: false, error: err.message })
      }
    }

    res.json({ success: true, synced: results.length, results })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`)
})

export default app
