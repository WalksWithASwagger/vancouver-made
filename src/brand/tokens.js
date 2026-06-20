// VANCOUVER MADE / MADE ON — base brand tokens.
// Mirrors tailwind.config.js. The canonical MADE ON palette + collection data live
// in src/data/collection.js; the per-kit colorways live in src/data/heroKits.js
// and src/data/clubs.js. These are the shared site tokens (3D scene + marquee).

export const colors = {
  ink: '#0a0a0a', // the void / the establishment
  bone: '#f4f1ea', // paper, posters, newsprint
  rain: '#1c2b33', // Vancouver wet asphalt
  cedar: '#3a5a40', // PNW forest
  hazard: '#ff3b00', // protest red-orange, spray paint
  gold: '#d9a521', // banknote / counterfeit gold
  cyan: '#21d9c9', // signal
}

export const type = {
  display: '"Archivo Black", Impact, system-ui, sans-serif',
  mono: '"Space Mono", ui-monospace, monospace',
}

// Brand voice — the MADE ON copy bank. Drives the marquee; pull for deck/posters.
export const slogans = [
  'MADE ON STOLEN GROUND',
  "MADE ON HOGAN'S ALLEY",
  'MADE ON $729 MILLION OF PUBLIC MONEY',
  'EVERYONE ELSE MADE A SOUVENIR · WE MADE THE RECEIPT',
  'NOT ANTI-FOOTBALL · ANTI-AMNESIA',
  'MIMIC THE POLISH · INVERT THE PAYLOAD · BAKE IN THE RECEIPT',
  "THE PART THAT DOESN'T FIT ON A SOUVENIR",
  'NO GAME WITHOUT THE GROUND',
]
