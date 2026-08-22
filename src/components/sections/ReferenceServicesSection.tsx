import Link from 'next/link'
import type { Service } from '@/payload-types'
import { Section } from './Section'

 type ReferenceServicesSectionProps = { heading?: string | null; intro?: string | null; services: Service[] }

type ServiceGroup = {
  title: string
  description: string
  keywords: string[]
}

const groups: ServiceGroup[] = [
  { title: 'Tax & Financial Services', description: 'Thoughtful support for personal, self-employed, and small-business tax needs.', keywords: ['tax', 'business'] },
  { title: 'Documents & Notary', description: 'Careful help with notarization and immigration-supporting paperwork.', keywords: ['notary', 'immigration', 'document'] },
  { title: 'Transportation Services', description: 'Practical support for drivers, TLC owners, and transportation needs.', keywords: ['tlc', 'transport', 'defensive', 'driving'] },
  { title: 'Business Services', description: 'Speak with our team about business formation, staffing, and ongoing support.', keywords: ['business', 'formation', 'staffing', 'import'] },
]

function matches(service: Service, group: ServiceGroup) {
  const text = `${service.title} ${service.shortDescription ?? ''}`.toLowerCase()
  return group.keywords.some((keyword) => text.includes(keyword))
}

export function ReferenceServicesSection({ heading, intro, services }: ReferenceServicesSectionProps) {
  const assigned = new Set<number>()
  const serviceGroups = groups.map((group) => ({
    ...group,
    services: services.filter((service) => {
      const matched = matches(service, group) && !assigned.has(service.id)
      if (matched) assigned.add(service.id)
      return matched
    }),
  }))

  return (
    <Section id="services" className="py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
        <div>
          <p className="section-kicker">Services</p>
          <h2 className="text-brand-primary">{heading || 'Professional support, thoughtfully organized'}</h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-muted">{intro || 'From tax preparation and notarization to driver and business support, get clear guidance from a real local team.'}</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {serviceGroups.map((group) => (
          <section key={group.title} className="border-t-2 border-brand-lime bg-surface-warm p-6 md:p-7">
            <h3 className="text-xl text-brand-primary">{group.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{group.description}</p>
            {group.services.length > 0 ? (
              <ul className="mt-6 divide-y divide-border/80">
                {group.services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/${service.slug}`} className="group flex items-center justify-between gap-4 py-4 text-sm font-bold text-brand-primary hover:text-brand-secondary">
                      <span>{service.title}</span><span aria-hidden="true" className="text-brand-lime transition group-hover:translate-x-1">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Link href="/contact" className="mt-6 inline-flex text-sm font-bold text-brand-secondary underline decoration-brand-lime underline-offset-4 hover:text-brand-primary">Ask about business support →</Link>
            )}
          </section>
        ))}
      </div>
    </Section>
  )
}
