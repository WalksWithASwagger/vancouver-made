import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { saveAsset, getAssetById } from './sqlite.js'

// Helper to extract metadata from image file
function getImageMetadata(filePath) {
  try {
    // Try to use ImageMagick identify if available
    const output = execSync(`identify -verbose "${filePath}" 2>/dev/null || echo "no metadata"`, {
      encoding: 'utf8'
    })

    if (output === 'no metadata') return null

    // Parse basic dimensions
    const match = output.match(/Geometry: (\d+)x(\d+)/)
    if (match) {
      return {
        width: parseInt(match[1]),
        height: parseInt(match[2])
      }
    }
    return null
  } catch (err) {
    return null
  }
}

// Stable, URL-safe asset id derived from a file's path (no slashes/spaces)
function relativePathFor(filePath, baseDir) {
  const rel = path.relative(baseDir, filePath)
  return rel.replace(/[^a-zA-Z0-9._-]+/g, '_')
}

// Extract concept and batch from filename or path
function parseAssetInfo(filePath, baseDir) {
  const filename = path.basename(filePath)
  const relativePath = path.relative(baseDir, filePath)

  // Try to infer concept and batch from directory structure or filename
  // e.g., ~/Downloads/midjourney/pump-dump-mood-01.png
  // or ~/Downloads/midjourney/pump-and-dump/mood-board/pump-dump-mood-01.png

  const parts = relativePath.split(path.sep)
  let concept = 'unknown'
  let batch = 'unorganized'
  let promptId = null

  // If there's a subdirectory that looks like a concept
  if (parts.length > 1) {
    const firstPart = parts[0]
    if (firstPart.includes('pump') || firstPart.includes('dump')) {
      concept = 'pump-and-dump-fc'
      batch = parts[1] || batch
    } else if (firstPart.includes('number') || firstPart.includes('five') || firstPart.includes('orange')) {
      concept = 'number-five-orange'
      batch = parts[1] || batch
    } else if (firstPart.includes('nardwuar')) {
      concept = 'nardwuar-fc'
      batch = parts[1] || batch
    } else if (firstPart.includes('made-on') || firstPart.includes('public-dime')) {
      concept = 'made-on-public-dime'
      batch = parts[1] || batch
    } else {
      concept = firstPart
      batch = parts[1] || batch
    }
  }

  // Extract batch from filename patterns
  if (filename.includes('mood')) batch = 'mood-board'
  if (filename.includes('graphic') || filename.includes('element')) batch = 'graphics-elements'
  if (filename.includes('jersey') || filename.includes('flat')) batch = 'jersey-flats'
  if (filename.includes('body') || filename.includes('lifestyle')) batch = 'on-body'

  // Try to extract prompt ID from filename
  const idMatch = filename.match(/(\d{3})|([a-z]+-\d+)/)
  if (idMatch) {
    promptId = `${concept}-${batch}-${idMatch[0]}`
  }

  return { concept, batch, promptId }
}

export function scanFolder(scanDir) {
  const expandedDir = scanDir.replace('~', process.env.HOME)

  if (!fs.existsSync(expandedDir)) {
    throw new Error(`Scan directory does not exist: ${expandedDir}`)
  }

  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp']
  const imported = []
  const skipped = []

  function walkDir(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true })

    for (const file of files) {
      const fullPath = path.join(dir, file.name)

      if (file.isDirectory()) {
        walkDir(fullPath)
      } else if (imageExtensions.includes(path.extname(file.name).toLowerCase())) {
        try {
          const stats = fs.statSync(fullPath)
          const { concept, batch, promptId } = parseAssetInfo(fullPath, expandedDir)

          // Deterministic asset ID (stable across re-scans, URL-safe — no slashes)
          const assetId = relativePathFor(fullPath, expandedDir)

          // Check if already imported
          const existing = getAssetById(assetId)
          if (!existing) {
            const metadata = getImageMetadata(fullPath)

            const asset = {
              id: assetId,
              concept,
              batch,
              filename: file.name,
              path: fullPath,
              promptId,
              filesize: stats.size,
              ...metadata
            }

            saveAsset(asset)
            imported.push({ filename: file.name, assetId, concept, batch })
          } else {
            skipped.push(file.name)
          }
        } catch (err) {
          console.error(`Error processing ${fullPath}:`, err.message)
          skipped.push(file.name)
        }
      }
    }
  }

  walkDir(expandedDir)

  return { imported, skipped, scanDir: expandedDir }
}

export function importImageFile(filePath, concept, batch, promptId = null) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File does not exist: ${filePath}`)
  }

  const stats = fs.statSync(filePath)
  const filename = path.basename(filePath)
  const assetId = relativePathFor(filePath, path.dirname(filePath))

  const metadata = getImageMetadata(filePath)

  const asset = {
    id: assetId,
    concept,
    batch,
    filename,
    path: filePath,
    promptId: promptId || `${concept}-${batch}-${Date.now()}`,
    filesize: stats.size,
    ...metadata
  }

  saveAsset(asset)
  return asset
}
