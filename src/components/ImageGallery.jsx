import { useState, useEffect } from 'react'
import LightboxViewer from './LightboxViewer'
import './ImageGallery.css'

export default function ImageGallery({ assets }) {
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [ratings, setRatings] = useState({})

  useEffect(() => {
    // Load ratings for all visible assets
    assets.forEach(asset => {
      if (!ratings[asset.id]) {
        fetchRating(asset.id)
      }
    })
  }, [assets])

  const fetchRating = async assetId => {
    try {
      const res = await fetch(`/api/ratings/${assetId}`)
      if (res.ok) {
        const rating = await res.json()
        setRatings(prev => ({ ...prev, [assetId]: rating }))
      }
    } catch (err) {
      console.error(`Error fetching rating for ${assetId}:`, err)
    }
  }

  return (
    <div className="image-gallery">
      <div className="gallery-grid">
        {assets.map(asset => (
          <div key={asset.id} className="gallery-item">
            <div className="gallery-thumbnail" onClick={() => setSelectedAsset(asset)}>
              <img src={`/api/asset/${asset.id}/raw`} alt={asset.filename} loading="lazy" onError={e => {
                e.target.src = '/placeholder.png'
              }} />
              <div className="gallery-overlay">
                <span className="view-icon">👁</span>
              </div>
            </div>
            <div className="gallery-info">
              <p className="gallery-filename">{asset.filename}</p>
              {ratings[asset.id] && (
                <div className="gallery-rating">
                  {ratings[asset.id].liked && <span className="heart">❤️</span>}
                  {ratings[asset.id].score && <span className="score">⭐ {ratings[asset.id].score}/5</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedAsset && <LightboxViewer asset={selectedAsset} onClose={() => setSelectedAsset(null)} />}
    </div>
  )
}
