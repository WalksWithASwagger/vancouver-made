# Submission — both tracks · 🥈🥈 RESULTS: DOUBLE SILVER

BCIT Tech Collider · Vancouver Made. Two tracks: a **Designathon** (the jersey) and the
**Devin Open Hackathon** (the AI pipeline). **The competition is over — we placed 2nd in both.**

> **🥈 Devin Technical Hackathon — 2nd of ~100 ($300).**
> **🥈 Formme Design Challenge — 2nd of ~50 (prize: Formme produces 5 of the jerseys).**
> Full record: [`AWARDS.md`](AWARDS.md). Submission-mechanics/deadline items below are now
> historical — kept for the record, no longer action items.

The detail below is preserved as the as-submitted record of what each track delivered.

---

## Track 1 — Designathon (the jersey)

**Deliverables:** one hero jersey + a short (~5 min, 8-slide) presentation.
**Judged on:** idea strength · explanation · **specificity** · Vancouver-uniqueness · "reads
without a caption." Framed by the Four Questions ([`design/submission-brief.md`](design/submission-brief.md)).
**Hard rule:** no real FIFA / club / brand marks (evoke, never reproduce).

**Hero jersey: NARDWUAR FC — "DEEP CUT"** (red / Home, Vancouver tartan).
Tech pack: [`design/kits/NW-01-nardwuar-vancouver.md`](design/kits/NW-01-nardwuar-vancouver.md).
Submission imagery: [`deliverables/nardwuar-presentation/`](deliverables/nardwuar-presentation/)
(18-image finale reel; a top-5 flat + lifestyle cut is the export set).

| Criterion | Proof | Status |
|-----------|-------|--------|
| Strong, specific idea | Nardwuar FC — a World Cup home kit as a walking archive of Vancouver's underground; *research is the protest, the receipt is the weapon*; locked Four Questions | ✅ |
| Reads without a caption | Red Vancouver-tartan kit, WHO BENEFITS? WHO PAYS? across the chest; rendered flats + lifestyle (`nardwuar-presentation/`) | ✅ |
| Vancouver-specific | Nardwuar the Human Serviette (CiTR/UBC, The Evaporators); APEC 1997 pepper-spray question; the city's underground music canon — all cited (`clubs.js` AL-NW-001/002) | ✅ |
| Explanation / deck | `presentation/presentation-flow.md` (8 slides) + `talk-flow.md`; finale reel `nardwuar-presentation/` | ✅ written |
| No real marks / ethics | Counterfeit-official system only; homage carried through objects (tam, mic, records, press pass) — never Nardwuar's likeness or name-as-merch (`kits/NW-01` ethics gate) | ✅ |

**Remaining**
- **[me]** ✔ Submission imagery rendered clean (Rafiki / Nano Banana Pro) — no brand marks on the Nardwuar renders.
- **[you]** If this moves past exhibition toward sale / merch: get Nardwuar's blessing first (homage ethics, `kits/NW-01`).
- **[note]** An earlier draft named **Pump & Dump FC** as the hero jersey; superseded by the Nardwuar "Deep Cut" submission (`deliverables/nardwuar-presentation/README.md`). Pump & Dump remains a built companion kit (`kits/MO-09`).

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

## Post-competition — the expansion all shipped
The pre-deadline "freeze main" call (PR #22: Hogan's Alley + Store + Highlight Reel + China Creek)
is resolved. After the win, every piece landed on `main` and is live: the Store, the Highlight Reel,
China Creek, and **Hogan's Alley FC** (`/kit/hogans-alley-fc`) — the latter built as a quiet memorial
page once its facts cleared primary sources (Georgia Viaduct razed 1970 / opened 1972; the 2022
City–Hogan's Alley Society MOU). The em-dash sweep of page copy shipped (#28). All five kit worlds are
live and epic #56 is closed.

Current state lives in [`deliverables/SUBMISSION-STATUS.md`](deliverables/SUBMISSION-STATUS.md),
[`AWARDS.md`](AWARDS.md), and [`ROADMAP.md`](ROADMAP.md).
