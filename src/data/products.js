// MADE ON — THE STORE. The receipt, now wearable.
// Products built from KK's STARRED rafiki picks (logo-free, swoosh-free art only —
// the Canva hero renders in docs/deliverables/mockups carry a Nike swoosh and are
// NOT used here). Source curation: docs/design/prompts/clubs/*/rafiki/STARRED.md +
// src/db/ratings.db. Images live in /public/store/.
//
// Field shape is intentionally Shopify-ready (id, title, price, etc.) so this list
// can push to a real storefront later without reshaping.
//
// `status` drives the buy button + honors the project's own ethics gates (clubs.js):
//   'preorder'         — preview drop, checkout not live yet
//   'blessing-pending' — homage tied to a living person (Nardwuar); per clubs.js
//                        ethics, not for sale until blessing is given.

// Per-club tint for the card header bar (from clubs.js palettes).
const TINT = {
  'nardwuar-fc': { bar: '#1d7a46', ink: '#f4f1ea' },
  'number-five-orange': { bar: '#ff6a00', ink: '#0a0a0a' },
  'china-creek': { bar: '#5b6770', ink: '#f4f1ea' },
  thesis: { bar: '#ff3b00', ink: '#0a0a0a' },
}

export const categories = [
  { key: 'patches', label: 'Patches', blurb: 'Sleeve and collar badges. The credential, recoded.' },
  { key: 'stickers', label: 'Stickers', blurb: 'Die-cut. For laptops, lamp posts, bus shelters.' },
  { key: 'prints', label: 'Prints', blurb: 'Wall scale. The sponsor bar, blown up.' },
  { key: 'jerseys', label: 'Jerseys', blurb: 'The kits themselves. A walking archive.' },
]

