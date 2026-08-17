import { draftMode } from 'next/headers'
import { getLegalContent } from '@/lib/content/queries'
import { getLegalFallback } from '@/seed/legalContent'
import { RichTextContent } from '@/lib/content/richText'
import { buildMetadata } from '@/lib/seo/metadata'

export function buildLegalMetadata(title: string, path: string) {
  return buildMetadata({ title, path })
}

type LegalKind = 'privacyPolicy' | 'terms' | 'disclaimer'

export async function LegalPageLayout({ kind, title }: { kind: LegalKind; title: string }) {
  const { isEnabled } = await draftMode()
  const legal = await getLegalContent(isEnabled)
  const content = legal?.[kind]
  const fallback = getLegalFallback(kind)

  return (
    <main>
      <section className="border-b border-border bg-surface-warm">
        <div className="container-nusra py-12">
          <h1>{title}</h1>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container-nusra max-w-3xl">
          {content ? (
            <RichTextContent data={content} className="space-y-4 text-muted" />
          ) : (
            <p className="text-muted">{fallback}</p>
          )}
        </div>
      </section>
    </main>
  )
}
