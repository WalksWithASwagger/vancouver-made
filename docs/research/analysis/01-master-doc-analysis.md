# Analysis — Doc 01: Master Concept & Precedent

**Source:** `sources/01-master-concept-precedent.md` (283 lines, 41 references)
**Parsed:** 2026-06-20

---

## 1. What this document actually is

A near-complete creative bible for the protest kit. It's not raw research — it's a
synthesized concept document with: a design thesis, ethical guardrails, eight
fully-specified kit concepts, a precedent board, and a process/tooling strategy.
It is the strongest single input we have and should anchor the project.

It also **deepens the center of gravity** of our scaffold. My initial build framed
this as generic "FIFA greed + displacement" satire. This doc is far more specific
and local — grounded in named Vancouver histories — and stakes out a set of ethical
positions. The build can stay as edgy/provocative as the owner wants; what this doc
adds is the *specific local ammunition* to make the edge land on real targets.

## 2. The core thesis (refined)

> The jersey is a **message surface** — a counterfeit city-branding artifact that
> borrows official visual language (sponsor blocks, crests, league patches) to
> expose the systems of power and violence under the spectacle, rather than
> celebrate it.

Three operative moves:
1. **Uniform as protest poster** — camera-ready, broadcast-native dissent (lineage:
   Smith/Carlos '68, BLM warm-ups, armband protests).
2. **Brandalism** — fake-but-convincing sponsors/logos that read real until examined
   (`EXPROPRIATED`, `REDEVELOPMENT FC`, `DECRIM NOW`, `WORK IS WORK`).
3. **Counterfeit merch line** — the whole kit drop masquerades as official World Cup
   merch but documents erasure and extraction.

The unifying frame: **"No Game Without the Ground"** — the kit is a *receipt*, not a
souvenir. Whose land, labor, and lives are consumed to produce the spectacle.

## 3. The eight kit concepts

| # | Name | Subject / system indicted | Signature visual | Fake sponsor |
|---|------|---------------------------|------------------|--------------|
| 1 | **No Game Without the Ground** | Core frame — unceded land, displacement | Receipt logic; territory acknowledgement embedded | — |
| 2 | **Hogan's Alley Home Kit** | Black displacement for viaducts | Concrete grey; glitched street-grid map; microtype street names + expropriation dates | `EXPROPRIATED` / `DEMOLISHED FOR PROGRESS` |
| 3 | **Red Line Defence** | Policing & MMIWG2S | Charcoal; single red chest line disintegrating into dashes; case-number microtype | back-neck `NO MORE STOLEN SISTERS` |
| 4 | **Speculative Reparations FC** | Event economics, what's owed | Glossy luxury; distorted banknotes/gold; broken pie-chart crest | `EXTRACTION`, `LAND UPLIFT INC` |
| 5 | **Missing From the Poster** | Tourism vs. disappearance | Postcard skyline; sky/water built from names+dates microtype | name bar reads `MISSING`; hem `NO ONE BELIEVED US` |
| 6 | **Nerd War FC** | Tech, gentrification, data | Split: SaaS dashboard vs. street consequences; colliding fonts | `PROPERTY VALUES` ↑ vs `OVERDOSE DEATHS` |
| 7 | **Number 5 Orange Away Strip** | Sex work, labor, stigma | Saturated orange; pole motif; staff-door silhouettes | `WORK IS WORK` / `DECRIM NOW` |
| 8 | **Ken Foster Fentanyl Final** | Overdose crisis, alley life | Warped single-alley perspective; OD-count bricks; pill/ampoule numerals | — |

The doc's own suggested lineup: **Ken Foster Fentanyl Final** as the hero kit,
**Nerd War FC** as a variant, **Number 5 Orange** as the wild card.

## 4. Ethical guardrails (the most important section)

Non-negotiable, promoted into `KNOWLEDGE-BASE.md`:
- Punch **up** at systems, never down at victims/the displaced.
- **No** Indigenous regalia/sacred/community-owned motifs. Critique colonial
  *systems* instead. (Anchored by the Cowichan sweater dispute — VANOC 2010.)
- MMIWG2S → foreground state/settler responsibility; no grief commodification.
- Center systems, not perpetrators — Pickton case = indict policing/courts/civic
  indifference, **not** sensational serial-killer/pig imagery.
- Sex work = labor/risk/criminalization, never punchline.
- Land acknowledgement is substance.

**This is also a design safety rail for the AI pipeline:** the doc explicitly wants
the generator to *reject/flag* prompts that produce faux-Indigenous motifs or other
prohibited content. That guardrail is itself a "novelty of process" selling point.

## 5. Precedents (for the deck's precedent board)

- **Sports protest:** Smith & Carlos 1968; BLM/armband/logo-covering protests; IOC
  Rule 50 and its contestation.
- **Brandalism:** billboard/ad subversion; "woke-washing" critique.
- **Olympic apparel politics:** Cowichan sweater dispute; eco-criticism of
  outfitters; Rule 50 enforcement.
- **Skate/streetwear/zine** lineage: deck graphics + DIY screenprint + zine cut-up
  as the direct ancestor of "kit as message surface." China Creek (1979) as the
  Vancouver spatial-justice anchor.

## 6. Process & tooling — the "novelty of process" play

Judging rewards novel *process*, not just artifacts. The doc proposes a pipeline:

```
LAND → DATA → PATTERN → JERSEY
```

- **Ingest** maps + text (Hogan's Alley map, expropriation notices, OD stats,
  housing data, tourism taglines, MMIWG2S inquiry language).
- **Generate** pattern tiles (e.g. glitch a real Hogan's Alley map into all-over
  print) and **microtype textures** from CSV/text.
- **Enforce ethics** — auto-reject/flag prohibited content (faux-Indigenous motifs).
- **Export** layered files compatible with the fashion-track partner's jersey template.
- **Document traceability** — link every visual element to a dataset/map/text source;
  show raw-AI-output vs. human-edited final to demonstrate human agency + curation.

**This maps directly onto what we're already building.** Our R3F site + brand-token
system can become the front-end/showcase for this pipeline, and the
`Land → Data → Pattern → Jersey` flow is a perfect interactive portal narrative.

## 7. Impact on the current build (action items)

What Doc 01 changes about the scaffold I shipped:

### Tone — two registers on the table, owner's call
My scaffolded copy is edgy/flippant satire ("The only displacement we want is a
striker", "WORLD CUP OF DISPLACEMENT"). Doc 01's own voice runs more
deadpan-official + documentary-serious. These aren't mutually exclusive — provocative
satire pointed at the *systems* in Doc 01 is a valid lane. **The owner is the ethical
guard and will calibrate how scathing/in-your-face to go per item** as research lands.
No copy changes until then; both registers stay available.

### Brand tokens
- Palette mostly holds, but the doc implies a *per-kit* palette system (concrete grey,
  charcoal, saturated orange, glossy luxury) rather than one fixed scheme. Consider
  restructuring `tokens.js` into a base palette + per-kit palettes.
- Add the **fake-sponsor bank** as first-class brand assets: `EXPROPRIATED`,
  `DEMOLISHED FOR PROGRESS`, `DECRIM NOW`, `WORK IS WORK`, `EXTRACTION`,
  `LAND UPLIFT INC`, `NO MORE STOLEN SISTERS`, `NO ONE BELIEVED US`.

### Club framing
"VANCOUVER MADE FC / The Displaced XI" is a fine umbrella, but the doc's power is in
the **eight distinct concepts**. Reframe: VANCOUVER MADE = the *label/collective*;
each kit is its own "club"/drop. Keep the umbrella, add the roster.

### Kit docs
`docs/design/jersey-kit.md` (my 3 invented kits) should be **superseded** by the
doc's 8 grounded concepts. Keep the production notes; replace the concepts.

### The portal
Re-theme the World Portal from "counterfeit trophy" toward the **Land → Data →
Pattern → Jersey** narrative — i.e. the portal *is* the pipeline visualized. Strong
"novelty of process" demo.

### Guardrails in code
Encode the ethical guardrails as an actual constraints file the pipeline references
(and the deck can cite). This is both ethics and a feature.

## 8. Open questions / to confirm with the team

- Which kit is the **hero**? (Doc suggests Ken Foster Fentanyl Final.) Confirm with user.
- Is there a real **fashion-track partner** + jersey template we must export to?
- Is the **AI pipeline** (Devin) in scope to actually build, or storyboard for the deck?
- Facts to confirm before public use: Hogan's Alley expropriation dates; China Creek
  1979; overdose death counts (cite year + source); Cowichan/VANOC 2010 deal; No5
  Orange address/history.
