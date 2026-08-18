import { createElement } from 'react'
import { Resend } from 'resend'
import type { Payload } from 'payload'
import type { Inquiry, Service, SiteSetting } from '@/payload-types'
import { getEnv } from '@/lib/env'
import { InquiryNotification } from '@/emails/InquiryNotification'
import type { NormalizedInquiryInput } from './normalize'

export class ServiceNotFoundError extends Error {
  constructor() {
    super('The selected service is not available.')
    this.name = 'ServiceNotFoundError'
  }
}

export type SendInquiryEmail = (args: {
  inquiry: Inquiry
  siteSettings: SiteSetting
}) => Promise<void>

export type SubmitInquiryOptions = {
  rateLimitFingerprint: string
  /** Injectable for tests. Defaults to the Resend sender. */
  sendEmail?: SendInquiryEmail
}

/** Short sanitized summary for operator use — no API keys, no full form message. */
export function sanitizeProviderError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error)
  const scrubbed = raw
    .replace(/re_[A-Za-z0-9_-]+/g, '[redacted]')
    .replace(/[A-Za-z0-9_-]{20,}/g, '[redacted]')
  const name = error instanceof Error && error.name ? error.name : 'Error'
  return `${name}: ${scrubbed}`.slice(0, 300)
}

async function sendInquiryEmailViaResend({
  inquiry,
  siteSettings,
}: {
  inquiry: Inquiry
  siteSettings: SiteSetting
}) {
  if (!getEnv().RESEND_API_KEY) {
    throw new Error('Resend API key is not configured')
  }
  const resend = new Resend(getEnv().RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: getEnv().RESEND_FROM_EMAIL || 'Nusra Website <website@nusrany.com>',
    to: siteSettings.inquiryNotificationEmail,
    subject: `New Nusra website inquiry: ${inquiry.serviceLabelSnapshot ?? 'request'}`,
    react: createElement(InquiryNotification, {
      name: inquiry.name,
      phone: inquiry.phone,
      email: inquiry.email,
      preferredContactMethod: inquiry.preferredContactMethod,
      service: inquiry.serviceLabelSnapshot ?? 'request',
      message: inquiry.message,
      submittedAt: inquiry.submittedAt,
    }),
  })
  if (error) {
    throw new Error(error.message)
  }
}

/**
 * Persist the inquiry first; the notification email is secondary. A saved
 * inquiry counts as success even if email delivery fails. The pseudo-code
 * order is implemented literally: create → notify → annotate status.
 */
export async function submitInquiry(
  payload: Payload,
  input: NormalizedInquiryInput,
  options: SubmitInquiryOptions,
) {
  const sendEmail = options.sendEmail ?? sendInquiryEmailViaResend

  // Resolve the submitted slug to a currently published Service document.
  const serviceResult = await payload.find({
    collection: 'services',
    overrideAccess: true,
    where: { and: [{ slug: { equals: input.serviceSlug } }, { _status: { equals: 'published' } }] },
    limit: 1,
  })
  const resolvedService = serviceResult.docs[0] as Service | undefined
  if (!resolvedService) {
    throw new ServiceNotFoundError()
  }

  const inquiry = await payload.create({
    collection: 'inquiries',
    overrideAccess: true,
    data: {
      name: input.name,
      phone: input.phone,
      email: input.email,
      service: resolvedService.id,
      serviceLabelSnapshot: resolvedService.title,
      preferredContactMethod: input.preferredContactMethod,
      message: input.message,
      submittedAt: new Date().toISOString(),
      consentAt: new Date().toISOString(),
      status: 'New',
      notificationEmailStatus: 'Pending',
      rateLimitFingerprint: options.rateLimitFingerprint,
    },
  })

  const siteSettings = await payload.findGlobal({ slug: 'site-settings', overrideAccess: true })

  try {
    await sendEmail({ inquiry, siteSettings })
    try {
      await payload.update({
        collection: 'inquiries',
        id: inquiry.id,
        overrideAccess: true,
        data: { notificationEmailStatus: 'Sent', notificationError: null },
      })
    } catch {
      // Persistence already succeeded. Do not turn the visitor response into a failure.
    }
  } catch (error) {
    try {
      await payload.update({
        collection: 'inquiries',
        id: inquiry.id,
        overrideAccess: true,
        data: {
          notificationEmailStatus: 'Failed',
          notificationError: sanitizeProviderError(error),
        },
      })
    } catch {
      // Keep the original persisted Inquiry even if status annotation also fails.
    }
  }

  // Return the persisted inquiry with its final notification annotation.
  const persisted = await payload.findByID({
    collection: 'inquiries',
    id: inquiry.id,
    overrideAccess: true,
  })
  return { inquiry: persisted, siteSettings }
}
