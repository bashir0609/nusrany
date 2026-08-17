import { describe, expect, it } from 'vitest'
import { isReservedServiceSlug } from '@/lib/site/reservedSlugs'

describe('isReservedServiceSlug', () => {
  it.each(['about', 'services', 'team', 'blog', 'contact', 'privacy', 'terms', 'disclaimer', 'admin', 'api'])(
    'reserves %s',
    (slug) => expect(isReservedServiceSlug(slug)).toBe(true),
  )

  it('allows ordinary service slugs', () => {
    expect(isReservedServiceSlug('tax-preparation')).toBe(false)
  })

  it('is case and whitespace insensitive', () => {
    expect(isReservedServiceSlug(' About ')).toBe(true)
    expect(isReservedServiceSlug('ADMIN')).toBe(true)
  })
})
