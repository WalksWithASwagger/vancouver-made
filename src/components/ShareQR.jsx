import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

// The pitch closer: "scan to open." Generated at runtime from the actual origin,
// so it points at wherever the site is served — localhost while testing, the live
// domain once deployed — with no build-time URL to keep in sync.
export default function ShareQR({ size = 132 }) {
  const [src, setSrc] = useState(null)
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    const o = window.location.origin
    setOrigin(o)
    QRCode.toDataURL(o, {
      margin: 1,
      width: size * 2,
      color: { dark: '#0a0a0a', light: '#f4f1ea' }, // ink on bone
    })
      .then(setSrc)
      .catch(() => setSrc(null))
  }, [size])

  if (!src) return null
  const pretty = origin.replace(/^https?:\/\//, '')

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={src}
        alt={`QR code to ${pretty}`}
        width={size}
        height={size}
        className="rounded-sm border border-ink/20"
      />
      <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
        ↗ Scan to open
      </span>
      <span className="font-mono text-[10px] lowercase tracking-normal text-cyan">{pretty}</span>
    </div>
  )
}
