// VANCOUVER MADE — ALLEY LEAGUE club data.
// Source of truth for the three flagship concepts. The kit briefs, the deck, and
// the portal all read from here. Each club steals/evokes FIFA World Cup 2026
// host-city dress and turns it against itself: who benefits, who pays.
//
// FIFA evocation rule (from research): EVOKE the official system — the "26",
// host-city lockups, hospitality/credential/sponsor-board language, the trophy,
// fan-zone wristbands, "city pride" third kits — but never reproduce actual FIFA
// marks. Build a parallel, counterfeit-official identity in our own voice.
//
// A source card's `confirm` flag, when truthy, marks a fact still needing
// primary-source verification before it goes public. All cards verified 2026-06-20
// (see docs/research/analysis/05-receipts-verification.md). See also brief.md.

export const league = {
  name: 'VANCOUVER MADE',
  competition: 'ALLEY LEAGUE',
  umbrella: 'HOST CITY / GHOST CITY',
  edition: 'UNOFFICIAL KIT DROP · 26',
  campaign: 'NO GAME WITHOUT THE GROUND',
  thesis:
    'Most kits turn a city into a logo. These turn it into evidence. Not anti-football — anti-amnesia.',
  // The spoof system that makes all three read as one "World Cup, evil twin" drop.
  sharedSpoof: {
    crestFrame: 'One host-city shield outline on all three; different inner art per club.',
    fauxPatch: ['UNOFFICIAL HOST CITY DROP', 'THIS KIT IS NOT LICENSED BY ANYONE'],
    hostCityLockup: 'VANCOUVER 2026 — UNOFFICIAL',
    trophyMisuse: 'The trophy silhouette is reused per club (marquee / mic-stand / condo tower).',
    backNeckBadge: 'NO GAME WITHOUT THE GROUND',
  },
}

