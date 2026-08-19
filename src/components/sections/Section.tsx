import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'

type SectionProps = {
  children: ReactNode
  className?: string
  tone?: 'white' | 'warm' | 'navy'
  id?: string
}

export function Section({ children, className = '', tone = 'white', id }: SectionProps) {
  return (
    <section id={id} className={`py-12 md:py-16 ${tone === 'warm' ? 'bg-surface-warm' : tone === 'navy' ? 'bg-brand-primary' : 'bg-surface'} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
