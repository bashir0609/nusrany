import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'authorName',
    group: 'Content',
    defaultColumns: ['authorName', 'serviceReceived', 'published', 'displayOrder'],
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
      name: 'authorName',
      type: 'text',
      required: true,
    },
    {
      name: 'serviceReceived',
      type: 'text',
    },
    {
      name: 'reviewText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sourceName',
      type: 'text',
      admin: {
        description: 'For example "Google" or "Facebook".',
      },
    },
    {
      name: 'sourceUrl',
      type: 'text',
      admin: {
        description: 'Link to the original review, when available.',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        description: 'Only published reviews appear on the public site.',
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
