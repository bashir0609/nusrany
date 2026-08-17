import { createHmac } from 'crypto'

/**
 * Derive a stable, non-reversible fingerprint from the request IP and
 * user agent. The raw IP is used only in memory long enough to compute the
 * HMAC and is never stored or logged.
 */
export function createRateLimitFingerprint(ip: string, userAgent: string, secret: string) {
  return createHmac('sha256', secret).update(`${ip}\n${userAgent}`).digest('hex')
}
