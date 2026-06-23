# VANCOUVER MADE · **MADE ON**

> 🥈🥈 **Double silver at BCIT Tech Collider 2026** — 2nd in the Devin Technical Hackathon
> (~100 entrants, $300) and 2nd in the Formme Design Challenge (~50 entrants; prize: Formme
> produces 5 of the jerseys). See [`docs/AWARDS.md`](docs/AWARDS.md).

**A protest collection. Not a sponsor.**

> **They asked for the Vancouver story. We finished the sentence.**
> *Made on stolen ground. Made on Hogan's Alley. Made on $729 million of public money.*

**MADE ON** is a FIFA-World-Cup-2026 protest kit collection (BCIT Tech Collider).
Everyone else made a souvenir; we made the **receipt**. Nine kits, two racks, one
argument: rebuild the tournament's official visual language (kits, crests, sponsor
bars, kit-maker spec type) and **invert the payload**, with every factual claim
carrying its citation *on the hem*. A settler artist's refusal to make the
celebration jersey: no borrowed sacred imagery. The coloniser's own paperwork
instead, the receipt, the redaction, the banknote.

Kris Krüg · settler artist · unceded xʷməθkʷəy̓əm, Sḵwx̱wú7mesh, səlilwətaɬ territory

> Not a protest about AI. AI is just the brush. The subject is greed, displacement,
> and who pays the public bill.

**Live:** https://vancouver-made.vercel.app (auto-deploys from `main`; see `docs/DEPLOY.md`).
**Canonical deliverables:** `docs/deliverables/` (board, pitch deck, tech pack).
**Design from:** `docs/research/analysis/SYNTHESIS.md` + `docs/research/analysis/04-made-on-consolidation.md`.

---

## What's in here

| Path | What it is |
|------|------------|
| `docs/deliverables/` | **Canonical artifacts**: board (PDF), pitch deck (PPTX), tech pack (PDF) |
| `src/` | The pitch site. React + Vite, mirrors the deck top-to-bottom |
| `src/data/collection.js` | The MADE ON brand + the 9-kit / two-rack lineup |
| `src/data/receipts.js` | The public-record receipts (the spine), `[confirm]`-tagged |
| `src/data/heroKits.js` | Full hero-kit specs (01 Silence · 03 Public Dime · 09 Pump & Dump). Nardwuar "Deep Cut" (the Designathon winner) lives in `clubs.js` + `data/directions/nardwuar.js`, served at `/kit/nardwuar-fc` |
| `src/data/clubs.js` | The 5 ALLEY LEAGUE clubs: Nardwuar · Number Five Orange · Pump & Dump · China Creek · Hogan's Alley |
| `src/data/directions/` | Per-direction "world" manifests + registry (`getDirection`) — the 5 immersive `/kit/:slug` landing pages |
| `src/components/` | `Collection`, `HeroKits`, `KitFlat` (code-drawn flats), `Clubs`, `Crest`, `DirectionPage` (the kit-world template), `SafeImage`, `Footer` |
| `src/brand/tokens.js` | Shared site tokens (the palette feeding Tailwind + the MADE ON slogan/marquee bank) |
| `docs/research/` | Knowledge base: all source docs + analyses + the synthesis |
| `docs/design/kits/` | Filled tech-pack briefs (MO-01, MO-03, MO-09) |
| `docs/design/clubs/` | The four deep-dive concept briefs (3 flagship + China Creek expansion) |
| `docs/design/prompts/` | Per-kit Midjourney prompt library (mood board / graphic elements / jersey flats) + the house-style recipe |
| `DEVELOPMENT.md` | How to run it, the asset tracker, the API, the file map |
| `docs/ARCHITECTURE.md` | React app structure, routing, data flow, deploy target |
| `docs/ROADMAP.md` | Forward plan: what's next after the competition |

**Start here to design:** `docs/research/analysis/SYNTHESIS.md` and
`docs/research/analysis/04-made-on-consolidation.md`. Research index:
`docs/research/KNOWLEDGE-BASE.md`.

## Run the site

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

Stack: **Vite · React 18 · React Router · Tailwind CSS**.

Building on it, or running the Midjourney asset tracker at `/tracker`? See
`DEVELOPMENT.md`.

## Highlight reel

A cinematic, auto-advancing showcase of the kits lives at **`/highlight-reel`**
(`src/components/HighlightReel.jsx`; beat sheet in `src/data/highlightReel.js`).
Full-hype cut — today's ALLEY LEAGUE club gens (Nardwuar · No.5 Orange · China
Creek) + flagships 03 Public Dime & 09 Pump and Dump. Flagships render the live
`KitFlat` SVG (swoosh-free); memorial kits 02/04/07 are intentionally out.

```bash
npm run stage:reel    # copy curated design images docs/ → public/highlight-reel/
npm run record:reel   # capture the page → dist/highlight-reel.mp4 (needs playwright + ffmpeg + dev server)
```

Drop an audio render at `public/highlight-reel/audio/reel.mp3` to score both the
page (muted-autoplay + tap-to-unmute) and the exported mp4. Two Suno-ready anthem
versions — terrace-punk and west-coast folk — live in `docs/presentation/anthem.md`.

## The collection in one breath

- **Brand:** VANCOUVER MADE → **MADE ON**. *They asked for the Vancouver story. We finished the sentence.*
- **9 kits, two racks:** *MADE ON* (Silence · Stolen Ground · Public Dime) +
  *STREET SERIES* (Forsaken Twice · Access: All Areas · Low $900s · Public Health
  Emergency · Smart City · Pump and Dump).
- **Heroes built:** 01 Made on Silence · 03 Made on the Public Dime ★ · 09 Pump and Dump.
- **Method:** mimic the polish → invert the payload → **bake the citation on the hem**.
- **Closer:** *The part that doesn't fit on a souvenir.*

## Working principles

1. **Punch up, never down.** Institutions are the target; the displaced are the home team.
2. **The receipt is the craft.** Every claim on a garment carries its source. The
   site flags unverified stats `[confirm]`. Verify before final publish.
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
- [x] **Live** at https://vancouver-made.vercel.app — auto-deploys from `main`, PRs get previews
- [x] Receipts verified against primary sources (`docs/research/analysis/05-receipts-verification.md`; `[confirm]` flags cleared)
- [x] Raster kit mockups generated (Canva), in `docs/deliverables/mockups/`
- [x] Cinematic highlight reel at `/highlight-reel` (+ `stage:reel`/`record:reel` mp4 pipeline, two Suno anthem versions)
- [x] Pull the stray Nike swoosh from the Canva mockups before publishing (see the mockups README)

See `docs/SUBMISSION.md` for the per-track (design + dev) submission status and punch list.
