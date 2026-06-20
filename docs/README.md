# Documentation map — MADE ON / VANCOUVER MADE

Live site: **https://vancouver-made.vercel.app** (auto-deploys from `main`).
Submission status + punch list (both tracks): **[`SUBMISSION.md`](SUBMISSION.md)**.

## Operational (how the repo works)
- [`../README.md`](../README.md) — what this is, the collection in one breath, how to run it.
- [`../DEVELOPMENT.md`](../DEVELOPMENT.md) — run the site + asset tracker, the API, the file map.
- [`DEPLOY.md`](DEPLOY.md) — Vercel auto-deploy (connected; merge `main` → production).
- [`HANDOFF.md`](HANDOFF.md) — where the tech-pack work stands; pick-up notes.

## presentation/ — the pitch
- [`presentation-flow.md`](presentation/presentation-flow.md) — **design track**: the 8-slide /
  ~5-min submission flow (the "trailer"). **Start here for the design deck.**
- [`talk-flow.md`](presentation/talk-flow.md) — the 10-slide "director's cut" live talk.
- [`dev-pitch.md`](presentation/dev-pitch.md) — **dev track** (Devin Open Hackathon): the
  Receipts-Engine pipeline + three live surfaces, mapped to the 4 criteria.
- [`deck.html`](presentation/deck.html) — self-contained playable slides (image slots are placeholders).
- [`deck-outline.md`](presentation/deck-outline.md) — early outline. **Superseded** by the two flows above.

## design/ — brand, kits, clubs, prompts
- [`submission-brief.md`](design/submission-brief.md) — the locked **Four Questions** for the hero
  jersey (Pump & Dump FC).
- [`brand-system.md`](design/brand-system.md) — palette, type, logo/crest, voice.
- [`clubs/`](design/clubs/) — the **four** ALLEY LEAGUE deep-dive briefs (3 flagship + China Creek).
- [`kits/`](design/kits/) — filled tech-pack briefs (MO-01 / MO-03 / MO-09).
- [`prompts/`](design/prompts/) — the Midjourney prompt library + the `GENERATION-QUEUE.md` /
  `INGEST-REVIEW.md` runbooks (operational scratch for the generation work).
- [`jersey-kit.md`](design/jersey-kit.md) — early kit concept. **Superseded** by `clubs/` + `kits/`.

## research/ — sources → analysis → synthesis
- [`KNOWLEDGE-BASE.md`](research/KNOWLEDGE-BASE.md) — registry + research protocol.
- [`brief.md`](research/brief.md) — facts to confirm / threads.
- [`tech-pack-spec.md`](research/tech-pack-spec.md) — manufacturer-ready sizing/materials (source of truth).
- [`analysis/SYNTHESIS.md`](research/analysis/SYNTHESIS.md) — the single doc to design from.
- [`analysis/05-receipts-verification.md`](research/analysis/05-receipts-verification.md) — the
  fact-check pass (e.g. price-to-income corrected to ~12×).
- [`sources/`](research/sources/) — raw research, imported verbatim (read-only).

## deliverables/
- [`deliverables/`](deliverables/) — board (PDF), pitch deck (PPTX), tech pack (PDF), and
  `mockups/` (Canva hero renders — swoosh still to remove before publish).

## Source of truth (code, not docs)
The site reads from `src/data/`: `collection.js` (9 kits), `receipts.js` (the cited spine),
`heroKits.js` (01/03/09 specs), `clubs.js` (the 4 clubs), `rubric.js` (the dev-track criteria).
When a doc and the data disagree, the data wins.
