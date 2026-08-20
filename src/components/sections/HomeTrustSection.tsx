import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

type HomeTrustSectionProps = {
  whyHeading: string
  whyItems: Array<{ title: string; description?: string | null }>
  whoHeading: string
  whoItems: Array<{ label: string }>
}

const defaultWhy = [
  { title: 'Local & Community Focused', description: 'A real Queens office with practical, respectful support.' },
  { title: 'Multilingual Support', description: 'Service in English, বাংলা, Español, हिंदी, and Français.' },
  { title: 'Honest & Transparent', description: 'Clear next steps and fees quoted before work begins.' },
  { title: 'Convenient Communication', description: 'Call, text, WhatsApp, or stop by the office.' },
  { title: 'Committed To Your Success', description: 'Careful help from first question through completion.' },
]

const defaultWho = ['Queens families', 'Independent drivers', 'Immigrant communities', 'Small-business owners', 'Notary clients']

export function HomeTrustSection({ whyHeading: _whyHeading, whyItems, whoHeading, whoItems }: HomeTrustSectionProps) {
  const audiences = whoItems.length > 0 ? whoItems : defaultWho.map((label) => ({ label }))
  const items = whyItems.length >= 5 ? whyItems.slice(0, 5) : defaultWhy

  return (
    <>
      <Section id="who-we-help" tone="warm" className="py-14 md:py-18">
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
      <section id="why-us" className="bg-brand-primary py-12 text-white md:py-14">
        <div className="container-nusra">
          <div className="mx-auto max-w-2xl text-center"><h2 className="text-2xl text-white md:text-3xl">Why Clients Choose Nusra</h2></div>
          <ul className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
            {items.map((item, index) => <li key={item.title} className="text-center"><span className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-brand-lime/80 text-sm font-bold text-brand-lime">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-4 text-sm leading-5 text-white">{item.title}</h3><p className="mt-2 text-xs leading-5 text-white/60">{item.description}</p></li>)}
          </ul>
        </div>
      </section>
    </>
  )
}
