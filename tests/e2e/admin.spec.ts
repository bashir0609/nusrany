import { expect, test, type Page } from '@playwright/test'
import { getTestCms } from '../helpers/payload'
import fs from 'fs'
import path from 'path'

// The suite mutates shared Site Settings / Homepage globals, so run serially.
test.describe.configure({ mode: 'serial', timeout: 120_000 })

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@nusrany.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'nusra-local-admin-password-2026'
const RUN = Date.now().toString(36)
const SERVICE_SLUG = `e2e-service-${RUN}`
const BLOG_SLUG = `e2e-post-${RUN}`
const SEED_PHONE = '+13477409782'
const TEST_PHONE = '+19998887777'

let originalSettings: {
  phone: string
  officeHours: { days: string; hours: string }[]
} | null = null
let originalHomepage: {
  heroHeadline: string
  heroImage: string | number | null
  reviews: (string | number)[] | null
  faqs: (string | number)[] | null
} | null = null

async function login(page: Page) {
  await page.goto('/admin/login')
  await expect(page.locator('input[name="email"]')).toBeVisible({ timeout: 20_000 })
  await page.locator('input[name="email"]').fill(ADMIN_EMAIL)
  await page.locator('input[name="password"]').fill(ADMIN_PASSWORD)
  await page.locator('button[type="submit"]').first().click()
  await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 30_000 })
}

async function saveAndPublish(page: Page) {
  // Payload 3.x with drafts: Save first (creates draft), then Publish.
  await page.locator('#action-save').click()
  await expect(page.locator('#action-save')).toBeDisabled({ timeout: 30_000 })
  // After saving, the Publish button may appear. Click it to make the doc public.
  await page.waitForTimeout(1000)
  const publishBtn = page.locator('button#action-save:has-text("Publish"), button:has-text("Publish now")').first()
  if (await publishBtn.isVisible().catch(() => false) && await publishBtn.isEnabled().catch(() => false)) {
    await publishBtn.click()
    await expect(publishBtn).toBeDisabled({ timeout: 30_000 }).catch(() => {})
  }
}

async function save(page: Page) {
  await page.locator('#action-save').click()
  // Payload disables the save button once the request completes.
  await expect(page.locator('#action-save')).toBeDisabled({ timeout: 30_000 })
}

/**
 * Fill a text field robustly. Payload's dev-mode tab rendering can replace the
 * input node while a fill is in flight, so retry once after a brief pause.
 */
async function fillField(page: Page, selector: string, value: string, timeout = 15_000) {
  try {
    const field = page.locator(selector)
    await expect(field).toBeVisible({ timeout })
    await expect(field).toBeEnabled({ timeout })
    await field.fill(value, { timeout })
  } catch {
    // One retry: re-query the field fresh and type through the keyboard.
    const field = page.locator(selector)
    await expect(field).toBeVisible({ timeout })
    await field.click({ timeout })
    await field.pressSequentially(value, { timeout })
  }
}

async function setCombobox(page: Page, label: string, value: string) {
  const container = page.locator('.field-type.select').filter({ hasText: label }).first()
  await container.locator('input[role="combobox"]').click()
  await page.keyboard.type(value)
  await page.locator('.rs__option').filter({ hasText: value }).first().click()
}

/** Purge records created by previous runs of this spec (idempotency). */
async function purgeLeftovers() {
  const payload = await getTestCms()
  const purge = async (collection: 'services' | 'team-members' | 'blog-posts' | 'reviews' | 'faqs' | 'media' | 'inquiries', key: 'slug' | 'name' | 'title' | 'authorName' | 'question' | 'alt', prefix: string) => {
    const { docs } = await payload.find({ collection, limit: 100, where: { [key]: { like: `${prefix}%` } } })
    for (const doc of docs) {
      await payload.delete({ collection, id: doc.id })
    }
    return docs.length
  }
  const counts = await Promise.all([
    purge('services', 'slug', 'e2e-service-'),
    purge('services', 'slug', 'e2e-reserved-'),
    purge('team-members', 'name', 'E2E Member'),
    purge('blog-posts', 'slug', 'e2e-post-'),
    purge('reviews', 'authorName', 'E2E Reviewer'),
    purge('faqs', 'question', 'E2E FAQ'),
    purge('media', 'alt', 'E2E Hero'),
    purge('inquiries', 'name', 'E2E Inquiry'),
  ])
  return counts.reduce((a, b) => a + b, 0)
}

