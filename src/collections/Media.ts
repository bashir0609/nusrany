import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    group: 'Resources',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    imageSizes: [
      { name: 'card', width: 720, height: 480, position: 'centre' },
      { name: 'hero', width: 1600, height: 1000, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Describe the image for visitors using screen readers. Leave empty only when the image is decorative.',
      },
      validate: (value: string | null | undefined, { data }: { data?: { decorative?: boolean } }) => {
        if (data?.decorative) return true
        if (!value || !String(value).trim()) return 'Alt text is required for non-decorative images.'
        return true
      },
    },
    {
      name: 'decorative',
      type: 'checkbox',
      defaultValue: false,
      label: 'Decorative image (no alt text needed)',
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
