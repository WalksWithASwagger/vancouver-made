import { useState, useEffect, useMemo } from 'react'
import LightboxViewer from './LightboxViewer'
import './ImageGallery.css'

export default function ImageGallery({ assets }) {
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [ratings, setRatings] = useState({})
  const [starredOnly, setStarredOnly] = useState(false)
  const [sortByScore, setSortByScore] = useState(false)

  useEffect(() => {
    assets.forEach(asset => {
      if (ratings[asset.id] === undefined) fetchRating(asset.id)
    })
  }, [assets])

  const fetchRating = async assetId => {
    try {
      const res = await fetch(`/api/ratings/${assetId}`)
      // cache null for unrated so we don't refetch every render
      setRatings(prev => ({ ...prev, [assetId]: res.ok ? await res.json() : null }))
    } catch (err) {
      console.error(`Error fetching rating for ${assetId}:`, err)
    }
  }

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
                <p className="gallery-filename">{asset.filename}</p>
              </div>
            </div>
          )
        })}
      </div>

      {selectedAsset && <LightboxViewer asset={selectedAsset} onClose={() => setSelectedAsset(null)} />}
    </div>
  )
}
