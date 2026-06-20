# Deploy — MADE ON pitch site

The pitch site (`/`, `/engine`, `/process`, `/hall-of-fame`, plus the 404 and the
deploy-safe `/tracker`) is a static Vite build. It deploys to **Vercel**.

- **Project:** `vancouver-made` (team *walkswithaswagger's projects*)
- **Production URL:** https://vancouver-made.vercel.app
- **Framework preset:** Vite · **Build:** `vite build` · **Output:** `dist`
- SPA routing is handled by `vercel.json` (rewrites everything except `/assets/*` to
  `/index.html`) so deep links like `/engine` resolve.

> The Asset Tracker's Express + SQLite backend is **local-only** and does not deploy.
> On the hosted site `/tracker` detects no API and shows a "run it locally" notice — by design.

## GitHub auto-deploy (connected — live)

The project is connected to GitHub, so shipping is automatic:

- **Every merge to `main` → production** at https://vancouver-made.vercel.app.
- **Every PR → a preview deploy** (the `vercel[bot]` posts the preview URL + a status check
  on the PR).

No manual step is needed to release; just merge to `main`. The build settings (auto-detected
from the Vite project) are Framework **Vite**, Build `vite build`, Output `dist`, Install
`npm install`. SPA deep links resolve via `vercel.json`.

The "scan to open" QR is generated at runtime from the page's own origin, so it encodes
`vancouver-made.vercel.app` automatically — nothing to update.

> Git settings live at Vercel → **vancouver-made → Settings → Git** (production branch `main`).

## Verify a deploy
- Open the production URL; click through `/`, `/engine`, `/process`, `/hall-of-fame`.
- Hard-refresh on a deep link (e.g. `/engine`) — it should load, not 404 (confirms the
  `vercel.json` rewrite).
- `/tracker` should show the "local workbench" notice (no backend in production).

## Manual deploy (fallback, if not using Git integration)
From the repo root, with the Vercel CLI authenticated to the team:

```bash
npm run build
vercel --prod        # links to the existing "vancouver-made" project on first run
```
