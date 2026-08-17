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
    <Section tone="warm" id="faqs">
      <SectionHeading title={heading} />
      <FaqAccordion items={faqs} />
    </Section>
  )
}
