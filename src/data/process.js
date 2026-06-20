// THE PROCESS — voice → receipt. How one point of view became one kit, and a
// repeatable system. The human bookends the machine: voice in, judgment out, the
// machine the accelerant between. One kit (Pump & Dump FC) walked through 7 stages.
// Source files cited per stage. Hero images curated in docs/design/prompts/INGEST-REVIEW.md
// and exported to public/process/ (so the section needs no API/server).

const IMG = '/process'

export const thesis = {
  line: 'The human bookends the machine.',
  body:
    'Voice is the input. Judgment is the output gate. The machine is the accelerant in ' +
    'between — provenance in, curation out. That is the whole anti-slop argument, made ' +
    'literal. Watch one kit, Pump & Dump FC, move through all seven stages.',
}

// Who is holding the pen at each stage — the bookend reads human → handoff → machine → human gate.
export const HANDS = {
  human: { label: 'Human', color: '#ff3b00' }, // hazard
  handoff: { label: 'Handoff', color: '#d9a521' }, // gold
  machine: { label: 'Machine', color: '#21d9c9' }, // cyan
  gate: { label: 'Human · the gate', color: '#ff3b00' }, // hazard
}

export const stages = [
  {
    no: '01', key: 'voice', title: 'Voice', hand: 'human',
    lede: 'A stance, not a prompt.',
    body:
      'It starts with a point of view a machine cannot have: a settler artist refusing to ' +
      'make the celebration jersey. Deadpan official-speak fractured by protest truth — the ' +
      'city seen not as a pretty backdrop but as a market being played.',
    parts: [
      "Hype the asset. Socialize the cost. Privatize the exit. You're not in the stands. You're the bag.",
      '"An Official Nothing of FIFA World Cup 2026™." · Sponsor slot reads PUBLIC MONEY.',
    ],
    images: [],
    source: 'docs/design/brand-system.md · submission-brief.md (Q4)',
  },
  {
    no: '02', key: 'idea', title: 'Idea', hand: 'human',
    lede: 'The voice fans into nine wounds. This is one.',
    body:
      'Pump & Dump FC: the World Cup as a pump and dump. A blackout "city-pride" third kit ' +
      'on TV; a wearable indictment up close. Hype the city, bill the public, let insiders ' +
      'take the exit — you are the bagholder.',
    parts: [
      'Sponsor patch: PUMP & DUMP CAPITAL / WE WIN IF YOU LIVE HERE OR NOT',
      'Crest motto: INFLATE. EXTRACT. ABANDON. · Sleeve cuff: EXIT LIQUIDITY',
      'Punch up at the insiders. The bagholders are the public — the home team, not the joke.',
    ],
    images: [],
    source: 'docs/design/clubs/pump-and-dump-fc.md',
  },
  {
    no: '03', key: 'prompts', title: 'Prompts', hand: 'handoff',
    lede: 'The stance, encoded. Where the human hands off.',
    body:
      'Three prompt sets per kit — moodboard, graphic elements, jersey flats — translate the ' +
      'idea into instructions a model can run. The point of view becomes parameters.',
    parts: [
      'seamless repeating pattern, candlestick charts with thin white lines, soaring peaks then cliff-diving valleys, deep navy blue background, financial graph texture … --style raw',
    ],
    images: [],
    source: 'docs/design/prompts/09-pump-and-dump/{moodboard,graphic-elements,jersey-flats}.md',
  },
  {
    no: '04', key: 'moodboards', title: 'Moodboards', hand: 'machine',
    lede: 'Direction. The machine starts producing.',
    body:
      'First generations set the palette and texture: midnight navy, toxic teal and magenta, ' +
      'official banknote polish over financial severity. Not the kit yet — the world the kit ' +
      'lives in.',
    parts: [],
    images: [
      { src: `${IMG}/moodboard-banknote.jpg`, alt: 'Engraved banknote guilloché macro', caption: 'Banknote DNA · official polish' },
      { src: `${IMG}/moodboard-skyline.jpg`, alt: 'Condo tower skyline, some lit, some dark', caption: 'Condo skyline · lit vs. vacant' },
    ],
    source: 'docs/design/prompts/09-pump-and-dump/moodboard.md · navy + teal + magenta',
  },
  {
    no: '05', key: 'elements', title: 'Graphic elements', hand: 'machine',
    lede: 'The kit-of-parts.',
    body:
      'The standalone marks, each generated clean on white, ready to composite: the crest ' +
      '(shield split half soccer ball, half candlestick / condo stack), the faux-sponsor bar, ' +
      'and the nameplate that prints a role instead of a name.',
    parts: [
      'Crest ribbon: INFLATE. EXTRACT. ABANDON.',
      'Roles, not players: DEVELOPER · FLIPPER · LANDLORD · RENOVICTOR',
    ],
    images: [
      { src: `${IMG}/crest.jpg`, alt: 'Crest: split shield, condo towers vs. rising candlesticks', caption: 'Crest' },
      { src: `${IMG}/sponsor-bar.jpg`, alt: 'PUMP & DUMP CAPITAL sponsor bar', caption: 'Sponsor bar' },
      { src: `${IMG}/nameplate.jpg`, alt: 'DEVELOPER role nameplate', caption: 'Nameplate' },
    ],
    source: 'docs/design/prompts/09-pump-and-dump/graphic-elements.md',
  },
  {
    no: '06', key: 'flats', title: 'Jersey flats', hand: 'machine',
    lede: 'The parts resolve into a jersey.',
    body:
      'The hero third kit: a gold-lit condo skyline at the hem dissolving up into market-crash ' +
      'static, teal and magenta cuffs. Front, back, and the full kit — jersey, shorts, socks.',
    parts: [],
    images: [
      { src: `${IMG}/flat-hero.jpg`, alt: 'Hero third kit front flat', caption: 'The hero flat' },
      { src: `${IMG}/flat-back.jpg`, alt: 'Jersey back flat with nameplate', caption: 'Back · the nameplate' },
      { src: `${IMG}/flat-complete.jpg`, alt: 'Complete kit: jersey, shorts, socks', caption: 'The full kit' },
    ],
    source: 'docs/design/prompts/09-pump-and-dump/jersey-flats.md',
  },
  {
    no: '07', key: 'decision', title: 'The decision', hand: 'gate',
    lede: 'Judgment closes the loop.',
    body:
      'Two hundred and forty-six generations get rated, the misses killed, the winners locked ' +
      'into the tech pack. The machine made options; a human chose. The nameplate that ' +
      'survived names the public: BAGHOLDER.',
    parts: [
      'Locked: crest · PUMP & DUMP CAPITAL · BAGHOLDER · "BUY THE RUMOUR. SELL THE CITY." · the hem citation (every figure flagged for primary-source confirmation before publish)',
      "Material as message: ocean-bound recycled PET + ECONYL ghost-net. Made on what's discarded.",
    ],
    images: [],
    source: 'docs/design/kits/MO-09-pump-and-dump.md',
    cta: { to: '/tracker', label: 'Rate the rest → /tracker' },
  },
]

export default { thesis, HANDS, stages }
