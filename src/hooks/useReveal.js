import { useEffect, useRef } from 'react'

// Shared scroll-reveal: adds `.in` to every element matching `selector` inside the
// returned ref once it enters the viewport. Pairs with the `.reveal` CSS utility
// (opacity/translateY → in) and the `transitionDelay` stagger pattern. Reduced motion
// is handled in CSS (elements render visible, no transition). Extracted from the
// DirectionPage / KitGateway reveal hooks so every surface shares one implementation.
export default function useReveal(selector = '.reveal', { threshold = 0.16 } = {}) {
  const root = useRef(null)
  useEffect(() => {
    const els = root.current?.querySelectorAll(selector) ?? []
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [selector, threshold])
  return root
}
