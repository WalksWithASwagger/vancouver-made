# Analysis: Alley League for Vancouver Made (ChatGPT, 23pp)
**Source:** [08-chatgpt-alley-league-vancouver-made.md](../sources/08-chatgpt-alley-league-vancouver-made.md)  
**Analyzed:** 2026-06-20

---

## What This Document Is

This is a purpose-built strategy brief for the Vancouver Made designathon — not a general concept exploration. It differs from the earlier Alley League source (02) in that it is explicitly judge-optimized: it maps every element to the Luma judging criteria, provides a risk register, a deliverables checklist with file names, quick-build plans by time budget, a 30-second commercial storyboard, and 30 image generation prompts across three render modes. It is the closest thing in the research stack to an execution playbook.

---

## What's New vs. Source 02

| Dimension | Source 02 (general Alley League) | Source 08 (Vancouver Made brief) |
|-----------|----------------------------------|----------------------------------|
| Frame | protest design system overview | judge-ready submission strategy |
| Hero concept | four co-equal lead clubs | Pump & Dump FC only; rest as expansion proof |
| Judging alignment | implicit | explicit matrix mapping criteria → deliverables → proof |
| Deliverables | conceptual | named files, file formats, must-have vs. nice |
| Production specs | none | full tech pack, flat dimensions, care label copy |
| Visual prompts | none | 30 prompts × 3 render modes |
| Build planning | none | three plans (Plan A/B/C) with time budgets |
| Risk register | broad ethics notes | formal table: risk / likelihood / impact / mitigation |
| Source cards | mentioned | 12 sample entries with claim / source / visual token / suggested use |

Source 08 supersedes Source 02 as the operational document. Source 02 remains useful for the broader Alley League universe and its deeper research narrative.

---

## Core Strategic Moves to Preserve

### 1. "We made the receipt" as the anchor line
The entire submission is built around one sentence: **They asked for a Vancouver kit. We made the receipt.** Every deliverable points back to this. It is the judge-facing handle and should appear verbatim on the title slide, the leave-behind, and the closing frame of the commercial.

### 2. Pump & Dump FC as the singular hero
The brief makes a clear call: do not present multiple clubs as equal. Use Pump & Dump FC as the fully-built flagship; show other clubs (Viaduct United, Security Theatre FC, etc.) as expansion-team crests only — proof that the system scales, not competing design concepts. This is the right call for time-constrained judging.

### 3. Source-card pipeline as the process proof
Vancouver Made scores process explicitly. The receipt→token→pattern→mockup→QR pipeline is the mechanism that turns a protest concept into a scorable submission. The process video (shot list is in the doc) is described as more important than the commercial for this reason.

### 4. Systems-first ethics as both moral and strategic framing
The red-team slide ("What we refused to do / What we used instead") is not just risk management — it is a positive positioning move. It distinguishes the work from shock merch and aligns it with Vancouver's own civic documentation practices.

---

## Design Tokens Confirmed

These are now production-ready and should flow into any design work:

**Palette:**
- Howe Street Black `#101012`
- Prospectus White `#F2F2EF`
- Penny Copper `#8C5C3F`
- OTC Pink `#F4BDC9`
- Halt Red `#C8102E`
- Filing Green `#224F42`
- Graphite Grey `#53565A`

**Type stack:**
- Headlines: Space Grotesk 700
- Kit numbers/names: Archivo Narrow 700
- Sponsor parodies/body: IBM Plex Sans Condensed 600
- Source cards/labels/QR: IBM Plex Mono 500

**Crest:** circular badge, deflating football as candlestick chart, broken arrow, piggy-bank crack, prospectus footer, halt bar. Ring text: PUMP & DUMP FC — VANCOUVER. Sub-mark: $VAN?

---

## Kit Names (Canonical)
- Home: **The Pump** — Prospectus White, rising chart striping
- Away: **The Dump** — Howe Street Black, crash bars
- Third: **Shell Game** — Graphite Grey + Filing Green, holding-company org chart
- Keeper: **Trading Halt** — Halt Red, black tape bars

---

## Gaps and Open Questions

### What the brief doesn't resolve
1. **Actual manufacturer.** The tech pack is placeholder spec until Formme or another production house supplies a jersey block. Size M sample dimensions are assumed, not confirmed.
2. **QR infrastructure.** The brief calls for QR codes linking to "a static HTML page or embedded PDF." That page doesn't exist yet. It needs to be built or hosted before any physical QR appears on a garment or card.
3. **The $VAN? ticker sub-mark.** Described but not rendered. Needs vector execution.
4. **Crest SVG.** Listed as deliverable `04_pump-dump-crest.svg` — not yet in the repo.
5. **Expansion club crests.** The brief says "mini crest grid" for the presentation slide. These need at least placeholder renders for Viaduct United, Security Theatre FC, etc.

### Risk items requiring active decisions
- **Hogan's Alley / Viaduct United:** the brief rates this "High" safe use but the research context (Black community displacement) requires careful handling. The brief correctly keeps it out of hero merch and assigns it to a secondary club. That boundary needs to hold in execution.
- **SRC-005 (MMIWG):** explicitly tagged "source wall only, not hero merch." This is a hard constraint.
- **SRC-008 (Cowichan):** explicitly tagged "no extraction for use." This is a hard constraint.

---

## What to Build Next (Priority Order)

Based on the brief's "minimal winning artifacts" framing:

1. **Pump & Dump FC crest SVG** — needed for everything else (jersey, packaging, cards)
2. **Home kit flat (front/back)** — `06_home-kit-flat-front-back.ai` — the hero deliverable
3. **Source-card wall** — `03_source-cards.csv` + `13_source-wall.pdf` — at least 6 of the 12 sample entries populated with real sourced claims
4. **Process board** — `12_process-board.png` — one visual showing the receipt→token→pattern→mockup→QR pipeline
5. **PDF deck** — `16_presentation.pdf` — the slide-by-slide template is fully specified; needs content drops

The away kit, third kit, scarf, merch ecosystem, motion piece, and fake store page are all "nice" until the above five exist.

---

## Relationship to Existing Repo Work

The existing [03-claude-visual-reference-library.md](../sources/03-claude-visual-reference-library.md) and [04-perplexity-three-concepts-buildout.md](../sources/04-perplexity-three-concepts-buildout.md) contain visual reference and concept buildout that predates this brief. The MADE ON consolidation (05–07) represents a different creative direction entirely.

This brief should be treated as the **active strategic document for Alley League / Pump & Dump FC**. If the project continues in that direction, Source 08 is the north star for deliverables, framing, and submission structure.

---

## One-Line Summary

Source 08 is the execution playbook for Pump & Dump FC at Vancouver Made: everything is named, specced, and mapped to judging criteria — the remaining work is production, not strategy.
