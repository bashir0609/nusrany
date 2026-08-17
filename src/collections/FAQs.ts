import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    group: 'Content',
    defaultColumns: ['question', 'published', 'displayOrder'],
  },
  access: {
    read: ({ req }) => (req.user ? true : { published: { equals: true } }),
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: 'displayOrder',
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        description: 'Only published FAQs appear on the public site.',
        position: 'sidebar',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
