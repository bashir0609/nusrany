import { expect, test } from '@playwright/test'
import { getTestCms } from '../helpers/payload'

test.describe('draft preview', () => {
  test('a draft service 404s publicly and renders with preview enabled', async ({ page }) => {
    const payload = await getTestCms()
    const slug = `preview-e2e-${Date.now()}`
    const draft = await payload.create({
      collection: 'services',
      overrideAccess: true,
      draft: true,
      data: {
        title: 'Preview E2E Draft',
        slug,
        shortDescription: 'Draft service used by the preview E2E test.',
        heroTitle: 'Preview E2E Draft Hero',
      },
    })

    try {
      // Public request: not found.
      const publicResponse = await page.goto(`/${slug}`)
      expect(publicResponse?.status()).toBe(404)

      // Enable draft mode and follow the redirect to the draft page.
      const previewSecret = process.env.PREVIEW_SECRET
      expect(previewSecret).toBeTruthy()
      await page.goto(`/api/preview?secret=${previewSecret}&path=/${slug}`)
      await expect(page.getByRole('heading', { level: 1, name: 'Preview E2E Draft Hero' })).toBeVisible()

      // Invalid secret is rejected with 401 and draft mode is not enabled.
      const badResponse = await page.goto('/api/preview?secret=wrong-secret&path=/' + slug)
      expect(badResponse?.status()).toBe(401)
    } finally {
      await payload.delete({ collection: 'services', id: draft.id, overrideAccess: true })
      await page.goto('/api/preview/exit')
    }
  })
})
