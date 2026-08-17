import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { seoFields } from '../fields/seoFields'
import { publishable } from '../collections/Services'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  admin: {
    group: 'Pages',
    preview: () => `/api/preview?secret=${process.env.PREVIEW_SECRET}&path=/contact`,
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
    update: authenticated,
  },
  ...publishable,
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'lead',
      type: 'textarea',
    },
    {
      name: 'formIntro',
      type: 'textarea',
      admin: {
        description: 'Short text above the request-assistance form.',
      },
    },
    ...seoFields,
  ],
}
