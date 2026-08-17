import { RichText } from '@payloadcms/richtext-lexical/react'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

type RichTextContentProps = {
  data: unknown
  className?: string
}

/**
 * Render Payload Lexical rich text. External links open in a new tab with
 * rel="noopener noreferrer"; public media uploads render as lazy images.
 */
export function RichTextContent({ data, className }: RichTextContentProps) {
  if (!data) return null

  const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,
    link: ({ node, nodesToJSX }) => {
      const linkNode = node as unknown as { url?: string; linkType?: string }
      const url = linkNode.url ?? '#'
      const external = linkNode.linkType === 'custom' || /^https?:\/\//.test(url)
      return (
        <a
          href={url}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="font-medium text-brand-secondary underline underline-offset-2 hover:text-brand-teal"
        >
          {nodesToJSX({ nodes: (node as { children?: unknown[] }).children as never ?? [] })}
        </a>
      )
    },
    upload: ({ node }) => {
      const uploadNode = node as unknown as {
        value?: { url?: string; alt?: string | null; filename?: string }
      }
      const value = uploadNode.value
      if (!value || typeof value === 'number' || !value.url) return null
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value.url}
          alt={value.alt ?? ''}
          loading="lazy"
          className="my-6 h-auto w-full rounded-[var(--radius-card)]"
        />
      )
    },
  })

  return (
    <div className={className}>
      <RichText data={data as Parameters<typeof RichText>[0]['data']} converters={converters} />
    </div>
  )
}
