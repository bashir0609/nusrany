import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { seoFields } from '../fields/seoFields'
import { slugField } from '../fields/slugField'
import { publishable } from './Services'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    group: 'Resources',
    defaultColumns: ['title', 'category', 'publishedAt', '_status', 'updatedAt'],
    preview: ({ slug }) =>
      slug
        ? `/api/preview?secret=${process.env.PREVIEW_SECRET}&path=/blog/${encodeURIComponent(String(slug))}`
        : null,
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  ...publishable,
  defaultSort: '-publishedAt',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short summary shown on the blog index and at the top of the article.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'blog-categories',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'team-members',
      admin: {
        description: 'Optional. Falls back to the site name when empty.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      maxRows: 3,
      admin: {
        description: 'Services promoted at the end of the article.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      index: true,
      admin: {
        description: 'Used for sorting and display. Articles with future dates are treated as drafts.',
        position: 'sidebar',
      },
    },
    {
      name: 'updatedAtOverride',
      type: 'date',
      admin: {
        description: 'Optional "last updated" date shown on the article.',
        position: 'sidebar',
      },
    },
    ...seoFields,
  ],
}
