import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

type HomeTrustSectionProps = {
  whyHeading: string
  whyItems: Array<{ title: string; description?: string | null }>
  whoHeading: string
  whoItems: Array<{ label: string }>
}

export function HomeTrustSection({ whyHeading, whyItems, whoHeading, whoItems }: HomeTrustSectionProps) {
  return (
    <Section tone="warm">
      <SectionHeading title={whyHeading} />
      <ul className="grid gap-5 sm:grid-cols-2">
        {whyItems.map((item) => (
          <li key={item.title} className="card p-6">
            <h3 className="text-base font-bold text-brand-primary">{item.title}</h3>
            {item.description ? <p className="mt-1.5 text-muted">{item.description}</p> : null}
          </li>
        ))}
      </ul>

      {whoItems.length > 0 ? (
        <div className="mt-14">
          <SectionHeading title={whoHeading} />
          <ul className="flex flex-wrap gap-3">
            {whoItems.map((item) => (
              <li key={item.label} className="rounded-full border border-brand-teal/40 bg-white px-4 py-2 text-sm font-medium text-brand-secondary">
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  )
}
