import { describe, expect, it } from 'vitest'
import { parseServerEnv } from '@/lib/env'

describe('parseServerEnv', () => {
  it('rejects a short Payload secret', () => {
    expect(() =>
      parseServerEnv({
        DATABASE_URL: 'postgresql://localhost/nusra',
        PAYLOAD_SECRET: 'short',
        SITE_URL: 'http://localhost:3000',
        PREVIEW_SECRET: '12345678901234567890123456789012',
        RATE_LIMIT_HMAC_SECRET: '12345678901234567890123456789012',
      }),
    ).toThrow(/PAYLOAD_SECRET/)
  })

  it('accepts a valid environment', () => {
    const parsed = parseServerEnv({
      DATABASE_URL: 'postgresql://localhost/nusra',
      PAYLOAD_SECRET: 'a'.repeat(40),
      SITE_URL: 'https://nusrany.com',
      PREVIEW_SECRET: 'b'.repeat(40),
      RATE_LIMIT_HMAC_SECRET: 'c'.repeat(40),
    })
    expect(parsed.SITE_URL).toBe('https://nusrany.com')
  })
})
