import Image from 'next/image'
import Link from 'next/link'
import type { TeamMember } from '@/payload-types'
import { Section } from './Section'

type HomeTeamSectionProps = {
  heading: string
  members: TeamMember[]
}

export function HomeTeamSection({ heading, members }: HomeTeamSectionProps) {
  if (members.length === 0) return null
  const lead = members.find((member) => member.name.trim().toLowerCase() === 'aminul islam khan') ?? members[0]
  const others = members.filter((member) => member.id !== lead.id).slice(0, 3)
  const photo = typeof lead.photo === 'object' && lead.photo ? lead.photo : null
  const credentials = lead.credentials?.map((item) => item.label).filter(Boolean) ?? ['IRS e-file Provider', 'PTIN Registered Tax Preparer', 'Certified NY Notary Public']
  const languages = lead.languages?.map((item) => item.label).filter(Boolean) ?? ['English', 'বাংলা', 'Español', 'हिंदी', 'Français']

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
        <Image src={photo?.url ?? '/images/aminul-islam-khan.png'} alt={photo?.alt ?? lead.name} width={900} height={720} className="h-full min-h-[320px] w-full object-cover" />
        <div className="p-7 md:p-10">
          <p className="eyebrow">Owner · Nusra Trading Inc.</p>
          <h3 className="mt-3 text-3xl text-brand-primary">{lead.name || 'Aminul Islam Khan'}</h3>
          <p className="mt-2 text-sm font-bold text-brand-secondary">{lead.role || 'Owner — Nusra Trading Inc.'}</p>
          {lead.bio ? <p className="mt-6 max-w-xl text-base leading-7 text-muted">{lead.bio}</p> : null}
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
      {others.length > 0 ? <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{others.map((member) => { const memberPhoto = typeof member.photo === 'object' && member.photo ? member.photo : null; return <li key={member.id} className="border-t border-border pt-4"><h3 className="text-base text-brand-primary">{member.name}</h3><p className="mt-1 text-sm text-muted">{member.role}</p>{memberPhoto?.url ? <Image src={memberPhoto.url} alt={memberPhoto.alt ?? member.name} width={720} height={540} className="mt-4 aspect-[4/3] w-full object-cover" /> : null}</li> })}</ul> : null}
      <div className="mt-10 text-center"><Link href="/team" className="premium-button premium-button-secondary">Meet the full team</Link></div>
    </Section>
  )
}
