// Code-drawn jersey flat — front + back — rendered from a hero-kit spec.
// "Novelty of output": the mockup IS the data. Same source drives deck + tech pack.
//
// Upgraded: fabric depth (sheen gradient + cross-hatch allover), a soft separation glow
// so dark kits read on a dark stage, a confident outline, and an opt-in `draw` mode that
// strokes the jersey on (pathLength=1 + CSS in KitGateway.css). The default 2-up <KitFlat>
// API is unchanged for existing consumers (HighlightReel, TheMove, Journey).

// Silhouette varies per kit. short = standard block; long = set-in long sleeve;
// raglan = ¾ raglan (diagonal seam drawn separately). Same viewBox 0 0 200 224.
const JERSEY_PATHS = {
  short:
    'M70,30 C86,17 114,17 130,30 L160,36 L192,68 L176,96 L150,76 L150,210 L50,210 L50,76 L24,96 L8,68 L40,36 Z',
  long:
    'M70,30 C86,17 114,17 130,30 L160,36 L198,180 L181,190 L150,76 L150,210 L50,210 L50,76 L19,190 L2,180 L40,36 Z',
  raglan:
    'M70,30 C86,17 114,17 130,30 L160,36 L192,128 L174,138 L150,76 L150,210 L50,210 L50,76 L26,138 L8,128 L40,36 Z',
}

export function Jersey({ kit, side = 'front', draw = false }) {
  const { body, primary, secondary, accent } = kit.colorway
  const isFront = side === 'front'
  const silhouette = kit.silhouette || 'short'
  const path = JERSEY_PATHS[silhouette] || JERSEY_PATHS.short
  const uid = `${kit.id}-${side}`

  return (
    <svg
      viewBox="0 0 200 232"
      className={'w-full ' + (draw ? 'flat-draw' : '')}
      role="img"
      aria-label={`${kit.name} ${side} · ${silhouette} sleeve`}
    >
      <defs>
        {/* allover: fine cross-hatch suggesting the printed record */}
        <pattern id={`hatch-${uid}`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <line x1="0" y1="0" x2="0" y2="9" stroke={primary} strokeWidth="0.6" opacity="0.22" />
          <line x1="4.5" y1="0" x2="4.5" y2="9" stroke={accent} strokeWidth="0.4" opacity="0.12" />
        </pattern>
        {/* fabric sheen: light from upper-left */}
        <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.22" />
        </linearGradient>
        {/* soft separation glow so a dark kit lifts off a dark stage */}
        <filter id={`glow-${uid}`} x="-15%" y="-12%" width="130%" height="124%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="4" floodColor={accent} floodOpacity="0.30" />
        </filter>
      </defs>

      <g filter={`url(#glow-${uid})`}>
        {/* fill (fades in under draw mode) */}
        <path className="j-fill" d={path} fill={body} />
        <path className="j-fill" d={path} fill={`url(#hatch-${uid})`} />
        <path className="j-fill" d={path} fill={`url(#sheen-${uid})`} />
        {/* confident outline (strokes on under draw mode) */}
        <path className="j-draw" d={path} pathLength="1" fill="none" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        {/* collar */}
        <path className="j-fill" d="M70,30 C86,17 114,17 130,30 C114,40 86,40 70,30 Z" fill={secondary} opacity="0.9" />
        <path className="j-draw" d="M70,30 C86,17 114,17 130,30" pathLength="1" fill="none" stroke={accent} strokeWidth="1.4" opacity="0.7" />
        {/* raglan seam — diagonal neck→underarm */}
        {silhouette === 'raglan' && (
          <g className="j-draw" stroke={accent} strokeWidth="1" opacity="0.5" fill="none">
            <line x1="126" y1="32" x2="150" y2="76" pathLength="1" />
            <line x1="74" y1="32" x2="50" y2="76" pathLength="1" />
          </g>
        )}

        <g className="j-fill">
          {isFront ? (
            <>
              {/* crest — left chest */}
              <rect x="64" y="58" width="26" height="30" rx="2" fill={secondary} stroke={primary} strokeWidth="1" />
              <text x="77" y="77" textAnchor="middle" fontFamily="'Archivo Black',sans-serif" fontSize="13" fill={primary}>
                {kit.no}
              </text>
              {/* sponsor bar — centre chest */}
              <rect x="58" y="104" width="84" height="20" rx="1" fill={secondary} opacity="0.94" />
              <text x="100" y="118" textAnchor="middle" fontFamily="'Space Mono',monospace" fontWeight="700" fontSize="8" fill={primary}>
                {clamp(kit.sponsorBar, 22)}
              </text>
              {/* maker mark — right chest */}
              <text x="138" y="74" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="4.5" fill={accent} opacity="0.85">
                {clamp(kit.makerMark, 18)}
              </text>
            </>
          ) : (
            <>
              {/* nameplate — upper back */}
              <text x="100" y="74" textAnchor="middle" fontFamily="'Archivo Black',sans-serif" fontSize="13" fill={primary}>
                {clamp(kit.nameplate, 14)}
              </text>
              {/* number — centre back; font scales so long denominations stay inside the shirt */}
              {(() => {
                const number = clamp(kit.number, 16)
                const numberSize = Math.min(42, Math.floor(273 / Math.max(number.length, 1)))
                return (
                  <text x="100" y="150" textAnchor="middle" fontFamily="'Archivo Black',sans-serif" fontSize={numberSize} fill={primary}>
                    {number}
                  </text>
                )
              })()}
              {/* back line */}
              <text x="100" y="172" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="6" fill={accent}>
                {clamp(kit.backLine, 30)}
              </text>
            </>
          )}

          {/* hem citation — the receipt baked in (both sides, bottom) */}
          <text x="100" y="206" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="3.4" fill={accent} opacity="0.9">
            {clamp(kit.hemCitation.text, 78)}
          </text>
        </g>
      </g>
    </svg>
  )
}

function clamp(s, n) {
  return s && s.length > n ? s.slice(0, n - 1) + '…' : s
}

// Default 2-up flat (front + back) — unchanged API for existing consumers.
export default function KitFlat({ kit, draw = false }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <Jersey kit={kit} side="front" draw={draw} />
        <p className="mt-1 text-center text-[9px] uppercase tracking-widest text-ink/40">Front</p>
      </div>
      <div>
        <Jersey kit={kit} side="back" draw={draw} />
        <p className="mt-1 text-center text-[9px] uppercase tracking-widest text-ink/40">Back</p>
      </div>
    </div>
  )
}
