import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  const [scanPath, setScanPath] = useState(import.meta.env.VITE_IMAGE_SCAN_DIR || '~/Downloads/midjourney')
  const [apiUp, setApiUp] = useState(null) // null = checking · false = no local API · true = reachable

  // The tracker needs the local Express API (npm run server). On a static deploy
  // there is no backend, so probe /api/health and degrade gracefully instead of
  // spinning forever and spamming the console.
  useEffect(() => {
    document.title = 'Asset Tracker — MADE ON'
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 3000)
    fetch('/api/health', { signal: ctrl.signal })
      .then((r) => setApiUp(r.ok))
      .catch(() => setApiUp(false))
      .finally(() => clearTimeout(t))
    return () => {
      ctrl.abort()
      clearTimeout(t)
    }
  }, [])

  // Load concepts once the API is confirmed reachable
  useEffect(() => {
    if (apiUp) fetchConcepts()
  }, [apiUp])

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
    if (apiUp) fetchAssets()
  }, [apiUp, selectedConcept, selectedBatch])

  if (apiUp === false) return <LocalWorkbenchNotice />

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

// Shown when the local Express API isn't reachable (e.g. the static deploy).
// The tracker is a local-only workbench by design — explain that instead of
// rendering a broken page.
function LocalWorkbenchNotice() {
  return (
    <div className="grain flex min-h-screen flex-col items-center justify-center bg-ink px-6 py-16 text-center text-bone">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan">Local workbench</p>
      <h1 className="headline mt-3 text-4xl text-bone md:text-6xl">
        THE TRACKER RUNS <span className="text-hazard">LOCAL</span>
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-bone/75">
        The Midjourney Asset Tracker is a local-first tool: it needs the Express API and the
        SQLite database on the machine where the images live, so it isn't hosted with the public
        site. To use it, clone the repo and run it locally.
      </p>
      <pre className="mt-6 w-full max-w-md overflow-x-auto rounded border border-bone/15 bg-black/40 p-4 text-left font-mono text-[12px] leading-relaxed text-bone/80">
{`npm install
npm run db:init
npm run dev:all   # API :3001 + site :5173`}
      </pre>
      <p className="mt-4 text-[11px] text-bone/45">
        Setup details in <span className="text-bone/70">DEVELOPMENT.md</span>.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-5 text-xs uppercase tracking-[0.2em]">
        <Link to="/" className="text-hazard transition hover:text-bone">← Back to the pitch</Link>
        <Link to="/engine" className="text-bone/60 transition hover:text-bone">Receipts Engine</Link>
        <Link to="/hall-of-fame" className="text-bone/60 transition hover:text-bone">Hall of Fame</Link>
      </div>
    </div>
  )
}