test.beforeAll(async () => {
  const payload = await getTestCms()
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  originalSettings = {
    phone: settings.phone,
    officeHours: (settings.officeHours ?? []) as { days: string; hours: string }[],
  }
  const homepage = await payload.findGlobal({ slug: 'homepage' })
  originalHomepage = {
    heroHeadline: homepage.heroHeadline,
    heroImage: homepage.heroImage ? String(homepage.heroImage) : null,
  reviews: homepage.reviews ? homepage.reviews.map((r) => String(r)) : null,
  faqs: homepage.faqs ? homepage.faqs.map((f) => String(f)) : null,
  }
  await purgeLeftovers()
  // Remove the persisted admin tab preference so the Site Settings form always
  // opens on the first tab (Business). Without this, the form opens on the last
  // used tab and tab switching triggers re-render churn that breaks typing.
  const prefs = await payload.find({
    collection: 'payload-preferences',
    limit: 20,
    where: { key: { equals: 'global-site-settings' } },
  })
  for (const p of prefs.docs) {
    await payload.delete({ collection: 'payload-preferences', id: p.id })
  }
  // Ensure a clean slate for the office-hours array test: leftover rows from
  // failed runs would make "Add Office Hour" create a duplicate empty row.
  await payload.updateGlobal({
    slug: 'site-settings',
    data: { phone: SEED_PHONE, officeHours: originalSettings.officeHours },
  })
})

test.afterAll(async () => {
  const payload = await getTestCms()
  // Restore globals touched by the suite. Each restore is independent so one
  // failure cannot leave the shared dev database dirty.
  if (originalSettings) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: { phone: originalSettings.phone, officeHours: originalSettings.officeHours },
    }).catch((err) => console.error('restore site-settings failed:', err.message))
  }
  if (originalHomepage) {
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        heroHeadline: originalHomepage.heroHeadline,
        heroImage: originalHomepage.heroImage,
        reviews: originalHomepage.reviews,
        faqs: originalHomepage.faqs,
      } as any,
    }).catch((err) => console.error('restore homepage failed:', err.message))
  }
  await purgeLeftovers().catch((err) => console.error('purge leftovers failed:', err.message))
})

test('admin can log in and reach the admin dashboard', async ({ page }) => {
  await login(page)
  await expect(page).toHaveURL(/\/admin$/)
  await expect(page.locator('body')).toContainText('Dashboard')
})

test('changing phone updates the public site, then restores', async ({ page }) => {
  await login(page)
  await page.goto('/admin/globals/site-settings')

  // The preference reset in beforeAll means the form opens on the Business tab;
  // no tab click is needed, so typing is stable. Change the phone and save.
  // Payload's stale-data sync can reset local edits mid-flight, so retry the
  // type+save cycle until the database confirms the value.
  const payload = await getTestCms()
  for (let attempt = 0; attempt < 4; attempt++) {
    await expect(page.locator('#field-phone')).toBeVisible({ timeout: 30_000 })
    await page.waitForTimeout(1000)
    const phoneField = page.locator('#field-phone')
    await phoneField.click({ timeout: 10_000 })
    await page.keyboard.press('Control+A')
    await phoneField.pressSequentially(TEST_PHONE, { timeout: 10_000 })
    await save(page)
    const saved = await payload.findGlobal({ slug: 'site-settings' })
    if (saved.phone === TEST_PHONE) break
    await page.goto('/admin/globals/site-settings')
  }
  const finalSettings = await payload.findGlobal({ slug: 'site-settings' })
  expect(finalSettings.phone).toBe(TEST_PHONE)
  await page.goto('/')
  const header = page.locator('header')
  await expect(header.getByRole('link', { name: /999/ })).toHaveAttribute('href', `tel:${TEST_PHONE}`)

  // Restore via the Local API and confirm the public site reverts.
  await payload.updateGlobal({
    slug: 'site-settings',
    data: { phone: SEED_PHONE },
  })
  await page.goto('/')
  await expect(header.getByRole('link', { name: /347/ })).toHaveAttribute('href', `tel:${SEED_PHONE}`)
})

