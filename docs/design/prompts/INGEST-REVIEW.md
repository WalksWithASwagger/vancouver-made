# MADE ON — Generation Ingest & Review

Ingest, metadata, curation, and gap analysis for the Midjourney batch dropped in `to-ingest/`.

- **246 files · 72 jobs** (each job = one prompt run, up to 4 upscales `_0.._3`).
- Full per-file metadata: `ingest-manifest.json` (kit, batch, prompt, MJ job-id, quadrant, dimensions, filesize).
- Source images live in `to-ingest/` (git-ignored — 336 MB; never committed).

## What's actually in this drop

| Kit | Jobs | Files | Distinct prompts | Coverage |
|-----|-----:|------:|------------------|----------|
| 09 PUMP & DUMP | 66 | 222 | 32 of 34 | near-complete |
| 01 MADE ON SILENCE | 6 | 24 | 1 of 24 | moodboard #1 only |

> Note: the banknote-guilloché macros are **09's** moodboard #1 (PUMP & DUMP uses banknote DNA), not kit 03. **Kit 03 has zero generations.** Kits 02, 04, 05, 06, 07, 08 also have zero.

## Review it interactively

```bash
npm run db:init      # once, if src/db/ratings.db doesn't exist
npm run ingest       # load all 246 into SQLite (idempotent)
npm run server       # API on :3001
npm run dev          # Vite on :5173 — open /tracker
```
Images now render in `/tracker` (the old `file:///` bug is fixed — they stream from `/api/asset/:id/raw`). Filter by concept (`01` / `09`) and batch, rate, and the ratings persist for a later Notion sync.

---

## Selects (my curation)

Reviewed representative jobs across all 33 distinct prompts. Picks below are deck-ready; the rest are loaded in the tracker for your own rating. Cited by MJ job-id (find files in `to-ingest/`).

### ★ Heroes — lead the deck with these
- **Hybrid flat — towers + crash-rain** (`jersey-flats#6`, job `41b0a9a7`). The best jersey: navy body, white condo-tower skyline at the hem dissolving into market-crash "rain," gold sponsor band, teal cuff. Reads hypebeast at distance, indictment up close — exactly the brief. *Compare all 4 quadrants to pick the cleanest.*
- **Crest — clean split shield** (`graphic-elements#5`, job `09457f36`). Gold-framed shield: black condo towers left, white candlesticks right. Literal, modern, production-ready. The signature mark.
- **Sponsor bar** (`graphic-elements#6`, job `2ba8e54e`). "PUMP & DUMP CAPITAL," gold serif on navy — crisp and fully legible. Use as-is.
- **Nameplate** (`graphic-elements#9`, job `2ea04317`). "DEVELOPER" arched white on black with sleeve stripes — clean, real. (Run FLIPPER/LANDLORD/RENOVICTOR variants from the same prompt.)

### Keep — strong supporting
- **Back flat — "DEVELOPER" + glitch number** (`jersey-flats#2`, job `c52f7fce`). Data-decay number reads great.
- **Away colorway — teal chevrons** (`jersey-flats#4`, job `0bad434f`; 5 jobs to choose from). Classic 90s away-kit silhouette; jagged teal/magenta peaks double as a crash chart.
- **Ornate crest** (`jersey-flats#7`, job `1207c872`). Baroque gold sunburst version — alternative to the clean crest for a more "official heritage" feel.
- **Complete kit layout** (`jersey-flats#10`, job `4114ef8d`). Jersey + shorts + socks multi-view — the "full vision" slide.

### Maybe / needs a stronger re-roll
- **Front flat** (`jersey-flats#1`, job `068850e4`). The candlestick pattern rendered as abstract neon-marble, not literal charts — pretty but off-brief. Re-roll emphasizing *"all-over pattern of literal white candlestick chart lines, soaring then crashing."*
- **01 SILENCE — FOI document** (`moodboard#1`, 6 jobs). Good dense-document texture, but **under-redacted** — needs the black bars to dominate. Re-roll with *"70%+ of the text hidden behind solid black redaction bars."* This kit's whole payload is the redaction; current outputs read as "document," not "censored."

---

## Generation gaps — what we're missing

**Updated after the 2nd Midjourney drop** (now 583 files / 157 jobs in `ingest-manifest.json`).
Library baseline (prompts written): **01,03,05,06,08 = 24 each · 09 = 34 · 02,04,07 = not written (issue #8).**

The 2nd drop filled the big holes: **03 Public Dime** (full set), **01 Silence** (full graphics + flats + dominant-redaction mood), and **09**'s last two (#13/#14). Curation → `STORE-CANDIDATES.md` + `ALTERNATIVES.md`.

### Coverage at a glance
- **01 SILENCE:** ✓ generated (35 jobs) — heroes picked, see STORE-CANDIDATES.
- **03 PUBLIC DIME:** ✓ generated (39 jobs) — strongest set; **but the hem-receipt didn't render cleanly** (only job `7ec8da01`), re-roll/composite the hem.
- **09 PUMP & DUMP:** ✓ complete (62 jobs incl. #13 stripe + #14 hem).
- **05 / 06 / 08:** **0** — prompts written, never run (Access laminate · condo pre-sale · surveillance). 24 each. ← the remaining gap.
- **02 / 04 / 07:** **0** — prompts not written; gated on memorial-tone sign-off (issue #8).
- **unsorted:** 21 jobs (kit-ambiguous fronts/complete-kits/side/hem) disambiguated in curation; manifest tags them `concept:"unsorted"`.

### Prioritized "generate next"
1. **05 / 06 / 08** — the only ready-but-ungenerated kits. Run their full sets.
2. **03 hem-receipt** re-roll (the one missing piece of the otherwise-complete flagship).
3. **02 / 04 / 07** — write the memorial prompts first (needs KK's tone direction, issue #8).

### ⚠️ Trademark — exclude from store + deck
- **03 moodboard#5** — reproduces the real FIFA wordmark + crest.
- **01 graphic#6** REDACTED nameplate, job `01713310` — reproduces real adidas 3-stripes.

### Craft notes
- The **candlestick pattern** still skews abstract-marble on some fronts — name "literal stock-chart lines."
- Some **01** mood/pattern plates are under-redacted (read as "document"); the bars must dominate ~70%+.
- A few text strings garbled ("PPUBLIC", "WITHELD") — re-roll those specific tiles.
- Text marks (sponsor bars, badges, nameplates) mostly clean — keep those prompts as-is.
