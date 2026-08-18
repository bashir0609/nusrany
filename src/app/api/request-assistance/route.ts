import { NextRequest, NextResponse } from 'next/server'
import type { ZodError } from 'zod'
import { getCms } from '@/lib/payload/getPayload'
import { getEnv } from '@/lib/env'
import { validateInquiry } from '@/lib/inquiries/schema'
import { normalizeInquiryInput } from '@/lib/inquiries/normalize'
import { createRateLimitFingerprint } from '@/lib/inquiries/fingerprint'
import { isRateLimited } from '@/lib/inquiries/rateLimit'
import { ServiceNotFoundError, submitInquiry } from '@/lib/inquiries/submit'

function toFieldErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    if (!errors[key]) errors[key] = issue.message
  }
  return errors
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  // Validation
  let parsed
  try {
    parsed = validateInquiry(body)
  } catch (error) {
    return NextResponse.json({ ok: false, errors: toFieldErrors(error as ZodError) }, { status: 400 })
  }
  const normalized = normalizeInquiryInput(parsed)

  // HMAC fingerprint — never store or log the raw IP.
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const userAgent = request.headers.get('user-agent') || ''
  const fingerprint = createRateLimitFingerprint(ip, userAgent, getEnv().RATE_LIMIT_HMAC_SECRET)

  // Rate limiting
  const payload = await getCms()
  if (await isRateLimited(payload, fingerprint)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please try again later.' },
      { status: 429 },
    )
  }

  // Persist first; email is secondary.
  try {
    const result = await submitInquiry(payload, normalized, { rateLimitFingerprint: fingerprint })
    return NextResponse.json({ ok: true, inquiryId: result.inquiry.id }, { status: 200 })
  } catch (error) {
    if (error instanceof ServiceNotFoundError) {
      return NextResponse.json(
        { ok: false, errors: { service: 'Please choose a valid service.' } },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { ok: false, error: 'We could not submit your request. Please try again or call us directly.' },
      { status: 500 },
    )
  }
}
