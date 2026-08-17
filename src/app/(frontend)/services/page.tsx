import type { Metadata } from 'next'
import { getPublishedServices } from '@/lib/content/queries'
import { Section } from '@/components/sections/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { buildMetadata } from '@/lib/seo/metadata'
import { buildBreadcrumbJsonLd } from '@/lib/seo/jsonLd'
import { JsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = buildMetadata({
  title: 'Our Services',
  description: 'Tax preparation, notary public, immigration form assistance, defensive driving, TLC transportation, and business services in Queens, NY.',
  path: '/services',
})

export default async function ServicesPage() {
  const services = await getPublishedServices()

  return (
    <Section>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])} />
      <SectionHeading
        as="h1"
        title="Our Services"
        lead="Practical, personal assistance for individuals, families, drivers, and small businesses in Queens, New York."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            title={service.title}
            description={service.shortDescription}
            href={`/${service.slug}`}
          />
        ))}
      </div>
    </Section>
  )
}
