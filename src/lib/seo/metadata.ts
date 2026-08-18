import type { Metadata } from 'next'

const FALLBACK_TITLE = 'Nusra Tax & Notary | Queens, NY'

export type BuildMetadataArgs = {
  title?: string | null
  seoTitle?: string | null
  description?: string | null
  imageUrl?: string | null
  path?: string
  siteUrl?: string
  noindex?: boolean
}

/**
 * Build Next.js Metadata with a canonical URL derived from the server-only
 * SITE_URL. CMS SEO values override page titles; missing descriptions are
 * omitted (never an empty tag).
 */
export function buildMetadata({
  title,
  seoTitle,
  description,
  imageUrl,
  path = '/',
  siteUrl = process.env.SITE_URL || 'https://nusrany.com',
  noindex = false,
}: BuildMetadataArgs): Metadata {
  const base = siteUrl.replace(/\/+$/, '')
  const canonical = path === '/' || path === '' ? base : `${base}${path.startsWith('/') ? path : `/${path}`}`

  const metadata: Metadata = {
    title: seoTitle || title || FALLBACK_TITLE,
    alternates: { canonical },
  }

  if (description) {
    metadata.description = description
  }

  if (imageUrl) {
    metadata.openGraph = {
      title: seoTitle || title || FALLBACK_TITLE,
      description: description ?? undefined,
      url: canonical,
      images: [{ url: imageUrl }],
    }
  }

  if (noindex) {
    metadata.robots = { index: false, follow: false }
  }

  return metadata
}
