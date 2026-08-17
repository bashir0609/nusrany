import type { Field } from 'payload'

export const seoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    label: 'Search Engine Optimization',
    fields: [
      {
        name: 'title',
        type: 'text',
        maxLength: 60,
        label: 'SEO Title',
        admin: {
          description: 'Recommended up to 60 characters. Leave empty to use the page title.',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        maxLength: 160,
        label: 'Meta Description',
        admin: {
          description: 'Recommended up to 160 characters. Leave empty to use a sensible fallback.',
        },
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Social / Open Graph Image',
      },
    ],
  },
]
