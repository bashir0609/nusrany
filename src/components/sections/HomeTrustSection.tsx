import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

type HomeTrustSectionProps = {
  whyHeading: string
  whyItems: Array<{ title: string; description?: string | null }>
  whoHeading: string
  whoItems: Array<{ label: string }>
}

const defaultTrust = [
  { title: 'Local Queens office', description: 'Real people, clear answers, and a neighborhood office you can reach.' },
  { title: 'Verified credentials', description: 'IRS e-file provider, PTIN registered tax preparer, and certified NY notary public.' },
  { title: 'Multilingual team', description: 'Support for English, বাংলা, Español, हिंदी, and Français.' },
  { title: 'Secure document handling', description: 'Careful processes and respectful handling of sensitive information.' },
  { title: 'Schedule C & E experience', description: 'Practical tax support for families, independent drivers, and owners.' },
  { title: 'Clear pricing', description: 'Straightforward next steps without confusing packages or pressure.' },
]

const defaultWho = ['Queens families', 'Independent drivers', 'Immigrant communities', 'Small-business owners', 'Notary clients']

export function HomeTrustSection({ whyHeading, whyItems, whoHeading, whoItems }: HomeTrustSectionProps) {
  const items = whyItems.length > 0 ? whyItems : defaultTrust
  const audiences = whoItems.length > 0 ? whoItems : defaultWho.map((label) => ({ label }))

  return (
    <>
      <Section id="who-we-help" tone="warm">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="section-kicker">Who we help</p>
            <SectionHeading title={whoHeading || 'Practical guidance for the people and businesses we know best'} lead="Whether you are preparing a return, starting a business, or handling an important document, you can speak with a real local team." />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {audiences.map((item, index) => <div key={item.label} className="border-t-2 border-brand-lime bg-white px-4 py-5 text-sm font-bold text-brand-primary shadow-[0_8px_20px_rgba(16,42,67,0.05)]"><span className="mb-3 block text-xs font-semibold tracking-[0.14em] text-muted">0{index + 1}</span>{item.label}</div>)}
          </div>
        </div>
      </Section>
      <Section id="why-us">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="section-kicker">Why choose Nusra</p>
            <SectionHeading title={whyHeading || 'Professional help with a local point of view'} lead="The details matter. Our role is to make the next step feel clear, calm, and manageable." />
            <div className="mt-7 inline-flex items-center gap-3 border-l-2 border-brand-lime bg-surface-tint px-4 py-3 text-sm font-bold text-brand-primary">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-primary text-brand-lime">✓</span>
              Serving Queens since 2020
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((item, index) => (
              <li key={item.title} className="premium-card p-6 transition hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-primary text-sm font-extrabold text-brand-lime">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">Nusra standard</span>
                </div>
                <h3 className="mt-7 text-brand-primary">{item.title}</h3>
                {item.description ? <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}
