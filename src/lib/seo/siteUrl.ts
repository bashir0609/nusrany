/**
 * Canonical public origin used by sitemap, metadata, robots, and structured data.
 * Keep this independent from deployment hosts such as a Vercel preview URL.
 */
export const PUBLIC_SITE_URL = 'https://www.nusrany.com'

export function absoluteSiteUrl(path = ''): string {
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : ''
  return `${PUBLIC_SITE_URL}${normalizedPath}`
}
