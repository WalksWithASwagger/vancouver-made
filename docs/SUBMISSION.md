# Submission status — both tracks

BCIT Tech Collider · Vancouver Made. Two tracks: a **Designathon** (the jersey) and the
**Devin Open Hackathon** (the AI pipeline). This is the live status + punch list.

> **Submission mechanics / deadline:** _TBD — owner to fill in_
> (portal/form, video?, slide limit, file formats, due date/time, per track.)

Owner tags: **[me]** = in-repo, done by the build · **[you]** = needs you / design tools.

---

## Track 1 — Designathon (the jersey)

**Deliverables:** one hero jersey + a short (~5 min, 8-slide) presentation.
**Judged on:** idea strength · explanation · **specificity** · Vancouver-uniqueness · "reads
without a caption." Framed by the Four Questions ([`design/submission-brief.md`](design/submission-brief.md)).
**Hard rule:** no real FIFA / club / brand marks (evoke, never reproduce).

| Criterion | Proof | Status |
|-----------|-------|--------|
| Strong, specific idea | Pump & Dump FC — the mega-event as a pump-and-dump; locked Four Questions | ✅ |
| Reads without a caption | Code-drawn hero flats (`KitFlat.jsx`) on the live site; tech pack `kits/MO-09` | ✅ on-site; ⚠️ photoreal render still swoosh'd |
| Vancouver-specific | VSE "Scam Capital" (Forbes 1989), Howe St, ~12× price-to-income, $729M bill — all cited | ✅ |
| Explanation / deck | `presentation/presentation-flow.md` (8 slides) + `talk-flow.md` | ✅ written |
| No real marks | Counterfeit-official system only (`clubs/README.md` rule) | ✅ |

**Remaining**
- **[you]** `deck.html` image slots are placeholders — drop in the final jersey/mood imagery
  (or present off the live site instead of the HTML deck).
- **[you]** _(de-scoped)_ Nike swoosh on the Canva hero renders — not blocking per your call.
- **[me]** ✔ Stale `20–30×` price-to-income corrected to `~12× (Demographia 2025)` across all
  presentation/design docs (matches the live data).

---

## Track 2 — Devin Open Hackathon (the pipeline)

**Deliverable:** a live AI pipeline — the Receipts Engine + three counter-spectacle surfaces.
**Criteria** ([`src/data/rubric.js`](../src/data/rubric.js)): novelty of process & output ·
best Vancouver narrative · show your process · use of AI / tools.

| Criterion | Proof | Status |
|-----------|-------|--------|
| Novelty of process & output | Code-drawn kits from the same data as the tech pack; mimic→invert→cite | ✅ |
| Best Vancouver narrative | Cited receipts: unceded land, Hogan's Alley, $729M (`/` + receipts wall) | ✅ |
| Show your process | **Receipts Engine** `/engine` (1 receipt → 3 voices) + `/process` page | ✅ live |
| Use of AI / tools | FIFA system rebuilt with AI, disciplined by cited public records | ✅ |

**Three surfaces — all LIVE**
- MADE ON — https://vancouver-made.vercel.app
- feefa.ai — https://feefa.ai _(project `feefa-ai`, auto-deploys)_
- world-cup-fashion-cake — https://world-cup-fashion-cake.vercel.app _(auto-deploys)_

The Receipts Engine (`/engine`) cross-links all three. On-site "Why It Wins" maps each criterion
to its proof.

**Remaining**
- **[me]** ✔ `dev-pitch.md` lists the three live URLs and maps the build to the 4 criteria.
- **[you]** Confirm submission packaging (demo video? repo link? write-up?) once mechanics are known.

---

## Cross-cutting (done this pass)
- **[me]** Docs audit: HANDOFF/DEPLOY/README/DEVELOPMENT updated to the live, on-`main` reality;
  added this file + [`README.md`](README.md) docs index.
- **[me]** Receipts verified; `[confirm]` flags cleared; the one credibility stat fixed.

## The two open asks for you
1. **Drop in the submission mechanics + deadline** at the top of this file.
2. **Final deck imagery** (or decide to demo live instead of `deck.html`).
