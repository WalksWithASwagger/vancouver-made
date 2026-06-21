// The per-direction landing-page registry (epic #56). To add a "design world":
//   1. stage curated images into public/kit/<slug>/
//   2. write src/data/directions/<slug>.js (the manifest — see nardwuar.js for the shape)
//   3. add it to the map below
// The /kit/:slug route + DirectionPage template do the rest.
import nardwuar from './nardwuar.js'
import pumpAndDump from './pump-and-dump.js'

export const directions = {
  'nardwuar-fc': nardwuar,
  'pump-and-dump-fc': pumpAndDump,
}

export function getDirection(slug) {
  return directions[slug] || null
}
