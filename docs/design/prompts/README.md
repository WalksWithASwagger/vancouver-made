# MADE ON: Midjourney prompt library

Image-generation prompts for the full **MADE ON** collection. Nine kits, two racks, one argument. Each kit folder holds three files:

- `moodboard.md`: texture / material / atmosphere references (`--ar 4:5`)
- `graphic-elements.md`: extractable parts: pattern, crest, sponsor bar, badge, nameplate, number, hem microtext, trophy-misuse mark (`--ar 16:9`)
- `jersey-flats.md`: front / back / side / colorways / full kit / detail shots (`--ar 3:4`)

Generated images feed the **Asset Tracker** at `/tracker` for rating + Notion sync.

## The kits

| # | Folder | Kit | The line |
|---|--------|-----|----------|
| 01 | `01-made-on-silence` | MADE ON SILENCE | Black bloc. The redacted document, worn. |
| 02 | `02-stolen-ground` | MADE ON STOLEN GROUND | The land receipt. Rent never paid. |
| 03 | `03-public-dime` | MADE ON THE PUBLIC DIME ★ | The banknote. $729M as couture. |
| 04 | `04-forsaken-twice` | FORSAKEN TWICE | The VPD failure, in Oppal's own words. |
| 05 | `05-access-all-areas` | ACCESS: ALL AREAS | (unless you live here). The 2010 sweep, again. |
| 06 | `06-low-900s` | STARTING FROM THE LOW $900s | Gentrification sold back as a pre-sale. |
| 07 | `07-public-health-emergency` | PUBLIC HEALTH EMERGENCY | Ongoing. A memorial, not a sneer. |
| 08 | `08-smart-city` | SMART CITY | Surveillance as a terms-of-service. |
| 09 | `09-pump-and-dump` | PUMP AND DUMP ★ | The whole grift, worn as the prospectus. |

★ = flagship.

## Companion clubs (ALLEY LEAGUE)

Two deep-dive concepts that live alongside the 9 (data in `../../../src/data/clubs.js`,
briefs in `../clubs/`). Full prompt sets, each with the home/away/third family.

| Folder | Club | No. · Hero | The line |
|--------|------|------------|----------|
| `clubs/nardwuar-fc` | NARDWUAR FC | 97 · HOME | Research is the protest; the receipt is the weapon. |
| `clubs/number-five-orange` | NUMBER FIVE ORANGE | 5 · AWAY | The whole city becomes a VIP room. |

**Two hard constraints (from `clubs.js` ethics):** Nardwuar is an **homage, not a
likeness** — no face/portrait in any prompt. No.5 must **punch up, never caricature the
workers** — human figures stay abstract silhouettes.

## House-style recipe (replicate exactly)

The method, on every prompt: **mimic the official polish · invert the payload · bake in the receipt.** Each kit should look like FIFA *almost* approved it. Then read as an indictment up close.

- **Settings:** `--style raw`, **no `--v` flag.** White background on every flat and graphic-element prompt.
- **Aspect ratios:** jersey flats `--ar 3:4` · mood boards `--ar 4:5` · graphic elements `--ar 16:9`.
- **Colors inline** as hex where the spec gives them, plus descriptive names ("banknote green", "toxic teal").
- **Register:** "technical flat-lay fashion illustration", "professional sports apparel", "ready for production / production-ready mockup", "official [badge / seal / sponsor] aesthetic". Avoid "photo-realistic".
- **Receipt on the hem:** every kit carries a public-record citation as fine microprint. Cross-check the exact figures against `../../../src/data/receipts.js` before generating. No stat drifts from the source.
- **No borrowed sacred imagery.** The payload is the coloniser's own paperwork: the receipt, the redaction, the banknote, the accreditation laminate, the term sheet.

## Sensitivity notes

Kits **02 (unceded land)**, **04 (the missing and murdered women)**, and **07 (the overdose crisis)** are about real, ongoing harm. They are **memorials, not punchlines**: restrained palettes, no neon, no irony, source quotes verbatim. Tone is directed by Kris before generation.

## Source of truth

- `../../../src/data/heroKits.js`: full specs for 01, 03, 09
- `../../../src/data/collection.js`: the 9-kit lineup + brand palette
- `../../../src/data/receipts.js`: the public-record receipts
- `../../../src/data/clubs.js`: deep-dive method cards
- `../../../src/brand/tokens.js`: palette + canon slogans
