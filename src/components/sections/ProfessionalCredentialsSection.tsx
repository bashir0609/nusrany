import type { SiteSetting } from '@/payload-types'
import { Section } from './Section'

type ProfessionalCredentialsSectionProps = { settings: SiteSetting }

const credentials = [
  'Authorized IRS e-file Provider',
  'PTIN-registered tax preparer',
  'Certified NY Notary Public',
  'Bonded · online notarization available',
  '24/7 TLC Transportation',
  'Licensed & insured · all five boroughs · wheelchair-accessible',
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
