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

export function HomeTrustSection({ whyHeading, whyItems, whoHeading, whoItems }: HomeTrustSectionProps) {
  const items = whyItems.length > 0 ? whyItems : defaultTrust
  return (
    <Section id="why-us">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <p className="section-kicker">Why choose Nusra</p>
          <SectionHeading title={whyHeading || 'Professional help with a local point of view'} lead="The details matter. Our role is to make the next step feel clear, calm, and manageable." />
          <div className="mt-7 inline-flex items-center gap-3 rounded-full bg-surface-tint px-4 py-3 text-sm font-bold text-brand-primary">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-lime text-brand-primary">✓</span>
            Serving Queens since 2020
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <li key={item.title} className="premium-card p-6 transition hover:-translate-y-1">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-primary text-sm font-extrabold text-brand-lime">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-xl text-brand-secondary">✦</span>
              </div>
              <h3 className="mt-7 text-brand-primary">{item.title}</h3>
              {item.description ? <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p> : null}
            </li>
          ))}
        </ul>
      </div>
      {whoItems.length > 0 ? (
        <div className="mt-20 rounded-[var(--radius-card)] bg-surface-tint p-7 md:p-10">
          <p className="section-kicker">Who we help</p>
          <h2 className="mt-2 text-brand-primary">{whoHeading || 'Built for the people and businesses we know best'}</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {whoItems.map((item) => <div key={item.label} className="rounded-[var(--radius-card-sm)] border border-brand-secondary/15 bg-white px-4 py-4 text-sm font-bold text-brand-primary">{item.label}</div>)}
          </div>
        </div>
      ) : null}
    </Section>
  )
}
