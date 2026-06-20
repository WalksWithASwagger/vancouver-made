import { useState, useEffect } from 'react'
import RatingPanel from './RatingPanel'
import PromptDetails from './PromptDetails'
import './LightboxViewer.css'

export default function LightboxViewer({ asset, onClose }) {
  const [rating, setRating] = useState(null)
  const [prompt, setPrompt] = useState(null)

  useEffect(() => {
    // Fetch current rating
    fetchRating()
    // Fetch prompt details
    if (asset.promptId) {
      fetchPrompt()
    }
  }, [asset.id])

  const fetchRating = async () => {
    try {
      const res = await fetch(`/api/ratings/${asset.id}`)
      if (res.ok) {
        const data = await res.json()
        setRating(data)
      } else {
        setRating({ assetId: asset.id, concept: asset.concept, batch: asset.batch })
      }
    } catch (err) {
      console.error('Error fetching rating:', err)
      setRating({ assetId: asset.id, concept: asset.concept, batch: asset.batch })
    }
  }

  const fetchPrompt = async () => {
    try {
      const res = await fetch(`/api/prompts/${asset.promptId}`)
      if (res.ok) {
        const data = await res.json()
        setPrompt(data)
      }
    } catch (err) {
      console.error('Error fetching prompt:', err)
    }
  }

  const handleRatingChange = async newRating => {
    setRating(newRating)
    // Save to backend
    try {
      await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRating)
      })
    } catch (err) {
      console.error('Error saving rating:', err)
    }
  }

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-container" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>×</button>

        <div className="lightbox-content">
          <div className="lightbox-image-section">
            <img src={`/api/asset/${asset.id}/raw`} alt={asset.filename} className="lightbox-image" onError={e => {
              e.target.src = '/placeholder.png'
            }} />
            <div className="lightbox-asset-info">
              <p><strong>Filename:</strong> {asset.filename}</p>
              <p><strong>Concept:</strong> {asset.concept}</p>
              <p><strong>Batch:</strong> {asset.batch}</p>
              {asset.width && <p><strong>Dimensions:</strong> {asset.width}x{asset.height}</p>}
              {asset.filesize && <p><strong>Size:</strong> {(asset.filesize / 1024 / 1024).toFixed(2)} MB</p>}
            </div>
          </div>

          <div className="lightbox-details-section">
            {rating && (
              <RatingPanel
                rating={rating}
                onRatingChange={handleRatingChange}
              />
            )}

            {prompt && (
              <PromptDetails prompt={prompt} />
            )}

            {!prompt && asset.promptId && (
              <div className="prompt-loading">Loading prompt details...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
