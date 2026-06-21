# Devpost Submission — VANCOUVER MADE

**Event:** Vancouver Made · Devin Open Hackathon (dev track)
**Submitter:** Kris Krüg (WalksWithASwagger)
**Live demo:** https://vancouver-made.vercel.app
**Repo:** https://github.com/WalksWithASwagger/vancouver-made

> Frame (corrected): lead with the **protest-art lineage** — détournement, the uniform as a
> protest surface, the specific Vancouver tradition — then the kits, then the method. The
> collection is **VANCOUVER MADE** (umbrella) / **MADE ON**. The receipts engine is one
> workbench in the method, not the headline. Source of truth: `docs/presentation/talk-flow.md`.

---

## 1. Project name  *(field limit 60)*

`VANCOUVER MADE: We Made the Receipt`

Alternates: `VANCOUVER MADE` · `MADE ON: One Receipt, Three Ways`

## 2. Elevator pitch  *(field limit 200)*

> An AI pipeline turns one cited Vancouver receipt into three artifacts: a jersey hem, a protest poster, a couture editorial. Same source every time. Everyone made a souvenir. We made the receipt.

*(194 chars)*

## 3. Project details

**The part that doesn't fit on a souvenir.**

VANCOUVER MADE is a World Cup 2026 protest kit collection. Not a sponsor. A festival is a spectacle, and someone always pays for it. There's a long line of people who turned the jersey, the podium, and the sponsor board into a place to tell the truth. We studied that wall, then added to it. Built at BCIT Tech Collider, AI-assisted, on real public-record data, on the unceded territories of the xʷməθkʷəy̓əm, Sḵwx̱wú7mesh, and səlilwətaɬ peoples.

**The canon you join**

Smith and Carlos raised their fists on the Mexico City podium in 1968; Peter Norman wore the badge in solidarity. Hummel muted Denmark's Qatar 2022 kit to "the colour of mourning" and protested a World Cup through the kit itself. St. Pauli flies the skull and crossbones. And here at home: Kalle Lasn started Adbusters and culture-jamming in Vancouver in 1989; the Cowichan sweater got knocked off for the 2010 Olympics; the banners read "No Olympics on Stolen Native Land." The uniform has always been a protest surface. This collection is the next entry on that wall, and the argument could only come from here.

**The work**

Lead with the hero. The flagship is **Pump & Dump FC**: a blackout "city pride" third kit that resolves into a prospectus the longer you look. From across the room it reads like the limited-edition drop every host city sells. Up close: the all-over print is soaring then cliff-diving line charts, the crest is a condo tower stacked like a candlestick, the sponsor bar reads PUMP & DUMP CAPITAL / WE WIN IF YOU LIVE HERE OR NOT, the roles are DEVELOPER / FLIPPER / LANDLORD / RENOVICTOR, and the nameplate names the public: BAGHOLDER.

Then the collection. MADE ON SILENCE (the redacted document, worn). MADE ON THE PUBLIC DIME ($729M as couture). Nardwuar FC (research is the protest). No.5 Orange (the city sells edgy nightlife and polices the people who do the work). China Creek. Nine kits, one repeatable move: mimic the official polish, invert the payload, bake in the receipt. Every factual claim carries its citation on the hem.

**The bill, cited**

- $685M–$729M gross BC cost for seven games; $242M of it security; up to $114M net to BC taxpayers. Source: Government of BC, CBC, Globe and Mail, May 2026.
- California's host cities funded most of their budget privately. BC went nearly 100% public. Source: Globe and Mail, June 2026.
- "Forsaken twice." The Oppal inquiry found the missing women were failed by society and by police. Source: Missing Women Commission of Inquiry, 2012.
- Homelessness more than doubled before the 2010 Olympics (628 to 1,576) behind a "no displacement" pledge. Source: UBC Olympic Games Impact report, Pivot Legal.
- The VSE, branded the "Scam Capital of the World." Source: Forbes, 1989.
- Hogan's Alley, the Black neighbourhood paved for the viaduct. Source: City of Vancouver anti-Black cultural redress record.

**How we made it — voice to receipt**

The human bookends the machine. Voice in, judgment out, AI the accelerant between, but a person decides at every gate. We built tooling, not just prompts: a research-and-verification spine, an ingest pipeline (scanner to manifest to SQLite), a tracker that turns roughly 246 raw generations into a rated library, code-drawn flats (deterministic SVG from spec), and a small engine that renders one civic fact across three house voices. Several models in parallel, several agents on one branch with handoff docs. Not using AI. Conducting a roomful of it. Provenance in, curation out. The anti-slop stance, made literal.

