import type { SiteSetting } from '@/payload-types'
import { Section } from './Section'

type ProfessionalCredentialsSectionProps = { settings: SiteSetting }

const credentials = [
  'Serving Queens Since 2020',
  'IRS e-file Provider',
  'PTIN Registered Tax Preparer',
  'Certified NY Notary Public',
  '5 Languages Spoken',
]

export function ProfessionalCredentialsSection({ settings: _settings }: ProfessionalCredentialsSectionProps) {
  return (
    <Section id="credentials" className="border-b border-border/70 py-4 md:py-5">
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center md:justify-between md:text-left">
        <p className="eyebrow text-brand-secondary">Trusted in Queens</p>
        {credentials.map((credential) => <span key={credential} className="text-[0.68rem] font-semibold text-muted">{credential}</span>)}
      </div>
    </Section>
  )
}
