import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishable } from '../collections/Services'

export const LegalContent: GlobalConfig = {
  slug: 'legal-content',
  label: 'Legal Content',
  admin: {
    group: 'Pages',
    description:
      'Client-review copy. Content here is general information, not legal advice. Do not display an attorney-review claim.',
    preview: ({ path }) =>
      `/api/preview?secret=${process.env.PREVIEW_SECRET}&path=/${encodeURIComponent(String(path ?? 'privacy'))}`,
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
    update: authenticated,
  },
  ...publishable,
  fields: [
    {
      name: 'privacyPolicy',
      type: 'richText',
      label: 'Privacy Policy',
    },
    {
      name: 'terms',
      type: 'richText',
      label: 'Terms & Conditions',
    },
    {
      name: 'disclaimer',
      type: 'richText',
      label: 'Disclaimer',
    },
  ],
}
