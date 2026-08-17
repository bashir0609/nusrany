import { z } from 'zod'

const REQUIRED_CONTACT_MESSAGE = 'Email is required when you prefer to be contacted by email.'
const TOO_FAST_MESSAGE = 'Form completed too quickly. Please try again.'
const HONEYPOT_MESSAGE = 'Unexpected field value.'

export const inquiryInputSchema = z
  .object({
    name: z.string().trim().min(1, 'Please enter your name.').max(120, 'Name must be 120 characters or fewer.'),
    phone: z.string().trim().min(1, 'Please enter your phone number.').max(40, 'Phone must be 40 characters or fewer.'),
    email: z
      .string()
      .trim()
      .max(254, 'Email must be 254 characters or fewer.')
      .refine((value) => value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Please enter a valid email address.')
      .optional()
      .default(''),
    service: z.string().trim().min(1, 'Please choose a service.'),
    preferredContactMethod: z.enum(['phone', 'whatsapp', 'email'], {
      message: 'Please choose a preferred contact method.',
    }),
    message: z
      .string()
      .max(2000, 'Message must be 2000 characters or fewer.')
      .optional()
      .default(''),
    consent: z.boolean().refine((value) => value === true, 'Please confirm you agree to be contacted about your request.'),
    // Honeypot: must be empty. Bots fill it; humans never see it.
    website: z.string().max(0, HONEYPOT_MESSAGE).default(''),
    formStartedAt: z.number().int().positive(),
  })
  .superRefine((data, ctx) => {
    if (data.preferredContactMethod === 'email' && !data.email) {
      ctx.addIssue({ code: 'custom', path: ['email'], message: REQUIRED_CONTACT_MESSAGE })
    }
    if (Date.now() - data.formStartedAt < 3_000) {
      ctx.addIssue({ code: 'custom', path: ['formStartedAt'], message: TOO_FAST_MESSAGE })
    }
  })

export type InquiryInput = z.infer<typeof inquiryInputSchema>

/** Parse and validate raw request data. Throws ZodError on invalid input. */
export function validateInquiry(input: unknown) {
  return inquiryInputSchema.parse(input)
}
