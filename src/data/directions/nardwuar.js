// Direction manifest — NARDWUAR FC "Deep Cut" (the winning Designathon kit).
// First instance of the per-direction landing-page model (epic #56 / scaffold #57).
// Concept/citations/ethics come from clubs.js; imagery is curated here by section.
import { clubs } from '../clubs.js'

const club = clubs.find((c) => c.id === 'nardwuar-fc')
const K = '/kit/nardwuar' // staged lookbook (public/kit/nardwuar/)

const nardwuar = {
  slug: 'nardwuar-fc',
  name: club.name,
  number: club.number, // 97 — APEC, Vancouver, 1997
  kitName: club.kitName,
  tagline: club.tagline,
  palette: club.palette, // base #c8102e (tartan red) · ink · accent #1d7a46 (green) · signal #e8c531 (gold)
  award: '🥈 2nd · Formme Design Challenge · BCIT Tech Collider 2026',

  hero: {
    eyebrow: 'The winning kit',
    image: `${K}/submission-red.png`,
    line: 'A World Cup home kit turned into a walking archive of Vancouver’s underground. Research is the protest; the receipt is the weapon.',
  },

  // The provocation — why this kit exists (clubs.js carries the substance).
  concept: {
    summary: club.summary,
    target: club.target,
    whoBenefits: club.whoBenefits,
    whoPays: club.whoPays,
  },

  // The kit up close — flats + craft details (lightbox).
  kit: {
    flats: [
      { src: '/highlight-reel/nardwuar-01-home-front.png', caption: 'Home · front' },
      { src: '/highlight-reel/nardwuar-02-home-back.png', caption: 'Home · back' },
      { src: `${K}/3d-render.png`, caption: '3D hero render' },
    ],
    details: [
      { src: '/gallery/nw-front.jpg', caption: 'WHO BENEFITS? WHO PAYS?: chest bar' },
      { src: '/highlight-reel/nardwuar-03-crest.png', caption: 'Collage crest: records, flyers, the tam' },
      { src: '/gallery/nw-badge.jpg', caption: 'DEEP RESEARCH: Fair-Play badge spoof' },
      { src: '/gallery/nw-nameplate.jpg', caption: 'NARDWUAR!!: ransom-note nameplate' },
      { src: '/gallery/nw-sponsor.jpg', caption: 'HUMAN SERVIETTE REPORTING CLUB: sponsor bar' },
      { src: '/gallery/nw-allover.jpg', caption: 'All-over: 7-inches, zines, cassette spines' },
    ],
  },

  // On the body — the lookbook gold (lifestyle + matchday).
  lifestyle: [
    { src: `${K}/lifestyle-gastown.png`, caption: 'Gastown alley, rainy neon' },
    { src: `${K}/lifestyle-terrace.png`, caption: 'Terrace: NARDWUAR!! scarf up' },
    { src: `${K}/team-red-action.png`, caption: 'Matchday: the ball strike' },
    { src: `${K}/team-red-goal.png`, caption: 'The celebration' },
    { src: `${K}/team-red-trophy.png`, caption: 'The lift' },
    { src: `${K}/team-red-lineup.png`, caption: 'Home: the lineup' },
    { src: `${K}/team-black-lineup.png`, caption: 'Away black: the lineup' },
    { src: `${K}/lifestyle-white-premium.png`, caption: 'Limited white: studio' },
  ],

  // The system — collection family + derivatives (it’s a real range).
  collection: [
    { src: `${K}/collection-family.png`, caption: 'Three colorways: Home / Away / Limited' },
    { src: `${K}/hero-flatlay.png`, caption: 'Styled flat-lay: press pass, 7-inches, mic' },
    { src: `${K}/derivative-tracksuit.png`, caption: 'Derivative: tracksuit' },
    { src: `${K}/derivative-jacket-scarf.png`, caption: 'Derivative: jacket + scarf' },
    { src: `${K}/gallery-wall.png`, caption: 'Gallery wall' },
    { src: `${K}/display-plinth.png`, caption: 'Launch plinth' },
  ],

  // The method — how a prompt became a kit (the process, in KK's voice).
  process: {
    line: 'Do the homework, then ask power the thing it’s dodging. Same method as the interview: research → the receipt → the uncomfortable question, worn.',
    steps: [
      {
        label: '01 · The brief',
        body: 'Homage to Nardwuar the Human Serviette, hyper-researched guerrilla interviewer, frontman of The Evaporators, rooted at CiTR/UBC. Homage carried through objects (the tam, the mic, the records, the press pass). Never his likeness or name-as-merch.',
      },
      {
        label: '02 · The moodboard',
        body: 'Tartan home-kit gravity + riso-printed zine grit + cassette / 7-inch-single archaeology. The two-distance trick: a clean Vancouver-tartan home kit at 10m, a fanzine archive of the city’s underground at arm’s length.',
      },
      {
        label: '03 · Prompt → generate → star → refine',
        body: 'Rafiki / Nano-Banana-Pro runs, hundreds of frames, curated down (STARRED.md) across v1 → v2: front = VANCOUVER, NARDWUAR!! on the back only, edgier register. The graphic elements (DEEP RESEARCH badge, collage crest, ransom nameplate) pulled from the strongest frames.',
      },
      {
        label: '04 · The receipt',
        body: 'WHO BENEFITS? WHO PAYS? across the chest. The all-over is an Easter-egg hunt for the city’s underground canon. Inside the collar: DOOT DOOLA DOOT DOO.',
      },
    ],
    sponsorBank: club.sponsorBank,
  },

  // The receipts — every claim cited.
  citations: club.sourceCards,

  ethics: club.ethics,
}

export default nardwuar
