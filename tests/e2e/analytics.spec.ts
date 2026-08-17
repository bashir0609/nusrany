import { expect, test } from '@playwright/test'

test('Google Analytics gtag loads only when a GA ID is configured', async ({ page }) => {
  await page.goto('/')
  const loader = page.locator('script[src*="googletagmanager.com/gtag/js"]')
  const init = page.locator('script#gtag-init')

  if (process.env.NEXT_PUBLIC_GA_ID) {
    await expect(loader).toHaveCount(1)
    await expect(init).toHaveCount(1)
  } else {
    await expect(loader).toHaveCount(0)
    await expect(init).toHaveCount(0)
  }
})
