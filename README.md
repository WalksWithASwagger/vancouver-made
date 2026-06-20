# VANCOUVER MADE · **MADE ON**

**A protest collection. Not a sponsor.**

> **They asked for the Vancouver story. We finished the sentence.**
> *Made on stolen ground. Made on Hogan's Alley. Made on $729 million of public money.*

**MADE ON** is a FIFA-World-Cup-2026 protest kit collection (BCIT Tech Collider).
Everyone else made a souvenir; we made the **receipt**. Nine kits, two racks, one
argument — rebuilding the tournament's official visual language (kits, crests,
sponsor bars, kit-maker spec type) and **inverting the payload**, with every factual
claim carrying its citation *on the hem*. A settler artist's refusal to make the
celebration jersey: no borrowed sacred imagery — the coloniser's own paperwork
instead, the receipt, the redaction, the banknote.

— Kris Krüg · settler artist · unceded xʷməθkʷəy̓əm, Sḵwx̱wú7mesh, səlilwətaɬ territory

> Not a protest about AI. AI is just the brush. The subject is greed, displacement,
> and who pays the public bill.

**Canonical deliverables:** `docs/deliverables/` (board, pitch deck, tech pack).
**Design from:** `docs/research/analysis/SYNTHESIS.md` + `analysis/04-made-on-consolidation.md`.

---

## What's in here

| Path | What it is |
|------|------------|
| `docs/deliverables/` | **Canonical artifacts** — board (PDF), pitch deck (PPTX), tech pack (PDF) |
| `src/` | The pitch site — React + React Three Fiber, mirrors the deck top-to-bottom |
| `src/data/collection.js` | The MADE ON brand + the 9-kit / two-rack lineup |
| `src/data/receipts.js` | The public-record receipts (the spine), `[confirm]`-tagged |
| `src/data/heroKits.js` | Full hero-kit specs (01 Silence · 03 Public Dime · 09 Pump & Dump) |
| `src/data/clubs.js` | Deep-dive method cards (No.5 · Nardwuar · Pump & Dump) |
| `src/components/` | `Collection`, `HeroKits`, `KitFlat` (code-drawn jersey flats), `Clubs`, `Crest` |
| `src/scene/` | The R3F "World Portal" hero scene |
| `src/brand/tokens.js` | Shared site tokens (colors, type, the MADE ON slogan/marquee bank) |
| `docs/research/` | Knowledge base: all source docs + analyses + the synthesis |
| `docs/design/kits/` | Filled tech-pack briefs (MO-01, MO-03, MO-09) |
| `docs/design/clubs/` | The three deep-dive concept briefs |

**Start here to design:** `docs/research/analysis/SYNTHESIS.md` and
`docs/research/analysis/04-made-on-consolidation.md`. Research index:
`docs/research/KNOWLEDGE-BASE.md`.

## Run the portal

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

Stack: **Vite · React 18 · React Three Fiber · drei · Tailwind CSS**.

Building on it, or running the Midjourney asset tracker at `/tracker`? See
`DEVELOPMENT.md`.

## The collection in one breath

- **Brand:** VANCOUVER MADE → **MADE ON** — *They asked for the Vancouver story. We finished the sentence.*
- **9 kits, two racks:** *MADE ON* (Silence · Stolen Ground · Public Dime) +
  *STREET SERIES* (Forsaken Twice · Access: All Areas · Low $900s · Public Health
  Emergency · Smart City · Pump and Dump).
- **Heroes built:** 01 Made on Silence · 03 Made on the Public Dime ★ · 09 Pump and Dump.
- **Method:** mimic the polish → invert the payload → **bake the citation on the hem**.
- **Closer:** *The part that doesn't fit on a souvenir.*

## Working principles

1. **Punch up, never down.** Institutions are the target; the displaced are the home team.
2. **The receipt is the craft.** Every claim on a garment carries its source. The
   site flags unverified stats `[confirm]` — verify before final publish.
3. **The land acknowledgement is substance, not decoration.** Made on unceded
   xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh (Squamish), səlilwətaɬ (Tsleil-Waututh) territory.
4. **No borrowed sacred imagery.** Critique colonial *systems* with their own paperwork.

## Status

- [x] Knowledge base: 8 source docs imported + analyzed + synthesized
- [x] Canonical direction consolidated to MADE ON (board / deck / tech pack in repo)
- [x] Pitch site mirrors the deck: hero → territorial statement → collection +
      receipts wall → hero kits (code-drawn flats) → deep-dive method
- [x] Three hero kits spec'd; tech-pack briefs filled (MO-01 / 03 / 09)
- [x] Builds clean (`npm run build`)
- [x] Raster kit mockups generated (Canva) — `docs/deliverables/mockups/` (pull the
      stray Nike swoosh before publishing; see the mockups README)
- [ ] Verify the `[confirm]` receipts against primary sources
- [ ] Deploy to a live URL (Vercel) for a demo QR
