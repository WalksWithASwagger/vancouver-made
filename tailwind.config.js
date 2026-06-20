/** @type {import('tailwindcss').Config} */
// Brand tokens live here AND in src/brand/tokens.js — keep them in sync.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // VANCOUVER MADE protest palette
        ink: '#0a0a0a',        // near-black, the void / the establishment
        bone: '#f4f1ea',       // off-white, paper, posters
        rain: '#1c2b33',       // Vancouver wet asphalt blue-grey
        cedar: '#3a5a40',      // PNW forest green
        hazard: '#ff3b00',     // protest red-orange, spray paint
        gold: '#d9a521',       // counterfeit trophy gold
        cyan: '#21d9c9',       // future-forward signal
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
