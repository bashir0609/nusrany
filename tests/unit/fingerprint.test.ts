import { describe, expect, it } from 'vitest'
import { createRateLimitFingerprint } from '@/lib/inquiries/fingerprint'

const secret = 's'.repeat(40)

describe('createRateLimitFingerprint', () => {
  it('is deterministic for the same ip/user-agent/secret', () => {
    const a = createRateLimitFingerprint('203.0.113.10', 'Mozilla/5.0', secret)
    const b = createRateLimitFingerprint('203.0.113.10', 'Mozilla/5.0', secret)
    expect(a).toBe(b)
  })

  it('produces a 64-character hex digest', () => {
    const digest = createRateLimitFingerprint('203.0.113.10', 'Mozilla/5.0', secret)
    expect(digest).toMatch(/^[0-9a-f]{64}$/)
  })

  it('differs when the IP differs', () => {
    const a = createRateLimitFingerprint('203.0.113.10', 'Mozilla/5.0', secret)
    const b = createRateLimitFingerprint('203.0.113.99', 'Mozilla/5.0', secret)
    expect(a).not.toBe(b)
  })

  it('differs when the user agent differs', () => {
    const a = createRateLimitFingerprint('203.0.113.10', 'Mozilla/5.0', secret)
    const b = createRateLimitFingerprint('203.0.113.10', 'curl/8.0', secret)
    expect(a).not.toBe(b)
  })

  it('never contains the input IP', () => {
    const ip = '203.0.113.10'
    const digest = createRateLimitFingerprint(ip, 'Mozilla/5.0', secret)
    expect(digest).not.toContain(ip)
    expect(digest).not.toContain(ip.replace(/\./g, ''))
  })
})
