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

## Connect GitHub auto-deploy (one-time, ~2 min)

The project currently has only manual CLI deploys, so `main` is **not** auto-shipping.
Link it to GitHub once and every merge to `main` deploys automatically.

1. Vercel → **vancouver-made** → **Settings → Git**.
2. **Connect Git Repository** → `WalksWithASwagger/vancouver-made`.
3. Set **Production Branch** = `main`.
4. Confirm **Build & Output Settings** (should auto-detect):
   - Framework Preset: **Vite**
   - Build Command: `vite build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. **Save**, then trigger one deploy (Deployments → **Redeploy**, or push any commit to
   `main`) to ship the current build. After this, merges to `main` ship on their own.

The "scan to open" QR is generated at runtime from the page's own origin, so once live it
encodes `vancouver-made.vercel.app` automatically — nothing to update.

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
