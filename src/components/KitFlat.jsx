// Code-drawn jersey flat — front + back — rendered from a hero-kit spec.
// "Novelty of output": the mockup IS the data. Same source drives deck + tech pack.

// Silhouette varies per kit (see docs/research/tech-pack-spec.md §1).
// short = standard block; long = set-in long sleeve (clean continuous canvas);
// raglan = ¾ raglan, diagonal seam drawn separately. Same viewBox 0 0 200 224.
const JERSEY_PATHS = {
  short:
    'M70,30 C86,17 114,17 130,30 L160,36 L192,68 L176,96 L150,76 L150,210 L50,210 L50,76 L24,96 L8,68 L40,36 Z',
  long:
    'M70,30 C86,17 114,17 130,30 L160,36 L198,180 L181,190 L150,76 L150,210 L50,210 L50,76 L19,190 L2,180 L40,36 Z',
  raglan:
    'M70,30 C86,17 114,17 130,30 L160,36 L192,128 L174,138 L150,76 L150,210 L50,210 L50,76 L26,138 L8,128 L40,36 Z',
}

function Jersey({ kit, side }) {
  const { body, primary, secondary, accent } = kit.colorway
  const isFront = side === 'front'
  const silhouette = kit.silhouette || 'short'
  const path = JERSEY_PATHS[silhouette] || JERSEY_PATHS.short
  return (
    <svg viewBox="0 0 200 224" className="w-full" role="img" aria-label={`${kit.name} ${side} · ${silhouette} sleeve`}>
      {/* allover hint: faint diagonal lines suggesting the printed record */}
      <defs>
        <pattern id={`p-${kit.id}-${side}`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <line x1="0" y1="0" x2="0" y2="10" stroke={primary} strokeWidth="0.6" opacity="0.18" />
        </pattern>
      </defs>

      <path d={path} fill={body} stroke={accent} strokeWidth="1.5" />
      <path d={path} fill={`url(#p-${kit.id}-${side})`} />
      {/* collar */}
      <path d="M70,30 C86,17 114,17 130,30 C114,40 86,40 70,30 Z" fill={secondary} opacity="0.85" />
      {/* raglan seam — diagonal neck→underarm, the ¾-raglan tell */}
      {silhouette === 'raglan' && (
        <g stroke={accent} strokeWidth="1" opacity="0.5" fill="none">
          <line x1="126" y1="32" x2="150" y2="76" />
          <line x1="74" y1="32" x2="50" y2="76" />
        </g>
      )}

      {isFront ? (
        <>
          {/* crest — left chest */}
          <rect x="64" y="58" width="26" height="30" rx="2" fill={secondary} stroke={primary} strokeWidth="1" />
          <text x="77" y="77" textAnchor="middle" fontFamily="'Archivo Black',sans-serif" fontSize="13" fill={primary}>
            {kit.no}
          </text>
          {/* sponsor bar — centre chest */}
          <rect x="58" y="104" width="84" height="20" fill={secondary} opacity="0.92" />
          <text x="100" y="118" textAnchor="middle" fontFamily="'Space Mono',monospace" fontWeight="700" fontSize="8" fill={primary}>
            {clamp(kit.sponsorBar, 22)}
          </text>
          {/* maker mark — right chest */}
          <text x="138" y="74" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="4.5" fill={accent} opacity="0.8">
            {clamp(kit.makerMark, 18)}
          </text>
        </>
      ) : (
        <>
          {/* nameplate — upper back */}
          <text x="100" y="74" textAnchor="middle" fontFamily="'Archivo Black',sans-serif" fontSize="13" fill={primary}>
            {clamp(kit.nameplate, 14)}
          </text>
          {/* number — centre back; font scales down so long denominations ($729,000,000) stay inside the shirt */}
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
      <text x="100" y="205" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="3.4" fill={accent} opacity="0.9">
        {clamp(kit.hemCitation.text, 78)}
      </text>
    </svg>
  )
}

function clamp(s, n) {
  return s && s.length > n ? s.slice(0, n - 1) + '…' : s
}

export default function KitFlat({ kit }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <Jersey kit={kit} side="front" />
        <p className="mt-1 text-center text-[9px] uppercase tracking-widest text-ink/40">Front</p>
      </div>
      <div>
        <Jersey kit={kit} side="back" />
        <p className="mt-1 text-center text-[9px] uppercase tracking-widest text-ink/40">Back</p>
      </div>
    </div>
  )
}
