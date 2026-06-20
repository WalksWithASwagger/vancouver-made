// THE RECEIPTS ENGINE — one civic receipt, three counter-spectacle voices.
// Same public-record fact, rendered in the house voice of each property:
//   MADE ON (the wearable receipt) · FEEFA (the civic receipt) · FASHION CAKE (the editorial receipt)
// The point is the pipeline: receipt in, three artifacts out, every one carrying the same citation.

export const properties = {
  madeon: {
    key: 'madeon',
    name: 'MADE ON',
    role: 'the hem',
    blurb: 'The wearable receipt. Kit-maker spec type, the citation baked into the garment.',
    url: '/',
  },
  feefa: {
    key: 'feefa',
    name: 'FEEFA',
    role: 'the poster',
    blurb: 'The civic receipt. Host-city accountability as a protest poster.',
    url: 'https://feefa.ai/',
  },
  cake: {
    key: 'cake',
    name: 'WORLD CUP FASHION CAKE',
    role: 'the editorial',
    blurb: 'The editorial receipt. The same fact, shot like couture, captioned like evidence.',
    url: 'https://world-cup-fashion-cake.vercel.app/',
  },
}

// MADE ON — the hem. Dense, all-caps, cited spec microtext.
export function madeOnHem(r) {
  return {
    label: `${r.id} · HEM CITATION`,
    body: `${r.stat.toUpperCase()} · ${r.claim.toUpperCase()}. ${r.detail.toUpperCase()}`,
    source: `SRC: ${r.source.toUpperCase()}`,
  }
}

// FEEFA — the poster. Big number, the charge, the brand stamp.
export function feefaPoster(r) {
  return {
    big: r.stat,
    charge: capitalize(r.claim) + '.',
    stamp: `FILED ${r.id} · feefa.ai`,
    brand: 'KEEP FOOTBALL WEIRD, PUBLIC, AND BADLY BEHAVED',
    source: r.source,
  }
}

// WORLD CUP FASHION CAKE — the editorial. Lowercase, lyrical, evidence under the gloss.
export function fashionEditorial(r) {
  return {
    caption:
      `the number is ${r.stat.toLowerCase()}. ${r.claim.toLowerCase()}, ` +
      `shot like couture and captioned like evidence.`,
    coda: 'the gloss is imported. the rain makes it local.',
    source: r.source,
  }
}

// Run one receipt through all three voices.
export function renderAll(r) {
  return {
    receipt: r,
    madeon: madeOnHem(r),
    feefa: feefaPoster(r),
    cake: fashionEditorial(r),
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
