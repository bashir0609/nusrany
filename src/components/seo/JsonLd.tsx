import { serializeJsonLd, type JsonLd } from '@/lib/seo/jsonLd'

export function JsonLd({ data }: { data: JsonLd }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
}