export const products = [
  // ── PATCHES ──────────────────────────────────────────────────────────────
  {
    id: 'patch-deep-research',
    title: 'DEEP RESEARCH — sleeve badge',
    category: 'patches',
    club: 'nardwuar-fc',
    price: 14,
    currency: 'CAD',
    image: '/store/patch-deep-research.png',
    blurb: 'The Fair-Play badge, recoded into a reporting credential.',
    description:
      'A woven sleeve badge in tartan green: DEEP RESEARCH arched over HUMAN SERVIETTE REPORTING CLUB, a tam-topped mic where the trophy should be. It takes the FIFA "Fair Play" patch and turns it into a press pass — research as the protest, the receipt as the weapon.',
    status: 'blessing-pending',
    ethicsNote: 'Homage to a living Vancouverite. Not for sale until Nardwuar gives his blessing.',
    tint: TINT['nardwuar-fc'],
  },
  {
    id: 'patch-collage-crest',
    title: 'VANCOUVER 26 — collage crest',
    category: 'patches',
    club: 'nardwuar-fc',
    price: 14,
    currency: 'CAD',
    image: '/store/patch-collage-crest.png',
    blurb: 'The host-city crest, built from 7-inches and show flyers.',
    description:
      'The official host-city shield, rebuilt as a cut-and-paste collage of punk records, photocopied flyers and a tartan tam — VANCOUVER 26 on the ribbon. It mimics the polish of a tournament crest; the inner art is the underground canon that never makes the broadcast.',
    status: 'preorder',
    tint: TINT['nardwuar-fc'],
  },
  {
    id: 'patch-trophy-mark',
    title: 'Trophy mark — mic & spindle',
    category: 'patches',
    club: 'nardwuar-fc',
    price: 12,
    currency: 'CAD',
    image: '/store/patch-trophy-mark.png',
    blurb: 'The trophy, reissued as a microphone on a record spindle.',
    description:
      'Tournament hardware misused on purpose: the trophy silhouette becomes a vintage mic on a stand fused to a vinyl spindle. A small sleeve or collar mark for people who think the real prize is the question nobody else asked.',
    status: 'blessing-pending',
    ethicsNote: 'Tied to the Nardwuar homage. Not for sale until blessing is given.',
    tint: TINT['nardwuar-fc'],
  },

  // ── STICKERS ─────────────────────────────────────────────────────────────
  {
    id: 'sticker-interview-your-city',
    title: 'INTERVIEW YOUR CITY — sticker',
    category: 'stickers',
    club: 'nardwuar-fc',
    price: 4,
    currency: 'CAD',
    image: '/store/sticker-interview-your-city.png',
    blurb: 'A bumper-sticker-sized dare, in broadcast caps.',
    description:
      'Cut-and-paste caps on a banner: interview your city like it owes you an answer. Stick it wherever a follow-up question is overdue — the laptop, the lamp post, the bus shelter outside city hall.',
    status: 'blessing-pending',
    ethicsNote: 'Carries the Nardwuar line. Not for sale until blessing is given.',
    tint: TINT['nardwuar-fc'],
  },
  {
    id: 'sticker-ransom-nameplate',
    title: 'Ransom-note nameplate — sticker',
    category: 'stickers',
    club: 'nardwuar-fc',
    price: 4,
    currency: 'CAD',
    image: '/store/sticker-ransom-nameplate.png',
    blurb: 'The back-of-shirt nameplate, in cut-and-paste type.',
    description:
      'Chaotic ransom-note lettering pulled straight off the jersey back. A die-cut sticker for the collage-pile aesthetic — looks like it was assembled at 2am from a stack of zines, because spiritually it was.',
    status: 'blessing-pending',
    ethicsNote: 'Tied to the Nardwuar homage. Not for sale until blessing is given.',
    tint: TINT['nardwuar-fc'],
  },
  {
    id: 'sticker-no-skateboarding',
    title: 'NO SKATEBOARDING — sticker',
    category: 'stickers',
    club: 'china-creek',
    price: 4,
    currency: 'CAD',
    image: '/store/sticker-no-skateboarding.png',
    blurb: 'The bylaw sign, reclaimed as a badge of use.',
    description:
      'The municipal prohibition sign every skater has ignored, lifted off the China Creek concrete and turned into a badge of use. The bylaw said no; the bowl said otherwise.',
    status: 'preorder',
    tint: TINT['china-creek'],
  },

  // ── PRINTS ───────────────────────────────────────────────────────────────
  {
    id: 'print-who-benefits',
    title: 'WHO BENEFITS? WHO PAYS? — print',
    category: 'prints',
    club: 'thesis',
    price: 28,
    currency: 'CAD',
    image: '/store/print-who-benefits.png',
    blurb: 'Two questions, the size of a poster.',
    description:
      'The sponsor bar that runs across the chest of the kit, blown up to wall scale: WHO BENEFITS? WHO PAYS? in stark broadcast caps. The whole project compressed into two questions you can hang over a desk.',
    status: 'preorder',
    tint: TINT['thesis'],
  },
  {
    id: 'print-work-is-work',
    title: 'WORK IS WORK — print',
    category: 'prints',
    club: 'number-five-orange',
    price: 28,
    currency: 'CAD',
    image: '/store/print-work-is-work.png',
    blurb: 'Solidarity, styled like a kit sponsor.',
    description:
      'From the No.5 Orange away strip: WORK IS WORK in the slot where a telecom logo would sit. The event city sells edgy nightlife to tourists while policing the people who do the labour. This one sides with the workers, not the buyers. DECRIM NOW.',
    status: 'preorder',
    tint: TINT['number-five-orange'],
  },
  {
    id: 'print-bowl-stencil',
    title: 'China Creek bowl — stencil print',
    category: 'prints',
    club: 'china-creek',
    price: 28,
    currency: 'CAD',
    image: '/store/print-bowl-stencil.png',
    blurb: 'Spray stencil on raw concrete.',
    description:
      'Griptape grit and stencil spray pulled off the transition at China Creek. A print for the part of the city that was built by use, not permission — concrete that became a commons one session at a time.',
    status: 'preorder',
    tint: TINT['china-creek'],
  },

  // ── JERSEYS ──────────────────────────────────────────────────────────────
  {
    id: 'jersey-nardwuar-home',
    title: 'NARDWUAR FC — Deep Cut home kit',
    category: 'jerseys',
    club: 'nardwuar-fc',
    price: 95,
    currency: 'CAD',
    image: '/store/jersey-nardwuar-home.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    blurb: 'A walking archive in tartan.',
    description:
      'Reads as a host-nation home jersey — bold tartan reds and greens ghosted into the fabric, the DEEP RESEARCH badge on the chest, WHO BENEFITS? WHO PAYS? across the front. Inside the collar: DOOT DOOLA DOOT DOO. A World Cup kit turned into a Vancouver underground reading list.',
    status: 'blessing-pending',
    ethicsNote: 'Homage to Nardwuar the Human Serviette. Not for sale until he gives his blessing.',
    tint: TINT['nardwuar-fc'],
  },
  {
    id: 'jersey-five-orange-home',
    title: 'NUMBER FIVE ORANGE — home kit',
    category: 'jerseys',
    club: 'number-five-orange',
    price: 95,
    currency: 'CAD',
    image: '/store/jersey-five-orange-home.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    blurb: 'The bill for a night out you never agreed to.',
    description:
      'Vinyl black and safety-cone orange — the home strip for No.5 Orange, one of the last of old Gastown (opened as the Melbourne Hotel, 1904). Surcharge lines and service-fee marks run the body: the cover charge at the door of your own city.',
    status: 'preorder',
    tint: TINT['number-five-orange'],
  },
  {
    id: 'jersey-five-orange-away',
    title: 'NUMBER FIVE ORANGE — Work Is Work away kit',
    category: 'jerseys',
    club: 'number-five-orange',
    price: 95,
    currency: 'CAD',
    image: '/store/jersey-five-orange-away.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    blurb: 'The hero away strip. The whole city becomes a VIP room.',
    description:
      'Saturated safety-cone orange, white sleeves, metallic-gold trim, a "pole" stripe down the torso — a glam World Cup away strip on TV, WORK IS WORK where the sponsor goes. The Cup turns public land into a private champagne room; this is the kit for everyone charged admission to their own night.',
    status: 'preorder',
    tint: TINT['number-five-orange'],
  },
]

export default products
