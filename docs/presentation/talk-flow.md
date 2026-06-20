# Talk Flow — the Director's Cut · Pump & Dump FC / MADE ON

The long cut of the pitch. Where [`presentation-flow.md`](presentation-flow.md) is the
5-minute **trailer** built tight to the designathon brief (one jersey, hero-led), this is the
**talk**: the same spine, re-sequenced and given room so the work lands with full weight.

The move is **earn the reveal**. By the time the jerseys are on screen, the room already knows
(1) why it matters, (2) what lineage it joins, and (3) how rigorously it was made. Four
movements: **provocation → canon → method → work.**

This talk is presented **live off the running site** (the site *is* the deck) with an
exportable cut as the leave-behind. Each movement below names its **live demo** and its
**deck slides**.

> Two cuts, one spine. Don't choose — the trailer (`presentation-flow.md`) is the brief
> submission; this is the talk / dev-track pitch. Keep them consistent; build both from the
> same receipts.

---

## The arc in one breath

> The festival is a spectacle, and someone always pays for the spectacle. There's a long line
> of people who used the jersey, the podium, and the sponsor board to say so. Here's how we
> joined that line — voice to receipt — and here's what we made.

---

## Movement I — The Claim (the spectacle, and the bill)

**Job:** Open the loop. State the provocation before any jersey: the broadcast version vs. the
invoice. Don't resolve it yet.

**Beats**
- The mechanism: *hype the asset, socialize the cost, privatize the exit, leave the bagholder.*
  The World Cup as a pump and dump.
- The bill, cited (`src/data/receipts.js`): **$685M–$729M** gross BC cost for seven games,
  **$242M** of it security, up to **$114M** net to BC taxpayers (R-COST). California host
  cities went **nearly 100% private**; BC went public (R-PRIVATE).
- The line that carries the whole talk: **"You're not in the stands. You're the bag."**
  (`docs/design/submission-brief.md`, the Pitch Line.)

**Live demo:** the site hero `/` — "MADE ON WHAT?" + the territorial statement.
**Deck slides:** 1 (cold-open provocation on ink), 2 (the bill, 3 cited numbers, big).

---

## Movement II — The Hall of Fame (the canon you join)

**Job:** Establish the lineage *before* the concepts. This is the big reframe: not the
defensive "we're not a stunt" slide buried at the end of the trailer — it's the **foundation**.
"We studied the wall. Here's the wall." It earns the right to add to it.

**The four wings** (curated walk through the live Hall — pick 2–3 hero entries per wing):
- **The podium wing.** 1968 Mexico City — Smith & Carlos, raised fists; Peter Norman wears the
  OPHR badge in solidarity. The uniform and the podium become a protest surface. The origin.
- **The kit wing (the direct ancestors).** Hummel's **toned-down Denmark kit, Qatar 2022** — a
  kit-maker protesting a World Cup *through the kit itself*, a black third "the colour of
  mourning." The OneLove armband (banned), Germany covering mouths, Iran refusing the anthem.
  *This is the closest living precedent to what we did.*
- **The club-as-protest wing.** FC St. Pauli — skull and crossbones, anti-fascist by identity;
  Dulwich Hamlet. Proof a football club can *be* a stance — the permission structure for
  "Pump & Dump FC" existing at all.
- **The Vancouver wing.** Adbusters (culture jamming, **born here, 1989**); the Cowichan
  sweater vs. the Olympic knockoff (whose culture gets sold); Ilanaaq 2010; "No Olympics on
  Stolen Native Land." The last time this city hosted the world and swept the people. Carries
  the **"could only come from here"** spine.

**The hinge (into Movement IV):** *every kit we made is the next entry on this wall.* The hall
is the setup; Pump & Dump FC is the piece that belongs on it. Say it out loud.

**Live demo:** `/hall-of-fame` — filter live through the four wings (the new **Vancouver**
thread does the last one in one click).
**Deck slides:** 3 (the wall, a dense contact-sheet of precedents), 4 (the four wings, one hero
image each), 5 (the hinge line over a blank kit silhouette).

---

## Movement III — The Process (voice → receipt)

