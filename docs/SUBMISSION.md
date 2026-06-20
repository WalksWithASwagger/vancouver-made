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
- **[me]** ✔ `deck.html` now carries the approved jersey / mood / crest imagery (slides 1/2/5)
  plus the three-club montage. Present it (Cmd+P to PDF) or demo off the live site.
- **[you]** _(de-scoped)_ Nike swoosh on the Canva hero renders. Not blocking per your call.
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

## Cross-cutting (done earlier)
- **[me]** Docs audit (#24): HANDOFF/DEPLOY/README/DEVELOPMENT to the live, on-`main` reality;
  added this file + [`README.md`](README.md) docs index.
- **[me]** Receipts verified; `[confirm]` flags cleared; the one credibility stat fixed.

## Closeout pass (this round)
- **[me]** ✔ Deck imagery wired: `deck.html` carries the approved jersey / mood / crest art
  (slides 1/2/5) + the three-club montage. Not placeholders anymore.
- **[me]** ✔ Deleted superseded docs (`design/jersey-kit.md`, `presentation/deck-outline.md`);
  added a brand-system palette note (site tokens vs. print palette; code is source of truth).
- **[me]** ✔ Full feature docs: SITE-GUIDE, PROCESS, RECEIPTS-ENGINE, HALL-OF-FAME,
  CURATION-WORKFLOW (linked from the docs index).
- **[me]** ✔ QA: `npm run build` clean; live `/`, `/engine`, `/process` screenshot-checked
  (render clean, no console errors, deploy public). `/hall-of-fame` assets verified; `/tracker`
  is a local-only tool (needs the API). 5 routes, no broken links, no browser `process.env`.

## Expansion assessment (PR #22) — recommendation: FREEZE MAIN
PR #22 (Hogan's Alley MO-10 + Store + Highlight Reel + China Creek) is draft, CONFLICTING,
+2,799/−131 over 84 files, with a "park for review" commit. Per piece:
- **Hogan's Alley MO-10: HOLD.** Open `[confirm]` flags on Black-displacement facts (Georgia
  Viaduct dates, the City–HAS MOU). The whole ethic is "cite the receipt." Do not ship until a
  primary source clears each flag. Non-negotiable.
- **Store / Highlight Reel: defer.** Self-contained, lower-risk, but unfinished (Store footer
  nav incomplete; reel audio file missing, degrades gracefully). Not needed to win.
- **China Creek: nice-to-have.**
Recommendation: ship `main` as the submission; treat PR #22 as post-deadline.

## Polish backlog (not blocking the main submission)
- **Em-dash sweep of page copy.** Swarm-written `src/data` copy (`hallOfFame.js` ~189,
  `kitGallery.js` ~119, `clubs.js`, `heroKits.js`) carries em-dashes in visible text, against the
  voice rule. Worth a dedicated contextual pass (like the docs voice pass) before any wide share.
- Hogan's Alley `[confirm]` sources (gates MO-10).
- Reel audio file; Store footer nav (only if those ship).
- Canva hero renders still carry a Nike swoosh (de-scoped by you).

## Open asks for you (to finish)
1. **Submission mechanics + deadline** — fill the placeholder at the top of this file
   (portal/form, video?, slide limit, formats, due time, per track).
2. **Rehearse** the ~5-min deck (`presentation/deck.html`, Cmd+P → PDF) or the live-site demo.
3. **Scope call** on the expansion (recommendation: freeze `main`).
