# Nusra NY — Live Site Audit Report

**Audited:** August 3, 2026 (read-only, public URLs)
**Sites examined:** nusrany.com (primary) and mahreentax.com (related duplicate)
**Method:** HTTP fetch of sitemaps, robots.txt, and public pages; raw-HTML scanning of suspicious URLs.

> **⚠️ SCOPE CHANGE — client decision (Aug 3, 2026):** **ITIN (Individual Taxpayer Identification Number) services have been removed from the redesign scope** by client decision. The new site's final service list excludes ITIN entirely — the homepage, sitemap, SEO specs, page briefs, and service copy have all been updated accordingly. Any historical ITIN references in the audit/evidence documents (e.g., `03-live-site-details.md`, which records the old live site's `//itin/` page and its unverified "Certified Acceptance Agent" claim) document the **old, potentially compromised site only** and do **not** reflect the final service list. No ITIN page, copy, or offering appears on the rebuilt site.

---

## 1. Platform fingerprint

| Check | Finding |
|---|---|
| CMS | WordPress (wp-sitemap.xml → core sitemap) |
| Page builder | Elementor (elementor-hf header/footer, e-landing-page post type) |
| Commerce | WooCommerce installed — `shop/`, `cart/`, `checkout/`, `my-account/`, `product/` |
| Legal pages | wpautoterms_page post type (auto-generated policy pages) |
| SEO plugin | Yoast on mahreentax.com only; nusrany.com uses core sitemaps |
| Caching | `wpo-plugins-tables-list.json` in robots.txt → WP Optimize plugin present |
| HTTP | HTTPS served with valid cert on both domains |

---

## 2. Compromise indicators — verified live

1. **Unrelated, recently-created posts (Aug 1–2, 2026):** `auto-insurance`, `notary-public`, `tlc-car-rentals`, `ddc-class-for-drivers` — auto insurance and TLC car rental content has nothing to do with tax/immigration services. These appeared **within the last 2 days**.
2. **Edited legacy content:** `2023-income-tax-brackets` post modified `2026-08-02` (a 2023 article touched in 2026).
3. **WooCommerce junk:** shop sells a single product — **"Sticky Webcam with Light"** (not a tax service); shop page modified `2026-08-01`. `font-page` (typo-slug page) created `2026-08-01` and reused as the About page.
4. **Template leftovers:** "Add Your Heading Text Here" headings on live pages; "Proud member of" with no member listed; duplicate menus and footers; placeholder "Features / Pricing / Photo Gallery" template pages from Aug 2022.
5. **The specific spam pages cited in the brief (`us-visit-visa` with GoDaddy/domain-marketplace content, gambling content on a Mahreen Tax page) now return 404 or clean content** — either already remediated or injection rendered via Elementor shortcodes/JS that our static fetch cannot see. **This does NOT clear the installation**: injection can be stored in the DB or plugin code and only render for logged-in users or via shortcodes.

**Verdict:** Treat both installations as **potentially compromised**. Do not reuse the old WP install, plugins, theme, or database for the redesign. Plan a clean rebuild (§12 of brief).

---

## 3. Brand identity — three competing identities found live

| Brand seen | Where | Owner (as published) | Phone | Address | Email |
|---|---|---|---|---|---|
| **Nusra NY / Nusra Trading Inc** | nusrany.com (header/footer) | Aminul Islam Khan, CEO & President (About/`font-page`) | 347-740-9782 | 90-54 204 Street, Hollis NY 11423 | Nusarinc@gmail.com; info@nusrany.com |
| **Nusra Tax And Notary** | nusrany.com homepage hero/title | — | 3477409782 | — | — |
| **Mahreen Income Tax & Immigration Services / Mahreen Multi Services Inc** | mahreentax.com (entire site) | Mosharaf Chowdhury, CEO & President | 347-605-0969 (office), 718-600-9625 (cell) | 169-26 Hillside Avenue 2nd FL, Queens/Jamaica NY 11432 | mmultiservice20@gmail.com; info@mahreentax.com |

- nusrany.com **page content also mixes Mahreen branding** ("MAHREEN TAX AND IMMIGRATON SERVICES are here to help you" on the Individual Tax Services page) and **conflicting addresses within the same page** (body: "9054. 204 Street Hollis NY 11423" vs footer "90-54. 204 Street. Hollis NY 11423"; immigration page body lists the Hillside Avenue address while the footer lists Hollis).
- Two different CEOs (Khan vs Chowdhury), two offices, three phone numbers, four emails — across two near-identical sites. **Conflicts confirmed live.**

---

