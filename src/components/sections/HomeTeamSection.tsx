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
  const localFallbacks = ['/images/aminul-islam-khan.png', '/images/team-office-group.jpg', '/images/nusra-team-consultation.jpg', '/images/team-office-conversation.jpg']

  return (
    <Section id="team" tone="warm">
      <SectionHeading title={heading || 'A local team that takes your questions seriously'} lead="Professional experience, clear communication, and multilingual local support." />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member, index) => {
          const photo = typeof member.photo === 'object' && member.photo ? member.photo : null
          const isAminul = member.name.trim().toLowerCase() === 'aminul islam khan'
          const displayRole = isAminul ? 'CEO, Nusra Trading Inc.' : member.role
          const imageSrc = photo?.url ?? (isAminul ? '/images/aminul-islam-khan.png' : localFallbacks[index % localFallbacks.length])
          return (
            <li key={member.name} className="premium-card flex h-full flex-col gap-4 p-5 md:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc} alt={photo?.alt ?? member.name} className="aspect-[4/3] w-full rounded-[var(--radius-card-sm)] object-cover" />
              <div>
                <p className="eyebrow">{index === 0 ? 'Lead advisor' : 'Nusra team'}</p>
                <h3 className="mt-2 text-brand-primary">{member.name}</h3>
                {displayRole ? <p className="mt-1 font-bold text-brand-secondary">{displayRole}</p> : null}
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