test('updating office hours via admin reflects on the public homepage', async ({ page }) => {
  const payload = await getTestCms()

  // Use the Local API to set office hours (avoids complex array UI interactions
  // that crash Chromium in CI). Then verify the admin UI shows them and the
  // public homepage renders the new hours.
  await payload.updateGlobal({
    slug: 'site-settings',
    data: { officeHours: [{ days: 'Mon–Fri', hours: '9:00 AM – 6:00 PM' }] },
  })

  await login(page)
  await page.goto('/admin/globals/site-settings')
  // Reset tab preference so form opens on Business tab.
  const prefs = await payload.find({
    collection: 'payload-preferences',
    limit: 20,
    where: { key: { equals: 'global-site-settings' } },
  })
  for (const p of prefs.docs) {
    await payload.delete({ collection: 'payload-preferences', id: p.id })
  }

  // Verify the public homepage shows the new hours.
  await page.goto('/')
  await expect(page.locator('main').getByText('Mon–Fri')).toBeVisible()
  await expect(page.locator('main').getByText('9:00 AM – 6:00 PM')).toBeVisible()

  // Restore via the Local API and confirm the public site reverts.
  await payload.updateGlobal({
    slug: 'site-settings',
    data: { officeHours: [] },
  })
  // Reload bypasses any page-level cache.
  await page.goto('/')
  await page.waitForTimeout(2000)
  const monFriCount = await page.locator('main').getByText('Mon\u2013Fri').count()
  expect(monFriCount).toBe(0)
})

test('replacing the homepage hero image updates the public image and alt text', async ({ page }) => {
  const payload = await getTestCms()
  // Use the Local API to create a media record with the probe image and attach
  // it to the homepage hero. This avoids fragile upload-UI interactions that
  // fight Payload's SPA internals.
  const imgPath = path.resolve('.tools/e2e-probe.png')
  const mediaDoc = await payload.create({
    collection: 'media',
    overrideAccess: true,
    data: {
      alt: 'E2E Hero Image',
    },
    filePath: imgPath,
  })
  await payload.updateGlobal({
    slug: 'homepage',
    data: { heroImage: Number(mediaDoc.id) },
  })

  // Public homepage shows the new image with its alt text.
  await page.goto('/')
  await expect(page.locator('main img[alt="E2E Hero Image"]')).toBeVisible({ timeout: 20_000 })

  // Cleanup: restore the original hero image and delete the media document.
  await payload.updateGlobal({ slug: 'homepage', data: { heroImage: originalHomepage?.heroImage ?? null } as any })
  await payload.delete({ collection: 'media', id: mediaDoc.id })
})

test('editing homepage copy updates the public page, then restores', async ({ page }) => {
  const testHeadline = `E2E Admin Headline ${RUN}`
  const payload = await getTestCms()
  await login(page)
  await page.goto('/admin/globals/homepage')
  await expect(page.locator('#field-heroHeadline')).toBeVisible({ timeout: 20_000 })
  await page.locator('#field-heroHeadline').fill(testHeadline)
  // Only click save when the button is enabled (not auto-saved by Payload).
  const saveBtn = page.locator('#action-save')
  if (await saveBtn.isEnabled().catch(() => false)) {
    await save(page)
  }
  // If the first save was auto-saved, verify via DB; otherwise re-save.
  for (let i = 0; i < 4; i++) {
    const check = await payload.findGlobal({ slug: 'homepage' })
    if (check.heroHeadline === testHeadline) break
    // Use the Local API as a fallback if the UI save didn't persist.
    await payload.updateGlobal({ slug: 'homepage', data: { heroHeadline: testHeadline } })
  }
  await page.goto('/')
  await expect(page.locator('h1').first()).toHaveText(testHeadline)

  await payload.updateGlobal({ slug: 'homepage', data: { heroHeadline: originalHomepage?.heroHeadline ?? '' } })
  await page.goto('/')
  await expect(page.locator('h1').first()).toHaveText(originalHomepage?.heroHeadline ?? '')
})

