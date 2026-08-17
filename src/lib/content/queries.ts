import { cache } from 'react'
import { getCms } from '@/lib/payload/getPayload'
import type { BlogCategory, BlogPost, Service } from '@/payload-types'

/**
 * Typed public content layer.
 *
 * All anonymous helpers explicitly filter publication state even though
 * collection/global access also filters it, so the frontend never depends on
 * access-control behavior alone. Draft reads run trusted server-side
 * (overrideAccess) because the preview route gates access with the preview
 * secret.
 */

export const getSiteSettings = cache(async () => {
  const payload = await getCms()
  return payload.findGlobal({ slug: 'site-settings', overrideAccess: false, depth: 0 })
})

export const getHomepage = cache(async (draft = false) => {
  const payload = await getCms()
  return payload.findGlobal({
    slug: 'homepage',
    draft,
    overrideAccess: draft,
    depth: 2,
  })
})

export const getAboutPage = cache(async (draft = false) => {
  const payload = await getCms()
  return payload.findGlobal({
    slug: 'about-page',
    draft,
    overrideAccess: draft,
    depth: 2,
  })
})

export const getContactPage = cache(async (draft = false) => {
  const payload = await getCms()
  return payload.findGlobal({
    slug: 'contact-page',
    draft,
    overrideAccess: draft,
    depth: 2,
  })
})

export const getLegalContent = cache(async (draft = false) => {
  const payload = await getCms()
  return payload.findGlobal({
    slug: 'legal-content',
    draft,
    overrideAccess: draft,
    depth: 0,
  })
})

export const getPublishedServices = cache(async () => {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'services',
    overrideAccess: false,
    draft: false,
    sort: 'displayOrder',
    limit: 50,
    depth: 2,
    where: { _status: { equals: 'published' } },
  })
  return result.docs
})

export const getServiceBySlug = cache(async (slug: string, draft = false) => {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'services',
    draft,
    overrideAccess: draft,
    limit: 1,
    depth: 2,
    where: draft
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
  })
  return result.docs[0] ?? null
})

export const getPublishedTeam = cache(async () => {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'team-members',
    overrideAccess: false,
    draft: false,
    sort: 'displayOrder',
    limit: 50,
    depth: 2,
    where: { _status: { equals: 'published' } },
  })
  return result.docs
})

export const getPublishedPosts = cache(async (limit = 12) => {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'blog-posts',
    overrideAccess: false,
    draft: false,
    sort: '-publishedAt',
    limit,
    depth: 2,
    where: { and: [{ _status: { equals: 'published' } }, { publishedAt: { less_than: new Date().toISOString() } }] },
  })
  return result.docs
})

export const getPostBySlug = cache(async (slug: string, draft = false) => {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'blog-posts',
    draft,
    overrideAccess: draft,
    limit: 1,
    depth: 3,
    where: draft
      ? { slug: { equals: slug } }
      : {
          and: [
            { slug: { equals: slug } },
            { _status: { equals: 'published' } },
            { publishedAt: { less_than: new Date().toISOString() } },
          ],
        },
  })
  return result.docs[0] ?? null
})

export const getPublishedCategories = cache(async () => {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'blog-categories',
    overrideAccess: false,
    sort: 'title',
    limit: 50,
    depth: 0,
  })
  return result.docs
})

export const getPostsByCategory = cache(async (categorySlug: string, limit = 12) => {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'blog-posts',
    overrideAccess: false,
    draft: false,
    sort: '-publishedAt',
    limit,
    depth: 2,
    where: {
      and: [
        { _status: { equals: 'published' } },
        { publishedAt: { less_than: new Date().toISOString() } },
        { 'category.slug': { equals: categorySlug } },
      ],
    },
  })
  return result.docs
})

export const getPublishedFAQs = cache(async () => {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'faqs',
    overrideAccess: false,
    sort: 'displayOrder',
    limit: 50,
    depth: 0,
    where: { published: { equals: true } },
  })
  return result.docs
})

export const getPublishedReviews = cache(async () => {
  const payload = await getCms()
  const result = await payload.find({
    collection: 'reviews',
    overrideAccess: false,
    sort: 'displayOrder',
    limit: 50,
    depth: 0,
    where: { published: { equals: true } },
  })
  return result.docs
})

/** Related posts: same category first, capped at three, excluding the current post. */
export const getRelatedPosts = cache(async (post: BlogPost, limit = 3) => {
  const payload = await getCms()
  const category = post.category as BlogCategory | number | undefined
  const categorySlug =
    typeof category === 'object' && category && 'slug' in category ? category.slug : undefined

  const conditions = [
    { _status: { equals: 'published' } },
    { publishedAt: { less_than: new Date().toISOString() } },
    { id: { not_equals: post.id } },
  ] as const
  const where = categorySlug
    ? {
        and: [...conditions, { 'category.slug': { equals: categorySlug } }],
      }
    : {
        and: [...conditions],
      }

  const result = await payload.find({
    collection: 'blog-posts',
    overrideAccess: false,
    draft: false,
    sort: '-publishedAt',
    limit,
    depth: 2,
    where,
  })
  return result.docs
})

export type RelatedService = Service | number

export { getCms }
