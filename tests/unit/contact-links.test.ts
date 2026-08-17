import { describe, expect, it } from 'vitest'
import { buildMailtoHref, buildTelHref, buildWhatsAppHref } from '@/lib/site/contactLinks'

describe('contact link builders', () => {
  it('builds a tel: href from a formatted phone number', () => {
    expect(buildTelHref('+1 (347) 740-9782')).toBe('tel:+13477409782')
  })

  it('builds a wa.me href from a formatted WhatsApp number', () => {
    expect(buildWhatsAppHref('+1 (929) 672-0255')).toBe('https://wa.me/19296720255')
  })

  it('builds a mailto: href from an email address', () => {
    expect(buildMailtoHref('info@nusrany.com')).toBe('mailto:info@nusrany.com')
  })

  it('strips non-numeric characters from tel links', () => {
    expect(buildTelHref('347 740 9782')).toBe('tel:3477409782')
  })
})
