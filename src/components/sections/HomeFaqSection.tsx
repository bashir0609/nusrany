import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FaqAccordion } from './FaqAccordion'

type HomeFaqSectionProps = {
  heading: string
  faqs: Array<{ question: string; answer: string }>
}

export function HomeFaqSection({ heading, faqs }: HomeFaqSectionProps) {
  if (faqs.length === 0) return null
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <p className="section-kicker">Need to know</p>
          <SectionHeading title={heading || 'Frequently asked questions'} lead="A few straightforward answers before you reach out." />
        </div>
        <FaqAccordion items={faqs} />
      </div>
    </Section>
  )
}
