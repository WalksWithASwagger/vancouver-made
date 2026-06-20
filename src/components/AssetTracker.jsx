import { useState, useEffect } from 'react'
import ImageGallery from './ImageGallery'
import ConceptFilter from './ConceptFilter'
import SyncStatus from './SyncStatus'
import './AssetTracker.css'

export default function AssetTracker() {
  const [concepts, setConcepts] = useState([])
  const [batches, setBatches] = useState([])
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(false)
  const [scanPath, setScanPath] = useState(process.env.VITE_IMAGE_SCAN_DIR || '~/Downloads/midjourney')

  // Load concepts on mount
  useEffect(() => {
    fetchConcepts()
  }, [])

  // Load batches when concept changes
  useEffect(() => {
    if (selectedConcept) {
      fetchBatches()
    } else {
      setBatches([])
    }
  }, [selectedConcept])

  // Load assets when filters change
  useEffect(() => {
    fetchAssets()
  }, [selectedConcept, selectedBatch])

  const fetchConcepts = async () => {
    try {
      const res = await fetch('/api/assets/concepts')
      const data = await res.json()
      setConcepts(data)
    } catch (err) {
      console.error('Error fetching concepts:', err)
    }
  }

  const fetchBatches = async () => {
    if (!selectedConcept) return

    try {
      const res = await fetch(`/api/assets/batches?concept=${selectedConcept}`)
      const data = await res.json()
      setBatches(data)
    } catch (err) {
      console.error('Error fetching batches:', err)
    }
  }

  const fetchAssets = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedConcept) params.append('concept', selectedConcept)
      if (selectedBatch) params.append('batch', selectedBatch)

      const res = await fetch(`/api/assets?${params}`)
      const data = await res.json()
      setAssets(data)
    } catch (err) {
      console.error('Error fetching assets:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleScanFolder = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/scan-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scanDir: scanPath })
      })
      const result = await res.json()

      if (result.success) {
        alert(`Imported ${result.imported.length} images`)
        fetchConcepts()
        fetchAssets()
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (err) {
      console.error('Error scanning folder:', err)
      alert('Error scanning folder')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="asset-tracker">
      <header className="tracker-header">
        <h1>Midjourney Asset Tracker</h1>
        <div className="sync-controls">
          <SyncStatus />
        </div>
      </header>

      <div className="tracker-main">
        <aside className="tracker-sidebar">
          <div className="scan-section">
            <h3>Import Images</h3>
            <input
              type="text"
              value={scanPath}
              onChange={e => setScanPath(e.target.value)}
              placeholder="~/Downloads/midjourney"
              className="scan-input"
            />
            <button onClick={handleScanFolder} disabled={loading} className="scan-button">
              {loading ? 'Scanning...' : 'Scan Folder'}
            </button>
          </div>

          <ConceptFilter
            concepts={concepts}
            batches={batches}
            selectedConcept={selectedConcept}
            selectedBatch={selectedBatch}
            onConceptChange={concept => {
              setSelectedConcept(concept)
              setSelectedBatch(null)
            }}
            onBatchChange={setSelectedBatch}
          />
        </aside>

        <main className="tracker-content">
          {loading && !assets.length ? (
            <div className="loading">Loading assets...</div>
          ) : assets.length === 0 ? (
            <div className="empty-state">
              <p>No assets found. Select a concept or scan a folder to get started.</p>
            </div>
          ) : (
            <ImageGallery assets={assets} />
          )}
        </main>
      </div>
    </div>
  )
}
