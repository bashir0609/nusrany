import { expect, test } from '@playwright/test'

test('contact page shows the sensitive-data warning near the form', async ({ page }) => {
  await page.goto('/contact')
  await expect(
    page.getByText(/do not submit Social Security numbers, passport numbers/i),
  ).toBeVisible()
})

test('contact form has no upload input', async ({ page }) => {
  await page.goto('/contact')
  expect(await page.locator('input[type="file"]').count()).toBe(0)
})

test('contact form validates required fields and focuses the error summary', async ({ page }) => {
  await page.goto('/contact')
  await page.getByRole('button', { name: 'Request Assistance' }).click()
  const summary = page.getByRole('alert').filter({ hasText: 'Please fix the following' })
  await expect(summary).toBeVisible()
  const focused = await page.evaluate(() => {
    const el = document.activeElement
    return el ? (el.textContent ?? '').includes('Please fix the following') : false
  })
  expect(focused).toBe(true) // the error summary is focused
})

test('a valid submission shows the success confirmation', async ({ page }) => {
  await page.goto('/contact')
  // The server requires the form to have been started at least 3 seconds before submit.
  await page.waitForTimeout(3500)

  await page.getByRole('textbox', { name: 'Name' }).fill('E2E Tester')
  await page.getByRole('textbox', { name: 'Phone' }).fill('3477409782')
  await page.getByRole('combobox', { name: 'Service needed' }).selectOption('tax-preparation')
  await page.getByRole('radio', { name: 'Phone call' }).check()
  await page.getByRole('checkbox', { name: /I agree to be contacted/ }).check()
  await page.getByRole('button', { name: 'Request Assistance' }).click()

  await expect(
    page.getByRole('heading', { name: /your request has been received/i }),
  ).toBeVisible({ timeout: 15_000 })
})
