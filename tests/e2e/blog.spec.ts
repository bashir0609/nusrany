import { expect, test } from '@playwright/test'
import type { Payload } from 'payload'
import { getTestCms } from '../helpers/payload'
import { richTextFromParagraphs } from '../../src/seed/legalContent'

const unique = Date.now()
const publishedSlug = `blog-published-${unique}`
const draftSlug = `blog-draft-${unique}`
const categorySlug = `blog-cat-${unique}`
const categoryTitle = `Test Category ${unique}`
const publishedTitle = `Published Blog Post ${unique}`
const draftTitle = `Draft Blog Post ${unique}`

let payload: Payload
let categoryId: number
let teamId: number
let serviceId: number
let publishedId: number
let draftId: number

async function purgeStaleData() {
  const posts = await payload.find({
    collection: 'blog-posts',
    overrideAccess: true,
    where: { slug: { like: 'blog-%' } },
    limit: 50,
  })
  for (const post of posts.docs) {
    await payload.delete({ collection: 'blog-posts', id: post.id, overrideAccess: true }).catch(() => {})
  }
  const categories = await payload.find({
    collection: 'blog-categories',
    overrideAccess: true,
    where: { slug: { like: 'blog-cat-%' } },
    limit: 50,
  })
  for (const category of categories.docs) {
    await payload.delete({ collection: 'blog-categories', id: category.id, overrideAccess: true }).catch(() => {})
  }
  const authors = await payload.find({
    collection: 'team-members',
    overrideAccess: true,
    where: { name: { equals: 'Blog Author' } },
    limit: 50,
  })
  for (const author of authors.docs) {
    await payload.delete({ collection: 'team-members', id: author.id, overrideAccess: true }).catch(() => {})
  }
  const services = await payload.find({
    collection: 'services',
    overrideAccess: true,
    where: { slug: { like: 'blog-service-%' } },
    limit: 50,
  })
  for (const service of services.docs) {
    await payload.delete({ collection: 'services', id: service.id, overrideAccess: true }).catch(() => {})
  }
}

test.beforeAll(async () => {
  payload = await getTestCms()
  await purgeStaleData()

  const category = await payload.create({
    collection: 'blog-categories',
    overrideAccess: true,
    data: { title: categoryTitle, slug: categorySlug },
  })
  categoryId = category.id

  const team = await payload.create({
    collection: 'team-members',
    overrideAccess: true,
    data: { name: 'Blog Author', _status: 'published' },
  })
  teamId = team.id

  const service = await payload.create({
    collection: 'services',
    overrideAccess: true,
    data: {
      title: `Blog Service ${unique}`,
      slug: `blog-service-${unique}`,
      shortDescription: 'Service promoted at the end of the article.',
      heroTitle: 'Blog Service',
      _status: 'published',
    },
  })
  serviceId = service.id

  const published = await payload.create({
    collection: 'blog-posts',
    overrideAccess: true,
    data: {
      title: publishedTitle,
      slug: publishedSlug,
      excerpt: 'A published article used by the blog E2E tests.',
      content: richTextFromParagraphs(['This is the published article body.']),
      category: categoryId,
      author: teamId,
      relatedServices: [serviceId],
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      _status: 'published',
    },
  })
  publishedId = published.id

  const draft = await payload.create({
    collection: 'blog-posts',
    overrideAccess: true,
    draft: true,
    data: {
      title: draftTitle,
      slug: draftSlug,
      excerpt: 'A draft article that must stay private.',
      content: richTextFromParagraphs(['Draft body.']),
      category: categoryId,
      publishedAt: new Date(Date.now() - 60 * 1000).toISOString(),
    },
  })
  draftId = draft.id
})

test.afterAll(async () => {
  for (const id of [publishedId, draftId, teamId, categoryId, serviceId]) {
    try {
      await payload.delete({
        collection: id === categoryId ? 'blog-categories' : id === teamId ? 'team-members' : id === serviceId ? 'services' : 'blog-posts',
        id,
        overrideAccess: true,
      })
    } catch {
      // Already gone.
    }
  }
})

test('blog index lists the published post but not the draft', async ({ page }) => {
  await page.goto('/blog')
  await expect(page.getByRole('link', { name: publishedTitle })).toBeVisible()
  await expect(page.getByRole('link', { name: draftTitle })).toHaveCount(0)
})

test('category page shows only matching published posts', async ({ page }) => {
  await page.goto(`/blog/category/${categorySlug}`)
  await expect(page.getByRole('link', { name: publishedTitle })).toBeVisible()
  await expect(page.getByRole('link', { name: draftTitle })).toHaveCount(0)
})

test('article renders author, date, category, and related-service CTA', async ({ page }) => {
  await page.goto(`/blog/${publishedSlug}`)
  await expect(page.getByRole('heading', { level: 1, name: publishedTitle })).toBeVisible()
  await expect(page.getByText('By Blog Author')).toBeVisible()
  await expect(page.getByRole('link', { name: categoryTitle })).toBeVisible()
  await expect(page.getByText('This is the published article body.')).toBeVisible()
  // Related-service CTA inside the article (the footer also lists services).
  const article = page.locator('#main')
  await expect(article.getByRole('link', { name: `Blog Service ${unique}` })).toBeVisible()
  await expect(article.getByRole('link', { name: 'Call Now' })).toBeVisible()
})

test('draft article 404s outside preview mode', async ({ page }) => {
  const response = await page.goto(`/blog/${draftSlug}`)
  expect(response?.status()).toBe(404)
})
