// Shared "host-city" shield — one outline for all three clubs (the spoof system).
// Counterfeit-official: looks like a tournament crest, reads as a protest badge.
export default function Crest({ palette, number, label = 'VANCOUVER 2026', sub = 'UNOFFICIAL' }) {
  const { base, ink, accent, signal } = palette
  return (
    <svg viewBox="0 0 120 140" className="h-28 w-24" role="img" aria-label={`${label} crest`}>
      {/* shield body */}
      <path
        d="M60 4 L112 22 V70 C112 104 88 124 60 136 C32 124 8 104 8 70 V22 Z"
        fill={ink}
        stroke={accent}
        strokeWidth="3"
      />
      {/* inner field */}
      <path
        d="M60 14 L104 29 V69 C104 98 84 115 60 126 C36 115 16 98 16 69 V29 Z"
        fill={base}
        opacity="0.92"
      />
      {/* evidence-cut diagonal */}
      <path d="M16 84 L104 52" stroke={signal} strokeWidth="3" opacity="0.9" />
      {/* number */}
      <text
        x="60"
        y="86"
        textAnchor="middle"
        fontFamily="'Archivo Black', Impact, sans-serif"
        fontSize="44"
        fill={ink}
      >
        {number}
      </text>
      {/* host-city banner */}
      <text
        x="60"
        y="104"
        textAnchor="middle"
        fontFamily="'Space Mono', monospace"
        fontSize="8"
        letterSpacing="1"
        fill={ink}
      >
        {label}
      </text>
      <text
        x="60"
        y="115"
        textAnchor="middle"
        fontFamily="'Space Mono', monospace"
        fontSize="8"
        letterSpacing="2"
        fill={signal}
      >
        {sub}
      </text>
    </svg>
  )
}
