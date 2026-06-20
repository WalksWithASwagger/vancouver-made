# Hall of Fame: /hall-of-fame

Source: `src/components/HallOfFame.jsx`, `src/data/hallOfFame.js`, `src/data/kitGallery.js`.

## What it is

A curated visual library. Two tabs. The same tile-and-lightbox UI renders both. Filter buttons across each tab let you narrow by category.

## The two wings

**The Whole Story** (`src/data/hallOfFame.js`). The precedents and lineage MADE ON draws from, weighted toward protest. Seven categories:

| id | label | what it holds |
|----|-------|---------------|
| design-canon | Design Canon | The greatest kits ever cut. |
| protest-kits | Protest & Activist Kits | The shirt as the statement. |
| athlete-protest | Athlete Protest | Standard kit, dissenting body. |
| olympics | Olympics & Appropriation | The podium as protest surface. |
| fifa-2026 | FIFA 2026 Brand | The official identity we mimic and invert. |
| subvertising | Subvertising | Official format, inverted payload. |
| merch-swag | Merch & Swag | Badges, scarves, patches, bootlegs. |

A "Vancouver" filter surfaces entries tagged `vancouver: true` across all categories: the Cowichan knockoff, the Ilanaaq appropriation, the 2010 anti-Olympics coalition, Adbusters.

**Best Kits** (`src/data/kitGallery.js`). The greatest jersey designs ever made, protest and otherwise. Four categories: International Classics, Club Icons, Goalkeeper & Weird, Protest & Activist, Modern & Fashion. Companion to the first tab; rendered on the same page.

## Rights policy

Rights-honest by design. Freely-licensed works (Wikimedia Commons CC/PD, official emblem vectors shared for commentary) carry a local `src` path under `public/hall-of-fame/` or `public/kit-gallery/`. Rights-restricted gems (Getty, club-licensed match photos) are reference cards: `src: null`, with a `sourceUrl` linking out. The tile shows a placeholder with "Reference" and the title; the lightbox shows the same. No re-hosting of restricted images.

## Data shape

Each entry in both data files uses the same shape:

```js
{
  id,          // unique string
  title,       // display name
  category,    // matches a category id in the same file
  year,        // string
  src,         // local path or null
  rights,      // licence or "Reference only"
  sourceUrl,   // link for "View source"
  why,         // one or two sentences: why it's here
  tags,        // array of keyword strings
  vancouver,   // optional boolean, triggers the Vancouver filter
}
```

Add an entry to either array and the grid picks it up on next render. No registration step.
