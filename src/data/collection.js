// MADE ON — the canonical collection (from the pitch deck / board, Kris Krüg).
// "One collection. Two racks. One argument." Nine kits.
// The three fully-built ALLEY LEAGUE clubs (src/data/clubs.js) are the deep-dive
// examples; Pump & Dump maps to kit 09 here.

export const brand = {
  name: 'MADE ON',
  parent: 'VANCOUVER MADE',
  kind: 'PROTEST COLLECTION',
  event: 'FIFA WORLD CUP 2026 · BCIT TECH COLLIDER',
  author: 'Kris Krüg · settler artist',
  land: 'unceded xʷməθkʷəy̓əm, Sḵwx̱wú7mesh, səlilwətaɬ territory',
  hook: 'They asked for the Vancouver story. We finished the sentence.',
  prompt: 'Made on what?',
  answer: ['Made on stolen ground.', "Made on Hogan's Alley.", 'Made on $729 million of public money.'],
  move: 'Everyone else made a souvenir. We made the receipt.',
  // The official palette from the tech pack.
  palette: { ink: '#0E0E0E', bone: '#EDE6D8', stampRed: '#C0392B', gold: '#B8924A', noteGreen: '#1B4D3E' },
  process: ['Mimic the official polish.', 'Invert the payload.', 'Bake in the receipt.'],
  lineage: [
    ['1968', 'Smith & Carlos', 'the podium as protest surface'],
    ['1989', 'Adbusters, Vancouver', "culture jamming born in this city: détournement"],
    ['2012/15', 'Brandalism', 'perfect-mimicry fake ads, official format / inverted message'],
    ['2010', 'The Cowichan sweater', 'whose culture gets sold'],
  ],
}

export const racks = [
  {
    name: 'MADE ON',
    subtitle: 'what the city is built on',
    kits: [
      { no: '01', name: 'MADE ON SILENCE', line: 'Black bloc. The redacted document, worn.' },
      { no: '02', name: 'MADE ON STOLEN GROUND', line: 'The land receipt. Rent never paid.' },
      { no: '03', name: 'MADE ON THE PUBLIC DIME', line: 'The banknote. $729M as couture.', worked: true },
      { no: '10', name: "MADE ON HOGAN'S ALLEY", line: 'Afrofuturist memorial. The block comes home.' },
    ],
  },
  {
    name: 'STREET SERIES',
    subtitle: 'who it got built without',
    kits: [
      { no: '04', name: 'FORSAKEN TWICE', line: "The VPD failure, in Oppal's own words." },
      { no: '05', name: 'ACCESS: ALL AREAS', line: '(unless you live here). The 2010 sweep, again.' },
      { no: '06', name: 'STARTING FROM THE LOW $900s', line: 'Gentrification sold back as a pre-sale.' },
      { no: '07', name: 'PUBLIC HEALTH EMERGENCY', line: 'Ongoing. A memorial, not a sneer.' },
      { no: '08', name: 'SMART CITY', line: 'Surveillance as a terms-of-service.' },
      { no: '09', name: 'PUMP AND DUMP', line: 'The whole grift, worn as the prospectus.', club: 'pump-and-dump-fc' },
    ],
  },
]

export default { brand, racks }
