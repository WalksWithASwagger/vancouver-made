// THE PROCESS — voice → receipt. The honest, fuller map of how one point of view
// became one kit and a repeatable system. Not a 7-step assembly line: a loop with a
// research spine, custom tooling, and five or six places where a human decides.
// One kit (Pump & Dump FC) walked through it. Hero images exported to public/process/
// (so the section needs no API/server).

const IMG = '/process'

export const thesis = {
  line: 'The human bookends the machine. Holds the pen at every gate between.',
  body:
    'Voice in, judgment out, and a human hand on every gate in between. What looks like a ' +
    'tidy assembly line is really a loop with a research spine, tooling built for the job, and ' +
    'five or six places where a person, not the model, decides. Watch one kit, Pump & Dump ' +
    'FC, move through it.',
}

// Who holds the pen at each stage. The bookend reads human → handoff → machine → human gate,
// but the gates recur — the human is threaded through, not just at the two ends.
export const HANDS = {
  human: { label: 'Human', color: '#ff3b00' }, // hazard
  handoff: { label: 'Handoff', color: '#d9a521' }, // gold
  machine: { label: 'Machine', color: '#21d9c9' }, // cyan
  gate: { label: 'Human · gate', color: '#ff3b00' }, // hazard
}

export const phases = [
  { id: 'ground', label: 'Ground' },
  { id: 'voice', label: 'Voice → Idea' },
  { id: 'make', label: 'Make · the loop' },
  { id: 'curate', label: 'Curate' },
  { id: 'real', label: 'Make it real' },
  { id: 'ship', label: 'Ship' },
]

