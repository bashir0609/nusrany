import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { seoFields } from '../fields/seoFields'
import { slugField } from '../fields/slugField'
import { isReservedServiceSlug } from '../lib/site/reservedSlugs'

export const publishable = {
  versions: {
    drafts: {
      autosave: { interval: 1500 },
    },
  },
} as const

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'displayOrder', '_status', 'updatedAt'],
    preview: ({ slug }) =>
      slug
        ? `/api/preview?secret=${process.env.PREVIEW_SECRET}&path=/${encodeURIComponent(String(slug))}`
        : null,
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
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      validate: (value) => {
        if (isReservedServiceSlug(value)) return 'This slug is reserved by the application.'
        return true
      },
    }),
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Shown on service cards and index pages.',
      },
    },
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'Main headline shown at the top of the service page.',
      },
    },
    {
      name: 'heroLead',
      type: 'textarea',
      admin: {
        description: 'Supporting sentence under the headline.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional image for the hero. Public website imagery only.',
      },
    },
    {
      name: 'explanationHeading',
      type: 'text',
      defaultValue: 'How we help',
    },
    {
      name: 'explanationContent',
      type: 'richText',
      admin: {
        description: 'Plain-language explanation of the service.',
      },
    },
    {
      name: 'audiencesHeading',
      type: 'text',
      defaultValue: 'Who it is for',
    },
    {
      name: 'audiences',
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
    {
      name: 'benefitsHeading',
      type: 'text',
      defaultValue: 'What to expect',
    },
    {
      name: 'benefits',
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
    {
      name: 'processHeading',
      type: 'text',
      defaultValue: 'How it works',
    },
    {
      name: 'processSteps',
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
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this service in the featured section on the homepage.',
        position: 'sidebar',
      },
    },
    {
      name: 'featuredHeadline',
      type: 'text',
    },
    {
      name: 'featuredContent',
      type: 'richText',
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      maxRows: 3,
      admin: {
        description: 'Other services shown at the bottom of this page.',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      index: true,
      admin: {
        description: 'Lower numbers appear first.',
        position: 'sidebar',
      },
    },
    ...seoFields,
  ],
}
