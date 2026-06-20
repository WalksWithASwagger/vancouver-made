import './ConceptFilter.css'

export default function ConceptFilter({
  concepts,
  batches,
  selectedConcept,
  selectedBatch,
  onConceptChange,
  onBatchChange
}) {
  return (
    <div className="concept-filter">
      <h3>Filter</h3>

      <div className="filter-section">
        <h4>Concepts</h4>
        {concepts.length === 0 ? (
          <p className="no-items">No concepts found</p>
        ) : (
          <ul className="concept-list">
            <li key="all">
              <button
                className={`filter-button ${!selectedConcept ? 'active' : ''}`}
                onClick={() => onConceptChange(null)}
              >
                All
              </button>
            </li>
            {concepts.map(concept => (
              <li key={concept}>
                <button
                  className={`filter-button ${selectedConcept === concept ? 'active' : ''}`}
                  onClick={() => onConceptChange(concept)}
                >
                  {concept}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedConcept && (
        <div className="filter-section">
          <h4>Batches</h4>
          {batches.length === 0 ? (
            <p className="no-items">No batches found</p>
          ) : (
            <ul className="batch-list">
              <li key="all-batches">
                <button
                  className={`filter-button ${!selectedBatch ? 'active' : ''}`}
                  onClick={() => onBatchChange(null)}
                >
                  All Batches
                </button>
              </li>
              {batches.map(batch => (
                <li key={batch}>
                  <button
                    className={`filter-button ${selectedBatch === batch ? 'active' : ''}`}
                    onClick={() => onBatchChange(batch)}
                  >
                    {batch}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
