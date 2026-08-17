import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const pages = ['/', '/tax-preparation', '/contact', '/team']

for (const path of pages) {
  test(`has no serious or critical axe violations on ${path}`, async ({ page }) => {
    await page.goto(path)
    const results = await new AxeBuilder({ page }).analyze()
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(
      serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`),
    ).toEqual([])
  })
}

test('shows a visible keyboard focus indicator for navigation', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const focusState = await page.evaluate(() => {
    const el = document.activeElement
    if (!el) return null
    const style = window.getComputedStyle(el)
    return {
      tag: el.tagName,
      outlineWidth: style.outlineWidth,
      outlineStyle: style.outlineStyle,
    }
  })
  expect(focusState).not.toBeNull()
  expect(focusState?.outlineStyle).not.toBe('none')
  expect(focusState?.outlineWidth).not.toBe('0px')
})

test('shows a visible keyboard focus indicator on form controls', async ({ page }) => {
  await page.goto('/contact')
  const nameInput = page.getByLabel('Name')
  await nameInput.focus()
  const focusState = await nameInput.evaluate((el) => {
    const style = window.getComputedStyle(el)
    return { outlineWidth: style.outlineWidth, outlineStyle: style.outlineStyle }
  })
  expect(focusState.outlineStyle).not.toBe('none')
})
