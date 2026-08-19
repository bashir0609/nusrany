import Link from 'next/link'
import type { Service } from '@/payload-types'
import { Section } from './Section'

type ReferenceServicesSectionProps = { heading?: string | null; intro?: string | null; services: Service[] }

const fallbackServices = [
  ['Tax Preparation', 'Individuals, families, self-employed workers, and small businesses.'],
  ['Notary Services', 'Convenient witnessing and notarization for important documents.'],
  ['Immigration Forms', 'Administrative help completing forms and organizing documents.'],
  ['TLC & Driver Services', 'Practical support for drivers, vehicles, plates, and TLC needs.'],
  ['Business Services', 'LLC, corporation, and small-business setup support.'],
  ['More Services', 'Clear local help across documents, transportation, and business needs.'],
]

export function ReferenceServicesSection({ heading, intro, services }: ReferenceServicesSectionProps) {
  const cards = services.slice(0, 6)
  return (
    <Section id="services">
      <div className="mx-auto max-w-2xl text-center"><p className="eyebrow">What we do</p><h2 className="mt-3 text-brand-primary">{heading || 'How We Can Help You'}</h2><p className="mt-3 text-sm text-muted">{intro || 'Comprehensive services tailored to your needs.'}</p></div>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(cards.length > 0 ? cards : fallbackServices).map((item, index) => {
          const isService = typeof item === 'object' && 'slug' in item
          const title = isService ? item.title : item[0]
          const description = isService ? item.shortDescription : item[1]
          const href = isService ? `/${item.slug}` : '/services'
          return <Link key={isService ? item.slug : title} href={href} className="group rounded-[var(--radius-card-sm)] border border-border bg-white p-5 shadow-[0_8px_24px_rgba(15,43,70,0.05)] transition hover:-translate-y-1 hover:border-brand-secondary/35 hover:shadow-[0_16px_32px_rgba(15,43,70,0.1)]"><span className="grid h-9 w-9 place-items-center rounded-full bg-surface-tint text-sm font-extrabold text-brand-secondary">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-5 text-base text-brand-primary group-hover:text-brand-secondary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p><span className="mt-4 block text-xs font-bold text-brand-secondary">Learn More →</span></Link>
        })}
      </div>
    </Section>
  )
}
