// Direction manifest — NUMBER FIVE ORANGE "Work Is Work" (nightlife capitalism kit).
// Concept/citations/ethics from clubs.js; imagery is already served from public/.
import { clubs } from '../clubs.js'

const club = clubs.find((c) => c.id === 'number-five-orange')

const numberFiveOrange = {
  slug: 'number-five-orange',
  name: club.name,
  number: club.number, // 5 — the marquee number, 205 Main St since 1971
  kitName: club.kitName,
  tagline: club.tagline,
  palette: club.palette, // base #ff6a00 orange · ink #0a0a0a · accent #d9a521 gold · signal #ff2d6f pink

  hero: {
    eyebrow: 'The whole city becomes a VIP room.',
    image: '/highlight-reel/n5-04-complete-kit.png',
    line: 'A World Cup away strip that resolves into a cover-charge receipt. Sell "edgy nightlife" to the tourists. Bill the workers who run it. Sweep the strip for the broadcast.',
  },

  concept: {
    summary: club.summary,
    target: club.target,
    whoBenefits: club.whoBenefits,
    whoPays: club.whoPays,
  },

  kit: {
    flats: [
      { src: '/store/jersey-five-orange-home.png', caption: 'Home — vinyl black, orange surcharge lines, service-fee symbols' },
      { src: '/store/jersey-five-orange-away.png', caption: 'Away — safety-cone orange body, white sleeves, metallic-gold trim (the hero kit)' },
      { src: '/store/jersey-five-orange-cover-charge.png', caption: 'Cover Charge — dirty gold on orange, champagne-room economy, third kit' },
      { src: '/store/jersey-five-orange-complete.png', caption: 'Complete kit — all three colorways together' },
    ],
    details: [
      { src: '/gallery/n5-home.jpg', caption: 'Home kit front — vinyl-black body, orange surcharge lines reading as a bill you never agreed to' },
      { src: '/gallery/n5-away.jpg', caption: 'Away kit front — saturated safety-cone orange, the clean World Cup template flipped into a labor argument' },
      { src: '/gallery/n5-sleeve.jpg', caption: 'Sleeve detail — the vertical pole stripe in metallic gold; a marquee gradient, close up' },
      { src: '/gallery/n5-lockup.jpg', caption: 'Kit lockup — WORK IS WORK styled as a telecom sponsor mark, front and center' },
      { src: '/gallery/n5-sponsor.jpg', caption: 'Sponsor bar — WORK IS WORK · SAFER SPACES FC · OFFICIAL HOSPITALITY PARTNER' },
      { src: '/highlight-reel/n5-05-crest.png', caption: 'Crest — host-city shield, inner art is a neon marquee / stage silhouette in place of the trophy' },
      { src: '/highlight-reel/n5-03-number-reveal.png', caption: 'Number reveal — digits built from tiny human silhouettes: tourists queuing front, staff and dancers exiting the back' },
      { src: '/highlight-reel/n5-06-work-is-work-bar.png', caption: 'Work Is Work bar — the front sponsor, styled like a kit-maker mark' },
      { src: '/highlight-reel/n5-07-scathing-tagline.png', caption: 'Scathing tagline — CITY LOVES THE STORY, NOT THE WORKER, hem tag position' },
    ],
  },

  process: {
    line: 'Mimic the official polish. Invert the payload. Bake the receipt on the hem. The hospitality packet, weaponized.',
    steps: [
      {
        label: '01 · The brief',
        body: 'No.5 Orange — rooted in the Melbourne Hotel (1904), turned No.5 Orange in 1971 — is one of the last of old Gastown. The event city sells "edgy nightlife" to tourists and stag parties while criminalizing the people who do the work. The Cup turns public land into a private champagne room: cover charge at the door of your own city. The Host City Human Rights Action Plan (May 2026) names sex-worker safety as a World Cup priority area. We name it on the kit.',
      },
      {
        label: '02 · The moodboard',
        body: 'Safety-cone orange — the façade color, the construction-zone warning, the marquee glow — over vinyl black. Metallic gold for every element that should read "premium" but is really a service fee. A pole stripe that looks like a sleek kit-maker detail; up close it\'s a stage and a hierarchy. World Cup away-kit grammar: clean paneling, host-city sleeve patch, trophy watermark. All of it intact, all of it rewritten.',
      },
      {
        label: '03 · Prompt → generate → curate',
        body: 'Rafiki / Nano-Banana-Pro runs across graphic elements → jersey flats → detail crops. The number treatment — tiny queuing tourists on one side, staff and dancers exiting the back door on the other — took the most passes. The sponsor block needed to land as a telecom mark at ten meters and a labor argument at arm\'s length.',
      },
      {
        label: '04 · The receipt',
        body: 'Front sponsor: WORK IS WORK (styled as a kit-maker mark). Back-of-neck: SAFER SPACES FC. Shorts tag: CITY LOVES THE STORY, NOT THE WORKER. Hem: DECRIM NOW. Inside collar: UNLICENSED / UNPAID / UNAPOLOGETIC where FIFA Quality Pro would sit. The workers are the home team; the buyers and the bylaw are the target.',
      },
    ],
    sponsorBank: club.sponsorBank,
  },

  citations: club.sourceCards,

  ethics: club.ethics,
}

export default numberFiveOrange