**Job:** Show the method. This is the part the trailer doesn't tell and the part a hackathon
room actually wants: how a point of view became a coherent product line. It does double duty —
the design-track making-of **and** the dev-track proof-of-system.

**The thesis to land:** *the human bookends the machine.* Voice is the input; judgment is the
output gate; AI is the accelerant in the middle. Provenance in, curation out. That's the
anti-slop stance made literal.

**The seven stages** (walked on **one** kit — the hero — so the room watches a jersey get made):

1. **Voice** — the stance, not a prompt. Settler artist, punch up not down (`brand-system.md`;
   `submission-brief.md` Q4).
2. **Idea** — the voice fans into nine FCs, one Vancouver wound each
   (`docs/design/clubs/pump-and-dump-fc.md`).
3. **Prompts** — the stance encoded: the `moodboard / graphic-elements / jersey-flats` sets.
4. **Moodboards** — direction (navy + toxic teal + magenta; banknote + prospectus DNA).
5. **Graphic elements** — the kit-of-parts: crest, sponsor bar, nameplate, hem citation.
6. **Flats** — the jersey, front and back.
7. **The decision** — `/tracker`: rate the 246, kill the misses, lock the winners into the tech
   pack (`docs/design/kits/MO-09-pump-and-dump.md`). *Curation is the human judgment gate.*

**Live demo:** `/process` (the 7 stations with the real curated images) → `/tracker` (the
curation act, the dev-track payoff).
**Deck slides:** 6 (the pipeline, one strip, voice→receipt), 7 (the same kit at each stage —
the transformation is the proof), 8 (the human-bookends-the-machine thesis).

---

## Movement IV — The Concepts (the work, finally)

**Job:** The reveal, now landing with full weight. Hero first, then the system.

**Beats**
- **Pump & Dump FC** — the blackout "city pride" third kit that resolves into a prospectus the
  longer you look. TV read vs. street read. The crest (ball / candlestick / condo stack), the
  sponsor bar (`PUMP & DUMP CAPITAL` / `WE WIN IF YOU LIVE HERE OR NOT`), roles not names
  (`DEVELOPER` / `FLIPPER` / `LANDLORD` / `RENOVICTOR`), the nameplate that names the public:
  **BAGHOLDER**.
- **Then the collection** — one of nine kits on the same repeatable move. A receipts engine,
  not a t-shirt. Lead with the one; show the system once.
- **Why you'd wear it** (Q4): pride = refusing the souvenir. *Everyone else makes the
  celebration jersey. This one makes the receipt.*

**Live demo:** `/` HeroKits (code-drawn flats) → `/engine` (the Receipts Engine — one receipt
in, three branded artifacts out — the dev-track closer).
**Deck slides:** 9 (hero front/back), 10 (the 9-up collection), 11 (Q4, the pride line).

---

## The close

End on the provocation, not a thank-you slide. **"The part that doesn't fit on a souvenir."**
Optional: a QR to the live site. The four brief questions (Q1–Q4) are all answered across the
movements — Q1 in I, Q3 in II, process/novelty in III, Q2 + Q4 in IV.

---

## Fact-check gate (before this is shown publicly)

Same discipline as the receipts — a wrong fact on the wall hands a skeptic the win.
- Every on-screen number traces to `src/data/receipts.js` or a cited primary source.
- Carried `[confirm]` items: **R-HOGANS** (Hogan's Alley framing), the **MADE ON SILENCE**
  FOI framing, MO-09 spec flags. None block the structure; all block publish.
- Hall of Fame: verify each added **Vancouver** entry's date (Adbusters 1989, Tent Village 2010).
- IP: no real FIFA / club / brand / sponsor mark anywhere. We *evoke* the grammar; we never
  reproduce a real mark.

## What feeds each movement (assets)

| Movement | Live section | Image source |
|---|---|---|
| I — Claim | `/` hero | site hero / territorial statement |
| II — Hall of Fame | `/hall-of-fame` | `public/hall-of-fame/*` (26 rights-cleared) |
| III — Process | `/process`, `/tracker` | `public/process/*` (curated heroes) |
| IV — Concepts | `/` HeroKits, `/engine` | code-drawn flats + `public/process/*` |
