# Image Inventory — images/ folder

**Count:** 33 files · **Audited:** August 3, 2026 (dimensions, format, duplicates)

---

## 1. Logos (7 files)

| File | Size | Notes |
|---|---|---|
| `Nusra-NY-Logo.png` | 500×500 RGBA | White background baked in (alpha all 255) — NOT transparent |
| `cropped-Nusra-NY-Logo.png` | 230×202 RGBA | Small crop, white bg |
| `cropped-cropped-Nusra-NY-Logo.png` | 512×512 RGBA | White bg |
| `nusra_logo.jpg` | 500×500 RGB | Original-style logo (lime/teal arrow) |
| `nusra_logo-e1684859832969.jpg` | 220×233 RGB | **The reference logo** you attached |
| `cropped-nusra_logo-e1684859832969.jpg` | 98×96 RGB | Tiny crop, low-res |
| `unnamed.png.webp` / `unnamed-2.png.webp` | 75×75 RGBA | Tiny webp icons |

> **Action:** Use the NEW logos I generated (`redesign/nusra-logo-arrow*.svg` + `exports/*.png`) instead — transparent background, any size, consistent brand. The old PNGs all have white boxes baked in.

## 2. Owner / team photos (3 files)

| File | Size | Notes |
|---|---|---|
| `aminul-islam-khan.png` | 1382×1548 P | Owner portrait (large, good quality) |
| `aminum-islam-khan-1.png` | 1382×1548 P | ⚠️ **IDENTICAL duplicate** of above (typo filename "aminum") — delete one |
| `man_002.jpg` | 600×600 RGB | Possible team/staff photo |

> **Action:** These can be the real owner/team photos the brief requires (no stock imagery). Confirm `man_002.jpg` identity before use.

## 3. Business cards (2 files)

| File | Size | Notes |
|---|---|---|
| `business-card.png` | 1126×944 P | The green "Nusra Tax & Notary" card you attached |
| `business-card-1.png` | 1902×1578 RGBA | Higher-res version of the same card |

> **Action:** Superseded by the new card in `redesign/exports/business-card-*.png`.

## 4. Service / stock photos (9 files)

| File | Size | Likely content |
|---|---|---|
| `income-tax.jpg` | 450×300 | Tax-themed photo |
| `immigration-form.jpg` | 1500×1000 | Immigration paperwork |
| `passport.jpg` | 450×300 | Passport imagery |
| `t04.jpg`, `t05.jpg` | 450×300 | Tax/service imagery |
| `ab01.jpg`, `ab03.jpg` | 492×544 | About-page photos |
| `about-us-2.jpg` | 600×400 | About-page photo |
| `blg01.jpg` | 1024×824 | Blog image |

> **Action:** Verify licenses before reuse; brief prefers real local photos over stock.

## 5. ⚠️ Banners matching the suspicious recent posts (3 files)

| File | Size | Notes |
|---|---|---|
| `notary-public-banner.png` | 2232×2224 P | Matches `notary-public` post (Aug 1, 2026) |
| `defensive-driving-course-banner.png` | 1508×2248 P | Matches `ddc-class-for-drivers` post (Aug 1, 2026) |
| `tlc-car-and-plate-rental-banner.png` | 2156×1908 RGBA | Matches `tlc-car-rentals` post (Aug 1, 2026) |

> ⚠️ These are the images behind the **potentially injected/unrelated posts** identified in the audit. Do NOT reuse without confirming the client actually offers these services.

## 6. IRS / e-file badges (3 files)

| File | Size | Notes |
|---|---|---|
| `irs.png` | 225×225 P | IRS logo mark |
| `irs-efile-provider.png` | 1662×960 P | "Authorized IRS e-file Provider" badge |
| `irs-efile-provider-1.png` | 1662×960 P | Duplicate-ish badge |

> ⚠️ **Do not publish until EFIN/e-file status is verified** (verification sheet §C). Unverified government-affiliation imagery is exactly what the brief prohibits.

## 7. USBCCI logos (3 files) — potential real trust asset

| File | Size | Notes |
|---|---|---|
| `USBCCI-LOGO-512px.png` | 512×512 P | USBCCI = U.S.–Bangladesh Chamber of Commerce & Industry |
| `USBCCI-LOGO-FINAL-1.png` | 500×381 RGBA | Same |
| `usbcci_logo_image.jpg` | 1340×254 RGB | Wide version |

> **Action:** If the client is a USBCCI member, this is a **verified community/professional membership** — a strong trust-strip item (§6.4). Confirm membership before publishing.

## 8. 🗑️ WooCommerce junk (2 files)

| File | Size | Notes |
|---|---|---|
| `Momment-USA-Laptop-Light-...-Nasura-NY.png` | 542×595 RGBA | Webcam ring-light product photo |
| `Momment-USA-Nusra-NY-Laptop-Light-...png` | 610×549 RGBA | Same product, another shot |

> 🗑️ These are the **sticky webcam product** images from the compromised shop. **Do not use.** Delete with the WooCommerce cleanup.

---

## Summary

| Category | Count | Reusable? |
|---|---|---|
| Owner/team photos | 3 (1 dup) | ✅ after confirmation |
| Logos | 7 | ❌ superseded by new logo |
| Business cards | 2 | ❌ superseded by new card |
| Service/stock photos | 9 | ⚠️ verify licenses |
| Suspicious banners | 3 | ❌ until services confirmed |
| IRS badges | 3 | ⚠️ until EFIN verified |
| USBCCI membership | 3 | ✅ if membership confirmed |
| WooCommerce junk | 2 | ❌ delete |
