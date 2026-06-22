# Vancouver Made — submission status

Handoff snapshot of the MADE ON / Nardwuar submission and where everything lives.

## Outcome (won)

**Double silver at Vancouver Made — BCIT Tech Collider, June 20 2026.** Second place in both
tracks: the Devin Open Hackathon (2nd of ~100, $300) and the Formmé Fashion Design challenge
(2nd of ~50, five kits manufactured). The winning kit is this Nardwuar FC "Deep Cut." Full
write-up, certificates, ceremony photos, and share assets: `AWARDS.md` and
`deliverables/awards/PRESS-KIT.md`. Production of the five jerseys is now with Kris + Formmé.

## The submission

**Nardwuar FC — "Deep Cut" Vancouver-tartan kit** (the Designathon hero), in three colorways:
**red (Home, the one turned in) · black (Away) · white + gold-foil (Limited).**
Homage to Nardwuar the Human Serviette — research as protest, the receipt on the hem.
**Homage, not likeness:** carried through objects (tam, mic, records), never his face; Nardwuar
merch stays `blessing-pending` until he blesses it.

Copy (one-liner / short / long) is in the project notes; tech pack is the source of truth below.

## Where it lives

| Asset | Path |
|------|------|
| Tech pack (materials, BOM, 3 colorways, receipts) | `docs/design/kits/NW-01-nardwuar-vancouver.md` |
| Final kit flats (17, red/black/white) | `docs/design/prompts/clubs/nardwuar-fc/rafiki/images/run-20260620-154408/` *(local; gitignored)* |
| Presentation finale reel (18, ordered) | `docs/deliverables/nardwuar-presentation/` |
| Catalog montages (family board, product cards, hero sheet) | `docs/design/prompts/clubs/nardwuar-fc/supporting/catalog/` |
| Deck store contact-sheet (25 products) | `docs/deliverables/store-sheet.png` |
| Lifestyle / team / goal / action / derivatives | rafiki `images/run-2026062*` *(local; gitignored)* |
| Build viewers | rafiki `images/viewer.html` per concept |

> Rafiki-generated images stay local (gitignored as heavy binaries). Prompts, tech pack,
> curated deliverables, and the in-app store are tracked.

## In the app (pitch site)

- `/store` — tightened catalog (compact cards, dense 2–5 col grid), 25 products.
- `<ProductStrip>` — store woven into the **home page** and **`/process`** (not a siloed tab).
- `/wall` — "THE DEVELOP" generative montage of all the design work (parallel build).

## Queued / not done

- **Shopify draft store** — not started. Behind the merch/likeness gate (drafts only, nothing
  sold until Nardwuar's blessing). The store data (`src/data/products.js`) is already
  Shopify-shaped for when it's built.

## Generation

All imagery via **Rafiki → Nano Banana Pro** (`gemini-3-pro-image-preview`) @ 1K. Two custom
Rafiki styles shipped to that repo: `n5orange`, `nardwuar`.
