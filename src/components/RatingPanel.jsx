import { useState } from 'react'
import './RatingPanel.css'

export default function RatingPanel({ rating, onRatingChange }) {
  const [score, setScore] = useState(rating?.score || 0)
  const [liked, setLiked] = useState(rating?.liked || false)
  const [notes, setNotes] = useState(rating?.notes || '')
  const [hover, setHover] = useState(0)

  const handleScoreChange = newScore => {
    setScore(newScore === score ? 0 : newScore)
    onRatingChange({
      ...rating,
      score: newScore === score ? 0 : newScore
    })
  }

  const handleLikeChange = () => {
    setLiked(!liked)
    onRatingChange({
      ...rating,
      liked: !liked
    })
  }

  const handleNotesChange = e => {
    const newNotes = e.target.value
    setNotes(newNotes)
    onRatingChange({
      ...rating,
      notes: newNotes
    })
  }

  return (
    <div className="rating-panel">
      <h3>Rate This Image</h3>

      <div className="rating-section">
        <label>Score</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              className={`star ${score >= star ? 'filled' : ''} ${hover >= star ? 'hover' : ''}`}
              onClick={() => handleScoreChange(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ⭐
            </button>
          ))}
        </div>
        {score > 0 && <span className="score-text">{score}/5</span>}
      </div>

      <div className="rating-section">
        <label>
          <button
            className={`like-button ${liked ? 'liked' : ''}`}
            onClick={handleLikeChange}
          >
            {liked ? '❤️' : '🤍'}
          </button>
          {liked ? 'Liked' : 'Like'}
        </label>
      </div>

      <div className="rating-section">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={handleNotesChange}
          placeholder="Add notes about this image..."
          className="notes-input"
        />
      </div>
    </div>
  )
}
