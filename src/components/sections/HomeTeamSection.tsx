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
    <Section id="team">
      <SectionHeading title={heading} />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => {
          const photo = typeof member.photo === 'object' && member.photo ? member.photo : null
          return (
            <li key={member.name} className="card p-6">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo.url ?? ''}
                  alt={photo.alt ?? member.name}
                  className="mb-4 h-24 w-24 rounded-full object-cover"
                />
              ) : null}
              <h3 className="text-lg font-bold text-brand-primary">{member.name}</h3>
              {member.role ? <p className="text-sm font-medium text-brand-secondary">{member.role}</p> : null}
              {member.bio ? <p className="mt-2 text-muted">{member.bio}</p> : null}
            </li>
          )
        })}
      </ul>
      <p className="mt-6">
        <Link href="/team" className="font-semibold text-brand-secondary hover:underline">
          Meet the full team →
        </Link>
      </p>
    </Section>
  )
}
