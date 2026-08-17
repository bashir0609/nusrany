import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { Payload } from 'payload'
import { getCms } from '@/lib/payload/getPayload'

const unique = Date.now()

let payload: Payload
let serviceId: number
let cleanupIds: (string | number)[] = []

const validInquiryFixture = {
  name: 'Access Test User',
  phone: '3477409782',
  preferredContactMethod: 'phone' as const,
  submittedAt: new Date().toISOString(),
  consentAt: new Date().toISOString(),
  status: 'New' as const,
  notificationEmailStatus: 'Pending' as const,
}

beforeAll(async () => {
  payload = await getCms()
  const service = await payload.create({
    collection: 'services',
    overrideAccess: true,
    data: {
      title: `Access Test Service ${unique}`,
      slug: `access-test-service-${unique}`,
      shortDescription: 'Access control test service.',
      heroTitle: 'Access Test Service',
      displayOrder: 999,
    },
  })
  serviceId = service.id
  cleanupIds.push(service.id)
})

afterAll(async () => {
  for (const id of cleanupIds) {
    try {
      await payload.delete({ collection: 'services', id, overrideAccess: true })
    } catch {
      // Already gone.
    }
  }
})

describe('inquiry access control', () => {
  it('rejects anonymous inquiry creation', async () => {
    await expect(
      payload.create({
        collection: 'inquiries',
        data: { ...validInquiryFixture, service: serviceId },
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('rejects anonymous inquiry reads', async () => {
    await expect(
      payload.find({
        collection: 'inquiries',
        overrideAccess: false,
        limit: 1,
      }),
    ).rejects.toThrow()
  })
})

describe('published content access', () => {
  it('returns only published services to anonymous readers', async () => {
    const draft = await payload.create({
      collection: 'services',
      overrideAccess: true,
      draft: true,
      data: {
        title: `Draft Service ${unique}`,
        slug: `draft-service-${unique}`,
        shortDescription: 'This service is a draft.',
        heroTitle: 'Draft Service',
        displayOrder: 999,
      },
    })
    cleanupIds.push(draft.id)

    const published = await payload.create({
      collection: 'services',
      overrideAccess: true,
      data: {
        title: `Published Service ${unique}`,
        slug: `published-service-${unique}`,
        shortDescription: 'This service is published.',
        heroTitle: 'Published Service',
        displayOrder: 999,
        _status: 'published',
      },
    })
    cleanupIds.push(published.id)

    const anonymous = await payload.find({
      collection: 'services',
      overrideAccess: false,
      where: { slug: { in: [`draft-service-${unique}`, `published-service-${unique}`] } },
      limit: 10,
    })

    const slugs = anonymous.docs.map((doc) => doc.slug)
    expect(slugs).toContain(`published-service-${unique}`)
    expect(slugs).not.toContain(`draft-service-${unique}`)

    // Preview-mode reads run trusted server-side (the preview route gates access via
    // the preview secret), so overrideAccess is enabled for draft lookups.
    const draftLookup = await payload.find({
      collection: 'services',
      overrideAccess: true,
      draft: true,
      where: { slug: { equals: `draft-service-${unique}` } },
      limit: 1,
    })
    expect(draftLookup.docs.map((doc) => doc.slug)).toContain(`draft-service-${unique}`)
  })
})
