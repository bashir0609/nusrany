import type { Payload } from 'payload'

/** A fingerprint may create at most 5 accepted inquiries per rolling 15-minute window. */
export const RATE_LIMIT_MAX_INQUIRIES = 5
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000

export async function isRateLimited(
  payload: Payload,
  fingerprint: string,
  now: number = Date.now(),
): Promise<boolean> {
  const since = new Date(now - RATE_LIMIT_WINDOW_MS).toISOString()
  const result = await payload.count({
    collection: 'inquiries',
    overrideAccess: true,
    where: {
      and: [
        { rateLimitFingerprint: { equals: fingerprint } },
        { submittedAt: { greater_than: since } },
      ],
    },
  })
  return result.totalDocs >= RATE_LIMIT_MAX_INQUIRIES
}
