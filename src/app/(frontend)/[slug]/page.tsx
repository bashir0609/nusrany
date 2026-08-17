import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Service } from '@/payload-types'
import { getPublishedFAQs, getPublishedServices, getServiceBySlug, getSiteSettings } from '@/lib/content/queries'
import { isReservedServiceSlug } from '@/lib/site/reservedSlugs'
import { buildMetadata } from '@/lib/seo/metadata'
import { buildServiceJsonLd } from '@/lib/seo/jsonLd'
import { getMediaUrl } from '@/lib/site/media'
import { JsonLd } from '@/components/seo/JsonLd'
import { ServiceTemplate } from '@/components/service/ServiceTemplate'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (isReservedServiceSlug(slug)) return {}
  const service = await getServiceBySlug(slug)
  if (!service) return {}
  return buildMetadata({
    title: service.title,
    seoTitle: service.seo?.title,
    description: service.seo?.description ?? service.shortDescription,
    imageUrl: getMediaUrl(service.heroImage),
    path: `/${service.slug}`,
  })
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params

  // Reserved slugs belong to real routes or the application; never treat them as services.
  if (isReservedServiceSlug(slug)) notFound()

  const { isEnabled } = await draftMode()
  const service = await getServiceBySlug(slug, isEnabled)
  if (!service) notFound()

  const [settings, faqs, allServices] = await Promise.all([
    getSiteSettings(),
    getPublishedFAQs(),
    getPublishedServices(),
  ])

  const relatedServices =
    service.relatedServices?.filter((r): r is Service => typeof r !== 'number') ??
    allServices.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      <JsonLd data={buildServiceJsonLd(service, settings)} />
      <ServiceTemplate
        service={service}
        settings={settings}
        faqs={faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))}
        relatedServices={relatedServices}
      />
    </>
  )
}
