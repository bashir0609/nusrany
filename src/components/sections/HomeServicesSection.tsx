import Link from 'next/link'
import type { Service } from '@/payload-types'
import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RichTextContent } from '@/lib/content/richText'

type HomeServicesSectionProps = {
  heading: string
  intro?: string | null
  services: Service[]
  featuredService?: Service | number | null
  featuredHeadline?: string | null
  featuredBody?: unknown
}

type ServiceGroup = {
  title: string
  description: string
  match: (service: Service) => boolean
}

const groups: ServiceGroup[] = [
  {
    title: 'Tax & Financial Services',
    description: 'Careful preparation and practical guidance for households, drivers, and growing businesses.',
    match: (service) => /tax|financial|accounting|business/i.test(`${service.title} ${service.slug}`),
  },
  {
    title: 'Documents & Notary',
    description: 'Clear assistance with signatures, forms, and important life or immigration paperwork.',
    match: (service) => /notary|immigration|document|form/i.test(`${service.title} ${service.slug}`),
  },
  {
    title: 'Transportation',
    description: 'Local support for TLC owners, drivers, and defensive driving requirements.',
    match: (service) => /tlc|driv|transport|wheelchair|driver/i.test(`${service.title} ${service.slug}`),
  },
  {
    title: 'Business Services',
    description: 'Foundational help for formation, staffing, import/export, and day-to-day operations.',
    match: (service) => /business|formation|staff|import|export/i.test(`${service.title} ${service.slug}`),
  },
]

export function HomeServicesSection({ heading, intro, services, featuredService, featuredHeadline, featuredBody }: HomeServicesSectionProps) {
  const assigned = new Set<string>()
  const grouped = groups.map((group) => ({
    ...group,
    services: services.filter((service) => {
      if (assigned.has(service.slug) || !group.match(service)) return false
      assigned.add(service.slug)
      return true
    }),
  })).filter((group) => group.services.length > 0)
  const ungrouped = services.filter((service) => !assigned.has(service.slug))
  if (ungrouped.length > 0) grouped.push({ title: 'More Ways We Help', description: 'Straightforward service from a team that knows the neighborhood.', match: () => true, services: ungrouped })
  const featured = typeof featuredService === 'object' ? featuredService : null

  return (
    <Section id="services" tone="warm">
      <SectionHeading title={heading || 'Services built around real life'} lead={intro ?? 'Professional help across tax, documents, transportation, and business needs.'} />
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {grouped.map((group) => (
          <section key={group.title} className="premium-card p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">{group.title}</p>
                <p className="max-w-md text-sm leading-6 text-muted">{group.description}</p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-tint text-sm font-extrabold text-brand-secondary">{String(group.services.length).padStart(2, '0')}</span>
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {group.services.map((service) => (
                <Link key={service.slug} href={`/${service.slug}`} className="group rounded-[var(--radius-card-sm)] border border-border/80 p-4 transition hover:-translate-y-0.5 hover:border-brand-secondary/40 hover:bg-surface-tint">
                  <span className="block font-bold text-brand-primary group-hover:text-brand-secondary">{service.title}</span>
                  <span className="mt-1 block text-sm leading-5 text-muted">{service.shortDescription}</span>
                  <span className="mt-3 block text-sm font-bold text-brand-secondary">Explore service →</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      {featured ? (
        <div className="mt-8 grid gap-6 overflow-hidden rounded-[var(--radius-card)] bg-brand-primary p-7 text-white md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="eyebrow text-brand-lime">Featured support</p>
            <h2 className="mt-3 text-white">{featuredHeadline || featured.heroTitle}</h2>
            <div className="prose prose-invert mt-3 max-w-2xl text-white/75">{featuredBody ? <RichTextContent data={featuredBody} /> : <p>{featured.shortDescription}</p>}</div>
          </div>
          <Link href={`/${featured.slug}`} className="premium-button premium-button-lime whitespace-nowrap">Learn more →</Link>
        </div>
      ) : null}
    </Section>
  )
}
