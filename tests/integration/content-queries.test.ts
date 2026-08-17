import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { Payload } from 'payload'
import { getCms } from '@/lib/payload/getPayload'
import { getPublishedServices, getServiceBySlug } from '@/lib/content/queries'

const unique = Date.now()
const publishedSlug = `query-published-${unique}`
const draftSlug = `query-draft-${unique}`

let payload: Payload
let publishedId: number
let draftId: number

beforeAll(async () => {
  payload = await getCms()
  const published = await payload.create({
    collection: 'services',
    overrideAccess: true,
    data: {
      title: 'Query Published',
      slug: publishedSlug,
      shortDescription: 'Published service for query tests.',
      heroTitle: 'Query Published Hero',
      _status: 'published',
    },
  })
  publishedId = published.id

  const draft = await payload.create({
    collection: 'services',
    overrideAccess: true,
    draft: true,
    data: {
      title: 'Query Draft',
      slug: draftSlug,
      shortDescription: 'Draft service for query tests.',
      heroTitle: 'Query Draft Hero',
    },
  })
  draftId = draft.id
})

afterAll(async () => {
  for (const id of [publishedId, draftId]) {
    try {
      await payload.delete({ collection: 'services', id, overrideAccess: true })
    } catch {
      // Already gone.
    }
  }
})

describe('getPublishedServices', () => {
  it('returns only published services', async () => {
    const docs = await getPublishedServices()
    const slugs = docs.map((doc) => doc.slug)
    expect(slugs).toContain(publishedSlug)
    expect(slugs).not.toContain(draftSlug)
  })
})

describe('getServiceBySlug', () => {
  it('returns the published service for a public read', async () => {
    const service = await getServiceBySlug(publishedSlug)
    expect(service?.slug).toBe(publishedSlug)
    expect(service?.heroTitle).toBe('Query Published Hero')
  })

  it('returns null for a draft slug on a public read', async () => {
    expect(await getServiceBySlug(draftSlug)).toBeNull()
  })

  it('returns the latest draft when preview mode explicitly requests it', async () => {
    const service = await getServiceBySlug(draftSlug, true)
    expect(service?.slug).toBe(draftSlug)
  })
})
