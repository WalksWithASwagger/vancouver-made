// MADE ON — HERO KITS, built to full spec (the tech-pack + deck-slide-5 fill).
// Three kits chosen as heroes: 01 Made on Silence, 03 Made on the Public Dime,
// 09 Pump and Dump. Each renders as a code-drawn jersey flat (see KitFlat.jsx) and
// fills the tech pack's Section 5 (artwork & placement with citations).
//
// hemCitation = the receipt baked into the garment.

export const heroKits = [
  {
    id: 'public-dime',
    no: '03',
    name: 'MADE ON THE PUBLIC DIME',
    series: 'MADE ON: what the city is built on',
    styleNo: 'MO-03',
    silhouette: 'long', // set-in long sleeve — max unbroken banknote-engraving canvas
    fabric: 'Optical-bright ocean-bound recycled PET interlock ~150 gsm (sublimation base)',
    concept: 'The World Cup as a public-money transfer with grass on top. Worn as legal tender.',
    theLine: '$729M as couture.',
    colorway: {
      body: '#1B4D3E', // banknote green
      primary: '#B8924A', // engraved gold (metallic if Formme can run it)
      secondary: '#0E0E0E', // ink
      accent: '#EDE6D8', // bone
      finish: 'matte jersey body · metallic-gold engraving',
    },
    crest: 'A casino chip with a FIFA-shield silhouette inside it.',
    sponsorBar: 'BANK OF FIFA',
    makerMark: 'LEGAL TENDER FOR ALL DEBTS, PUBLIC',
    nameplate: 'LEGAL TENDER',
    number: '$729,000,000',
    backLine: 'THE HOUSE ALWAYS WINS',
    allover: 'Guilloché banknote engraving (fine line art, dye-sublimated edge-to-edge).',
    serial: 'SER. NO. VAN-2026-PUBLIC',
    hemCitation: {
      text: 'SECURITY $242M · NET TO BC TAXPAYER UP TO $114M · CALIFORNIA WENT PRIVATE · YOU DIDN\'T',
      source: 'Government of BC · Globe and Mail, May 2026',
    },
    whyItWins:
      'The number IS the kit. The most quotable object on the floor. Metallic banknote engraving is a genuine craft flex, and the public-cost receipt is printed into the garment, not captioned beside it.',
    manifestoCard:
      'One side: the souvenir line ("you asked for the Vancouver story…"). Other side: the public-cost receipts + a QR to a DTES / land-back org.',
  },
  {
    id: 'made-on-silence',
    no: '01',
    name: 'MADE ON SILENCE',
    series: 'MADE ON: what the city is built on',
    styleNo: 'MO-01',
    silhouette: 'raglan', // ¾ raglan — black-bloc / refusal-of-the-official-cut read
    fabric: 'Dope-dyed recycled black poly (waterless) + gloss redaction bars',
    concept: 'The city\'s record, redacted. What they won\'t release, worn. Black bloc.',
    theLine: 'The redacted document, worn.',
    colorway: {
      body: '#0E0E0E', // ink, matte
      primary: '#141414', // redaction bar — matte-on-matte (gloss finish)
      secondary: '#EDE6D8', // bone
      accent: '#C0392B', // stamp red (CLASSIFIED)
      finish: 'matte body · gloss redaction bars (matte-on-matte) · stamp-red accent',
    },
    crest: 'The federation badge replaced by a single black redaction bar, stamped CLASSIFIED.',
    sponsorBar: '████████████', // the sponsor, blacked out
    makerMark: 'ACCESS DENIED',
    nameplate: 'REDACTED',
    number: '███',
    backLine: 'WHAT THEY WON\'T RELEASE, WE WEAR',
    allover: 'A ghosted consultation report / FOI response, redaction bars across it; matte-on-matte so it only reads in raking light.',
    serial: 'FOI REQ. VAN-2026-■■■',
    hemCitation: {
      text: 'SECURITY $242M · LINE-ITEM DETAIL WITHHELD · RECORDS SEVERED UNDER EXEMPTION',
      source: 'FIPPA / FOI · CBC, 2026',
    },
    whyItWins:
      'Matte-on-matte redaction is a real novelty-of-output move. The censorship is the craft. Reads as black-bloc protest from across the room; up close it\'s the city\'s own withheld paperwork.',
    manifestoCard:
      'One side: the MADE ON statement. Other side: what was redacted + how to file your own FOI + a QR.',
  },
  {
    id: 'pump-and-dump',
    no: '09',
    name: 'PUMP AND DUMP',
    series: 'STREET SERIES: who it got built without',
    styleNo: 'MO-09',
    club: 'pump-and-dump-fc', // deep-dive data in src/data/clubs.js
    silhouette: 'raglan', // ¾ raglan, boxy/blokecore — the hypebeast-on-TikTok read
    fabric: 'Ocean-bound recycled PET interlock; ECONYL ghost-net trim accent',
    concept: 'The whole grift, worn as the prospectus. Hype the city, bill the public, take the exit. You\'re the bagholder.',
    theLine: 'Worn as the prospectus.',
    colorway: {
      body: '#0b1437', // midnight navy / blackout
      primary: '#21f0d0', // toxic teal
      secondary: '#ff2bd6', // toxic magenta
      accent: '#dc2626', // crash red
      finish: 'blackout body · toxic-neon gradient print',
    },
    crest: 'Shield split: half soccer ball, half candlestick chart / stacked-coin condo tower. Ribbon: INFLATE. EXTRACT. ABANDON.',
    sponsorBar: 'PUMP & DUMP CAPITAL',
    makerMark: 'NOT FINANCIAL ADVICE',
    nameplate: 'BAGHOLDER',
    number: '▲▼',
    backLine: 'BUY THE RUMOUR. SELL THE CITY.',
    allover: 'Line charts soaring then cliff-diving (2021 PEAK, FLIP TAX, FOREIGN BUYER SURCHARGE); repeating condo towers, most of them dark/vacant.',
    serial: 'MLS® VAN-2026-VACANT',
    hemCitation: {
      text: 'UNSOLD CONDOS AT A RECORD ~4,400 (CMHC 2026) · PRICE-TO-INCOME ~12× · VSE "SCAM CAPITAL" (FORBES 1989)',
      source: 'CMHC via BIV 2026 · Demographia 2025 · Forbes 1989',
    },
    whyItWins:
      'Connects the event, finance and the housing crisis in one blackout kit that reads hypebeast on TikTok and indictment up close. The wearer\'s nameplate, BAGHOLDER, is the public.',
    manifestoCard:
      'One side: the prospectus disclaimer turned on the city. Other side: housing + finance receipts + a QR to a housing-justice org.',
  },
]

export default heroKits
