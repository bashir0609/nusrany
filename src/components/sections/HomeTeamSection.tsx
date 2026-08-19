import Link from 'next/link'
import type { TeamMember } from '@/payload-types'
import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

type HomeTeamSectionProps = {
  heading: string
  members: TeamMember[]
}

export function HomeTeamSection({ heading, members }: HomeTeamSectionProps) {
  if (members.length === 0) return null
  return (
    <Section id="team" tone="warm">
      <SectionHeading title={heading || 'A local team that takes your questions seriously'} lead="Professional experience, clear communication, and multilingual local support." />
      <ul className="mt-10 grid gap-5 lg:grid-cols-3">
        {members.map((member, index) => {
          const photo = typeof member.photo === 'object' && member.photo ? member.photo : null
          return (
            <li key={member.name} className={`${index === 0 ? 'lg:col-span-2 lg:flex-row' : 'flex-col'} premium-card flex gap-6 p-6 md:p-8`}>
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo.url ?? ''} alt={photo.alt ?? member.name} className="h-32 w-32 shrink-0 rounded-[var(--radius-card-sm)] object-cover" />
              ) : <div className="grid h-32 w-32 shrink-0 place-items-center rounded-[var(--radius-card-sm)] bg-brand-primary text-4xl font-extrabold text-brand-lime">{member.name.slice(0, 1)}</div>}
              <div>
                <p className="eyebrow">{index === 0 ? 'Lead advisor' : 'Nusra team'}</p>
                <h3 className="mt-2 text-brand-primary">{member.name}</h3>
                {member.role ? <p className="mt-1 font-bold text-brand-secondary">{member.role}</p> : null}
                {member.bio ? <p className="mt-3 leading-7 text-muted">{member.bio}</p> : null}
                {index === 0 ? <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide text-brand-primary"><span className="rounded-full bg-surface-tint px-3 py-2">IRS e-file</span><span className="rounded-full bg-surface-tint px-3 py-2">PTIN registered</span><span className="rounded-full bg-surface-tint px-3 py-2">NY notary</span></div> : null}
              </div>
            </li>
          )
        })}
      </ul>
      <p className="mt-7"><Link href="/team" className="font-bold text-brand-secondary hover:text-brand-primary">Meet the full team →</Link></p>
    </Section>
  )
}
