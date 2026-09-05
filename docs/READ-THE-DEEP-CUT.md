# Read the Deep Cut

The Nardwuar kit has three inline readings immediately after its hero:

- `/kit/nardwuar-fc#detail-97`: the back number and the 25 November 1997 APEC interview.
- `/kit/nardwuar-fc#detail-deep-research`: the sleeve badge and Nardwuar's research practice.
- `/kit/nardwuar-fc#detail-who-benefits`: the project's chest statement, explicitly distinguished from a Nardwuar quotation.

Annotations live in `src/data/directions/nardwuar.js`. Factual records and dated
primary links reuse `AL-NW-001` and `AL-NW-002` in `src/data/clubs.js`; the first
record also supplies the homepage gateway. Keep that display consumer working
when editing the records. The two sources were reviewed on 2026-09-04.

The reading flow uses ordinary links and visible HTML; it does not require the
existing image lightboxes. Other kit worlds keep their original section order.
Fragment URLs use the kit's existing canonical and social card.

## Verify locally

Use Node 24 (matching CI), the lockfile, and the existing Playwright dependency:

```sh
npm ci
npx playwright install chromium
npm run build
npm run prerender
npm run gen:sitemap
npm run test:seo
npm run test:kit-reading
git diff --exit-code -- public docs/deliverables
```

These commands use committed artwork. The existing `build:seo` command also runs
the social-card generator, which writes tracked source images after Vite copies
public assets. Its correction belongs to the separate delivery lane in
[#92](https://github.com/WalksWithASwagger/vancouver-made/issues/92).

The browser check starts and stops its own loopback preview on port 4192
(`KIT_CHECK_PORT` overrides it). It exercises direct fragments with delayed lazy
loading, reload, browser history, keyboard/source focus, mobile layout, no-JavaScript
reading, image loading, other kit worlds, and the homepage citation consumer.
The existing QA workflow runs it after the SEO gate. Review the UI at desktop,
390px mobile, reduced motion, and 200% zoom as well; automated checks do not judge
composition or whether the explanation makes sense.

Vite preview serves the homepage shell at the clean kit URL and the prerendered
kit at `/kit/nardwuar-fc/`. The no-JavaScript browser case therefore serves that
actual built document through a test-only request fixture at the canonical kit
path. It proves the document and native fragments work; it does **not** prove the
production clean-URL mapping required by #92. The 640px/2× density browser case is
a 200% reflow equivalent for a 1280px screen, not a native browser-zoom assertion.

## Release and human evaluation

[#96](https://github.com/WalksWithASwagger/vancouver-made/issues/96) owns this feature.
Production delivery remains dependent on #92. Do not infer release from a green
build: the custom-domain kit URL must return 200 with meaningful HTML, the correct
canonical, working images, and source links. No deployment or hosting configuration
change is part of this feature.

After review, ask five people to start at the kit page, choose a detail, explain
what it refers to, and open the evidence. Record completion time, the explanation,
and whether coaching was needed. Initial target: four of five succeed within two
minutes without coaching. Also ask whether they understood that these are generated
design visualizations and which text is the project's interpretation. This is a
small comprehension pilot, not statistical proof; do not mark it passed until run.
