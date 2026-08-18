import type { MetadataRoute } from 'next'
import { getPublishedCategories, getPublishedPosts, getPublishedServices } from '@/lib/content/queries'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.SITE_URL || 'https://nusrany.com').replace(/\/+$/, '')
  const now = new Date()

  const staticPaths = ['', '/about', '/services', '/team', '/blog', '/contact', '/privacy', '/terms', '/disclaimer']
  const [services, posts, categories] = await Promise.all([
    getPublishedServices(),
    getPublishedPosts(100),
    getPublishedCategories(),
  ])

  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${base}/${service.slug}`,
      lastModified: new Date(service.updatedAt ?? now),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAtOverride ?? post.updatedAt ?? post.publishedAt ?? now),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...categories.map((category) => ({
      url: `${base}/blog/category/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]
}
