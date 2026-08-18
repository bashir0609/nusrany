import type { BlogPost, Service, SiteSetting } from '@/payload-types'

const siteUrl = () => (process.env.SITE_URL || 'https://nusrany.com').replace(/\/+$/, '')

export type JsonLd = Record<string, unknown>

export function buildLocalBusinessJsonLd(settings: SiteSetting): JsonLd {
  const data: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.businessName,
    url: siteUrl(),
    telephone: settings.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.street,
      addressLocality: settings.city,
      addressRegion: settings.state,
      postalCode: settings.zip,
      addressCountry: 'US',
    },
  }
  // No social profiles are published (verified: none active), so no sameAs.
  // Credentials are emitted only when visibly rendered on the page.
  const credentials = (settings.verifiedCredentialLabels ?? []).map((c) => c.label).filter(Boolean)
  if (credentials.length > 0) {
    data.description = credentials.join('. ')
  }
  return data
}

export function buildServiceJsonLd(service: Service, settings: SiteSetting): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    url: `${siteUrl()}/${service.slug}`,
    description: service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: settings.businessName,
      telephone: settings.phone,
    },
    areaServed: 'Queens, NY',
  }
}

export function buildArticleJsonLd(post: BlogPost, settings: SiteSetting): JsonLd {
  const authorName =
    typeof post.author === 'object' && post.author && 'name' in post.author
      ? (post.author as { name?: string | null }).name
      : null
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAtOverride ?? post.updatedAt ?? post.publishedAt,
    url: `${siteUrl()}/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: authorName || settings.businessName,
    },
    publisher: {
      '@type': 'Organization',
      name: settings.businessName,
    },
    mainEntityOfPage: `${siteUrl()}/blog/${post.slug}`,
  }
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl()}${item.path}`,
    })),
  }
}

/** Serialize JSON-LD safely for inline script insertion. */
export function serializeJsonLd(data: JsonLd) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
