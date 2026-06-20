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

Library baseline (prompts written): **01,03,05,06,08 = 24 each · 09 = 34 · 02,04,07 = not written (issue #8).** Generated so far: **33 distinct prompts** (32 in 09, 1 in 01).

### Prioritized "generate next"
1. **Finish 09** (the flagship, 2 prompts left): `graphic-elements#13` (teal→magenta stripe trim) and `graphic-elements#14` (hem microprint receipt — the actual citation line). Quick win to a complete kit.
2. **03 PUBLIC DIME** — flagship, **nothing generated.** Run its full set (banknote-green guilloché, BANK OF FIFA, the $729M denomination). 24 prompts ready in `03-public-dime/`.
3. **01 SILENCE — beyond the moodboard.** Only the FOI texture exists. The actual matte-on-matte **redaction jersey** (flats + graphics) — the point of the kit — is ungenerated. Run `01-made-on-silence/{graphic-elements,jersey-flats}.md`.
4. **05 / 06 / 08** — prompts written, never run (Access laminate, condo pre-sale, surveillance). 24 each.
5. **02 / 04 / 07** — prompts not written yet; gated on tone sign-off (issue #8) before generating.

### Coverage at a glance
- **09:** 32/34 ✓ (missing graphic #13, #14)
- **01:** 1/24 (moodboard #1 only)
- **03, 05, 06, 08:** 0 / 24 each (prompts ready)
- **02, 04, 07:** 0 (prompts not written)

### Craft notes for the next batch
- Push the **candlestick pattern** to render as literal chart lines, not abstract marble (name it explicitly; reference "stock chart candlesticks, thin lines").
- For **01**, make redaction bars dominant.
- Text marks (sponsor, nameplate, badges) are coming out clean — keep those prompts as-is.
