# Graphic Elements Prompts — PUMP & DUMP FC

**Goal:** Generate standalone graphics that can be composited onto jersey templates. These are the building blocks: print patterns, crests, sponsor bars, chart graphics.

**Strategy:** Get high-quality, removable-from-white-background elements. Use `white background` in every prompt to simplify masking/extraction.

**MJ settings:** `--ar 16:9 --style raw` (landscape for easier element extraction and composition)

---

## Batch 1 — All-Over Print Pattern Options

### Prompt 1: Candlestick chart all-over repeat
```
seamless repeating pattern, candlestick charts with thin white lines,
soaring peaks then cliff-diving valleys animated in the pattern,
deep navy blue background, 
tight repeat pattern suitable for sublimated jersey fabric,
financial graph texture, professional chart aesthetic,
white background, 16:9 --style raw
```

### Prompt 2: Condo tower silhouettes + vacancy pattern
```
seamless repeating pattern of modern high-rise condo tower silhouettes,
some towers glowing internally, others dark/vacant,
white line art on navy background,
geometric architectural pattern,
tight enough for all-over fabric print,
white background --ar 16:9 --style raw
```

### Prompt 3: Banknote guilloché overlay texture
```
repeating geometric guilloché pattern inspired by banknote engraving,
thin gold lines in delicate interlocking design,
subtle ornamental detail layer,
--ar 16:9 --style raw
```

---

## Batch 2 — Crest / Shield Designs

### Prompt 4: Split soccer ball / candlestick crest
```
heraldic shield split vertically in half,
left half: classic soccer/football ball silhouette in white,
right half: candlestick chart with soaring peak then cliff-diving downturn,
gold and white line art,
deep navy shield background,
official sports crest aesthetic, federal badge style,
white background --ar 16:9 --style raw
```

### Prompt 5: Condo tower + stock chart shield variant
```
heraldic shield, split design,
left: stacked condo tower silhouettes rising,
right: candlestick chart integrated with towers,
gold outline, white negative space,
navy background,
official badge style, professional crest, federal seal aesthetic,
white background --ar 16:9 --style raw
```

---

## Batch 3 — Sponsor Bar / Brand Treatments

### Prompt 6: PUMP & DUMP CAPITAL sponsor bar
```
professional sponsor bar / brand bar layout,
text reads: "PUMP & DUMP CAPITAL"
styled like official sports sponsor wordmark (e.g., ADIDAS, NIKE branding),
set in clean sans-serif, 
metallic gold on navy blue rectangle,
official tournament sponsor aesthetic,
white background --ar 16:9 --style raw
```

### Prompt 7: Secondary tagline banner
```
official sponsor/tagline bar layout,
text reads: "WE WIN IF YOU LIVE HERE OR NOT"
styled as secondary sponsor text under main mark,
small caps, clean sans-serif,
white text on navy field,
official sports branding, tournament ticker aesthetic,
white background --ar 16:9 --style raw
```

### Prompt 8: Fair Play / Crest badge variant
```
official "Fair Play" style circular badge,
reads "DEEP CAPITAL" or "EXIT LIQUIDITY" as the label,
gold border, navy field,
styled like tournament fair-play/conduct badges,
small enough for sleeve placement,
official sports emblem aesthetic,
white background --ar 16:9 --style raw
```

---

## Batch 4 — Number / Name Graphics

### Prompt 9: Role-based name treatment
```
athletic jersey nameplate style,
reads "DEVELOPER" (or FLIPPER / LANDLORD / RENOVICTOR),
arched banner format,
clean sans-serif, 
white lettering,
professional sports jersey nameplate aesthetic,
suitable for jersey back placement,
white background --ar 16:9 --style raw
```

### Prompt 10: MLS code / floor-plan number
```
technical jersey number rendered from building floor-plan outlines,
number composed of room layouts and architectural elements,
clean line art,
white on navy,
modern athletic number style,
suitable for jersey chest/sleeve,
white background --ar 16:9 --style raw
```

---

## Batch 5 — Shorts / Socks / Trim Graphics

### Prompt 11: VACANT stamp pattern
```
repeating red rubber stamp marks spelling "VACANT",
faded impression aesthetic,
official seal / stamp texture,
pattern density suitable for repeating down shorts/socks,
stamp red color (#C0392B),
white background --ar 16:9 --style raw
```

### Prompt 12: Price-to-income ratio text
```
large bold numerals "22x" and "33x" 
(representing Vancouver price-to-income multiples),
in clean sans-serif, white color,
can repeat vertically or scatter,
suitable for sock or trim placement,
technical sports apparel typography,
white background --ar 16:9 --style raw
```

### Prompt 13: Stripe detail — toxic gradient
```
clean vertical stripe or gradient bar,
transitions from toxic teal (#21d9c9) through to magenta,
sleek modern gradient,
suitable for cuff trim or sleeve accent,
athletic sportswear finish,
white background --ar 16:9 --style raw
```

---

## Batch 6 — Miscellaneous Details

### Prompt 14: Microprint citation
```
dense technical microtext suitable for jersey hem,
reads like "SECURITY $242M · NET TO BC TAXPAYER UP TO $114M · CALIFORNIA WENT PRIVATE · YOU DIDN'T"
in tiny monospace font,
professional fine-print aesthetic,
white text on navy,
suitable for care-label placement or hem detail,
white background --ar 16:9 --style raw
```

### Prompt 15: Trophy silhouette variation
```
FIFA World Cup trophy silhouette,
stylized as a condo tower or candlestick chart hybrid,
geometric, clean line art,
white outline on navy,
can be small accent graphic,
suitable for sleeve badge or collar detail,
white background --ar 16:9 --style raw
```

---

## Composition Strategy

Once all elements land:
1. **Extract each on white background** → convert to PNG with transparent background
2. **Layer hierarchy:**
   - Base: Navy body (solid)
   - Layer 1: All-over repeating pattern (candlestick or tower + vacancy)
   - Layer 2: Gradient stripe (teal-to-magenta) as accent
   - Layer 3: Crest (left chest)
   - Layer 4: Sponsor bars (center chest + neck tape)
   - Layer 5: Name/number (back nameplate)
   - Layer 6: Trim/sleeve details (cuffs, accents)
   - Layer 7: Microprint (hem)
3. **Color-lock:** Navy `#001f3f` or `#0E1B2E` (adjust per mood board), Teal `#21d9c9`, Magenta `#FF1493`, Stamp Red `#C0392B`, Gold `#B8924A`
4. **Test on blank template** before finalizing jersey composite
