import './PromptDetails.css'

export default function PromptDetails({ prompt }) {
  return (
    <div className="prompt-details">
      <h3>Prompt</h3>

      {prompt.concept && (
        <div className="prompt-meta">
          <span className="tag concept-tag">{prompt.concept}</span>
          {prompt.batch && <span className="tag batch-tag">{prompt.batch}</span>}
          {prompt.status && <span className="tag status-tag">{prompt.status}</span>}
        </div>
      )}

      <div className="prompt-text">
        <p>{prompt.promptText}</p>
      </div>

      {prompt.category && (
        <div className="prompt-category">
          <strong>Category:</strong> {prompt.category}
        </div>
      )}

      <button className="copy-button" onClick={() => {
        navigator.clipboard.writeText(prompt.promptText)
        alert('Prompt copied to clipboard!')
      }}>
        Copy Prompt
      </button>
    </div>
  )
}
