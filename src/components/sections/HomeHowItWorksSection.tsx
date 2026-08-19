import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

type HomeHowItWorksSectionProps = { heading: string; steps: Array<{ title: string; description?: string | null }> }

export function HomeHowItWorksSection({ heading, steps }: HomeHowItWorksSectionProps) {
  if (steps.length === 0) return null
  return (
    <Section id="how-it-works" tone="warm">
      <SectionHeading title={heading || 'A clear process from question to next step'} lead="No guesswork. We listen, explain the options, and help you move forward with confidence." />
      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="premium-card relative p-7">
            <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-brand-primary text-lg font-extrabold text-brand-lime">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-7 text-brand-primary">{step.title}</h3>
            {step.description ? <p className="mt-3 leading-7 text-muted">{step.description}</p> : null}
            {index < steps.length - 1 ? <span className="absolute -right-3 top-12 z-10 hidden text-2xl text-brand-lime md:block" aria-hidden="true">→</span> : null}
          </li>
        ))}
      </ol>
    </Section>
  )
}
