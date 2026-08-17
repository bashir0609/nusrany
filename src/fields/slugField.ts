import type { Field, Validate } from 'payload'

export function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

type SlugFieldOptions = {
  admin?: Extract<Field, { type: 'text' }>['admin']
  validate?: (value: string) => true | string
}

export function slugField(options: SlugFieldOptions = {}): Field {
  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'The public URL segment for this record. Lowercase letters, numbers and hyphens.',
      ...options.admin,
    },
    hooks: {
      beforeValidate: [
        ({ value }) => (typeof value === 'string' ? normalizeSlug(value) : value),
      ],
    },
    validate: ((value: unknown) => {
      const normalized = normalizeSlug(String(value ?? ''))
      if (!normalized) return 'Slug is required.'
      if (options.validate) {
        const result = options.validate(normalized)
        if (result !== true) return result
      }
      return true
    }) as Validate,
  }
}
