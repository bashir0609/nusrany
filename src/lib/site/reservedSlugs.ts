const reserved = new Set([
  'about',
  'services',
  'team',
  'blog',
  'contact',
  'privacy',
  'terms',
  'disclaimer',
  'admin',
  'api',
])

export function isReservedServiceSlug(slug: string) {
  return reserved.has(slug.trim().toLowerCase())
}
