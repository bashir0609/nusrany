# Content Verification Checklist

Every item below must be confirmed with the client (owner) before it is published on the live site.
Anything not verified stays **hidden** — the code renders sections only when the CMS value is present.

**Source of confirmed facts:** `docs/02-verification-sheet.md` (final confirmed profile, Aug 3, 2026).
The sheet confirms identity, NAP, services, and credentials; final **wording** for the items below still
needs sign-off before launch. The plan directive is: *hide until verified* for every credential/price/date item.

| # | Item | Where it renders | Current state | Action before launch |
|---|------|------------------|---------------|----------------------|
| 1 | CEO title ("CEO, Nusra Trading Inc.") | About, Team | Seeded and confirmed as Aminul Islam Khan, CEO | Keep the exact confirmed wording |
| 2 | Current office hours (Mon–Fri 11:30 AM–5:30 PM) | Contact, homepage office section, footer | Verification sheet confirms values; **seed leaves CMS field empty** so the section hides until entered | Client enters hours in Site Settings (one field) |
| 3 | Final logo file | Header/footer | Approved lime/teal arrow mark exists in `redesign/`; brand colors extracted (`#0f2b46`, `#12707a`, `#189090`, `#A8C838`, `#e8922a`) | Upload final logo to Media in CMS; replace token values with exact logo-extracted values |
| 4 | IRS e-file wording ("Authorized IRS e-file Provider") | About credentials, trust strip | Verification sheet: yes, authorized. **Seed leaves credential labels empty** | Enter exact approved wording in CMS; verify EFIN/efile status with client |
| 5 | PTIN wording if used | About, service pages | Verification sheet: Aminul Islam Khan holds a current PTIN | Confirm exact wording (currently not rendered) |
| 6 | NY Notary wording (certified, bonded, online notarization) | Notary service page, About | Verification sheet confirms | Confirm exact wording |
| 7 | Defensive-driving provider/course wording | Defensive driving page | Approved wording: "through our approved course-provider relationship" (open item: PIRP provider name) | Do NOT publish another company's name/logo until provider confirmed |
| 8 | TLC-related claims | TLC service page, About | Verification sheet confirms Nusra Trading Inc. is licensed/insured/TLC-authorized | Supporting licensing documentation placed in project records before launch |
| 9 | Team names/titles | Team, homepage | Only owner seeded; no other staff confirmed | Add staff only with verified names, roles, photos, languages |
| 10 | Review source/permission | Reviews section (homepage) | Owner confirmed genuine reviews exist + display permission granted; texts/names/links still being collected | Add real reviews with platform links only; never fabricate |
| 11 | Current prices | Service pages | **None seeded** (no price claims in v1 seed) | If prices are published, final offer must state regular price, promo price, what's included, eligibility, expiration |
| 12 | Current dates (course dates, promos) | Defensive driving, promotions | **None seeded** (no sample dates/prices in v1 seed) | Only publish real confirmed dates; never sample dates |

## Promotional wording (placeholder terms)

The 50% new-client discount is confirmed (expiration 12/31/2026). Recommended wording pending client sign-off:
"New clients may receive up to 50% off qualifying tax-preparation services through December 31, 2026.
Prices vary according to return complexity, forms and schedules. Contact us for a confirmed quote."
Do not publish prototype prices (e.g., "W-2 from $100") until the client confirms final pricing.

## Global rules

- No Mahreen branding, no 169-26 Hillside Avenue address, no Your Best Ride Inc. references.
- No placeholder reviews, prices, dates, maps, or unverified credential claims.
- Public form warns against submitting sensitive information (SSN, passport, tax/immigration documents, banking details).
- Immigration copy never implies legal representation or legal advice.
