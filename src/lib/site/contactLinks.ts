/**
 * Normalize contact values into hrefs.
 * Only digits plus a leading `+` are preserved for tel; WhatsApp receives digits only.
 */
export function buildTelHref(phone: string) {
  const normalized = phone.replace(/[^\d+]/g, '')
  return `tel:${normalized}`
}

export function buildWhatsAppHref(number: string) {
  const digits = number.replace(/\D/g, '')
  return `https://wa.me/${digits}`
}

export function buildMailtoHref(email: string) {
  return `mailto:${email.trim()}`
}

/** Format a +1 E.164 phone for display, e.g. "+13477409782" → "(347) 740-9782". */
export function formatDisplayPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  const local = digits.startsWith('1') ? digits.slice(1) : digits
  if (local.length === 10) {
    return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`
  }
  return phone
}