export const clubs = [
  // ────────────────────────────────────────────────────────────────────────
  {
    id: 'number-five-orange',
    name: 'NUMBER FIVE ORANGE',
    number: '5',
    heroKit: 'AWAY',
    kitName: 'Work Is Work Away Strip',
    tagline: 'The whole city becomes a VIP room.',
    target: 'Nightlife capitalism · the spectacle economy · sex-work stigma',
    summary:
      'No.5 Orange — rooted in the old Melbourne Hotel (1904), turned No.5 Orange in 1971 — is one of the last of old Gastown, a landmark that has hosted everyone from Gretzky to Bon Jovi. The event city sells "edgy nightlife" to tourists and stag parties while criminalizing and policing the people who do the work. The Cup turns public land into a private champagne room: cover charge at the door of your own city.',
    palette: {
      base: '#ff6a00', // safety-cone orange (the façade)
      ink: '#0a0a0a', // vinyl black
      accent: '#d9a521', // metallic merch gold
      signal: '#ff2d6f', // neon marquee pink
    },
    type: 'nightlife marquee + thermal-receipt mono',
    whoBenefits: [
      'Club & hotel owners',
      'FIFA hospitality packages',
      'Stag-party tourism',
      'Liquor & event promoters',
    ],
    whoPays: [
      'Sex workers — labour, risk, criminalization',
      'Service & door staff (the "service fee")',
      'Residents priced out of their own night',
      'Anyone swept off the strip for the broadcast',
    ],
    sponsorBank: [
      'WORK IS WORK', // front sponsor
      'SAFER SPACES FC', // back-of-neck micro sponsor
      'CITY LOVES THE STORY, NOT THE WORKER', // shorts tag
      'DECRIM NOW',
      'OFFICIAL HOSPITALITY PARTNER',
      'PUBLIC LAND / PRIVATE PROFIT',
    ],
    crest: 'Host-city shield; inner art = an orange marquee / stage silhouette.',
    kits: {
      away: 'HERO. Saturated safety-cone orange body, white sleeves, metallic-gold trim — reads as a glam World Cup away strip on TV. A vertical "pole" stripe runs the torso as a sleek metallic gradient.',
      home: 'Vinyl black with orange surcharge lines and service-fee symbols — the bill for a night out you never agreed to.',
      third:
        '"Champagne Room Economy" — dirty gold on orange, intentionally tacky, cover-charge stamps repeating down the sleeve.',
    },
    numberTreatment:
      'Numbers built from tiny human silhouettes — tourists queueing on one side, staff and dancers exiting a back door on the other. Zoom in and you read the hierarchy.',
    patchSpoof: 'Where "FIFA Quality Pro" sits: UNLICENSED / UNPAID / UNAPOLOGETIC.',
    trophyMisuse: 'Trophy silhouette becomes the buzzing neon marquee over the door.',
    fifaSubversion:
      'Classic World Cup away-kit template — clean paneling, host-city sleeve patch, trophy watermark — but the host-city crest reads VANCOUVER 2026 — UNOFFICIAL and the big sponsor is WORK IS WORK styled like a telecom mark.',
    sourceCards: [
      {
        id: 'AL-N5-001',
        claim:
          'No.5 Orange (205 Main St, at Main & Powell) opened as the Melbourne Hotel in August 1904 and became No.5 Orange in 1971 — one of the last of old Gastown.',
        source: 'Eve Lazarus, "How the Melbourne Hotel became No5 Orange" (2022); no5orange.ca',
        rights: 'Reference only — recreate/illustrate, do not reproduce photos.',
        confirm: false,
      },
      {
        id: 'AL-N5-002',
        claim:
          "Vancouver's Host City Human Rights Action Plan (HRAP, final released May 25, 2026) explicitly names sex-worker safety, gender-based violence and MMIWG2S+ response among its World Cup priority areas.",
        source: 'FIFA World Cup 2026 Vancouver Host Committee / City of Vancouver HRAP; CBC & Global News, May 2026',
        rights: 'Public document — quote with citation.',
        confirm: false,
      },
    ],
    ethics:
      'Critique extraction, VIP culture, nightlife capitalism and event spectacle — never caricature the workers. Sex work = labour, risk, criminalization. Punch up at the buyers and the bylaw, not down at the strip.',
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    id: 'nardwuar-fc',
    name: 'NARDWUAR FC',
    number: '97', // APEC, Vancouver, 1997
    heroKit: 'HOME',
    kitName: 'Deep Cut Home Kit',
    tagline: "Do the research. Then ask power the question it's dodging.",
    target: 'Unaccountable power · the unasked question · sanitized civic PR',
    summary:
      'Homage to Nardwuar the Human Serviette — hyper-researched guerrilla interviewer and frontman of The Evaporators, rooted at CiTR/UBC, who has ambushed everyone from Nirvana to prime ministers with deep local history and receipts. He IS the project\'s thesis: research is the protest; the receipt is the weapon. A World Cup jersey turned into a walking archive that asks who gets to tell Vancouver\'s story — and who actually does the digging.',
    palette: {
      base: '#c8102e', // tartan red (the tam)
      ink: '#0a0a0a',
      accent: '#1d7a46', // tartan green
      signal: '#e8c531', // tartan yellow
    },
    type: 'riso-plaid microtext + cut-and-paste broadcast caps',
    whoBenefits: [
      'Politicians with a controlled message',
      'Sponsors who buy the friendly interview',
      'Anyone who profits when nobody does the homework',
    ],
    whoPays: [
      'The public, kept uninformed',
      "Vancouver's underground canon, left out of the broadcast",
      'The truth, when no one asks the follow-up',
    ],
    sponsorBank: [
      'DEEP RESEARCH', // sleeve patch
      'HUMAN SERVIETTE REPORTING CLUB', // sleeve patch
      'INTERVIEW YOUR CITY LIKE NARDWUAR', // hem tag
      'WHO BENEFITS? WHO PAYS?',
      "KEEP ON ROCKIN' IN THE FREE WORLD",
      'DOOT DOOLA DOOT DOO',
    ],
    crest:
      'Host-city shield silhouette; inner art = collage of 7" records, photocopied show flyers, and a tartan-hat silhouette in place of a lion or maple leaf.',
    kits: {
      home: 'HERO. Reads as a host-nation home kit — bold primaries, classic striping, crest, World Cup patch — in a tartan-inspired palette (reds/greens/yellows) ghosted into the fabric like a clean check.',
      away: 'Bone newsprint with red/green tartan trim. Back: "WHO ARE YOU?" / "DOOT DOOLA DOOT DOO."',
      third:
        '"Unsanctioned Press" — a press-accreditation kit whose credential reads PRESS THEY DIDN\'T VET; sleeve mic recoded as a torch.',
    },
    numberTreatment:
      'Number formed from tiny rectangles — record sleeves and zine panels. Nameplate NARDWUAR!! in chaotic cut-and-paste type.',
    patchSpoof: 'FIFA "Fair Play" badge → DEEP RESEARCH / HUMAN SERVIETTE REPORTING CLUB.',
    trophyMisuse: 'Trophy silhouette becomes a mic stand / vinyl spindle.',
    fifaSubversion:
      'Dressed as a host-nation home kit and OFFICIAL BROADCAST accreditation — then flipped. The all-over print is an ultra-faint collage of VHS labels, cassette spines, 7" labels and microtype interview quotes; inside-collar reads DOOT DOOLA DOOT DOO… It turns the global broadcast into an Easter-egg hunt for Vancouver\'s underground instead of civic PR.',
    sourceCards: [
      {
        id: 'AL-NW-001',
        claim:
          'At APEC 1997 in Vancouver, Nardwuar questioned PM Jean Chrétien about pepper spray used on protesters; Chrétien quipped "For me, pepper, I put it on my plate" — ahead of the Hughes/APEC inquiry into RCMP conduct.',
        source: 'Nardwuar footage; The Canadian Encyclopedia; CBC archives',
        rights: 'Reference / quote with citation; do not reproduce footage stills.',
        confirm: false,
      },
      {
        id: 'AL-NW-002',
        claim:
          'Nardwuar (frontman of The Evaporators, based at CiTR/UBC) models accountability through exhaustive research, then the uncomfortable question.',
        source: 'Wikipedia; UBC alumni magazine; nardwuar.com',
        rights: 'HOMAGE, not likeness. See ethics note.',
        confirm: false,
      },
    ],
    ethics:
      'Affectionate tribute to a living, beloved Vancouverite — he is the hero, power is the target. Channel the ethos (research → truth to power); do NOT impersonate his likeness or commercialize his name. If this moves past exhibition toward merch, get Nardwuar\'s blessing first.',
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    id: 'pump-and-dump-fc',
    name: 'PUMP & DUMP FC',
    number: '89', // VSE "Scam Capital", Forbes 1989
    heroKit: 'THIRD',
    kitName: 'Speculation City Third Kit',
    tagline: 'Hype the asset. Socialize the cost. Privatize the exit.',
    target: 'Speculative finance · the housing market · the mega-event as a pump-and-dump',
    summary:
      'Vancouver\'s speculative DNA — from Howe Street and a stock exchange once branded the "Scam Capital of the World" to a housing market decoupled from local incomes by foreign money and flips, with thousands of unsold and empty condos while residents drown in cost. The World Cup is the ultimate pump: hype the city as the asset, bill the public, let insiders take the exit liquidity. You are the bagholder. FLAGSHIP CLUB.',
    palette: {
      base: '#0b1437', // midnight navy
      ink: '#050608', // blackout
      accent: '#ff2bd6', // toxic magenta
      signal: '#21f0d0', // toxic teal
    },
    type: 'terminal monospace + hype-promo gradient',
    whoBenefits: [
      'Promoters & insiders (exit liquidity)',
      'Developers, flippers & landholders ("land uplift")',
      'Foreign capital & numbered companies',
      'FIFA & official partners',
    ],
    whoPays: [
      'The public — the bagholders',
      'Taxpayers: ~$320–338M+ in city costs',
      'Renters in one of the world’s least-affordable markets (~12× price-to-income)',
      'The displaced, swept before the open bell',
    ],
    sponsorBank: [
      'PUMP & DUMP CAPITAL', // sponsor patch
      'WE WIN IF YOU LIVE HERE OR NOT', // fake tagline
      'EXIT LIQUIDITY',
      'INFLATE. EXTRACT. ABANDON.', // crest motto ribbon
      'FORWARD-LOOKING STATEMENTS',
      'NOT FINANCIAL ADVICE',
    ],
    crest:
      'Shield split in two — one half a soccer ball, the other a candlestick chart / stacked-coin condo tower. Motto ribbon: INFLATE. EXTRACT. ABANDON.',
    kits: {
      third:
        'HERO. A limited-edition "city pride" blackout third kit: midnight navy/black with toxic-neon teal & magenta gradients straight out of hyped 2026 promo. On the chest, the trophy is replaced by a glass condo tower of stacked coins.',
      home: 'Ascending green/copper candlesticks across the torso; microtext from a fake investor deck. Number = a stock ticker.',
      away: 'Crash-red, vertical dump candles, shredded-share-certificate texture. The pump, after the open.',
    },
    numberTreatment:
      'Players replaced with roles — DEVELOPER, FLIPPER, LANDLORD, RENOVICTOR. Numbers built from floor-plans and MLS listing codes. Socks: price-to-income multiples down the calf (22×, 33×). Shorts: a VACANT stamp pattern where a sponsor ad would sit.',
    patchSpoof: 'Bank/crypto sponsor mark → PUMP & DUMP CAPITAL · WE WIN IF YOU LIVE HERE OR NOT.',
    trophyMisuse: 'Trophy silhouette becomes a condo tower / a speculative bubble.',
    fifaSubversion:
      'The "city pride" third kit every host city drops to cash in — weaponized. Background uses trophy silhouettes and 2026 host typography; the all-over print is line charts soaring then cliff-diving (2021 PEAK, FLIP TAX, FOREIGN BUYER SURCHARGE) and repeating condo towers, most of them dark/vacant.',
    sourceCards: [
      {
        id: 'AL-PD-001',
        claim:
          'The Vancouver Stock Exchange was branded the "scam capital of the world" by Forbes in 1989; it merged with the Alberta Stock Exchange in 1999 to form the CDNX, acquired by the TSX Group in 2001 and renamed the TSX Venture Exchange.',
        source: 'Forbes (1989); Vancouver Stock Exchange historical record',
        rights: 'Quote with citation.',
        confirm: false,
      },
      {
        id: 'AL-PD-002',
        claim:
          'CMHC counted ~2,500 completed-and-unsold (unabsorbed) new condos in the Vancouver area in May 2025, rising to ~4,400 by May 2026; Vancouver is among the world\'s least-affordable markets at a price-to-income median multiple of ~12 (Demographia 2025) — not the 20–30× sometimes cited.',
        source: 'CMHC via Business in Vancouver (2025–26); Demographia Intl Housing Affordability 2025',
        rights: 'Cite with date; "unabsorbed" ≠ "vacant".',
        confirm: false,
      },
      {
        id: 'AL-PD-003',
        claim:
          'The City projects ~$320–338M core/essential World Cup costs, plus $67–74M other public-sector, with ~$242M combined safety/security (May 2026 update).',
        source: 'Government of BC / City of Vancouver cost update, May 2026; BIV; Daily Hive',
        rights: 'Public figures — use the May 2026 numbers.',
        confirm: false,
      },
    ],
    ethics:
      'Punch up at promoters, developers, foreign capital, FIFA and the insiders who take the exit. The bagholders are the public — they are the home team, not the joke.',
  },
]

export default clubs
