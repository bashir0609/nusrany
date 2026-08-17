import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { seoFields } from '../fields/seoFields'
import { publishable } from '../collections/Services'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    group: 'Pages',
    preview: () => `/api/preview?secret=${process.env.PREVIEW_SECRET}&path=/`,
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
    update: authenticated,
  },
  ...publishable,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroHeadline',
              type: 'text',
              required: true,
            },
            {
              name: 'heroSupportingCopy',
              type: 'textarea',
              required: true,
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Real approved photography only — no stock placeholders.',
              },
            },
          ],
        },
        {
          label: 'Services',
          fields: [
            {
              name: 'servicesHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'servicesIntro',
              type: 'textarea',
            },
            {
              name: 'services',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              admin: {
                description: 'Services shown as cards. Leave empty to show all published services.',
              },
            },
          ],
        },
        {
          label: 'Why Choose Us',
          fields: [
            {
              name: 'whyChooseUsHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'whyChooseUs',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
        {
          label: 'Who We Help',
          fields: [
            {
              name: 'whoWeHelpHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'whoWeHelp',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Featured Service',
          fields: [
            {
              name: 'featuredService',
              type: 'relationship',
              relationTo: 'services',
              admin: {
                description: 'Optional featured/seasonal service. Section is hidden when empty.',
              },
            },
            {
              name: 'featuredHeadline',
              type: 'text',
            },
            {
              name: 'featuredBody',
              type: 'richText',
            },
          ],
        },
        {
          label: 'Team',
          fields: [
            {
              name: 'teamHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'teamMembers',
              type: 'relationship',
              relationTo: 'team-members',
              hasMany: true,
              admin: {
                description: 'Optional. Section is hidden when empty.',
              },
            },
          ],
        },
        {
          label: 'Reviews',
          fields: [
            {
              name: 'reviewsHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'reviews',
              type: 'relationship',
              relationTo: 'reviews',
              hasMany: true,
              admin: {
                description: 'Optional. Section is hidden when empty.',
              },
            },
          ],
        },
        {
          label: 'How It Works',
          fields: [
            {
              name: 'howItWorksHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'howItWorksSteps',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
        {
          label: 'FAQs',
          fields: [
            {
              name: 'faqsHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'faqs',
              type: 'relationship',
              relationTo: 'faqs',
              hasMany: true,
              admin: {
                description: 'Optional. Section is hidden when empty.',
              },
            },
          ],
        },
        {
          label: 'Final CTA',
          fields: [
            {
              name: 'finalCtaHeadline',
              type: 'text',
              required: true,
            },
            {
              name: 'finalCtaCopy',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    ...seoFields,
  ],
}
