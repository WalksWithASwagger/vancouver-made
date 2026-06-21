# Brand System: VANCOUVER MADE / MADE ON

> Current collection name = **MADE ON** (umbrella: VANCOUVER MADE). Canonical
> palette/voice now live in `src/data/collection.js` (official tech-pack palette:
> Ink `0E0E0E` · Bone `EDE6D8` · Stamp red `C0392B` · Gold `B8924A` · Note green
> `1B4D3E`) and the MADE ON deliverables in `docs/deliverables/`. The system below
> is the foundational counter-brand thinking. Still valid, naming updated.

A counter-brand. It looks tournament-official from a distance and turns into a
protest poster / receipt up close. Shared site tokens: `src/brand/tokens.js` +
`tailwind.config.js`: keep design + code in sync.

## Name & meaning
**VANCOUVER MADE.** Triple read:
1. *Made in Vancouver*: local, by us.
2. *Vancouver, made [up]*: the official story is fabricated, staged for broadcast.
3. *Who was Vancouver made for?*: the core question.

Club: **VANCOUVER MADE FC**, crest "The Displaced XI", motto *Civitas Pro
Populo* (the city, for the people).

## Color — "Tartan Paper" (current site theme)
The live site reads **light**: warm cream paper, warm near-black text, Vancouver-tartan
accents (red / forest green / gold) leaning on the Nardwuar look. This replaced the old
white-on-near-black scheme for readability and punch. Tokens in `src/brand/tokens.js`:

| Token   | Hex      | Role |
|---------|----------|------|
| bone    | `#f4f1ea`| **page surface** + light text on dark beats (newsprint/paper) |
| ink     | `#1a1410`| **body text** (warm near-black) + dark dramatic beats |
| paper   | `#ece4d4`| deeper cream — panels / alternating sections |
| rain    | `#1c2b33`| deep navy — dark beats / subtle tints |
| oxblood | `#5e1622`| deep tartan red — dark tartan ground |
| cedar   | `#2f5436`| forest green — tartan secondary |
| hazard  | `#d11f2a`| **tartan red** — primary accent, headlines, CTAs |
| gold    | `#b8841a`| deep gold — reads on cream (counterfeit-trophy accent) |
| cyan    | `#0f857a`| deep teal — eyebrows, reads on cream |

Primary contrast pair: **ink on bone** (everything) and **hazard headlines on bone**.
Accents (gold/teal/green) are deepened so they stay legible on cream. The few **dark
dramatic beats** invert to bone-on-ink: the journey opener, the "MADE ON · the hem"
blackout card, the gallery lightbox, and the tartan marquee band. The cinematic/internal
routes (`/highlight-reel`, `/wall`, `/tracker`, the 3D `Stage`) stay fully dark on purpose.

Implementation note: the site is token-driven, so the theme flip was done at the palette +
`index.css` level (`bg-ink`→`bg-bone`, `text-bone`→`text-ink`, `border-bone`→`border-ink`).
Inline hardcoded hexes (e.g. Store/HallOfFame filter chips, category colors) must be kept in
sync with these tokens by hand — they bypass Tailwind.

> Two palettes, two jobs. The table above is the **on-screen site palette**
> (`src/brand/tokens.js`) the React site renders from. The **print / tech-pack palette** is
> separate and canonical in `src/data/collection.js`: Ink `0E0E0E`, Bone `EDE6D8`, Stamp
> red `C0392B`, Gold `B8924A`, Note green `1B4D3E`. When a doc and the code disagree, the
> code wins.

## Type
- **Display:** Archivo Black (Impact fallback): loud, stadium, tabloid.
- **Body / mono:** Space Mono: receipts, transcripts, evidence, fine print.
The tension (shouting headline + receipt body) is the whole personality.

## Logo / crest direction
- A football that doubles as a wrecking ball / a globe with a fence around it.
- Crest shaped like an official federation badge but filled with protest iconography
  (a tarp, a tent, a "SOLD" sticker, a maple leaf made of caution tape).
- "Counterfeit official": every mark should feel like it was *almost* approved.

## Texture & motion
- Riso/halftone grain (see `.grain` overlay in `index.css`).
- Marquee ticker of slogans (sponsor-board parody).
- The 3D World Portal: trophy rings + churning globe + orbiting confetti-debris.

## Voice
Deadpan official-speak fractured by protest truth. Examples:
- "An Official Nothing of FIFA World Cup 2026™."
- Sponsor slot reads **PUBLIC MONEY**.
- "Terms and conditions: there were never any terms for us."

## Asset checklist
- [ ] Wordmark (lockup + stacked)
- [ ] Crest / club badge
- [ ] Counterfeit trophy mark
- [ ] Sticker sheet
- [ ] Riso poster series (3)
- [ ] Social templates (square + story)
- [ ] Kit mockups (see `clubs/` + `kits/`)
