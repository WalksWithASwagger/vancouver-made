// The per-direction landing-page registry (epic #56). To add a "design world":
//   1. stage curated images into public/kit/<slug>/
//   2. write src/data/directions/<slug>.js (the manifest — see nardwuar.js for the shape)
//   3. add it to the map below
// The /kit/:slug route + DirectionPage template do the rest.
import nardwuar from './nardwuar.js'
import pumpAndDump from './pump-and-dump.js'
import numberFiveOrange from './number-five-orange.js'
import chinaCreek from './china-creek.js'
import hogansAlley from './hogans-alley.js'

export const directions = {
  'nardwuar-fc': nardwuar,
  'pump-and-dump-fc': pumpAndDump,
  'number-five-orange': numberFiveOrange,
  'china-creek': chinaCreek,
  'hogans-alley-fc': hogansAlley,
}

export function getDirection(slug) {
  return directions[slug] || null
}