export const stages = [
  {
    no: '00', key: 'research', phase: 'ground', title: 'Receipts & research', hand: 'gate', gate: true,
    lede: 'Before any design: the public-record spine.',
    body:
      'Every claim on the garment starts as a cited fact, gathered and then verified. A fact-check ' +
      'pass caught two wrong numbers (price-to-income 20–30× → ~12×; homelessness 373% → +134%). ' +
      'Nothing is "true" until a primary source clears the [confirm] flag.',
    parts: ['the receipts wall · the [confirm] discipline · a deep-research verification pass'],
    images: [],
    source: 'src/data/receipts.js · docs/research/analysis/05-receipts-verification.md',
  },
  {
    no: '01', key: 'voice', phase: 'voice', title: 'Voice', hand: 'human',
    lede: 'A stance, not a prompt.',
    body:
      'A point of view a machine cannot have: a settler artist refusing to make the celebration ' +
      'jersey. Deadpan official-speak fractured by protest truth. The city as a market being played.',
    parts: [
      "Hype the asset. Socialize the cost. Privatize the exit. You're not in the stands. You're the bag.",
    ],
    images: [],
    source: 'docs/design/brand-system.md · submission-brief.md (Q4)',
  },
  {
    no: '02', key: 'idea', phase: 'voice', title: 'Idea', hand: 'human',
    lede: 'The voice fans into a collection.',
    body:
      'One stance becomes nine-plus wounds, one FC each. Pump & Dump FC: the World Cup as a pump ' +
      'and dump: a blackout "city-pride" kit on TV, a wearable indictment up close.',
    parts: ['Punch up at the insiders. The bagholders are the public. The home team, not the joke.'],
    images: [],
    source: 'docs/design/clubs/pump-and-dump-fc.md',
  },
  {
    no: '03', key: 'prompts', phase: 'make', title: 'Prompts', hand: 'handoff',
    lede: 'The stance, encoded. Where the human hands off.',
    body:
      'Three prompt sets per kit: moodboard, graphic elements, jersey flats. Each translates the idea ' +
      'into parameters a model can run. The point of view becomes instructions.',
    parts: [
      'seamless repeating pattern, candlestick charts, soaring then cliff-diving, deep navy … --style raw',
    ],
    images: [],
    source: 'docs/design/prompts/09-pump-and-dump/*.md',
  },
  {
    no: '04', key: 'generate', phase: 'make', title: 'Generate', hand: 'machine', loop: true,
    lede: 'The machine produces: at scale. 246 and counting.',
    body:
      'Every prompt runs in Midjourney; moodboards, graphic elements and flats come back by the ' +
      'hundred. The arrow loops: a weak roll sends craft notes back to the prompt and regenerates. ' +
      'Only 2 of 9 kits are fully generated. The loop is the engine, not a one-pass line.',
    parts: ['↺ re-roll: rate → craft notes → sharpen the prompt → regenerate'],
    images: [
      { src: `${IMG}/moodboard-banknote.jpg`, alt: 'Engraved banknote guilloché macro', caption: 'Moodboard · banknote DNA' },
      { src: `${IMG}/moodboard-skyline.jpg`, alt: 'Condo tower skyline, lit and dark', caption: 'Moodboard · lit vs. vacant' },
      { src: `${IMG}/crest.jpg`, alt: 'Crest: towers vs. rising candlesticks', caption: 'Element · crest' },
      { src: `${IMG}/sponsor-bar.jpg`, alt: 'PUMP & DUMP CAPITAL sponsor bar', caption: 'Element · sponsor bar' },
      { src: `${IMG}/nameplate.jpg`, alt: 'DEVELOPER role nameplate', caption: 'Element · nameplate' },
      { src: `${IMG}/flat-hero.jpg`, alt: 'Hero third kit front flat', caption: 'Flat · the hero' },
      { src: `${IMG}/flat-back.jpg`, alt: 'Jersey back flat', caption: 'Flat · the back' },
      { src: `${IMG}/flat-complete.jpg`, alt: 'Complete kit: jersey, shorts, socks', caption: 'Flat · the full kit' },
    ],
    source: 'to-ingest/ (246 generations) · INGEST-REVIEW.md',
  },
  {
    no: '05', key: 'ingest', phase: 'curate', title: 'Ingest & catalog', hand: 'machine',
    lede: 'Custom tooling turns a pile of PNGs into a library.',
    body:
      'A scanner parses every filename into its prompt, job and quadrant, writes a manifest, and ' +
      'loads a local SQLite catalog. Provenance preserved, queryable, idempotent. This is built ' +
      'infrastructure, not an off-the-shelf tool.',
    parts: ['scripts/ingest-assets.js → ingest-manifest.json → SQLite'],
    images: [],
    source: 'scripts/ingest-assets.js · src/db/ratings.db',
  },
  {
    no: '06', key: 'curate', phase: 'curate', title: 'Curate at scale', hand: 'gate', gate: true,
    lede: 'Not one decision: 246.',
    body:
      'In the tracker, every generation gets rated, killed or kept, notes attached, synced to ' +
      'Notion. The judgment is granular and human. This is where taste does the filtering a model ' +
      "can't.",
    parts: ['rate 1–5 · keep / kill · notes · Notion sync'],
    images: [],
    source: 'src/components/AssetTracker.jsx · src/server/api.js',
    cta: { to: '/tracker', label: 'Open the tracker → /tracker' },
  },
  {
    no: '07', key: 'code-flats', phase: 'real', title: 'Code-drawn flats', hand: 'handoff',
    lede: 'AI hands off to code.',
    body:
      "The hero flats on the site aren't Midjourney. They're deterministic SVG drawn from the kit " +
      'spec. Change a colour in the data and the jersey redraws. The design is the data; the render ' +
      'is exact.',
    parts: ['src/components/KitFlat.jsx ← src/data/heroKits.js'],
    images: [],
    source: 'src/components/KitFlat.jsx',
    cta: { to: '/', label: 'See the code-drawn heroes → /' },
  },
  {
    no: '08', key: 'multi', phase: 'real', title: 'Multi-surface', hand: 'machine',
    lede: 'One receipt, many surfaces.',
    body:
      'The Receipts Engine takes one cited fact and renders it three ways: a hem, a protest ' +
      'poster, a fashion editorial. Each in its own house voice. One pipeline pointed at three ' +
      'surfaces, not three projects.',
    parts: ['one fact → hem · poster · editorial'],
    images: [],
    source: 'src/components/ReceiptsEngine.jsx · src/data/voices.js',
    cta: { to: '/engine', label: 'Run the engine → /engine' },
  },
  {
    no: '09', key: 'techpack', phase: 'real', title: 'Tech pack', hand: 'human',
    lede: 'Make it manufacturable.',
    body:
      'Silhouette, fabric (ocean-bound recycled PET, ECONYL ghost-net), sizing XS–3XL, BOM, ' +
      'sublimation method: the spec a factory can actually run. Sourced and [confirm]-flagged like ' +
      'the receipts.',
    parts: ['docs/research/tech-pack-spec.md · docs/design/kits/MO-*.md'],
    images: [],
    source: 'docs/research/tech-pack-spec.md',
  },
  {
    no: '10', key: 'verify', phase: 'ship', title: 'Verify & fact-check', hand: 'gate', gate: true,
    lede: 'Nothing ships on an unverified claim.',
    body:
      'The [confirm] gate: every figure traced to a primary source before publish. A wrong number ' +
      'hands a skeptic the win. The author is the final chooser.',
    parts: ['the [confirm] gate · primary sources only · the author decides'],
    images: [],
    source: 'docs/research/analysis/05-receipts-verification.md',
  },
  {
    no: '11', key: 'orchestrate', phase: 'ship', title: 'Orchestrate & hand off', hand: 'human',
    lede: 'Conduct the room. Document the handoff.',
    body:
      "This wasn't one model or one session. Research came from several models in parallel; the " +
      'build came from several agents working the same branch, each leaving a handoff doc for the ' +
      "next. The novel part isn't using AI. It's conducting a roomful of it.",
    parts: ['docs/HANDOFF.md · parallel agents · one branch'],
    images: [],
    source: 'docs/HANDOFF.md · git log',
  },
]

// The closing band — what the linear strip flattens.
export const tracks = [
  { label: 'Pitch site', note: 'the story + the kits' },
  { label: 'Dev-track infrastructure', note: 'ingest → tracker → engine' },
  { label: 'Multi-agent orchestration', note: 'parallel agents, one branch, handoffs' },
]

export const collaborators = [
  { who: 'Perplexity', role: 'concept + precedent' },
  { who: 'ChatGPT', role: 'the league system' },
  { who: 'Claude', role: 'precedents + the build' },
  { who: 'Midjourney', role: 'generation' },
  { who: 'The tracker', role: 'curation at scale' },
  { who: 'Notion', role: 'sync + memory' },
  { who: 'Parallel agents', role: 'the build, in lanes' },
]

export default { thesis, HANDS, phases, stages, tracks, collaborators }
