import type { BlogCategory, BlogPost, Media, Service, TeamMember } from '@/payload-types'
import type { MetadataRoute } from 'next'
import {
  getAboutPage,
  getContactPage,
  getHomepage,
  getLegalContent,
  getPublishedPosts,
  getPublishedServices,
  getPublishedTeam,
} from '@/lib/content/queries'
import { absoluteSiteUrl } from '@/lib/seo/siteUrl'

export const dynamic = 'force-dynamic'

function contentDate(...values: Array<string | null | undefined>): Date | undefined {
  const timestamps = values
    .map((value) => (value ? Date.parse(value) : Number.NaN))
    .filter((value) => Number.isFinite(value))

  return timestamps.length > 0 ? new Date(Math.max(...timestamps)) : undefined
}

function mediaUrl(media: Media | number | null | undefined): string | undefined {
  if (typeof media !== 'object' || !media?.url) return undefined
  return media.url.startsWith('http') ? media.url : absoluteSiteUrl(media.url)
}

function imageList(...images: Array<string | undefined>): string[] | undefined {
  const available = images.filter((image): image is string => Boolean(image))
  return available.length > 0 ? available : undefined
}

function postDate(post: BlogPost): Date | undefined {
  return contentDate(post.updatedAtOverride, post.updatedAt, post.publishedAt)
}

function latestPostDate(posts: BlogPost[]): Date | undefined {
  return contentDate(...posts.flatMap((post) => [post.updatedAtOverride, post.updatedAt, post.publishedAt]))
}

function latestServiceDate(services: Service[]): Date | undefined {
  return contentDate(...services.map((service) => service.updatedAt))
}

function latestTeamDate(team: TeamMember[]): Date | undefined {
  return contentDate(...team.flatMap((member) => [member.updatedAt, member.createdAt]))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [homepage, about, contact, legal, services, posts, team] = await Promise.all([
    getHomepage(),
    getAboutPage(),
    getContactPage(),
    getLegalContent(),
    getPublishedServices(),
    getPublishedPosts(100),
    getPublishedTeam(),
  ])

  const categoryPosts = new Map<string, { category: BlogCategory; posts: BlogPost[] }>()
  for (const post of posts) {
    const category = typeof post.category === 'object' && post.category ? post.category : null
    if (!category?.slug) continue
    const entry = categoryPosts.get(category.slug) ?? { category, posts: [] }
    entry.posts.push(post)
    categoryPosts.set(category.slug, entry)
  }

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteSiteUrl(),
      lastModified: contentDate(homepage.updatedAt, homepage.createdAt),
      changeFrequency: 'monthly',
      priority: 1,
      images: imageList(mediaUrl(homepage.heroImage)),
    },
    {
      url: absoluteSiteUrl('/about'),
      lastModified: contentDate(about.updatedAt, about.createdAt),
      changeFrequency: 'yearly',
      priority: 0.8,
      images: imageList(mediaUrl(about.ownerPhoto)),
    },
    {
      url: absoluteSiteUrl('/services'),
      lastModified: latestServiceDate(services),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteSiteUrl('/team'),
      lastModified: latestTeamDate(team),
      changeFrequency: 'yearly',
      priority: 0.7,
      images: imageList(...team.map((member) => mediaUrl(member.photo))),
    },
    {
      url: absoluteSiteUrl('/blog'),
      lastModified: latestPostDate(posts),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: absoluteSiteUrl('/contact'),
      lastModified: contentDate(contact.updatedAt, contact.createdAt),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: absoluteSiteUrl('/privacy'),
      lastModified: contentDate(legal.updatedAt, legal.createdAt),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: absoluteSiteUrl('/terms'),
      lastModified: contentDate(legal.updatedAt, legal.createdAt),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: absoluteSiteUrl('/disclaimer'),
      lastModified: contentDate(legal.updatedAt, legal.createdAt),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    // Service URLs intentionally remain at the root to preserve existing public URLs.
    // New service slugs should continue to pass the reserved-slug validation.
    url: absoluteSiteUrl(`/${service.slug}`),
    lastModified: contentDate(service.updatedAt, service.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    images: imageList(mediaUrl(service.heroImage)),
  }))

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteSiteUrl(`/blog/${post.slug}`),
    lastModified: postDate(post),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    images: imageList(mediaUrl(post.featuredImage)),
  }))

  const categoryEntries: MetadataRoute.Sitemap = Array.from(categoryPosts.values()).map(({ category, posts: categoryPostsForUrl }) => ({
    url: absoluteSiteUrl(`/blog/category/${category.slug}`),
    lastModified: latestPostDate(categoryPostsForUrl),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticEntries, ...serviceEntries, ...postEntries, ...categoryEntries]
}
