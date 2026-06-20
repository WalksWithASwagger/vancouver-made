# VANCOUVER MADE · **MADE ON**

**A protest collection. Not a sponsor.**

> **They asked for the Vancouver story. We finished the sentence.**
> *Made on stolen ground. Made on Hogan's Alley. Made on $729 million of public money.*

**MADE ON** is a FIFA-World-Cup-2026 protest kit collection (BCIT Tech Collider).
Everyone else made a souvenir; we made the **receipt**. Nine kits, two racks, one
argument — rebuilding the tournament's official visual language (kits, crests,
sponsor bars, kit-maker spec type) and **inverting the payload**, with every factual
claim carrying its citation *on the hem*. A settler artist's refusal to make the
celebration jersey: no borrowed sacred imagery — the coloniser's own paperwork
instead, the receipt, the redaction, the banknote.

— Kris Krüg · settler artist · unceded xʷməθkʷəy̓əm, Sḵwx̱wú7mesh, səlilwətaɬ territory

> Not a protest about AI. AI is just the brush. The subject is greed, displacement,
> and who pays the public bill.

**Canonical deliverables:** `docs/deliverables/` (board, pitch deck, tech pack).
**Design from:** `docs/research/analysis/SYNTHESIS.md` + `analysis/04-made-on-consolidation.md`.

---

## What's in here

| Path | What it is |
|------|------------|
| `src/` | The **World Portal** — a React + React Three Fiber landing app (the live demo) |
| `src/brand/tokens.js` | Source of truth: colors, type, slogans, club identity |
| `docs/research/` | Research brief — the facts behind the protest (verify before publishing) |
| `docs/design/` | Brand system, jersey/kit concepts, paraphernalia line |
| `docs/presentation/` | Pitch deck outline |

## Run the portal

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

Stack: **Vite · React 18 · React Three Fiber · drei · Tailwind CSS**.

## The concept in one breath

- **Club:** VANCOUVER MADE FC — *The Displaced XI* — *Civitas Pro Populo.*
- **Kits:** Home ("The Displaced XI"), Away ("The Sweep"), Third ("Future Forward").
- **Sponsor slot:** reads **PUBLIC MONEY**.
- **Tagline:** *Made in Vancouver, not Vancouver Sold.*
- **Closer:** *The world is not for sale.*

## Working principles

1. **Punch up, never down.** Institutions are the target; the displaced are the home team.
2. **Satire is the weapon, accuracy is the armor.** Cite every number that goes public.
3. **The land acknowledgement is substance, not decoration.** Vancouver sits on the
   unceded lands of the Musqueam, Squamish, and Tsleil-Waututh Nations.

## Hackathon status

- [x] Project scaffolded (Vite + R3F + Tailwind), builds clean
- [x] Brand tokens + voice defined in code
- [x] World Portal hero scene (trophy rings, churning globe, debris)
- [x] Landing page: hero, manifesto, kit teasers, slogan marquee
- [x] Research brief, brand system, kit specs, deck outline drafted
- [ ] Confirm + cite the research facts
- [ ] Produce kit mockups (Canva / image-gen MCP)
- [ ] Build the deck
- [ ] (Optional) Deploy (Vercel MCP) + merch storefront (Shopify MCP)
