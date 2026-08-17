import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { publishable } from './Services'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'role', 'displayOrder', '_status', 'updatedAt'],
    preview: () => `/api/preview?secret=${process.env.PREVIEW_SECRET}&path=/team`,
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  ...publishable,
  defaultSort: 'displayOrder',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Exact, verified role only (for example "Owner, Nusra Trading Inc").',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Optional public phone number.',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Optional public email address.',
      },
    },
    {
      name: 'credentials',
      type: 'array',
      label: 'Verified credentials',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
      ],
      admin: {
        description: 'Only publish credentials confirmed with the client.',
      },
    },
    {
      name: 'languages',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
      ],
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
