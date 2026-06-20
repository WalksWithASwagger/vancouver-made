// THE RECEIPTS — one real Vancouver number, said three ways.
// The kit stitches it on the hem. FEEFA pastes it on a wall. Fashion Cake shoots it like
// couture. Same receipt every time, source attached. Everyone made a souvenir; we made the receipt.

export const properties = {
  madeon: {
    key: 'madeon',
    name: 'MADE ON',
    role: 'the hem',
    blurb: 'On the kit. The number stitched into the hem, in kit-maker spec type, where the sponsor logo should be.',
    url: '/',
  },
  feefa: {
    key: 'feefa',
    name: 'FEEFA',
    role: 'the poster',
    blurb: 'On the wall. The bill, pasted up as a poster nobody approved.',
    url: 'https://feefa.ai/',
  },
  cake: {
    key: 'cake',
    name: 'WORLD CUP FASHION CAKE',
    role: 'the editorial',
    blurb: 'On the body. The same number, shot like couture, captioned like evidence.',
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
