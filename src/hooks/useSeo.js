import { useEffect } from 'react'

// Applies a resolved SEO object (from resolveSeo) to <head>: title, description,
// canonical, Open Graph and Twitter tags. Upserts each tag so it stays correct
// across client navigation, and — because the prerender script snapshots the DOM
// after this effect runs — bakes per-route meta into the static HTML for crawlers
// and social scrapers. Extends the document.title pattern that used to live in
// App.jsx's PitchLayout; no dependency added.
function setMeta(attr, key, content) {
  if (content == null) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function useSeo(seo) {
  useEffect(() => {
    if (!seo) return
    document.title = seo.title
    setMeta('name', 'description', seo.description)
    setLink('canonical', seo.canonical)
    setMeta('property', 'og:type', seo.type)
    setMeta('property', 'og:url', seo.url)
    setMeta('property', 'og:title', seo.ogTitle)
    setMeta('property', 'og:description', seo.ogDescription)
    setMeta('property', 'og:image', seo.image)
    setMeta('name', 'twitter:title', seo.ogTitle)
    setMeta('name', 'twitter:description', seo.ogDescription)
    setMeta('name', 'twitter:image', seo.image)
  }, [seo.title, seo.description, seo.canonical, seo.image, seo.ogTitle, seo.ogDescription, seo.type])
}
