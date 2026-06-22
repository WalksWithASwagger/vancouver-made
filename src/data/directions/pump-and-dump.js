// Direction manifest — PUMP & DUMP FC "Speculation City" (the flagship mechanistic critique).
// Companion kit, not the contest winner — but the deepest "the kit IS the argument" build.
// Concept/citations/ethics from clubs.js; imagery is already served from public/.
import { clubs } from '../clubs.js'

const club = clubs.find((c) => c.id === 'pump-and-dump-fc')

const pumpAndDump = {
  slug: 'pump-and-dump-fc',
  name: club.name,
  number: club.number, // 89 — VSE "Scam Capital", Forbes 1989
  kitName: club.kitName,
  tagline: club.tagline,
  palette: club.palette, // base #0b1437 navy · accent #ff2bd6 magenta · signal #21f0d0 teal

  hero: {
    eyebrow: 'The flagship: the mega-event as a pump & dump',
    image: '/gallery/pd-kit.jpg',
    line: 'A blackout “city pride” third kit that resolves into a prospectus. Hype the asset, bill the public, take the exit. You are the bagholder.',
  },

  concept: {
    summary: club.summary,
    target: club.target,
    whoBenefits: club.whoBenefits,
    whoPays: club.whoPays,
  },

  // The kit, up close — the strips + the craft close-ups (lightbox).
  kit: {
    flats: [
      { src: '/store/jersey-pump-and-dump.png', caption: 'Speculation City: the blackout third kit' },
      { src: '/store/jersey-pump-and-dump-home.png', caption: 'Pump: the home strip (the run-up)' },
      { src: '/store/jersey-pump-and-dump-away.png', caption: 'Dump: the away strip (the crash)' },
    ],
    details: [
      { src: '/gallery/pd-front.jpg', caption: 'Front: the candlestick skyline' },
      { src: '/gallery/pd-back.jpg', caption: 'Back: BAGHOLDER, № ▲▼' },
      { src: '/gallery/pd-crest.jpg', caption: 'Crest: soccer ball / candlestick split shield' },
      { src: '/gallery/pd-banknote.jpg', caption: 'Banknote engraving detail' },
      { src: '/gallery/pd-guilloche.jpg', caption: 'Guilloché fine-line security pattern' },
      { src: '/gallery/pd-holo.jpg', caption: 'Holographic “limited drop” foil' },
      { src: '/gallery/pd-neon.jpg', caption: 'Toxic-neon promo gradient (teal / magenta)' },
    ],
  },

  // The method — prompt → flat → mark, the craft of the counterfeit-official.
  process: {
    line: 'Mimic the official polish, invert the payload, bake in the receipt. The hype deck, weaponized.',
    steps: [
      {
        label: '01 · The brief',
        body: "Vancouver’s speculative DNA: Howe Street, the VSE branded \"Scam Capital of the World\" (Forbes 1989), a housing market decoupled from local incomes. The World Cup as the ultimate pump: hype the city as the asset, bill the public, let insiders take the exit liquidity.",
      },
      {
        label: '02 · The moodboard',
        body: 'Midnight navy / blackout with toxic-neon teal & magenta gradients straight out of hyped 2026 promo. Terminal-monospace + hype-promo gradient. The trophy replaced by a glass condo tower of stacked coins.',
      },
      {
        label: '03 · Prompt → generate → curate',
        body: 'Hundreds of frames across graphic-elements → jersey-flats → moodboard. The all-over print resolves into soaring-then-cliff-diving line charts (2021 PEAK, FLIP TAX, FOREIGN BUYER SURCHARGE) and repeating dark/vacant condo towers.',
      },
      {
        label: '04 · The receipt',
        body: 'Sponsor bar: PUMP & DUMP CAPITAL · WE WIN IF YOU LIVE HERE OR NOT. Nameplate roles, not names: DEVELOPER, FLIPPER, LANDLORD, RENOVICTOR. Socks: price-to-income multiples. Shorts: a VACANT stamp where the ad would sit.',
      },
    ],
    sponsorBank: club.sponsorBank,
  },

  citations: club.sourceCards,

  ethics: club.ethics,
}

export default pumpAndDump
