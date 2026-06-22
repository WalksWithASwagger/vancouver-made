// Direction manifest — HOGAN'S ALLEY FC "Renaissance Home Kit" (memorial + future-tense).
// Self-contained on purpose: this is the collection's most sensitive concept, so it carries
// its own copy rather than the commercial clubs.js shape. No product/lookbook imagery —
// a quiet, text-forward memorial page. Concept source: docs/design/clubs/hogans-alley-fc.md.
// Ethics (the owner is the final guard): a settler artist amplifying, not authoring. Credit
// and route attention to the Hogan's Alley Society and Ethọ́s Lab. Reference the culture,
// never appropriate sacred or specific motifs. Shown to and shaped by the community before
// anything moves past exhibition toward public sale.

const hogansAlley = {
  slug: 'hogans-alley-fc',
  name: "HOGAN'S ALLEY",
  number: '71', // the Georgia Viaduct finished the erasure, c.1971
  kitName: 'Renaissance Home Kit',
  tagline: 'The block the city paved over, worn as a future. Still here. Still building.',
  palette: {
    base: '#3b2f73', // cosmic indigo
    ink: '#120e22',
    accent: '#b8841a', // memorial gold
    signal: '#b8841a',
  },

  hero: {
    eyebrow: 'Memorial kit · ends in the future tense',
    image: '/kit/hogans-alley/hero.jpg',
    line: "Vancouver's most prominent Black neighbourhood was cleared for the viaduct the Cup now drives its fans across. This kit refuses to end on the wound: a 2022 land trust is bringing the block home. Grief in gold, and the block coming home.",
  },

  concept: {
    target:
      'Urban-renewal erasure · anti-Black displacement · civic amnesia — and the reclamation answering it',
    summary:
      "Hogan's Alley was Vancouver's heart of Black life — Black-owned businesses, the AME Fountain Chapel, the city's jazz district, in Strathcona from the early 1900s. It was cleared through 1960s urban renewal and the building of the Georgia Viaduct, completed around 1971. \"Made on Hogan's Alley\" is already one of the three answers in the MADE ON triad, but until now no kit carried it. This one does, and it refuses to end on the wound: a 2022 community land trust is bringing the block home, with affordable housing and a Black Cultural Centre, while Ethọ́s Lab builds Afrofuturist futures for Black youth in the city right now. The collection's only kit that ends in the future tense.",
    // whoBenefits = who profited from the erasure (the target); whoPays = who bore the cost.
    whoBenefits: [
      'The mid-century freeway / urban-renewal agenda',
      'Property and redevelopment interests',
      'A city that paved over its own Black history',
      'The souvenir Vancouver that leaves it out',
    ],
    whoPays: [
      'The Black families displaced from the neighbourhood',
      "Vancouver's Black cultural memory and its descendants",
      'A jazz district erased from the broadcast',
      'Every city that mistakes demolition for progress',
    ],
  },

  // No kit / lifestyle / collection sections by design: this page does not stage speculative
  // product or on-body imagery of the community. The work below is the design logic, told plain.
  process: {
    line: 'Use the exact polish of an official heritage kit, but in service of a reclamation, not a souvenir. Every sponsor slot, inverted, becomes an honour.',
    steps: [
      {
        label: '01 · The brief',
        body: "Host-city kits flatten local culture into friendly merch. This one refuses the flattening. On TV it reads as a gorgeous cosmic-and-gold Afrofuturist heritage strip, in the lineage of the great African national kits. On the street it reads as a memorial to the neighbourhood the city paved over, and a banner for the one being rebuilt.",
      },
      {
        label: '02 · The honour board',
        body: 'On the other clubs the sponsor slots mock a corporation. Here every slot honours the reclamation: BLACK CULTURAL CENTRE on the chest, COMMUNITY LAND TRUST on the cuff, STILL HERE on the crest ribbon, THE BLOCK COMES HOME along the hem, STILL BUILDING at the back neck.',
      },
      {
        label: '03 · The fabric',
        body: 'Deep cosmic indigo with metallic-gold engraving, a star-map gradient. The all-over print is an original geometric weave and an Afrofuturist star-map over a ghosted jazz-era street grid of the old neighbourhood. Original geometry only — no appropriated sacred or specific cultural motifs. The numbers are drawn from the Hogan’s Alley street grid and the land-trust floor plans: the block, redrawn.',
      },
      {
        label: '04 · The deed',
        body: 'The matchday programme is a mock deed, the Hogan’s Alley timeline laid out as a returned land title, ending on the land trust and the Cultural Centre: 1900s, 1971, 2022, ahead. The care label reads HANDLE THE HISTORY WITH CARE. THIS BLOCK IS NOT FOR SALE. Every surface points to the Hogan’s Alley Society and Ethọ́s Lab; attention and any proceeds go to them.',
      },
    ],
  },

  citations: [
    {
      id: 'R-HOGANS',
      claim:
        "Hogan's Alley was Vancouver's most prominent Black neighbourhood, razed through 1960s urban renewal; the houses came down in 1970 and the Georgia Viaduct opened in 1972 — the viaduct the Cup now drives its fans across.",
      source: 'BC Black History Awareness Society · City of Vancouver redress record',
    },
    {
      id: 'R-RETURN',
      claim:
        "The Hogan's Alley Block is returning to the community as a land trust. A 2022 City–Hogan's Alley Society MOU moves toward a long-term lease: affordable housing, a Black Cultural Centre, child care, and small-business space.",
      source: "City of Vancouver · Hogan's Alley Society, 2022",
    },
    {
      id: 'R-ETHOS',
      claim:
        'Ethọ́s Lab is a Black-led Vancouver STEAM academy building Afrofuturist futures for Black youth, with its Galaxy Project scaling to thousands. Referenced to amplify, not to represent — support them directly.',
      source: 'Ethọ́s Lab',
    },
  ],

  ethics:
    "A settler artist amplifying, not authoring. This kit is a tribute to Hogan's Alley and a signal-boost for the people rebuilding it — not a claim on a story that isn't mine to tell. It credits and links the Hogan's Alley Society and Ethọ́s Lab, routes attention and any proceeds to them, and references the culture without appropriating sacred or specific motifs. Before it moves past exhibition toward anything public or sold, it should be shown to, and shaped by, the community, with their blessing first. Homage, not ownership.",
}

export default hogansAlley
