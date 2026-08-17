import Link from 'next/link'
import type { Service } from '@/payload-types'
import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { RichTextContent } from '@/lib/content/richText'

type HomeServicesSectionProps = {
  heading: string
  intro?: string | null
  services: Service[]
  featuredService?: Service | number | null
  featuredHeadline?: string | null
  featuredBody?: unknown
}

export function HomeServicesSection({
  heading,
  intro,
  services,
  featuredService,
  featuredHeadline,
  featuredBody,
}: HomeServicesSectionProps) {
  const featured = typeof featuredService === 'object' ? featuredService : null
  return (
    <Section id="services">
      <SectionHeading title={heading} lead={intro ?? undefined} />
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
      {featured ? (
        <div className="mt-12 rounded-[var(--radius-card)] bg-brand-primary p-8 text-white md:p-10">
          <h2 className="text-white">{featuredHeadline || featured.heroTitle}</h2>
          <div className="prose prose-invert mt-3 max-w-none text-white/90">
            {featuredBody ? <RichTextContent data={featuredBody} /> : <p>{featured.shortDescription}</p>}
          </div>
          <Link
            href={`/${featured.slug}`}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-lime px-6 py-3 font-semibold text-brand-primary hover:bg-white"
          >
            Learn about {featured.title}
          </Link>
        </div>
      ) : null}
    </Section>
  )
}