## 4. Content inventory (nusrany.com) — initial triage

### Pages
| URL | Purpose | Issue | Verdict |
|---|---|---|---|
| `/` (home) | Homepage | Lorem Ipsum, "95% Client Retention" unverified stat, brand drift | **Rewrite** |
| `/individual-tax-services/` | Tax service | Mahreen branding on Nusra site; "We assure the highest TAX Refunds"; "Make Appoinment" typo; "Add Your Heading Text Here" | **Rewrite** (redirect to new tax pages) |
| `/immigration-services/` | Immigration | Claims "expert paralegal team and Law school graduates"; Hillside address on Nusra site; not law-firm disclaimer missing | **Rewrite** (redirect to new form-assistance pages) |
| `/font-page/` | About (typo slug) | Template/placeholder, Nusra Trading Inc branding | **Rebuild as /about/** + 301 |
| `/blog/` | Blog index | Auto insurance / TLC rental posts | **Curate** or remove |
| `/features/`, `/pricing/`, `/photo-gallery/` | Template pages | Empty placeholder | **Remove** (410 or 301 to home) |
| `/shop/`, `/cart/`, `/checkout/`, `/my-account/` | WooCommerce | Unrelated ecommerce; webcam product | **Remove entirely** (deactivate WooCommerce) |
| `/product/sticky-webcam-with-light/` | Product | Non-service product | **Remove** |

### Posts (all recent, suspicious)
| URL | Date | Issue | Verdict |
|---|---|---|---|
| `/auto-insurance/` | 2026-08-01 | Unrelated to services | **Investigate as spam** / remove |
| `/notary-public/` | 2026-08-01 | Topic overlaps real notary service but post-2026 creation is suspicious | **Investigate**; rewrite as service page if legitimate |
| `/tlc-car-rentals/` | 2026-08-01 | Unrelated | **Investigate as spam** / remove |
| `/ddc-class-for-drivers/` | 2026-08-01 | Unrelated (drivers' education) | **Investigate as spam** / remove |
| `/2023-income-tax-brackets/` | mod 2026-08-02 | Outdated 2023 data, edited recently | **Remove/update** or 410 |
| `/us-citizenship-.../` (Bengali) | 2023 | Legacy Bengali class promo | **Rewrite** or redirect |
| `/get-50-off-your-income-tax-return/` | 2023 | Old promotion; 50% off claims | **Remove** (outdated promo) |

---

## 5. Legal/credential red flags (must be resolved by owner)

1. "We assure the highest TAX Refunds" — outcome/refund guarantee. **Prohibited.**
2. "expert paralegal team and Law school graduates" + Ayasha Aroni described as a "legal professional" on mahreentax.com — legal-representation implications without attorney/DOJ-accredited status. **Prohibited unless verified.**
3. Team titled "Immigration Expert" (Sumaya Siddiqa) while site says "we are not attorney." **Must be clarified.**
4. "IRS authorized E File Provider" claim (font-page) — verify EFIN/efile status before republishing.
5. "Master of Taxation degree and Master of Laws degree" staff claims — **unverified.**
6. No privacy policy / terms / accessibility statements found on nusrany.com (wpautoterms exists but pages were not listed in sitemap).
7. Username `khan8274` visible on posts — **author enumeration exposure**; another reason to rebuild clean.

---

## 6. Priority next actions (before ANY redesign)

1. **Owner verification** — complete the Verified Business Information sheet (see `02-verification-sheet.md`). No copy, no design details (NAP, credentials) can be finalized before this.
2. **Choose one canonical brand + one canonical domain** — Nusra NY *or* Mahreen; redirect the other.
3. **Security incident response** — change ALL passwords (hosting, WP, DB, FTP, email, DNS), enable 2FA, audit admin accounts, scan files/DB, remove unused plugins/themes, review scheduled tasks. Back up current site for forensics FIRST.
4. **Clean rebuild** — fresh install, fresh DB, minimal trusted plugins, reputable lightweight theme, manually reviewed content only, no executable files copied from the old install.
5. **Final service list (client-confirmed)** — the rebuilt site carries only: Tax Preparation · Immigration Form Assistance · Notary Public · Defensive Driving · TLC & Transportation · Business Formation/Corporate Setup · IT Staffing · Import/Export. **ITIN services are NOT in scope** (removed by client decision, Aug 3, 2026) — do not rebuild the old `/itin/` page or its CAA claim.

---

*Full deliverable set, content inventory, redirect map, sitemap, page briefs, copy, wireframes, and SEO specs will be produced after Step 1 (verification) is complete.*
