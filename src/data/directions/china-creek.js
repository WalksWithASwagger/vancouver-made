// Direction manifest — CHINA CREEK "Public Land" (the skate-park-as-public-space kit).
// Concept/citations/ethics from clubs.js; imagery is already served from public/.
import { clubs } from '../clubs.js'

const club = clubs.find((c) => c.id === 'china-creek')

const chinaCreek = {
  slug: 'china-creek',
  name: club.name,
  number: club.number, // 79 — the China Creek bowls, built 1979
  kitName: club.kitName,
  tagline: club.tagline,
  palette: club.palette, // base #9aa0a3 concrete · ink #0a0a0a · accent #f4c20d yellow · signal #1f9e8a teal

  hero: {
    eyebrow: 'The bowls, built 1979. Defended ever since.',
    image: '/highlight-reel/china-creek-04-complete-kit.png',
    line: 'A city-pride home kit built on raw concrete. Ban the board, then sell the bowl, then call it yours. The home ground was never the gift — it was the fight.',
  },

  concept: {
    summary: club.summary,
    target: club.target,
    whoBenefits: club.whoBenefits,
    whoPays: club.whoPays,
  },

  kit: {
    flats: [
      { src: '/store/jersey-china-creek.png', caption: 'Home — raw concrete grey, caution-yellow trim, coping-line sweep across the torso' },
      { src: '/store/jersey-china-creek-away.png', caption: 'Away — marker black, griptape texture, NO SKATEBOARDING pictogram crossed out down the sleeve' },
    ],
    details: [
      { src: '/highlight-reel/china-creek-01-yellow-front.png', caption: 'Home kit front — concrete grey with caution-yellow city-signage trim; reads as a clean city-pride strip on TV, a manifesto up close' },
      { src: '/highlight-reel/china-creek-02-concrete-front.png', caption: 'Concrete texture close-up — raw grey body with marker-black detailing, the bowl wall in fabric form' },
      { src: '/highlight-reel/china-creek-03-back-79.png', caption: 'Kit back — № 79, the year the bowls were built, nameplate position; BUILT 1979 / DEFENDED EVER SINCE across the back line' },
      { src: '/highlight-reel/china-creek-06-pattern-tile.png', caption: 'All-over pattern tile — bowl-contour curves and coping lines repeating; a transition map as texture' },
      { src: '/highlight-reel/china-creek-07-crest.png', caption: 'Crest — host-city shield, inner art is a skatepark bowl cross-section and coping line with a skateboard silhouette' },
      { src: '/highlight-reel/china-creek-08-number-79.png', caption: 'Number 79 close-up — digits built from bowl-contour and coping curves over a griptape grid; the year as the number' },
    ],
  },

  lifestyle: [
    { src: '/highlight-reel/china-creek-05-lookbook-bowl.png', caption: 'In the bowls — the kit in its home ground; the concrete, the coping, the fight that kept this public' },
  ],

  process: {
    line: 'The bylaw sign, turned into the front mark. The criminalize-then-monetize playbook, worn as evidence.',
    steps: [
      {
        label: '01 · The brief',
        body: 'China Creek, the East Vancouver bowls built in 1979, is the city\'s living monument to public space won the hard way. For decades the city treated street skating as a nuisance to ban and police; then it built the parks, branded Vancouver a skate-tourism destination, and cheered skateboarding into the Olympics. The Cup runs the same play on a bigger field: criminalize a subculture, monetize the memory, sell the flavour. The home ground was never the gift. It was the fight.',
      },
      {
        label: '02 · The moodboard',
        body: 'Raw concrete grey — the bowl wall, the city surface, the material the skaters shaped with their own hands. Caution yellow from city signage, the same institutional color that put up the NO SKATEBOARDING signs. A creek-teal coping line sweeping the torso, the kit\'s only curve. Spray-stencil display type and skate-zine cut-and-paste: the aesthetic is the archive. On TV it reads as a serious city-pride home kit. In your hands it\'s a bylaw sign turned inside out.',
      },
      {
        label: '03 · Prompt → generate → curate',
        body: 'Rafiki / Nano-Banana-Pro runs across graphic elements → jersey flats → detail crops. The number treatment — bowl-contour and coping curves over a griptape grid — took multiple passes to land as legible digits that still read as a transition map. The front sponsor block, NO SKATEBOARDING set like a kit-maker mark, needed to hold at distance as a clean brand and detonate up close.',
      },
      {
        label: '04 · The receipt',
        body: 'Front sponsor: NO SKATEBOARDING (the bylaw sign, flipped). Back line: BUILT 1979 / DEFENDED EVER SINCE. Shorts: CRIMINALIZED THEN MONETIZED. Patch: NUISANCE BYLAW APPROVED where FIFA Quality Pro would sit. The skaters, the DIY builders, and East Van youth are the home team. The bylaw, the developers, and the tourism rebranding are the target.',
      },
    ],
    sponsorBank: club.sponsorBank,
  },

  citations: club.sourceCards,

  ethics: club.ethics,
}

export default chinaCreek
