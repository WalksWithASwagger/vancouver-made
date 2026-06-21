import { useState, useEffect, useMemo } from 'react'
import LightboxViewer from './LightboxViewer'
import './ImageGallery.css'

export default function ImageGallery({ assets }) {
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [ratings, setRatings] = useState({})
  const [starredOnly, setStarredOnly] = useState(false)
  const [sortByScore, setSortByScore] = useState(false)

  // One batched fetch for all ratings, mapped by assetId — never one request per card
  // (that storm of ~N fetches exhausted sockets and threw "Failed to fetch" en masse).
  useEffect(() => {
    if (!assets.length) return
    let cancelled = false
    fetch('/api/ratings')
      .then(res => (res.ok ? res.json() : []))
      .then(list => {
        if (cancelled) return
        const map = {}
        for (const r of list) map[r.assetId] = r
        setRatings(map)
      })
      .catch(err => console.error('Error fetching ratings:', err))
    return () => { cancelled = true }
  }, [assets])

  // Parse each asset's metadata JSON string once per assets change.
  const metaById = useMemo(() => {
    const m = {}
    for (const a of assets) {
      try { m[a.id] = a.metadata ? JSON.parse(a.metadata) : {} } catch { m[a.id] = {} }
    }
    return m
  }, [assets])

  // 1-click inline rating. Optimistic local update, then persist to the DB.
  const saveRating = async (asset, patch) => {
    const current = ratings[asset.id] || {}
    const next = {
      assetId: asset.id,
      concept: asset.concept,
      batch: asset.batch,
      score: patch.score !== undefined ? patch.score : current.score || 0,
      liked: patch.liked !== undefined ? patch.liked : current.liked ? 1 : 0,
      notes: current.notes || ''
    }
    setRatings(prev => ({ ...prev, [asset.id]: next }))
    try {
      await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next)
      })
    } catch (err) {
      console.error('Error saving rating:', err)
    }
  }

  const setScore = (asset, n) => {
    const cur = ratings[asset.id]?.score || 0
    saveRating(asset, { score: cur === n ? 0 : n }) // click the current score again to clear
  }
  const toggleLike = asset => saveRating(asset, { liked: ratings[asset.id]?.liked ? 0 : 1 })

  const isStarred = a => {
    const r = ratings[a.id]
    return r && (r.score > 0 || r.liked)
  }

  const displayed = useMemo(() => {
    let list = starredOnly ? assets.filter(isStarred) : assets
    if (sortByScore) {
      list = [...list].sort((a, b) => (ratings[b.id]?.score || 0) - (ratings[a.id]?.score || 0))
    }
    return list
  }, [assets, ratings, starredOnly, sortByScore])

  const starredCount = assets.filter(isStarred).length

  return (
    <div className="image-gallery">
      <div className="gallery-toolbar">
        <span className="gallery-count">{displayed.length} shown · {starredCount} starred</span>
        <label><input type="checkbox" checked={starredOnly} onChange={e => setStarredOnly(e.target.checked)} /> starred only</label>
        <label><input type="checkbox" checked={sortByScore} onChange={e => setSortByScore(e.target.checked)} /> sort by score</label>
      </div>

      <div className="gallery-grid">
        {displayed.map(asset => {
          const r = ratings[asset.id] || {}
          const score = r.score || 0
          const meta = metaById[asset.id] || {}
          const caption = meta.caption || meta.promptLabel || asset.filename
          const tags = Array.isArray(meta.tags) ? meta.tags : []
          return (
            <div key={asset.id} className="gallery-item">
              <div className="gallery-thumbnail" onClick={() => setSelectedAsset(asset)}>
                <img src={`/api/asset/${asset.id}/raw`} alt={asset.filename} loading="lazy" onError={e => { e.target.src = '/placeholder.png' }} />
                <div className="gallery-overlay"><span className="view-icon">👁</span></div>
              </div>
              <div className="gallery-info">
                <div className="inline-rate">
                  {[1, 2, 3, 4, 5].map(n => (
                    <span
                      key={n}
                      className={'star' + (n <= score ? ' on' : '')}
                      onClick={() => setScore(asset, n)}
                      title={`${n} star`}
                    >★</span>
                  ))}
                  <span className="keep" onClick={() => toggleLike(asset)} title="keep">{r.liked ? '❤️' : '🤍'}</span>
                </div>
                <p className="gallery-caption" title={asset.filename}>{caption}</p>
                {tags.length > 0 && (
                  <div className="gallery-tags">
                    {tags.slice(0, 6).map(t => <span key={t} className="tag-chip">{t}</span>)}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selectedAsset && <LightboxViewer asset={selectedAsset} onClose={() => setSelectedAsset(null)} />}
    </div>
  )
}