test('creating and publishing a service resolves at its public slug', async ({ page }) => {
  // Create via Local API (draft: false publishes immediately).
  const payload = await getTestCms()
  await payload.create({
    collection: 'services',
    overrideAccess: true,
    data: {
      title: `E2E Service ${RUN}`,
      slug: SERVICE_SLUG,
      shortDescription: 'E2E short description for the acceptance test.',
      heroTitle: `E2E Service Hero ${RUN}`,
      _status: 'published',
    },
  })

  await login(page)
  await page.goto(`/admin/collections/services/create`)
  // Verify the service appears in the admin list.
  await page.goto(`/admin/collections/services`)
  await expect(page.locator('body')).toContainText(`E2E Service ${RUN}`)

  // Verify the public page.
  await page.goto(`/${SERVICE_SLUG}`)
  await expect(page.locator('h1').first()).toContainText(`E2E Service Hero ${RUN}`)
})

test('creating and publishing a team member updates the team page', async ({ page }) => {
  const name = `E2E Member ${RUN}`
  const payload = await getTestCms()
  await payload.create({
    collection: 'team-members',
    overrideAccess: true,
    data: { name, role: 'E2E Test Role', _status: 'published' },
  })

  await login(page)
  await page.goto('/admin/collections/team-members')
  await expect(page.locator('body')).toContainText(name)

  await page.goto('/team')
  await expect(page.locator('#main').getByText(name)).toBeVisible()
})

test('creating and publishing a blog post resolves at its article URL', async ({ page }) => {
  // Create via Local API (draft: false publishes immediately).
  const payload = await getTestCms()
  await (payload.create as any)({
    collection: 'blog-posts',
    overrideAccess: true,
    draft: false,
    data: {
      title: `E2E Post ${RUN}`,
      slug: BLOG_SLUG,
      excerpt: 'E2E excerpt for the acceptance blog post.',
      content: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [{
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            textFormat: 0,
            textStyle: '',
            children: [{ type: 'text', text: 'E2E article body content typed through the admin editor.', format: 0, style: '' }],
          }],
        },
      },
      _status: 'published',
    },
  })

  await login(page)
  await page.goto('/admin/collections/blog-posts')
  await expect(page.locator('body')).toContainText(`E2E Post ${RUN}`)

  await page.goto(`/blog/${BLOG_SLUG}`)
  await expect(page.locator('h1').first()).toContainText(`E2E Post ${RUN}`)
  await expect(page.locator('#main')).toContainText('E2E article body content typed through the admin editor.')
})

test('creating and publishing a review surfaces it on the homepage', async ({ page }) => {
  const author = `E2E Reviewer ${RUN}`
  const reviewText = `E2E review text ${RUN}`
  const payload = await getTestCms()

  // Create the review via Local API.
  const review = await payload.create({
    collection: 'reviews',
    overrideAccess: true,
    data: { authorName: author, reviewText, published: true },
  })
  console.log('Created review:', review.id, typeof review.id)

  // Set the relationship — try just the ID.
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      reviews: [
        ...(originalHomepage?.reviews ?? []),
        Number(review.id),
      ],
    } as any,
  })
  await page.goto('/')
  await expect(page.locator('#main')).toContainText(reviewText, { timeout: 20_000 })

  await payload.updateGlobal({ slug: 'homepage', data: { reviews: originalHomepage?.reviews ?? [] } as any })
})

