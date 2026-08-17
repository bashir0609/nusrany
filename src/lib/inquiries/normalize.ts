import type { InquiryInput } from './schema'

export type NormalizedInquiryInput = {
  name: string
  phone: string
  email?: string
  serviceSlug: string
  preferredContactMethod: 'phone' | 'whatsapp' | 'email'
  message?: string
}

/**
 * Normalize validated input: trim whitespace, lowercase the email and service
 * slug. Phone text is intentionally preserved as submitted (human-readable).
 */
export function normalizeInquiryInput(input: InquiryInput): NormalizedInquiryInput {
  return {
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim().toLowerCase() || undefined,
    serviceSlug: input.service.trim().toLowerCase(),
    preferredContactMethod: input.preferredContactMethod,
    message: input.message.trim() || undefined,
  }
}
