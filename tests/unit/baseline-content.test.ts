import { describe, expect, it } from 'vitest'
import { serviceSeeds } from '@/seed/baselineContent'

const expected = [
  'tax-preparation',
  'notary-public',
  'immigration-form-assistance',
  'defensive-driving',
  'tlc-transportation',
  'business-services',
]

describe('baseline service content', () => {
  it('contains exactly the six approved initial service slugs in order', () => {
    expect(serviceSeeds.map((service) => service.slug)).toEqual(expected)
  })

  it('contains no legacy branding, obsolete address, or placeholder pricing', () => {
    expect(JSON.stringify(serviceSeeds)).not.toMatch(/Mahreen|169-26 Hillside|Only \$199/i)
  })

  it('keeps immigration copy free of legal-representation claims', () => {
    const immigration = JSON.stringify(serviceSeeds[2])
    expect(immigration).toMatch(/not a law firm/i)
    expect(immigration).not.toMatch(/legal (advice|representation).*(we can|guarantee)/i)
  })
})
