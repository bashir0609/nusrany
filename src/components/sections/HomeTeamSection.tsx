import Link from 'next/link'
import type { TeamMember } from '@/payload-types'
import { Section } from './Section'

type HomeTeamSectionProps = {
  heading: string
  members: TeamMember[]
}

export function HomeTeamSection({ heading, members }: HomeTeamSectionProps) {
  if (members.length === 0) return null
  const ceo = members.find((member) => member.name.trim().toLowerCase() === 'aminul islam khan') ?? members[0]
  const photo = typeof ceo.photo === 'object' && ceo.photo ? ceo.photo : null
  const credentials = ceo.credentials?.map((item) => item.label).filter(Boolean) ?? ['IRS e-file Provider', 'PTIN Registered Tax Preparer', 'Certified NY Notary Public']
  const languages = ceo.languages?.map((item) => item.label).filter(Boolean) ?? ['English', 'বাংলা', 'Español', 'हिंदी', 'Français']

  return (
    <Section id="team" className="py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p className="section-kicker">Meet the team</p>
          <h2 className="text-brand-primary">{heading || 'A local team you can trust'}</h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-muted">Professional guidance starts with listening. Meet the people behind Nusra Tax &amp; Notary and the Queens office that serves you.</p>
      </div>
      <article className="mt-12 grid overflow-hidden border border-border bg-surface-warm md:grid-cols-[0.8fr_1.2fr]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo?.url ?? '/images/aminul-islam-khan.png'} alt={photo?.alt ?? ceo.name} className="h-full min-h-[320px] w-full object-cover" />
        <div className="p-7 md:p-10">
          <h3 className="text-3xl text-brand-primary">{ceo.name || 'Aminul Islam Khan'}</h3>
          <p className="mt-2 text-sm font-bold text-brand-secondary">{ceo.role || 'CEO, Nusra Trading Inc.'}</p>
          {ceo.bio ? <p className="mt-6 max-w-xl text-base leading-7 text-muted">{ceo.bio}</p> : null}
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="eyebrow">Credentials</p>
              <ul className="mt-3 space-y-2 text-sm text-brand-primary">{credentials.slice(0, 3).map((item) => <li key={item} className="flex gap-2"><span className="text-brand-lime">✓</span>{item}</li>)}</ul>
            </div>
            <div>
              <p className="eyebrow">Languages</p>
              <p className="mt-3 text-sm leading-6 text-brand-primary">{languages.join(' · ')}</p>
            </div>
          </div>
        </div>
      </article>
      <div className="mt-10 text-center"><Link href="/team" className="premium-button premium-button-secondary">Meet the full team</Link></div>
    </Section>
  )
}
