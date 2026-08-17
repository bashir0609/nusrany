import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import type { Payload } from 'payload'
import { getCms } from '@/lib/payload/getPayload'
import { normalizeInquiryInput } from '@/lib/inquiries/normalize'
import { validateInquiry } from '@/lib/inquiries/schema'
import { submitInquiry } from '@/lib/inquiries/submit'
import { POST } from '@/app/api/request-assistance/route'

const unique = Date.now()
const serviceSlug = `inquiry-service-${unique}`
const testIp = `203.0.113.${unique % 200}`

let payload: Payload
let serviceId: number
let cleanupIds: number[] = []

const validForm = {
  name: 'Amina Test',
  phone: '3477409782',
  email: '',
  service: serviceSlug,
  preferredContactMethod: 'phone',
  message: '',
  consent: true,
  website: '',
  formStartedAt: Date.now() - 5_000,
}

function routeRequest(body: unknown, ip = testIp) {
  return new NextRequest('http://localhost:3000/api/request-assistance', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': ip,
      'user-agent': 'vitest-inquiry-flow',
    },
    body: JSON.stringify(body),
  })
}

beforeAll(async () => {
  payload = await getCms()
  const service = await payload.create({
    collection: 'services',
    overrideAccess: true,
    data: {
      title: 'Inquiry Flow Service',
      slug: serviceSlug,
      shortDescription: 'Service used by inquiry flow tests.',
      heroTitle: 'Inquiry Flow Service',
      _status: 'published',
    },
  })
  serviceId = service.id
})

afterAll(async () => {
  for (const id of cleanupIds) {
    try {
      await payload.delete({ collection: 'inquiries', id, overrideAccess: true })
    } catch {
      // Already gone.
    }
  }
  try {
    await payload.delete({ collection: 'services', id: serviceId, overrideAccess: true })
  } catch {
    // Already gone.
  }
})

describe('submitInquiry — email succeeds', () => {
  it('persists the inquiry and marks notification Sent', async () => {
    const input = normalizeInquiryInput(validateInquiry(validForm))
    const sendEmail = vi.fn().mockResolvedValue(undefined)

    const { inquiry } = await submitInquiry(payload, input, {
      rateLimitFingerprint: `fp-a-${unique}`,
      sendEmail,
    })
    cleanupIds.push(inquiry.id)

    expect(sendEmail).toHaveBeenCalledTimes(1)
    expect(inquiry.notificationEmailStatus).toBe('Sent')
    expect(inquiry.serviceLabelSnapshot).toBe('Inquiry Flow Service')

    const stored = await payload.findByID({ collection: 'inquiries', id: inquiry.id, overrideAccess: true })
    expect(stored.notificationEmailStatus).toBe('Sent')
  })
})

describe('submitInquiry — email fails', () => {
  it('still succeeds and records a sanitized Failed status', async () => {
    const message = 'confidential full form message that must not leak into the error summary'
    const input = normalizeInquiryInput(validateInquiry({ ...validForm, message }))
    const sendEmail = vi.fn().mockRejectedValue(new Error('SMTP rejected with key re_abc12345'))

    const { inquiry } = await submitInquiry(payload, input, {
      rateLimitFingerprint: `fp-b-${unique}`,
      sendEmail,
    })
    cleanupIds.push(inquiry.id)

    expect(inquiry.notificationEmailStatus).toBe('Failed')
    const stored = await payload.findByID({ collection: 'inquiries', id: inquiry.id, overrideAccess: true })
    expect(stored.notificationEmailStatus).toBe('Failed')
    expect(stored.notificationError).toContain('SMTP rejected')
    expect(stored.notificationError).not.toContain('re_abc12345')
    expect(stored.notificationError).not.toContain(message)
  })
})

describe('submitInquiry — persistence fails', () => {
  it('propagates the failure and never calls email', async () => {
    const input = normalizeInquiryInput(validateInquiry(validForm))
    const sendEmail = vi.fn()
    const stubPayload = {
      find: async () => ({ docs: [{ id: serviceId, title: 'Inquiry Flow Service' }] }),
      create: async () => {
        throw new Error('database down')
      },
    } as unknown as Payload

    await expect(
      submitInquiry(stubPayload, input, { rateLimitFingerprint: `fp-c-${unique}`, sendEmail }),
    ).rejects.toThrow(/database down/)
    expect(sendEmail).not.toHaveBeenCalled()
  })
})

describe('POST /api/request-assistance', () => {
  it('returns 400 for invalid JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/request-assistance', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{not-json',
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('returns field-level 400 errors for invalid input', async () => {
    const response = await POST(routeRequest({ ...validForm, name: '' }))
    expect(response.status).toBe(400)
    const body = (await response.json()) as { errors?: Record<string, string> }
    expect(body.errors?.name).toBeTruthy()
  })

  it('returns 400 when the service slug does not resolve to a published service', async () => {
    const response = await POST(routeRequest({ ...validForm, service: 'does-not-exist-xyz' }))
    expect(response.status).toBe(400)
    const body = (await response.json()) as { errors?: Record<string, string> }
    expect(body.errors?.service).toBeTruthy()
  })

  it('returns 200 and persists the inquiry even when email delivery fails', async () => {
    const response = await POST(routeRequest({ ...validForm }))
    expect(response.status).toBe(200)
    const body = (await response.json()) as { ok: boolean; inquiryId?: number }
    expect(body.ok).toBe(true)
    expect(body.inquiryId).toBeTruthy()
    cleanupIds.push(body.inquiryId as number)

    const stored = await payload.findByID({ collection: 'inquiries', id: body.inquiryId as number, overrideAccess: true })
    expect(stored.notificationEmailStatus).toBe('Failed') // no RESEND_API_KEY configured locally
  })

  it('returns 429 after the rolling-window threshold', async () => {
    // All six requests share the same fingerprint (same IP + user agent).
    const headers = {
      'content-type': 'application/json',
      'x-forwarded-for': '198.51.100.50',
      'user-agent': 'rate-limit-test',
    }
    for (let i = 0; i < 5; i += 1) {
      const request = new NextRequest('http://localhost:3000/api/request-assistance', {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...validForm, name: `Rate ${i}`, phone: `347740000${i}` }),
      })
      const response = await POST(request)
      expect(response.status).toBe(200)
      const body = (await response.json()) as { inquiryId?: number }
      cleanupIds.push(body.inquiryId as number)
    }
    const blocked = await POST(
      new NextRequest('http://localhost:3000/api/request-assistance', {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...validForm, name: 'Blocked', phone: '3477400005' }),
      }),
    )
    expect(blocked.status).toBe(429)
  })
})
