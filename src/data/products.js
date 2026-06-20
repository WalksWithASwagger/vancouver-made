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
  'pump-and-dump-fc': { bar: '#21f0d0', ink: '#050608' },
  thesis: { bar: '#ff3b00', ink: '#0a0a0a' },
}

export const categories = [
  { key: 'patches', label: 'Patches', blurb: 'Sleeve and collar badges. The credential, recoded.' },
  { key: 'stickers', label: 'Stickers', blurb: 'Die-cut. For laptops, lamp posts, bus shelters.' },
  { key: 'prints', label: 'Prints', blurb: 'Wall scale. The sponsor bar, blown up.' },
  { key: 'jerseys', label: 'Jerseys', blurb: 'The kits themselves. A walking archive.' },
  { key: 'lookbook', label: 'Lookbook', blurb: 'On the body, on the block. The kits in the wild.' },
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
  {
    id: 'patch-pump-and-dump-crest',
    title: 'PUMP & DUMP — crest patch',
    category: 'patches',
    club: 'pump-and-dump-fc',
    price: 14,
    currency: 'CAD',
    image: '/store/patch-pump-and-dump-crest.png',
    blurb: 'Half the beautiful game, half the candlestick chart.',
    description:
      'The club crest, gold engraving on midnight navy: a heraldic shield split down the middle — one half a soccer ball, the other a candlestick chart climbing into a condo tower. Motto ribbon: INFLATE. EXTRACT. ABANDON. Worn like a banknote engraving, because that is the joke.',
    status: 'preorder',
    tint: TINT['pump-and-dump-fc'],
  },
  {
    id: 'patch-china-creek-crest',
    title: 'CHINA CREEK — crest patch',
    category: 'patches',
    club: 'china-creek',
    price: 14,
    currency: 'CAD',
    image: '/store/patch-china-creek-crest.png',
    blurb: 'The bowl, as a coat of arms.',
    description:
      'The club crest: a host-city shield with the skatepark bowl cross-section and coping line drawn in creek-teal and caution-yellow on raw concrete grey. Public space, held by its users — built 1979, defended ever since.',
    status: 'preorder',
    tint: TINT['china-creek'],
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
  {
    id: 'jersey-pump-and-dump',
    title: 'PUMP & DUMP FC — Speculation City kit',
    category: 'jerseys',
    club: 'pump-and-dump-fc',
    price: 95,
    currency: 'CAD',
    image: '/store/jersey-pump-and-dump.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    blurb: 'The whole grift, worn as the prospectus.',
    description:
      'The flagship blackout third kit: midnight navy and crash-red, a candlestick-chart skyline of stacked-coin condo towers climbing the body, toxic teal and magenta gradients straight out of the hype deck. Vancouver as the asset, the public as the exit liquidity. You are the bagholder — wear it like a prospectus nobody read.',
    status: 'preorder',
    tint: TINT['pump-and-dump-fc'],
  },
  {
    id: 'jersey-china-creek',
    title: 'CHINA CREEK — Public Land home kit',
    category: 'jerseys',
    club: 'china-creek',
    price: 95,
    currency: 'CAD',
    image: '/store/jersey-china-creek.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    blurb: 'They banned the board, then sold the bowl.',
    description:
      'Raw-concrete grey with the China Creek bowl contours mapped all over the body in creek-teal and caution-yellow, the bowl-crest on the chest. Reads as a clean city-pride home kit on TV; a defended-public-space manifesto up close. The home ground was never the gift — it was the fight.',
    status: 'preorder',
    tint: TINT['china-creek'],
  },
  {
    id: 'jersey-five-orange-cover-charge',
    title: 'NUMBER FIVE ORANGE — Cover Charge strip',
    category: 'jerseys',
    club: 'number-five-orange',
    price: 95,
    currency: 'CAD',
    image: '/store/jersey-five-orange-cover-charge.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    blurb: 'Cover charge $25. Drink minimum 2. Total due: priceless.',
    description:
      'Safety-cone orange with the No.5 Orange neon crest and the whole night-out itemized down the chest — COVER CHARGE, DRINK MINIMUM, SERVICE FEE, TOTAL DUE [Priceless] — COVER CHARGE tape running the sleeves. The spectacle economy, printed like a receipt you never agreed to.',
    status: 'preorder',
    tint: TINT['number-five-orange'],
  },
  {
    id: 'jersey-pump-and-dump-home',
    title: 'PUMP & DUMP FC — Pump home kit',
    category: 'jerseys',
    club: 'pump-and-dump-fc',
    price: 95,
    currency: 'CAD',
    image: '/store/jersey-pump-and-dump-home.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    blurb: 'Ascending candlesticks — right up until they aren’t.',
    description:
      'Midnight navy with a candlestick-chart skyline of stacked-coin condo towers climbing the torso, gold and neon ticking up toward the peak. The home strip for the run-up: 2021 PEAK on the hem, the bagholders in the stands.',
    status: 'preorder',
    tint: TINT['pump-and-dump-fc'],
  },
  {
    id: 'jersey-pump-and-dump-away',
    title: 'PUMP & DUMP FC — Dump away kit',
    category: 'jerseys',
    club: 'pump-and-dump-fc',
    price: 95,
    currency: 'CAD',
    image: '/store/jersey-pump-and-dump-away.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    blurb: 'The pump, after the open.',
    description:
      'Blackout body shredded with vertical dump candles in toxic teal and magenta, shredded-share-certificate texture bleeding down the front. The exit-liquidity kit: everything the home strip promised, cliff-diving.',
    status: 'preorder',
    tint: TINT['pump-and-dump-fc'],
  },
  {
    id: 'jersey-china-creek-away',
    title: 'CHINA CREEK — Caution away kit',
    category: 'jerseys',
    club: 'china-creek',
    price: 95,
    currency: 'CAD',
    image: '/store/jersey-china-creek-away.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    blurb: 'Caution-yellow, the colour of the sign they ignored.',
    description:
      'The caution-yellow colorway: city-signage yellow over the bowl-contour map, creek-teal coping lines, marker-black detailing. The away strip in the colour of every NO SKATEBOARDING sign the bowl outlived.',
    status: 'preorder',
    tint: TINT['china-creek'],
  },
  {
    id: 'jersey-five-orange-complete',
    title: 'NUMBER FIVE ORANGE — complete kit',
    category: 'jerseys',
    club: 'number-five-orange',
    price: 120,
    currency: 'CAD',
    image: '/store/jersey-five-orange-complete.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    blurb: 'Jersey, shorts, socks — the whole door fee.',
    description:
      'The full No.5 Orange strip laid out: safety-cone jersey, shorts and socks, metallic-gold trim and the marquee-pink signal throughout. One night out, itemized head to toe.',
    status: 'preorder',
    tint: TINT['number-five-orange'],
  },
  {
    id: 'jersey-nardwuar-complete',
    title: 'NARDWUAR FC — complete kit',
    category: 'jerseys',
    club: 'nardwuar-fc',
    price: 120,
    currency: 'CAD',
    image: '/store/jersey-nardwuar-complete.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    blurb: 'The whole archive — jersey, shorts, socks.',
    description:
      'The full Deep Cut kit in tartan reds and greens: jersey, shorts and socks, the record-collage all-over print ghosted across all three. A walking Vancouver underground canon from collar to calf.',
    status: 'blessing-pending',
    ethicsNote: 'Homage to Nardwuar. Not for sale until he gives his blessing.',
    tint: TINT['nardwuar-fc'],
  },

  // ── LOOKBOOK ─────────────────────────────────────────────────────────────
  {
    id: 'lookbook-nardwuar',
    title: 'NARDWUAR FC — on body',
    category: 'lookbook',
    club: 'nardwuar-fc',
    price: null,
    currency: 'CAD',
    image: '/store/lookbook-nardwuar.png',
    blurb: 'WHO BENEFITS? WHO PAYS? — worn, not framed.',
    description:
      'The away tartan on the body: VANCOUVER ghosted over the record-collage print, the WHO BENEFITS? WHO PAYS? bar across the chest, mic crest and sleeve badge. A walking archive, exactly as intended.',
    status: 'lookbook',
    tint: TINT['nardwuar-fc'],
  },
  {
    id: 'lookbook-china-creek',
    title: 'CHINA CREEK — at the bowl',
    category: 'lookbook',
    club: 'china-creek',
    price: null,
    currency: 'CAD',
    image: '/store/lookbook-china-creek.png',
    blurb: 'The kit where it was won — the concrete.',
    description:
      'The Public Land kit shot at China Creek: concrete-grey and creek-teal against the coping and transition it takes its lines from. Public space, worn back to the place it was defended.',
    status: 'lookbook',
    tint: TINT['china-creek'],
  },
  {
    id: 'lookbook-china-creek-action',
    title: 'CHINA CREEK — mid-line',
    category: 'lookbook',
    club: 'china-creek',
    price: null,
    currency: 'CAD',
    image: '/store/lookbook-china-creek-action.png',
    blurb: 'Use, not permission.',
    description:
      'Mid-action in the bowl — the kit doing the one thing the bylaw said you couldn’t. The home ground was never the gift; it was the fight.',
    status: 'lookbook',
    tint: TINT['china-creek'],
  },
]

export default products
