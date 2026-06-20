# Handoff — Vancouver Made / MADE ON

Last updated 2026-06-20. Where the work stands, so it's easy to pick up later.

> Active branch: **`claude/ingest-tracker-assets`** (not `main`). Multiple agents have been
> building the designathon submission here in parallel.

## Done (this thread: the tech pack)

The tech pack is a main deliverable. Built out and verified:

- **Sizing + materials research** is fully sourced in
  [`research/tech-pack-spec.md`](research/tech-pack-spec.md) — the single source of truth:
  size charts (jersey + shorts, garment + body, inch + cm, XS–3XL), grading, tolerances,
  BOM, decoration methods, finish feasibility, labels, construction, packaging, and a Formme
  pre-production checklist. Every number cited; estimates flagged `[confirm]`.
- **Silhouette decision = vary per kit.** Signature ¾ raglan; a clean sleeve where a kit needs
  an unbroken all-over print. Per-kit map:
  - MO-03 Public Dime → **long sleeve, set-in** (continuous banknote engraving)
  - MO-01 Made on Silence → **¾ raglan** (black-bloc, dope-dyed ground)
  - MO-09 Pump and Dump → **¾ raglan, boxy / blokecore**
- **Materials decision = sustainable-novel fibre**, reconciled with sublimation: ocean-bound
  recycled PET base (prints clean + tells the story), dope-dyed for dark grounds, ECONYL
  ghost-net as a tactile accent. "Material as message."
- **Code-drawn flats** ([`../src/components/KitFlat.jsx`](../src/components/KitFlat.jsx)) render
  long + ¾-raglan silhouettes (with raglan seam) per `kit.silhouette`; the back-number font
  auto-fits long denominations. Data in [`../src/data/heroKits.js`](../src/data/heroKits.js),
  surfaced in [`../src/components/HeroKits.jsx`](../src/components/HeroKits.jsx).
- **Per-kit tech packs** ([`design/kits/`](design/kits/)) MO-01/03/09 each carry silhouette +
  material + Sizing + BOM.

Verified: `npm run build` clean; all three hero flats render their assigned silhouette; numbers fit.

## Open / next (pick up here)

- [ ] **Re-export the deliverable PDFs** — [`deliverables/`](deliverables/) (`MADEON_techpack.pdf`,
  board, deck) are hand-authored and now lag the spec + flats.
- [ ] **Other 6 MADE ON kits** have no flats/packs yet (the 3 heroes are fully resolved by design).
- [ ] **Parked material options** (not chosen, kept in research): thermochromic reveal, premium
  engineered 3D-knit (Macron / Nike Aero-FIT), metallic gold. Revisit if elevating a hero kit.
- [ ] **Formme `[confirm]` list** — spec §10: strike-off, fibre sourcing, fluorescent-ink channel,
  metallic/gloss feasibility, raglan POMs on their block.
- [ ] **Branch → main** — decide whether to merge `claude/ingest-tracker-assets` into `main`.

## Broader branch context (other agents)

The same branch also holds the wider submission build: the Receipts Engine (`/engine`), ~246
Midjourney generations ingested + the asset tracker, and the submission deck. See `git log`.

## Run / verify

`npm run dev` → open `/` → scroll to "THE RECEIPTS, WORN" for the hero flats. Source of truth for
all specs: [`research/tech-pack-spec.md`](research/tech-pack-spec.md).
