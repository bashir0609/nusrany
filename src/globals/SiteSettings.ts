import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    description:
      'Business details shown across the site. Changes appear immediately — no publishing workflow needed for contact information.',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Business',
          fields: [
            {
              name: 'businessName',
              type: 'text',
              required: true,
            },
            {
              name: 'legalBusinessName',
              type: 'text',
              required: true,
              admin: {
                description: 'Shown in the footer and legal pages.',
              },
            },
            {
              name: 'sinceYear',
              type: 'text',
              admin: {
                description: 'Year the business was established, shown in the trust strip.',
              },
            },
            {
              name: 'phone',
              type: 'text',
              required: true,
              admin: {
                description: 'Primary phone, shown in the header, footer and CTAs.',
              },
            },
            {
              name: 'whatsApp',
              type: 'text',
              required: true,
              admin: {
                description: 'WhatsApp number (digits only, with country code) used for wa.me links.',
              },
            },
            {
              name: 'publicEmail',
              type: 'email',
              required: true,
            },
            {
              name: 'inquiryNotificationEmail',
              type: 'email',
              required: true,
              admin: {
                description: 'Where new inquiry notifications are sent.',
              },
            },
            {
              name: 'street',
              type: 'text',
              required: true,
            },
            {
              name: 'city',
              type: 'text',
              required: true,
            },
            {
              name: 'state',
              type: 'text',
              required: true,
            },
            {
              name: 'zip',
              type: 'text',
              required: true,
            },
            {
              name: 'directionsUrl',
              type: 'text',
              admin: {
                description: 'Google Maps (or similar) directions link for the office.',
              },
            },
            {
              name: 'paymentsAccepted',
              type: 'text',
              admin: {
                description: 'For example "Cash, Zelle, Visa and Mastercard".',
              },
            },
          ],
        },
        {
          label: 'Office Hours',
          fields: [
            {
              name: 'officeHours',
              type: 'array',
              fields: [
                {
                  name: 'days',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'hours',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Leave empty until hours are confirmed. The site hides this section when empty.',
              },
            },
            {
              name: 'walkInsNote',
              type: 'text',
              admin: {
                description: 'For example "Walk-ins welcome, appointments optional".',
              },
            },
          ],
        },
        {
          label: 'Languages',
          fields: [
            {
              name: 'languages',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Spoken-language labels shown in the header/hero. No nationality flags.',
              },
            },
          ],
        },
        {
          label: 'CTA Labels',
          fields: [
            {
              name: 'requestAssistanceLabel',
              type: 'text',
              defaultValue: 'Request Assistance',
            },
            {
              name: 'callNowLabel',
              type: 'text',
              defaultValue: 'Call Now',
            },
            {
              name: 'whatsAppLabel',
              type: 'text',
              defaultValue: 'WhatsApp',
            },
            {
              name: 'getDirectionsLabel',
              type: 'text',
              defaultValue: 'Get Directions',
            },
          ],
        },
        {
          label: 'Trust & Footer',
          fields: [
            {
              name: 'verifiedCredentialLabels',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                },
              ],
              admin: {
                description:
                  'Verified credentials only (e.g. "Authorized IRS e-file Provider"). Keep empty until wording is confirmed with the client.',
              },
            },
            {
              name: 'footerText',
              type: 'textarea',
              admin: {
                description: 'Optional short line shown above the legal disclaimer in the footer.',
              },
            },
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                },
                {
                  name: 'url',
                  type: 'text',
                },
              ],
              admin: {
                description: 'Only verified public profiles. Keep empty when there are no active profiles.',
              },
            },
          ],
        },
      ],
    },
  ],
}
