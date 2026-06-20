# Receipts engine: /engine

Source: `src/components/ReceiptsEngine.jsx`, `src/data/receipts.js`, `src/data/voices.js`.

## What it is

One civic receipt, said three ways. The sidebar lists the receipts; pick one and the three voice panels update live. Each panel represents a different publication surface:

- **MADE ON / the hem.** Dense all-caps monotype, the format of a kit maker's hem citation. Same register as the source acknowledgements on the garment itself.
- **FEEFA / the poster.** Big number, the charge, a brand stamp. Pastes the bill up like a poster nobody approved. Links out to `feefa.ai`.
- **World Cup Fashion Cake / the editorial.** Lowercase, lyrical, "captioned like evidence." Links out to `world-cup-fashion-cake.vercel.app`.

All three use the same receipt object. The source attribution comes through on every panel.

## Where receipts live

`src/data/receipts.js`. Five receipts at time of writing:

| id | stat | what it covers |
|----|------|----------------|
| R-COST | $685M-$729M | gross BC cost for seven World Cup games |
| R-PRIVATE | public vs private | BC went nearly 100% public; California cities mostly private |
| R-FORSAKEN | "forsaken twice" | Oppal inquiry finding on DTES women and the VPD |
| R-2010 | doubled | homelessness in Vancouver doubled before the 2010 Olympics |
| R-HOGANS | Hogan's Alley | Black neighbourhood paved for the viaduct fans cross today |

Each receipt has: `id`, `stat`, `claim`, `detail`, `source`.

## How the voice transforms work

Three named functions in `src/data/voices.js`, each taking a receipt object and returning a shape the panel renders directly:

- `madeOnHem(r)` returns `{ label, body, source }`. Body is `stat + claim + detail` uppercased and separated by middots.
- `feefaPoster(r)` returns `{ big, charge, stamp, brand, source }`. The `big` field is `r.stat` raw; `charge` is `r.claim` sentence-cased.
- `fashionEditorial(r)` returns `{ caption, coda, source }`. Caption is `r.stat` + `r.claim` lowercased in prose form.

None of the transforms mutate the receipt. They read from it and return a new shape.

## How to add a new receipt

1. Add an entry to the `receipts` array in `src/data/receipts.js`. Give it a unique `id` starting with `R-`, and fill in `stat`, `claim`, `detail`, and `source`.
2. That is all. The engine picks up every receipt in the array automatically. All three voice panels render the new receipt the same way they render the existing ones.

Keep every `source` field honest. The whole point is that the citation travels with the number.
