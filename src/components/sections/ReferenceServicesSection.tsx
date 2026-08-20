import Link from 'next/link'
import type { Service } from '@/payload-types'
import { Section } from './Section'

type ReferenceServicesSectionProps = { heading?: string | null; intro?: string | null; services: Service[] }

const fallbackServices = [
  ['Tax Preparation', 'Individuals & businesses tax returns, planning, and year-round support.'],
  ['Notary Services', 'Fast, reliable notarization for all your important documents.'],
  ['Immigration Forms', 'Assistance with USCIS forms and immigration documents.'],
  ['TLC & Driver Services', 'TLC renewals, insurance, defensive driving, and more for drivers.'],
  ['Business Services', 'Business formation, EIN, bookkeeping, and ongoing support.'],
  ['More Services', 'Transportation, affidavits, power of attorney, and more.'],
]

const localArtwork: Record<string, string> = {
  'tax preparation': '/images/nusra-team-consultation.jpg',
  'notary services': '/images/notary-service.png',
  'notary public': '/images/notary-service.png',
  'immigration form assistance': '/images/team-office-conversation.jpg',
  'immigration forms': '/images/team-office-conversation.jpg',
  'auto insurance': '/images/auto-insurance-service.png',
  'auto insurance services': '/images/auto-insurance-service.png',
  'defensive driving': '/images/defensive-driving-service.png',
  'defensive driving course': '/images/defensive-driving-service.png',
  'tlc & driver services': '/images/auto-insurance-service.png',
  'tlc & transportation': '/images/auto-insurance-service.png',
  'business services': '/images/office-workspace.jpg',
  'more services': '/images/nusra-office.jpg',
}

export function ReferenceServicesSection({ heading: _heading, intro: _intro, services }: ReferenceServicesSectionProps) {
  const cards = services.slice(0, 6)
  return (
    <Section id="services" className="py-14 md:py-20">
      <div className="mx-auto max-w-2xl text-center"><h2 className="text-brand-primary">How We Can Help You</h2><p className="mt-3 text-sm text-muted md:text-base">Comprehensive services tailored to your needs.</p></div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(cards.length > 0 ? cards : fallbackServices).map((item, index) => {
          const isService = typeof item === 'object' && 'slug' in item
          const title = isService ? item.title : item[0]
          const description = isService ? item.shortDescription : item[1]
          const href = isService ? `/${item.slug}` : '/services'
          const cmsImage = isService && typeof item.heroImage === 'object' && item.heroImage ? item.heroImage : null
          const imageSrc = cmsImage?.url ?? localArtwork[title.toLowerCase()]
          return <Link key={isService ? item.slug : title} href={href} className="group flex min-h-[205px] flex-col border border-border/75 bg-white p-6 shadow-[0_8px_24px_rgba(16,42,67,0.04)] transition hover:-translate-y-1 hover:border-brand-secondary/35 hover:shadow-[0_16px_30px_rgba(16,42,67,0.09)]">
            <div className="flex items-start justify-between gap-4"><span className="grid h-10 w-10 place-items-center rounded-md bg-surface-tint p-1.5">{imageSrc ? <img src={imageSrc} alt="" className="h-full w-full rounded object-cover" /> : <span className="text-lg font-bold text-brand-secondary">{String(index + 1).padStart(2, '0')}</span>}</span><span className="text-xs font-semibold tracking-[0.16em] text-brand-lime">0{index + 1}</span></div>
            <h3 className="mt-6 text-base text-brand-primary group-hover:text-brand-secondary">{title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-5 text-muted">{description}</p>
            <span className="mt-auto pt-5 text-xs font-bold text-brand-primary">Learn More <span aria-hidden="true">→</span></span>
          </Link>
        })}
      </div>
    </Section>
  )
}
