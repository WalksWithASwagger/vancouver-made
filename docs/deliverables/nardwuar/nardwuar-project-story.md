# MADE ON THE QUESTION NOBODY ELSE ASKED
### Nardwuar FC · the "Deep Cut" home kit · VANCOUVER MADE, World Cup 2026

> Devpost "Project Story" for the **Designathon** (design track). Chosen submission: NARDWUAR FC.
> Companion to the dev-track submission in [`../devpost-submission.md`](../devpost-submission.md).

**The pitch in one breath:** a World Cup home kit that reads as host-nation tartan from across the room and turns into a Vancouver underground archive up close. Built at BCIT Tech Collider, AI-assisted, on cited public record, on the unceded territories of the xʷməθkʷəy̓əm, Sḵwx̱wú7mesh and səlilwətaɬ peoples.

## What it is

NARDWUAR FC is one club in VANCOUVER MADE, a protest-kit collection for World Cup 2026. The brief was simple: design a kit that makes you proud to wear Vancouver. We answered it with the one Vancouverite who has spent nearly forty years doing exactly what this whole project is about. Do the homework, then ask power the question it's dodging.

The Deep Cut home kit looks like a bold tartan host-nation jersey. Tartan red body, green and yellow check, gold trim, a crest on the chest, a World Cup-style sleeve patch. Standard-issue football, until you get close.

Then it unfolds:

- The crest isn't a lion or a maple leaf. It's a collage of 7-inch records, photocopied show flyers, a tam-o'-shanter, and a vintage mic on a stand. No face. The tribute lives entirely in objects.
- The chest wordmark reads VANCOUVER. Never "Nardwuar." The host-nation slot, reclaimed.
- The sponsor bar, where a telecom would pay to sit, reads WHO BENEFITS? WHO PAYS? The thesis of the whole collection, worn where the money usually goes.
- The Fair-Play sleeve badge becomes DEEP RESEARCH / HUMAN SERVIETTE REPORTING CLUB.
- The back number is 97, for APEC Vancouver 1997, built from tiny record-sleeve and zine-panel rectangles. The nameplate is NARDWUAR!! in cut-and-paste ransom-note type.
- The all-over print is a ghosted tartan check over an ultra-faint collage of VHS labels, cassette spines, 7-inch labels and microtype: interview quotes, Gastown punk venues, CiTR call letters. A reading list you have to lean in to read.
- The receipt is sewn into the hem: `APEC VANCOUVER 1997 · NARDWUAR TO PM CHRÉTIEN ON PEPPER SPRAY · "FOR ME, PEPPER, I PUT IT ON MY PLATE."` Cited to Nardwuar's own footage, The Canadian Encyclopedia, and CBC archives.
- Inside the collar: DOOT DOOLA DOOT DOO. The care label: RESEARCH BEFORE WASH. CITE BEFORE WEAR.

A World Cup jersey turned into a walking archive of the city's underground. Research is the protest. The receipt is the weapon.

## What inspired us

Two things, and they're the same thing.

First, the canon. The uniform has always been a protest surface. Tommie Smith and John Carlos raised their fists on the Mexico City podium in 1968, and Peter Norman wore the badge in solidarity. Hummel muted Denmark's Qatar 2022 kit to "the colour of mourning." St. Pauli flies the skull and crossbones. And here at home, Kalle Lasn started Adbusters and culture-jamming in Vancouver in 1989, and the Cowichan sweater got knocked off for the 2010 Olympics while the banners read "No Olympics on Stolen Native Land." We didn't invent this move. We joined a line.

Second, Nardwuar the Human Serviette. Frontman of The Evaporators, rooted at CiTR/UBC, the guy who ambushed everyone from Nirvana to prime ministers with deep local history and receipts they never saw coming. At APEC 1997 he asked Jean Chrétien about pepper spray used on protesters and got "for me, pepper, I put it on my plate" onto the record, right before the inquiry into RCMP conduct. He is the patron saint of the question this collection asks: who benefits, who pays. We could have made the kit about a skyline. We made it about the method.

Could this kit only come from Vancouver? That was the brief's hardest test. A mountain comes from anywhere. CiTR, the Evaporators, a tartan tam, and the exact question power was dodging at APEC come from one place.

## How we built it

The human bookends the machine. Voice in, judgment out, AI the accelerant in between, a person deciding at every gate.

- **Research spine first.** Before any art, we built a research-and-verification layer where every factual claim gets a source card with a citation and a rights note. The APEC quote was verified and corrected against archive before it went anywhere near the hem.
- **Generate wide.** Several image models in parallel threw hundreds of candidate jerseys, crests, and collages. A tracker turned roughly 246 raw generations into a rated, searchable library instead of a junk drawer.
- **Cut hard.** The hard part isn't generating. It's the kill list. We rated, starred, and killed down to the deep-cut survivors, then rebuilt the keepers to full spec.
- **Code-drawn flats.** The jersey flats are deterministic SVG drawn from one spec file, so the design is data, not a screenshot. Change the spec, the flat redraws, and the same data fills the tech pack's artwork-and-placement section.
- **One fact, three voices.** A small engine renders a single civic receipt across the collection's house voices, so the argument stays consistent from hem to deck.
- **Many agents, one branch.** Several agents worked one repo with handoff docs between them. Not using AI. Conducting a roomful of it.

The whole rule compresses to one line. A claim makes it onto the garment if and only if a public source exists for it:

$$\text{on the shirt} \iff \exists\,\text{source}(\text{claim})$$

## What we learned

Speed without slop is the entire game. AI hands you a hundred plausible jerseys an hour, and plausible is the enemy. The value isn't in the generating, it's in the judgment about what to keep, and judgment doesn't speed up the way throughput does. Every shortcut we took on volume we paid back in editing.

We also learned the design got stronger the more specific it got. "Vancouver music" is nothing. CiTR call letters, a 7-inch label, the exact APEC quote, the tam: those are something. The brief said specificity beats generic, and it was right every time we tested it.

## Challenges we ran into

- **The IP line.** No FIFA marks, no club crests, no sponsor logos, no borrowed sacred imagery. We had to evoke the grammar of an official host-nation kit without reproducing a single real mark, and critique the system using only its own public paperwork. Every "official"-looking element is counterfeit by design.
- **Homage, not likeness.** This is the big one, and it's an ethics decision before it's a design one. Nardwuar is a living, beloved Vancouverite. He's the hero here; power is the target. So the rule was absolute: no face, no name on the chest, no commercializing his name. The tribute rides entirely on objects.
- **Verifying the receipt.** The thing that makes the kit also makes it risky. A misquoted hem is just slop with confidence. So the APEC line was checked against primary footage and archive before it earned its stitch.
- **Reads without a caption.** It had to work as a great tartan football shirt for someone who never reads a word of it, and as an indictment for someone who reads all of it. Both, on the same garment, or it fails.

## What's next

The kit is **blessing-pending.** Right now it lives as exhibition and submission. Before NARDWUAR FC moves one inch toward merch, the move is to show it to Nardwuar and ask. He's active and approachable, and the whole point of the project is consent and credit over extraction. If he says doot doola doot doo, we go. If he doesn't, it stays on the wall, and that's the right outcome too.

Made on unceded xʷməθkʷəy̓əm, Sḵwx̱wú7mesh and səlilwətaɬ territory. No game without the ground.
