# Vercel Deployment Guide

## Prerequisites

1. **Neon Database** — Create at https://console.neon.tech
2. **Vercel Account** — https://vercel.com
3. **Vercel CLI** — Install with `npm i -g vercel`

## Step 1: Create Neon Database

1. Go to https://console.neon.tech
2. Click "Create Project"
3. Name: `nusra-production`
4. Region: US East (closest to NYC)
5. Copy the **Pooled connection string** (Transaction mode) — it looks like:
   ```
   postgresql://neondb_owner:xxxx@ep-xxx.us-east-2.aws.neon.tech/nusra?sslmode=require
   ```

## Step 2: Connect Vercel to GitHub

1. Go to https://vercel.com/new
2. Import the `bashir0609/nusrany` repository
3. Framework: Next.js (auto-detected)
4. Root directory: `./`
5. Build command: `pnpm run build`
6. Install command: `pnpm install`
7. Click "Deploy" (it will fail first time — that's expected)

## Step 3: Set Environment Variables

Go to your Vercel project → Settings → Environment Variables and add:

### Required

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your Neon pooled connection string | From Step 1 |
| `PAYLOAD_SECRET` | `5c4c98026dc59449e624e71501bf3a0b17116a5cb110aa2a027cea30c47ed6b7` | 64-char hex |
| `SITE_URL` | `https://nusrany.com` | Production URL |
| `PREVIEW_SECRET` | `5bdf93d49caf0a0c64cae4abbb3762b3f12932f97201eaf61299ebee42a9f97a` | 64-char hex |
| `RATE_LIMIT_HMAC_SECRET` | `e94d98856116a191408042a2ae527cf2058ffc0ea0efedfe4c0ea06a2dc2a46f` | 64-char hex |
| `ADMIN_EMAIL` | `admin@nusrany.com` | For first-time seed |
| `ADMIN_PASSWORD` | `Nusrae1f831f888fb1069!` | Remove after seed |

### Optional

| Variable | Value | Notes |
|----------|-------|-------|
| `BLOB_READ_WRITE_TOKEN` | Your Vercel Blob token | For CMS image uploads |
| `RESEND_API_KEY` | Your Resend API key | For inquiry email notifications |
| `RESEND_FROM_EMAIL` | `Nusra Website <website@nusrany.com>` | Sender email |
| `NEXT_PUBLIC_GA_ID` | Your GA Measurement ID | For analytics |
| `GOOGLE_SITE_VERIFICATION` | Your GSC verification code | For Search Console |

## Step 4: Create Vercel Blob Store (Optional)

1. Go to https://vercel.com/dashboard → Storage
2. Click "Create Store" → "Blob"
3. Name: `nusra-images`
4. Copy the `BLOB_READ_WRITE_TOKEN` from the .env snippet
5. Add it to your Vercel environment variables

## Step 5: Deploy

```bash
# First deployment
vercel --prod

# After deploy, seed the admin user and baseline content
vercel exec -- pnpm seed

# Remove the one-time admin password
vercel env rm ADMIN_PASSWORD production
```

## Step 6: Configure Custom Domain

1. Go to Vercel project → Settings → Domains
2. Add `nusrany.com`
3. Add `www.nusrany.com` (will redirect to root)
4. Update DNS records as instructed by Vercel

## Step 7: Post-Deploy Verification

1. Visit https://nusrany.com — homepage loads
2. Visit https://nusrany.com/admin — login with admin credentials
3. Visit https://nusrany.com/api/request-assistance — test form submission
4. Check https://nusrany.com/sitemap.xml — lists all routes
5. Check https://nusrany.com/robots.txt — correct disallows

## Troubleshooting

### Build fails with "DATABASE_URL" error
- Ensure `DATABASE_URL` is set in Vercel environment variables
- Redeploy after setting variables

### Admin login fails
- Run `vercel exec -- pnpm seed` to create the admin user
- Ensure `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set

### Images don't upload
- Ensure `BLOB_READ_WRITE_TOKEN` is set
- Create a Vercel Blob store in the Storage dashboard

### Email notifications don't send
- Ensure `RESEND_API_KEY` is set
- Verify your sending domain in Resend dashboard
