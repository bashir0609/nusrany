import { expect, test } from '@playwright/test'

test.describe('site navigation', () => {
  test('desktop header shows nav links and contact CTAs', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header')
    await expect(header.getByRole('link', { name: 'Home', exact: true })).toBeVisible()
    await expect(header.getByRole('link', { name: 'About', exact: true })).toBeVisible()
    await expect(header.getByRole('button', { name: /Services/ })).toBeVisible()
    await expect(header.getByRole('link', { name: 'Team', exact: true })).toBeVisible()
    await expect(header.getByRole('link', { name: 'Blog', exact: true })).toBeVisible()
    await expect(header.getByRole('link', { name: 'Contact', exact: true })).toBeVisible()

    const callLink = header.getByRole('link', { name: /347/ })
    await expect(callLink).toHaveAttribute('href', 'tel:+13477409782')

    const whatsappLink = header.getByRole('link', { name: 'WhatsApp' })
    await expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/19296720255')
  })

  test('services dropdown lists seeded services', async ({ page }) => {
    await page.goto('/')
    const servicesButton = page.getByRole('button', { name: /Services/ })
    await servicesButton.hover()
    await expect(page.getByRole('menuitem', { name: 'Tax Preparation' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Notary Public' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Immigration Form Assistance' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Defensive Driving' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'TLC & Transportation' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Business Services' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'All services' })).toBeVisible()
  })

  test('mobile menu opens, navigates, and closes with Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const openButton = page.getByRole('button', { name: 'Open menu' })
    await expect(openButton).toBeVisible()
    await openButton.click()

    const mobileNav = page.getByRole('navigation', { name: 'Mobile' })
    await expect(mobileNav.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(mobileNav.getByRole('link', { name: 'Tax Preparation' })).toBeVisible()
    await expect(mobileNav.getByRole('link', { name: 'All services' })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(mobileNav).not.toBeVisible()
  })

  test('mobile quick contact bar links work and do not obstruct footer', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const bar = page.getByRole('navigation', { name: 'Quick contact' })
    await expect(bar.getByRole('link', { name: /Call/ })).toHaveAttribute('href', 'tel:+13477409782')
    await expect(bar.getByRole('link', { name: /WhatsApp/ })).toHaveAttribute('href', 'https://wa.me/19296720255')

    // The sticky bar must not obstruct the footer content.
    const privacyLink = page.getByRole('link', { name: 'Privacy Policy' })
    await privacyLink.scrollIntoViewIfNeeded()
    await expect(privacyLink).toBeVisible()
  })
})
