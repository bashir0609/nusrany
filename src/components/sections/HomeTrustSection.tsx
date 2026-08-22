import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

type HomeTrustSectionProps = {
  whyHeading: string
  whyItems: Array<{ title: string; description?: string | null }>
  whoHeading: string
  whoItems: Array<{ label: string }>
}

const defaultWhy = [
  { title: 'Local Queens Office', description: 'Speak with a real local team at 90-54 204th Street in Hollis.' },
  { title: 'Verified Credentials', description: 'Professional tax and notary credentials are presented clearly.' },
  { title: 'Multilingual Team', description: 'Support in English, বাংলা, Español, हिंदी, and Français.' },
  { title: 'Schedule C & E Experience', description: 'Practical help for independent workers, drivers, and families.' },
  { title: 'Secure Document Handling', description: 'Your personal information is treated with care and discretion.' },
  { title: 'Clear Pricing', description: 'Know the next step and expected fee before work begins.' },
]

const defaultWho = ['Queens families', 'Drivers', 'TLC owners', 'Small businesses', 'Immigrant communities']

export function HomeTrustSection({ whyHeading, whyItems, whoHeading, whoItems }: HomeTrustSectionProps) {
  const audiences = whoItems.length > 0 ? whoItems : defaultWho.map((label) => ({ label }))
  const items = whyItems.length > 0 ? whyItems : defaultWhy

  return (
    <>
      <Section id="who-we-help" tone="warm" className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="section-kicker">Who we help</p>
            <SectionHeading title={whoHeading || 'Support shaped around real life'} lead="Whether you are filing a return, driving for a living, or organizing an important document, you can speak with a real local team." />
          </div>
          <ul className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {audiences.slice(0, 5).map((item, index) => (
              <li key={item.label} className="bg-white p-5">
                <span className="text-xs font-bold tracking-[0.16em] text-brand-lime">0{index + 1}</span>
                <p className="mt-8 text-sm font-bold leading-5 text-brand-primary">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <section id="why-us" className="bg-brand-primary py-16 text-white md:py-20">
        <div className="container-nusra">
          <div className="max-w-2xl">
            <p className="section-kicker text-brand-lime">Why choose Nusra</p>
            <h2 className="text-white">{whyHeading || 'Professional care with a local point of view'}</h2>
          </div>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.slice(0, 6).map((item, index) => (
              <li key={item.title} className="border-t border-white/20 pt-5">
                <span className="text-xs font-bold tracking-[0.16em] text-brand-lime">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-base text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
