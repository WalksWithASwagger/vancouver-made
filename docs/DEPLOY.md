# Verified static delivery

The Vite site is prerendered and checked in GitHub Actions, then copied without
modification into `.vercel/output/static`. Build Output API v3 routes map every
`PUBLIC_ROUTES` entry to its prerendered HTML before filesystem handling. Other
client routes retain the SPA shell; missing assets do not receive HTML.
The Asset Tracker backend remains local-only.

## Activation boundary — issue #92

Actions production delivery is disabled by default. Existing Git delivery remains unchanged. This change alone does not repair
https://unofficial.city. A maintainer must approve GitHub Actions as the production
owner and configure the following before activating delivery:

1. Set `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` in repository or
   `Production` environment secrets. Never put their values in source or chat.
2. Confirm the intended Vercel project owns `unofficial.city`, its production
   branch is `main`, and any desired environment approval protection is configured.
3. In a coordinated activation change, set `git.deploymentEnabled.main` to `false`
   in `vercel.json`. Wait for any existing Git production deployments to finish or
   cancel them before dispatching Actions. The deploy job rejects configurations
   that have not disabled main Git deployments.
4. Set repository variable `PRODUCTION_DEPLOY_OWNER` to `github-actions`.
5. Dispatch QA on current `main` and verify both the deployment URL and public domain.

Merging the packaging work does not perform the activation change or disable Git
production. Keep the ownership variable unset until the coordinated cutover above.
PR Git previews remain available under existing settings; they may require login
and are not evidence that the verified artifact was delivered.

The deploy job runs only after QA on `main`, never on pull requests. It downloads
the same artifact QA checked, requires all three credentials, rejects an outdated
main commit, serializes production jobs, and uses pinned `vercel@56.3.2` with
`deploy --prebuilt --prod`. It does not rebuild the site. Without the ownership
variable, the job is skipped.

## Local verification

```bash
npm ci
npx playwright install chromium
npm run build:seo
npm run test:seo
npm run package:vercel
npm run test:package
git diff --exit-code -- public docs/deliverables
```

Packaging fails if required prerendered pages, robots, or sitemap are absent.
Package checks verify clean and trailing-slash routes, byte-identical files,
client fallback, and missing assets. A loopback HTTP runner exercises the delivery
check against those rules; it does not substitute for testing Vercel itself.
Actions retains the verified artifact for seven days.

Social artwork generation is a separate authoring command, `npm run assets:social`
(requires Python and Pillow). Builds and QA must not overwrite source artwork.

## Verify actual delivery

```bash
npm run test:deployment -- https://unofficial.city
```

The same check runs after deployment against its URL and the public domain. Every
public route must return 200 with its expected title, canonical and one H1;
sitemap and robots must include the public routes and canonical sitemap URL.
A login page or homepage fallback cannot satisfy the route-specific checks.
After PR #97 is integrated, also open and refresh
`/kit/nardwuar-fc#detail-97` in a browser and verify the article is visible.

Keep #92 open until actual production checks pass and competing production builds
are disabled. Related issues #86, #87 and #88 require their own evidence. This
change does not configure DNS, credentials, analytics or external project settings.

References: [Build Output API](https://vercel.com/docs/build-output-api/configuration),
[Git deployment controls](https://vercel.com/docs/project-configuration/git-configuration),
[CLI deployment](https://vercel.com/docs/cli/deploy).
