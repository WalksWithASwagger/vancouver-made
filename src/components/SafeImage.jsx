import { useState } from 'react'

// Shared image with a graceful fallback: when the src is missing or 404s, show
// its label as cream-panel text instead of a broken-image glyph. Generalized
// from the Store product-card pattern. `alt` is required (a11y) and doubles as
// the fallback text unless `fallbackText` overrides it. Drop-in for a bare
// <img> inside a sized container (aspect-square / fixed-height grids).
export default function SafeImage({
  src,
  alt,
  className = '',
  fallbackText,
  loading = 'lazy',
  ...rest
}) {
  const [err, setErr] = useState(false)

  if (err || !src) {
    return (
      <span
        role="img"
        aria-label={alt}
        className="flex h-full w-full items-center justify-center px-2 text-center font-mono text-[10px] uppercase tracking-wider text-ink/50"
      >
        {fallbackText ?? alt}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setErr(true)}
      className={className}
      {...rest}
    />
  )
}
