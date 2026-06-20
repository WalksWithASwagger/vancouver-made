# Devpost Submission — MADE ON · The Receipts Engine

**Event:** Vancouver Made · Devin Open Hackathon (dev track)
**Submitter:** Kris Krüg (WalksWithASwagger)
**Live demo:** https://vancouver-made.vercel.app  ·  dev core: https://vancouver-made.vercel.app/engine
**Repo:** https://github.com/WalksWithASwagger/vancouver-made

> Paste-ready. Copy each field straight into Devpost. Char counts checked against the form limits.

---

## 1. Project name  *(field limit 60)*

`MADE ON · The Receipts Engine`  *(29 chars)*

Alternates:
- `MADE ON: The Receipts Engine`  *(28)*
- `The Receipts Engine — one fact, three surfaces`  *(46)*

## 2. Elevator pitch  *(field limit 200)*

> One Vancouver civic receipt goes in. Three counter-spectacle artifacts come out, each carrying the same citation. Not three projects. One AI pipeline pointed at three surfaces.

*(176 chars)*

Alternate *(168):* One public-record Vancouver fact in. Three protest artifacts out: a jersey hem, a poster, an editorial, each with the same citation. Not three projects. One AI pipeline, three surfaces.

## 3. Project details

**Everyone else made a souvenir. I made the receipt.**

MADE ON is a FIFA World Cup 2026 protest kit collection. The Receipts Engine is the machine underneath it. Same move, three surfaces: a jersey, a civic counter-site, a fashion editorial. One Vancouver fact goes in. Three artifacts come out, each carrying the same citation. Built today at BCIT Tech Collider, AI-assisted, on real public-record data.

**Inspiration**

Vancouver is hosting seven World Cup games. The bill to the public runs up to $729 million, $242 million of it security, up to $114 million net to BC taxpayers. California's host cities funded most of their budget privately. We went nearly 100% public.

The tournament asked every host city for "the Vancouver story." Most cities answer with a souvenir. I wanted to finish the sentence. Made on stolen ground. Made on Hogan's Alley, the Black neighbourhood paved for the viaduct the Cup now drives its fans across. Made on the 2010 Olympic playbook, when homelessness in Vancouver more than doubled before the Games (628 to 1,576) behind a "no displacement" pledge.

This is not anti-football. It's anti-amnesia. Football isn't the enemy. The host-city extraction machine is.

I'm a settler artist working on the unceded territories of the xʷməθkʷəy̓əm, Sḵwx̱wú7mesh, and səlilwətaɬ peoples. No borrowed sacred imagery. I critique the colonial system with its own paperwork: the receipt, the redaction, the banknote.

**What it does**

The Receipts Engine (`/engine`) is the dev-track core. Pick one civic receipt from a public-record list. Watch it render, live and all at once, in three house voices:

- MADE ON · the hem. The wearable receipt. Kit-maker spec type, citation baked into the garment.
- FEEFA · the poster. Host-city accountability as a protest poster (feefa.ai).
- Fashion Cake · the editorial. The same fact, shot like couture, captioned like evidence (world-cup-fashion-cake.vercel.app).

Same citation on all three. The novelty isn't any single site. It's the move: take the World Cup's official spectacle, turn its own language back on it, and let AI do the production while cited Vancouver receipts and human taste hold the line.

The pitch site (`/`) shows the output: nine kits across two racks, three fully designed heroes — MADE ON SILENCE, MADE ON THE PUBLIC DIME, PUMP & DUMP FC. The Process page (`/process`) walks one kit through all seven stages. The Asset Tracker (`/tracker`) is the curation gate, where roughly 246 machine generations get rated and killed down to the winners.

**How I built it**

The thesis is the architecture: the human bookends the machine. Voice is the input. Judgment is the output gate. The machine is the accelerant in between. Provenance in, curation out. That's the whole anti-slop argument, made literal.

Stack: Vite, React 18, React Three Fiber for the portal, Tailwind, React Router. The jersey flats are code-drawn SVG, not stock, so they're original work that auto-fits numbers and silhouettes. The Asset Tracker runs a local Express and SQLite API with Notion sync to manage the rating pass on Midjourney generations. The Receipts Engine is pure data-to-voice: one `receipts.js` file, three transform functions (madeOnHem, feefaPoster, fashionEditorial), one civic fact fanned across three rendered artifacts. Devin was the dev-track tool. The three sister sites prove the method repeats across surfaces. AI made the volume. I kept the taste.

