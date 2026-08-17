# Deployment Runbook — Nusra Tax & Notary (nusrany.com)

This document is the operator-facing deployment guide. It records **where** and **how**
the site is deployed and how to roll out code, schema, and content. It does **not**
contain passwords or API keys — those live in the Vercel project's environment
variables and the service dashboards.

## Architecture

| Concern | Service | Notes |
| --- | --- | --- |
| Hosting / rendering | Vercel (Next.js App Router) | Canonical origin `https://nusrany.com`; `www` permanently redirects to the apex. |
| Database | Neon (PostgreSQL) via `@payloadcms/db-postgres` | Schema managed by committed Drizzle migrations in `migrations/`. |
| CMS image storage | Vercel Blob via `@payloadcms/storage-vercel-blob` | Public website imagery only. Local dev without a token uses Payload local storage. |
| Inquiry email | Resend via `src/lib/inquiries/submit.ts` | Email is secondary: a saved inquiry is success even if delivery fails. |
| Analytics | Google Analytics 4 (gtag.js) | Loaded only when `NEXT_PUBLIC_GA_ID` is set. |
| Search Console | DNS or HTML-tag verification | Production sitemap submitted at `https://nusrany.com/sitemap.xml`. |

The application is a single Next.js codebase with Payload CMS 3.x embedded. Public
pages are React Server Components that read published content through the typed
layer in `src/lib/content/queries.ts`. The `/api/request-assistance` route validates,
rate-limits (HMAC fingerprint, no raw IP stored), saves the inquiry first, then sends
email.

## Prerequisites

- Node.js `>=20.9.0` (see `.nvmrc`; the project pins a supported Payload 3.x +
  Next.js combination in `pnpm-lock.yaml` — do not manually upgrade outside Payload's
  supported range).
- pnpm (lockfile is committed; use `pnpm install --frozen-lockfile`).

## Local development

```bash
pnpm install
# Start local PostgreSQL (docker compose up -d) or the portable cluster in .tools/pg
cp .env.example .env   # then fill in real values
pnpm payload:migrate
pnpm seed              # idempotent: six services, globals, admin (when ADMIN_EMAIL/PASSWORD set)
pnpm dev               # http://localhost:3000  (admin at /admin)
```

## Production environment variables (Vercel)

Set these on the Vercel project for Production and Preview. Secrets must **not** be
prefixed with `NEXT_PUBLIC_`.

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | yes | Neon pooled connection string (runtime). |
| `PAYLOAD_SECRET` | yes | ≥32 random characters. |
| `SITE_URL` | yes | `https://nusrany.com` in production. |
| `PREVIEW_SECRET` | yes | ≥32 random characters, shared with Payload preview URLs. |
| `RATE_LIMIT_HMAC_SECRET` | yes | ≥32 random characters; HMAC key for rate-limit fingerprints. |
| `BLOB_READ_WRITE_TOKEN` | no* | *Required to enable Vercel Blob uploads; omit in local dev to use local storage. |
| `RESEND_API_KEY` | no* | *Required to send inquiry notification email. |
| `RESEND_FROM_EMAIL` | no* | Verified sender, e.g. `Nusra Website <website@nusrany.com>`. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | no | One-time seed credentials; remove/rotate after first login. |
| `NEXT_PUBLIC_GA_ID` | no | GA4 measurement ID; omitting it disables analytics. |
| `GOOGLE_SITE_VERIFICATION` | no | Search Console HTML-tag verification value. |

## Rollout procedure

1. Merge to the production branch; Vercel builds and deploys automatically.
2. If the schema changed, apply migrations from a trusted environment:
   ```bash
   pnpm payload:migrate
   ```
   Migrations are committed (`migrations/`) and reviewed like code.
3. If new baseline content is needed (initial launch only):
   ```bash
   pnpm seed
   ```
   The seed is idempotent (slug/email lookups before create/update) and never prints
   the admin password.
4. Smoke-test the deployed URL against the checklist in Task 11/12 of the
   implementation plan: home, every service, About, Team, Blog, Contact, legal pages,
   Call/WhatsApp links, one real form submission, admin login, no draft exposure.

## Content publishing rules (enforced in docs + CMS workflow)

- **Sensitive data:** the public inquiry form collects only name, phone, optional
  email, service, preferred contact method, optional message, and consent. It warns
  users not to submit Social Security numbers, passport numbers, tax documents,
  immigration documents, banking details, or other highly sensitive personal
  information. Never ask for or store such data.
- **Credentials/prices/dates:** tax, notary, licensing, and other professional
  credentials, prices, class dates, and team claims must be verified with the client
  and recorded in `docs/content-verification.md` before publishing. Unverified items
  stay hidden. Run `pnpm verify:no-placeholders` before launch.
- **Immigration copy** must never imply legal representation or legal advice.

## DNS / domain cutover

- Point `nusrany.com` (A/ALIAS) at Vercel.
- Configure `nusrany.com` as the canonical domain; permanently redirect
  `www.nusrany.com` → `https://nusrany.com`.
- After cutover, re-verify the legacy redirect table (see `next.config.ts`
  `legacyRedirects`, covered by `tests/e2e/seo.spec.ts`).

## Monitoring & maintenance

- Inquiries are stored in Neon for up to 12 months (v1; no automatic deletion job).
- Notification email failures are recorded on the inquiry (`notificationEmailStatus`
  = `Failed`) and never prevent a save from counting as success.
- Content edits by staff publish immediately; layout/design changes require a code
  deploy (CMS is content-only by design).
