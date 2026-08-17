import { describe, expect, it } from 'vitest'
import { buildMetadata } from '@/lib/seo/metadata'

const PROD = 'https://nusrany.com'

describe('buildMetadata', () => {
  it('uses the canonical production origin', () => {
    const meta = buildMetadata({ title: 'Tax Preparation', siteUrl: PROD, path: '/tax-preparation' })
    expect(meta.alternates?.canonical).toBe('https://nusrany.com/tax-preparation')
  })

  it('uses the origin as the canonical for the homepage', () => {
    const meta = buildMetadata({ title: 'Home', siteUrl: PROD, path: '/' })
    expect(meta.alternates?.canonical).toBe('https://nusrany.com')
  })

  it('lets the CMS SEO title override the page title', () => {
    const meta = buildMetadata({
      title: 'Page Title',
      seoTitle: 'SEO Title',
      siteUrl: PROD,
    })
    expect(meta.title).toBe('SEO Title')
  })

  it('falls back to a title that includes the brand', () => {
    const meta = buildMetadata({ siteUrl: PROD, path: '/about' })
    expect(String(meta.title)).toContain('Nusra Tax & Notary')
  })

  it('never emits an empty meta description', () => {
    const meta = buildMetadata({ siteUrl: PROD })
    expect(
      meta.description === undefined ||
        (typeof meta.description === 'string' && meta.description.length > 0),
    ).toBe(true)
  })

  it('adds robots noindex when requested', () => {
    const meta = buildMetadata({ siteUrl: PROD, noindex: true })
    expect(meta.robots !== null && typeof meta.robots === 'object' && meta.robots.index === false).toBe(true)
  })
})
