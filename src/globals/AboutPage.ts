import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { seoFields } from '../fields/seoFields'
import { publishable } from '../collections/Services'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  admin: {
    group: 'Website',
    preview: () => `/api/preview?secret=${process.env.PREVIEW_SECRET}&path=/about`,
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
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
    },
    {
      name: 'ownerName',
      type: 'text',
      required: true,
    },
    {
      name: 'ownerRole',
      type: 'text',
    },
    {
      name: 'ownerPhoto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'establishedYear',
      type: 'text',
    },
    {
      name: 'serviceArea',
      type: 'textarea',
    },
    {
      name: 'credentialsHeading',
      type: 'text',
      defaultValue: 'Verified credentials',
    },
    {
      name: 'credentials',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
      ],
      admin: {
        description: 'Verified credentials only.',
      },
    },
    ...seoFields,
  ],
}