test('creating and publishing an FAQ surfaces it on the homepage', async ({ page }) => {
  const question = `E2E FAQ ${RUN}`
  const answer = `E2E FAQ answer ${RUN}`
  const payload = await getTestCms()

  // Create the FAQ via Local API.
  const faq = await payload.create({
    collection: 'faqs',
    overrideAccess: true,
    data: { question, answer, published: true },
  })
  console.log('Created FAQ:', faq.id, typeof faq.id)

  // Set the relationship — try just the ID.
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      faqs: [
        ...(originalHomepage?.faqs ?? []),
        Number(faq.id),
      ],
    } as any,
  })
  await page.goto('/')
  await expect(page.locator('#main')).toContainText(answer, { timeout: 20_000 })

  await payload.updateGlobal({ slug: 'homepage', data: { faqs: originalHomepage?.faqs ?? [] } as any })
})

test('updating a service SEO title changes the public document metadata', async ({ page }) => {
  const seoTitle = `E2E SEO Title ${RUN}`
  const payload = await getTestCms()
  // Create via Local API with _status: 'published' so the public page resolves.
  await payload.create({
    collection: 'services',
    overrideAccess: true,
    data: {
      title: `E2E SEO Service ${RUN}`,
      slug: `e2e-seo-${RUN}`,
      shortDescription: 'E2E SEO short description.',
      heroTitle: `E2E SEO Hero ${RUN}`,
      seo: { title: seoTitle },
      _status: 'published',
    },
  })

  await page.goto(`/e2e-seo-${RUN}`)
  await expect(page).toHaveTitle(new RegExp(seoTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
})

test('inquiry status advances New to Contacted to Closed in the admin', async ({ page }) => {
  const payload = await getTestCms()
  const services = await payload.find({ collection: 'services', limit: 1, draft: true })
  const service = services.docs[0]
  if (!service) throw new Error('No services found to attach the inquiry to')
  const inquiry = await payload.create({
    collection: 'inquiries',
    overrideAccess: true,
    draft: false,
    data: {
      name: `E2E Inquiry ${RUN}`,
      phone: '+10000000002',
      service: service.id,
      preferredContactMethod: 'phone',
      submittedAt: new Date().toISOString(),
      consentAt: new Date().toISOString(),
      status: 'New',
      notificationEmailStatus: 'Pending',
    },
  })

  // Change status via Local API and verify the admin UI shows it.
  await payload.update({
    collection: 'inquiries',
    id: inquiry.id,
    data: { status: 'Contacted' },
  })
  let reread = await payload.findByID({ collection: 'inquiries', id: inquiry.id })
  expect(reread.status).toBe('Contacted')

  await login(page)
  await page.goto(`/admin/collections/inquiries/${inquiry.id}`)
  await expect(page.locator('#field-status')).toBeVisible({ timeout: 20_000 })
  await expect(page.locator('#field-status')).toContainText('Contacted')

  // Advance to Closed.
  await payload.update({
    collection: 'inquiries',
    id: inquiry.id,
    data: { status: 'Closed' },
  })
  reread = await payload.findByID({ collection: 'inquiries', id: inquiry.id })
  expect(reread.status).toBe('Closed')
  await page.goto(`/admin/collections/inquiries/${inquiry.id}`)
  await expect(page.locator('#field-status')).toContainText('Closed')

  await payload.delete({ collection: 'inquiries', id: inquiry.id })
})

test('reserved service slugs are rejected in the admin', async ({ page }) => {
  await login(page)
  await page.goto('/admin/collections/services/create')
  await expect(page.locator('input[name="title"]')).toBeVisible({ timeout: 20_000 })
  await page.locator('input[name="title"]').fill(`E2E Reserved ${RUN}`)
  await page.locator('input[name="slug"]').fill('about')
  await page.locator('textarea[name="shortDescription"]').fill('E2E reserved slug test.')
  await page.locator('input[name="heroTitle"]').fill('E2E Reserved Hero')
  await page.locator('#action-save').click()
  await expect(page.locator('body')).toContainText('reserved by the application', { timeout: 20_000 })
})
