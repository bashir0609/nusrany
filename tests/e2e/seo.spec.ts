import { expect, test } from '@playwright/test'

test('homepage emits a canonical link and meta description', async ({ page }) => {
  await page.goto('/')
  const canonical = page.locator('link[rel="canonical"]')
  await expect(canonical).toHaveAttribute('href', /https?:\/\/localhost:3000\/?$/)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/)
})

test('homepage emits LocalBusiness JSON-LD', async ({ page }) => {
  await page.goto('/')
  const ldJson = await page.locator('script[type="application/ld+json"]').allTextContents()
  const payloads = ldJson.map((text) => JSON.parse(text))
  const business = payloads.find((p) => p['@type'] === 'LocalBusiness')
  expect(business).toBeTruthy()
  expect(business.name).toBe('Nusra Tax & Notary')
  expect(business.address.addressLocality).toBe('Hollis')
})

test('service page emits Service JSON-LD', async ({ page }) => {
  await page.goto('/tax-preparation')
  const ldJson = await page.locator('script[type="application/ld+json"]').allTextContents()
  const payloads = ldJson.map((text) => JSON.parse(text))
  expect(payloads.some((p) => p['@type'] === 'Service' && p.name === 'Tax Preparation')).toBe(true)
})

test('robots.txt disallows admin and api and points to the sitemap', async ({ page, request }) => {
  const response = await request.get('/robots.txt')
  expect(response.ok()).toBe(true)
  const body = await response.text()
  expect(body).toContain('Disallow: /admin/')
  expect(body).toContain('Disallow: /api/')
  expect(body).toContain('Sitemap:')
})

test('sitemap.xml lists published service and static routes', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  expect(response.ok()).toBe(true)
  const body = await response.text()
  expect(body).toContain('/tax-preparation')
  expect(body).toContain('/about')
  expect(body).toContain('/contact')
  expect(body).not.toContain('/admin')
  expect(body).not.toContain('/api/request-assistance')
})

test('legacy URLs redirect permanently to their new destinations', async ({ request }) => {
  const cases = [
    ['/about-us', '/about'],
    ['/make-appoinment', '/contact'],
    ['/setting-up-corporations', '/business-services'],
    ['/community-services', '/services'],
    ['/us-visit-visa', '/immigration-form-assistance'],
    ['/student-visa', '/immigration-form-assistance'],
    ['/2023-income-tax-brackets', '/tax-preparation'],
    ['/font-page', '/about'],
    ['/individual-tax-services', '/tax-preparation'],
    ['/tlc-car-rentals', '/tlc-transportation'],
    ['/ddc-class-for-drivers', '/defensive-driving'],
  ]
  for (const [from, to] of cases) {
    const response = await request.get(from, { maxRedirects: 0 })
    expect(response.status(), `${from} should redirect`).toBe(308)
    expect(response.headers()['location'], `${from} should land on ${to}`).toContain(to)
  }
})