**The receipts (the data spine)**

Every claim on a garment carries its citation on the hem. The site flags anything unverified `[confirm]` until it's checked against a primary source. The spine:

- $685M–$729M gross BC cost for seven games. Source: Government of BC, CBC, Globe and Mail, May 2026.
- "Forsaken twice." The Oppal inquiry found the missing women were failed by society and by police. Source: Missing Women Commission of Inquiry, 2012.
- Homelessness doubled before 2010 (628 to 1,576, +134%). Source: UBC Olympic Games Impact report, Pivot Legal.
- The VSE, branded the "Scam Capital of the World." Source: Forbes, 1989.
- Hogan's Alley, paved for the viaduct. Source: City of Vancouver anti-Black cultural redress record.

**Challenges**

Speed without slop. AI can flood you with 246 plausible jerseys in an afternoon. The hard part isn't generation. It's the kill list. The whole system is built so a human makes the final cut and every surviving claim has a source.

The IP line. No FIFA marks, no sponsor logos, no borrowed sacred imagery. Everything original, the critique built from public paperwork instead of stolen branding.

Punching up, never down. The displaced are the home team, not the punchline. Sex work is labour. The bagholders are the public. Power is the target.

**Accomplishments I'm proud of**

A protest brand that reads tournament-official from across the room and turns into a receipt up close. Three properties that look like three projects and are actually one repeatable pipeline. A live demo where you click a fact and watch it become a hem, a poster, and an editorial. And every number on it survives a primary-source check.

**What I learned**

The machine is great at volume and terrible at meaning. The real design problem of this moment isn't "can AI make a jersey." It's where you put the human. Voice at the front. Judgment at the gate. Receipts holding the line. Get that right and AI is a brush, not a slop machine.

**What's next**

First place in the design track is ten kits manufactured. I want the three heroes off the screen and onto real bodies, ocean-bound rPET that still sublimates. Resolve the remaining six kits to full tech packs. Then point the Receipts Engine at the next host city. The pipeline doesn't care which spectacle it's aimed at.

You're not in the stands. You're the bag.

---

## 4. Additional info

**Built With** (tags): `react` `vite` `react-three-fiber` `tailwindcss` `react-router` `express` `sqlite` `notion-api` `midjourney` `devin` `svg` `vercel` `javascript`

**Links:**
- Live demo (dev core): https://vancouver-made.vercel.app/engine
- Live demo (pitch site): https://vancouver-made.vercel.app
- GitHub: https://github.com/WalksWithASwagger/vancouver-made
- Sister site (civic): https://feefa.ai
- Sister site (editorial): https://world-cup-fashion-cake.vercel.app

**Bounties to declare:**
- Best use of AI/tools — the voice→receipt pipeline; Midjourney volume + human curation gate; three transform functions fanning one fact to three artifacts.
- Best Vancouver narrative — Hogan's Alley, the DTES, 2010 Olympics displacement, Howe St / VSE, the three host Nations named.
- Show your process — `/process` (7 stages) + `/tracker` (the live kill-list curation gate).

**Video (optional):** 60–90s screen capture of `/engine` (click a receipt, show the three voices update) + a pan of the hero kits.

## 5. Thumbnail (3:2)

- **Primary (ready, IP-safe):** `public/process/flat-hero.jpg` (1456×816 → crop to 3:2). Original code-drawn flat, no third-party marks.
- **Optional dev shot:** a screenshot of `/engine` (the three-voice render) — most honest for a dev submission.
- **Do NOT use** `docs/deliverables/mockups/MO-03-*.png` / `MO-09-*.png` — they carry a Nike swoosh and break the no-brand-logos IP rule.

---

## Deploy notes
- Production alias: `https://vancouver-made.vercel.app` (Vercel project `vancouver-made`, team walkswithaswaggers-projects).
- Deployed from branch `claude/ingest-tracker-assets` as a prebuilt static SPA (vercel.json rewrites).
- **Action needed:** Deployment Protection (Vercel Authentication) is ON, so the URL currently returns 401 to the public. Turn it off: Vercel dashboard → project `vancouver-made` → Settings → Deployment Protection → Vercel Authentication → Disabled → Save. Then the demo link is open for judges.
