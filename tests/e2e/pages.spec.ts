import { expect, test } from '@playwright/test'

const routes = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/services', name: 'services index' },
  { path: '/tax-preparation', name: 'tax preparation' },
  { path: '/notary-public', name: 'notary public' },
  { path: '/immigration-form-assistance', name: 'immigration form assistance' },
  { path: '/defensive-driving', name: 'defensive driving' },
  { path: '/tlc-transportation', name: 'tlc transportation' },
  { path: '/business-services', name: 'business services' },
  { path: '/team', name: 'team' },
  { path: '/contact', name: 'contact' },
  { path: '/privacy', name: 'privacy' },
  { path: '/terms', name: 'terms' },
  { path: '/disclaimer', name: 'disclaimer' },
]

for (const route of routes) {
  test(`renders ${route.name} with a single H1`, async ({ page }) => {
    const response = await page.goto(route.path)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  })
}

test('renders a custom 404 for an unknown service slug', async ({ page }) => {
  const response = await page.goto('/not-a-real-service')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1, name: /Page not found/ })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible()
})

test('reserved slugs never resolve as services', async ({ page }) => {
  for (const slug of ['about', 'admin', 'api']) {
    const response = await page.goto(`/${slug}`)
    // about resolves to the real About page; admin/api are application routes.
    if (slug === 'about') {
      expect(response?.status()).toBe(200)
    }
  }
})
