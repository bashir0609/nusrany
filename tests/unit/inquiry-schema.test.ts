import { describe, expect, it } from 'vitest'
import { inquiryInputSchema, validateInquiry } from '@/lib/inquiries/schema'

function validInput(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Amina',
    phone: '3477409782',
    email: '',
    service: 'tax-preparation',
    preferredContactMethod: 'phone',
    message: '',
    consent: true,
    website: '',
    formStartedAt: Date.now() - 5_000,
    ...overrides,
  }
}

describe('validateInquiry', () => {
  it('accepts a valid submission', () => {
    const result = validateInquiry(validInput())
    expect(result.name).toBe('Amina')
  })

  it('requires name', () => {
    expect(() => validateInquiry(validInput({ name: '' }))).toThrow(/name/i)
  })

  it('requires phone', () => {
    expect(() => validateInquiry(validInput({ phone: '' }))).toThrow(/phone/i)
  })

  it('requires service', () => {
    expect(() => validateInquiry(validInput({ service: '' }))).toThrow(/service/i)
  })

  it('requires preferred contact method', () => {
    expect(() => validateInquiry(validInput({ preferredContactMethod: '' }))).toThrow(/contact method/i)
  })

  it('requires consent', () => {
    expect(() => validateInquiry(validInput({ consent: false }))).toThrow(/agree/i)
  })

  it('requires email when email is the preferred contact method', () => {
    expect(() =>
      validateInquiry(
        validInput({
          email: '',
          preferredContactMethod: 'email',
        }),
      ),
    ).toThrow(/email/i)
  })

  it('rejects unknown fields (allowlist only)', () => {
    const result = inquiryInputSchema.parse(
      validInput({ ssn: '123-45-6789', taxReturn: 'document.pdf' }),
    )
    expect(result).not.toHaveProperty('ssn')
    expect(result).not.toHaveProperty('taxReturn')
  })

  it('caps name at 120 characters', () => {
    expect(() => validateInquiry(validInput({ name: 'a'.repeat(121) }))).toThrow(/120/)
  })

  it('caps phone at 40 characters', () => {
    expect(() => validateInquiry(validInput({ phone: '1'.repeat(41) }))).toThrow(/40/)
  })

  it('caps email at 254 characters', () => {
    expect(() =>
      validateInquiry(
        validInput({ email: `${'a'.repeat(250)}@example.com`, preferredContactMethod: 'email' }),
      ),
    ).toThrow(/254/)
  })

  it('caps message at 2000 characters', () => {
    expect(() => validateInquiry(validInput({ message: 'x'.repeat(2001) }))).toThrow(/2000/)
  })

  it('rejects a filled honeypot', () => {
    expect(() => validateInquiry(validInput({ website: 'spam' }))).toThrow()
  })

  it('rejects submissions completed in under three seconds', () => {
    expect(() => validateInquiry(validInput({ formStartedAt: Date.now() - 1_000 }))).toThrow(
      /too quickly/i,
    )
  })
})
