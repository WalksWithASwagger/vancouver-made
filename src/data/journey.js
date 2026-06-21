// THE JOURNEY — the guided experience. Opens on the hero, then scrolls
// through the lineage of protest at the world games, our method, and the kit we made
// for Vancouver 2026. Narration is Kris's voice: short punches, name the thing, no
// em-dashes, no emoji. Lineage images live in public/hall-of-fame/.

const HOF = '/hall-of-fame'

// Act II — the canon, as a guided chronological walk. Each beat: a real moment, a
// real image where we have the rights, and why it matters to what we made.
export const lineage = [
  {
    year: '1968',
    place: 'Mexico City',
    title: 'Smith and Carlos',
    img: `${HOF}/smith-carlos-1968-salute.jpg`,
    line:
      'Two runners, heads bowed, fists up. Black socks for poverty, a scarf for pride, ' +
      'beads for the lynched. The podium became a protest surface, and a uniform carried ' +
      'the whole argument without a word.',
  },
  {
    year: '1989',
    place: 'Vancouver',
    title: 'Adbusters',
    img: null,
    line:
      'Culture jamming was born in this city. Take the polished format of the ad and swap ' +
      'the payload. We are not importing this move. We are local to it.',
  },
  {
    year: '2014',
    place: 'São Paulo',
    title: 'Paulo Ito',
    img: `${HOF}/paulo-ito-mural-2014.jpg`,
    line:
      'A starving kid at a table, nothing on the plate but a soccer ball, painted on a ' +
      'schoolhouse door. The image that went around the world and said the quiet part: ' +
      'who pays for the party.',
  },
  {
    year: '2010',
    place: 'Vancouver',
    title: 'Whose culture, whose land',
    img: `${HOF}/cowichan-sweater.jpg`,
    line:
      'At the last Vancouver Games the Bay sold a knockoff "Cowichan-style" sweater over ' +
      'real Coast Salish knitters, an inukshuk got flattened into a friendly logo, and a ' +
      'coalition said it plain: no Olympics on stolen native land. 2026 is about to rhyme.',
  },
  {
    year: '2022',
    place: 'Qatar',
    title: 'Denmark fades its own logo',
    img: null,
    line:
      'Hummel dimmed its own chevrons into the shirt and ran a third kit in mourning black. ' +
      '"We do not wish to be visible," they said, at a tournament that cost thousands of ' +
      'lives. The purest protest kit there is.',
  },
  {
    year: 'the move',
    place: 'Brandalism',
    title: 'Mimic the format, invert the payload',
    img: `${HOF}/brandalism-barclays-spoof.jpg`,
    line:
      'Keep the sponsor format pristine. Flip what it says. This is the move we run on a ' +
      'jersey: official from ten metres, the receipt up close.',
  },
]

// The acts (headline + body) so the copy lives in one place.
export const acts = {
  provocation: {
    kicker: 'The provocation',
    title: 'Everyone made a souvenir. We made the receipt.',
    body:
      'FIFA World Cup 2026 is coming to Vancouver, sold back to us as a celebration. We did ' +
      'not want to make the celebration jersey. This is not a protest about AI. AI is just ' +
      'the brush. The subject is greed, displacement, and who pays the public bill.',
    receipts: [
      'Made on stolen ground.',
      "Made on Hogan's Alley.",
      'Made on $729 million of public money.',
    ],
  },
  lineage: {
    kicker: 'The lineage',
    title: "We didn't invent this. We joined a line.",
    body:
      'Protest at the world games has a history. The podium, the kit, the sponsor board, ' +
      'used as message surfaces. Here is the canon we joined, ending where we live.',
  },
  method: {
    kicker: 'The method',
    title: 'The human bookends the machine.',
    body:
      'Voice goes in. Judgment comes out. AI is the accelerant between. Mimic the official ' +
      'polish, invert the payload, bake the receipt on the hem. One Vancouver number, said ' +
      'three ways: stitched on a kit, pasted on a wall, shot like couture. Every figure is ' +
      'public record, cited before it ships.',
  },
  work: {
    kicker: 'The work',
    title: 'So we made the receipts.',
    body:
      'Nine kits, one per wound the city carries. They read as a hyped city-pride drop from ' +
      'the stands and resolve into the fine print up close. The sponsor logo is replaced by ' +
      'the public cost. The nameplate names the public.',
    punch: "You're not in the stands. You're the bag.",
  },
  close: {
    kicker: 'The close',
    title: 'We made the receipt.',
    body:
      'The same argument lives on three surfaces. The kit you can wear, the poster nobody ' +
      'approved, the editorial shot like evidence. Made on unceded xʷməθkʷəy̓əm, ' +
      'Sḵwx̱wú7mesh, səlilwətaɬ territory.',
  },
}

export default { lineage, acts }
