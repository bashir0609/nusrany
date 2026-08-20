import Link from 'next/link'
import type { TeamMember } from '@/payload-types'
import { Section } from './Section'

type HomeTeamSectionProps = {
  heading: string
  members: TeamMember[]
}

type DisplayTeamCard = {
  name: string
  role: string
  bio?: string | null
  imageSrc: string
  alt: string
  isLead?: boolean
}

export function HomeTeamSection({ heading: _heading, members }: HomeTeamSectionProps) {
  if (members.length === 0) return null
  const localFallbacks = ['/images/team-office-group.jpg', '/images/nusra-team-consultation.jpg', '/images/team-office-conversation.jpg']
  const cards: DisplayTeamCard[] = members.map((member, index) => {
    const photo = typeof member.photo === 'object' && member.photo ? member.photo : null
    const isAminul = member.name.trim().toLowerCase() === 'aminul islam khan'
    return {
      name: member.name,
      role: isAminul ? 'CEO, Nusra Trading Inc.' : member.role || 'Nusra team',
      bio: member.bio,
      imageSrc: photo?.url ?? (isAminul ? '/images/aminul-islam-khan.png' : localFallbacks[index % localFallbacks.length]),
      alt: photo?.alt ?? member.name,
      isLead: isAminul,
    }
  })
  const supportingCards: DisplayTeamCard[] = [
    { name: 'Nusra Office Team', role: 'Local support', bio: 'A welcoming Queens office where your questions are handled with care.', imageSrc: '/images/team-office-group.jpg', alt: 'Nusra office team', isLead: false },
    { name: 'Client Consultation', role: 'Clear communication', bio: 'We explain your options and give you a practical next step.', imageSrc: '/images/nusra-team-consultation.jpg', alt: 'Nusra team consulting with a client', isLead: false },
    { name: 'Document Support', role: 'Professional assistance', bio: 'Careful help with tax, notary, business, and driver paperwork.', imageSrc: '/images/team-office-conversation.jpg', alt: 'Nusra team discussing documents', isLead: false },
  ]
  const displayCards = [...cards, ...supportingCards].slice(0, 4)

  return (
    <Section id="team" className="py-14 md:py-20">
      <div className="mx-auto max-w-2xl text-center"><h2 className="text-brand-primary">Meet Your Team</h2><p className="mt-3 text-sm text-muted md:text-base">Experienced professionals who care.</p></div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {displayCards.map((card) => <li key={card.name} className="min-w-0"><div className="overflow-hidden rounded-[var(--radius-card-sm)] border border-border bg-white shadow-[0_8px_22px_rgba(16,42,67,0.05)]"><img src={card.imageSrc} alt={card.alt} className="aspect-[4/3] w-full object-cover" /><div className="p-4"><h3 className="text-sm text-brand-primary">{card.name}</h3><p className="mt-1 text-xs font-semibold text-muted">{card.role}</p>{card.bio ? <p className="mt-3 line-clamp-3 text-xs leading-5 text-muted">{card.bio}</p> : null}</div></div></li>)}
      </ul>
      <div className="mt-8 text-center"><Link href="/team" className="premium-button premium-button-primary">View All Team Members</Link></div>
    </Section>
  )
}
