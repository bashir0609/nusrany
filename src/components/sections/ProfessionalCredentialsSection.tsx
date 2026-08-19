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

export function ProfessionalCredentialsSection({ settings }: ProfessionalCredentialsSectionProps) {
  return (
    <Section id="credentials" tone="navy" className="py-8 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[0.64fr_1.36fr] lg:items-center">
        <div>
          <p className="section-kicker text-brand-lime">Trusted in Queens</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">Clear, practical support from a local office serving families, drivers, and small businesses.</p>
        </div>
        <ul className="grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
          {credentials.map((credential, index) => <li key={credential} className="bg-brand-primary px-4 py-4"><span className="block text-xs font-semibold tracking-[0.16em] text-brand-lime">0{index + 1}</span><span className="mt-2 block text-sm font-bold leading-5 text-white">{credential}</span></li>)}
        </ul>
      </div>
    </Section>
  )
}
