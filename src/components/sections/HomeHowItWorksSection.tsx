import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

type HomeHowItWorksSectionProps = {
  heading: string
  steps: Array<{ title: string; description?: string | null }>
}

export function HomeHowItWorksSection({ heading, steps }: HomeHowItWorksSectionProps) {
  if (steps.length === 0) return null
  return (
    <Section id="how-it-works">
      <SectionHeading title={heading} />
      <ol className="grid gap-5 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="relative rounded-[var(--radius-card)] border border-border bg-surface p-6">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-lg font-bold text-white"
            >
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-bold text-brand-primary">{step.title}</h3>
            {step.description ? <p className="mt-1.5 text-muted">{step.description}</p> : null}
          </li>
        ))}
      </ol>
    </Section>
  )
}
