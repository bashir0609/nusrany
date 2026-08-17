# CMS Handoff — Managing the Nusra Website

This guide is for the Nusra team. It explains how to update the website content
yourself (no code or GitHub access needed). If you ever need layout, navigation, or
design changes, contact the development team — the content in this guide is
self-service; the code is not.

## Logging in

1. Go to `https://nusrany.com/admin`.
2. Sign in with the email and password the team set up with you.
3. Change your password after your first login (top-right account menu).

## What you can edit yourself

| Area | Where in the admin |
| --- | --- |
| Phone, address, hours, WhatsApp, email, social links, spoken languages | **Globals → Site Settings** |
| Services (add, edit, publish, reorder) | **Collections → Services** |
| Team members | **Collections → Team Members** |
| Blog posts and categories | **Collections → Blog Posts** / **Blog Categories** |
| Reviews shown on the site | **Collections → Reviews** |
| FAQ questions | **Collections → FAQs** |
| Homepage / About / Contact text and images | **Globals → Homepage / About Page / Contact Page** |
| Privacy, Terms, Disclaimer text | **Globals → Legal Content** |
| Incoming request forms | **Collections → Inquiries** |

## Publishing workflow (drafts)

Services, team members, and blog posts use drafts:

- **Save Draft** keeps changes private — visitors never see them.
- **Publish** makes the content live immediately.
- Use **Preview** (top of the editor) to see a draft exactly as visitors will
  before publishing.

Reviews and FAQs have a simple **Published** checkbox — leave it off until the item
is final. Do not use placeholder or test content with the checkbox on.

## Images

- Accepted formats: **JPEG, PNG, WebP, AVIF**. SVG files are rejected (they can
  hide scripts and are a security risk).
- Maximum file size: **10 MB**.
- Always fill in the **Alt text** for photos (required for accessibility). For a
  purely decorative image that needs no alt text, check **Decorative**.

## Handling inquiries (the request form)

Incoming requests from the website appear in **Collections → Inquiries**. Each record
shows the customer's name, phone, chosen service, and message.

- Work through the **New → Contacted → Closed** status as you follow up.
- The inquiry is the source of truth. The email you receive is a convenience
  notification only — it may occasionally fail even though the inquiry was saved.
- **Privacy rule:** the public form deliberately collects only basic contact
  details. Customers are warned not to send Social Security numbers, passport
  numbers, tax documents, immigration documents, banking details, or other highly
  sensitive personal information through the form. Do not ask customers to send such
  data through the site, and never paste it into an inquiry record.
- Inquiries are kept up to 12 months, then may be removed. You can delete or close
  a record at any time.

## Content rules (please read)

- **Credentials:** tax, notary, licensing, defensive-driving, and TLC claims must be
  verified and approved before publishing. If a claim isn't verified yet, leave it
  out.
- **Prices and dates:** do not publish prices, class dates, or seasonal offers until
  the exact wording is confirmed. Nothing on the site should ever show a
  placeholder.
- **Immigration services** copy must not suggest legal representation or legal
  advice. Keep descriptions to practical form-assistance language.
- The **spoken-language labels** are fixed to English, বাংলা, Español, हिन्दी, and
  Français — do not replace them with flag images or extra languages.

## If something looks wrong

- A page shows old or missing content → check the record is **published**, then
  reload the page.
- An image won't upload → check the format (no SVG) and size (≤10 MB).
- You need a new page type, a layout change, or a new form field → contact the
  development team; those are code-controlled.

## SEO basics

- Each service, team member, and blog post has a **SEO** section (title ≤ 60
  characters, description ≤ 160 characters). Fill these in with honest, descriptive
  text — they are what search engines show.
- Do not stuff keywords or copy competitors' text; the site's rankings rely on
  accurate, local, useful content.