**Challenges**

Speed without slop. AI floods you with plausible jerseys; the hard part is the kill list. Every surviving claim has a source. The IP line: no FIFA marks, no sponsor logos, no borrowed sacred imagery. We evoke the grammar, we never reproduce a real mark, and we critique the colonial system with its own paperwork. Punching up, never down: the displaced are the home team, sex work is labour, the bagholders are the public. Power is the target.

**What I learned**

The machine is great at volume and terrible at meaning. The real design problem isn't "can AI make a jersey." It's where you put the human. Voice at the front. Judgment at the gate. Receipts holding the line.

**What's next**

First place in the design track is ten kits manufactured. I want the heroes off the screen and onto real bodies, ocean-bound rPET that still sublimates. Resolve the remaining kits to full tech packs. The move repeats: point it at the next spectacle.

You're not in the stands. You're the bag.

---

## 4. Additional info

**Built With** (tags): `react` `vite` `react-three-fiber` `tailwindcss` `react-router` `express` `sqlite` `notion-api` `midjourney` `devin` `svg` `vercel` `javascript`

**Links:**
- Live demo: https://vancouver-made.vercel.app
- The process, made visible (`/engine`): https://vancouver-made.vercel.app/engine
- GitHub: https://github.com/WalksWithASwagger/vancouver-made
- Sister site (civic): https://feefa.ai
- Sister site (editorial): https://world-cup-fashion-cake.vercel.app

**Bounties to declare:** Best Vancouver Narrative · Show Your Process · Best Use of AI Tools · Best Reflection of Vancouver Grassroots Culture.

**AI tools used:** Midjourney (all imagery: concepts, moodboards, crests, sponsor bars, lookbook renders) · Devin (dev-track scaffolding, the pipeline + three deployed sites) · Claude Code (agentic build across the repo: code-drawn flats, ingest tracker, Receipts Engine) · ChatGPT, Claude, Perplexity (first-pass research, then human-verified).

**AI answer 1 — "Where did you use AI, and where did you deliberately choose not to?"**
AI did the volume. I kept the taste. Where I used it: Midjourney generated every image in the collection, the jersey concepts, moodboards, crests and sponsor bars, roughly 246 raw generations rated down to the survivors, most of them killed. Devin scaffolded the dev-track build, the pipeline and the three sites that auto-deploy. Claude Code ran the repo as a roomful of agents on one branch with handoff docs: the code-drawn flats, the ingest tracker, the Receipts Engine. ChatGPT, Claude and Perplexity did first-pass research, then got checked. Where I deliberately did not: the voice and the verdict. Every factual claim is a real public-record number I sourced and checked by hand. No model invented a statistic. The pipeline flags anything unverified and holds it until a human clears it against a primary source. The final cut is mine. The human bookends the machine: voice in, judgment out, provenance in, curation out.

**AI answer 2 — "How did you feel AI impacting your process – for better or for worse?"**
Both, and refusing to flatten that is the point. Better: it collapsed the distance between a stance and an artifact; one person shipped a nine-kit collection and three live sites in a day. The Nardwuar kit asks who gets to tell Vancouver's story; AI let me answer at the speed of the question. Worse: AI is great at volume and terrible at meaning; left alone it ships the average. A hundred plausible jerseys an hour, and plausible is the enemy. So the work moved. The design problem stopped being "can the machine make a jersey" and became "where do you put the human." The tool is foundational, not neutral. It amplifies whatever you bring, discipline or laziness. I tried to bring receipts.

**AI answer 3 — "How did you use Devin?" (Devin Open Hackathon)**
Devin handled the dev-track build: scaffolding the AI pipeline and the three sites that render one cited receipt three ways and auto-deploy on Vercel. The plumbing that lets `/engine` take a public-record number and drop it onto a kit hem, a protest poster and a couture editorial at once, source attached, started as Devin scaffolding and got finished under human judgment. _[CONFIRM before final submit: name the specific components Devin scaffolded — Receipts Engine, ingest pipeline, the Vercel deploys — judges weight exactly this.]_

## 5. Thumbnail (3:2)
- Original code-drawn flat: `public/process/flat-hero.jpg` (1456×816, IP-clean).
- Do NOT use `docs/deliverables/mockups/MO-03-*.png` / `MO-09-*.png` — they carry a Nike swoosh.

---

## Deploy notes
- Production: `https://vancouver-made.vercel.app` (Vercel project `vancouver-made`, prebuilt static SPA, `.vercel` gitignored). Deployment Protection (Vercel Authentication) turned off so judges can reach it.
