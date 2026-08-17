import type { Metadata } from 'next'
import { getPublishedTeam, getSiteSettings } from '@/lib/content/queries'
import type { TeamMember } from '@/payload-types'
import { Section } from '@/components/sections/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { buildMailtoHref, buildTelHref } from '@/lib/site/contactLinks'
import { buildMetadata } from '@/lib/seo/metadata'
import { buildBreadcrumbJsonLd } from '@/lib/seo/jsonLd'
import { JsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = buildMetadata({
  title: 'Meet the Team',
  description: 'Meet the team behind Nusra Tax & Notary — real people with verified roles serving Queens, NY.',
  path: '/team',
})

function MemberCard({ member }: { member: TeamMember }) {
  const photo = typeof member.photo === 'object' && member.photo ? member.photo : null
  const credentials = (member.credentials ?? []).filter((c) => c.label)
  const languages = (member.languages ?? []).filter((l) => l.label)
  return (
    <li className="card h-full p-6">
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo.url ?? ''}
          alt={photo.alt ?? member.name}
          className="mb-4 h-28 w-28 rounded-full object-cover"
        />
      ) : null}
      <h2 className="text-xl">{member.name}</h2>
      {member.role ? <p className="text-sm font-medium text-brand-secondary">{member.role}</p> : null}
      {member.bio ? <p className="mt-2 text-muted">{member.bio}</p> : null}
      {credentials.length > 0 ? (
        <ul className="mt-4 space-y-1 text-sm text-ink">
          {credentials.map((credential, index) => (
            <li key={index} className="flex gap-2">
              <span aria-hidden="true" className="text-brand-secondary">•</span>
              {credential.label}
            </li>
          ))}
        </ul>
      ) : null}
      {languages.length > 0 ? (
        <p className="mt-4 text-sm text-muted">
          <span className="font-semibold text-ink">Languages: </span>
          {languages.join(', ')}
        </p>
      ) : null}
      {member.phone || member.email ? (
        <p className="mt-3 text-sm">
          {member.phone ? (
            <a href={buildTelHref(member.phone)} className="mr-3 font-medium text-brand-secondary hover:underline">
              {member.phone}
            </a>
          ) : null}
          {member.email ? (
            <a href={buildMailtoHref(member.email)} className="font-medium text-brand-secondary hover:underline">
              {member.email}
            </a>
          ) : null}
        </p>
      ) : null}
    </li>
  )
}

export default async function TeamPage() {
  const team = await getPublishedTeam()
  const settings = await getSiteSettings()

  return (
    <Section>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Team', path: '/team' }])} />
      <SectionHeading
        as="h1"
        title="Meet the Team"
        lead="Real people, verified roles. We are proud to serve Queens and the surrounding community."
      />
      {team.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </ul>
      ) : (
        <p className="text-muted">Team profiles are being prepared and will appear here soon.</p>
      )}
      <p className="mt-8 text-muted">
        Questions? Call us at{' '}
        <a href={buildTelHref(settings.phone)} className="font-medium text-brand-secondary hover:underline">
          {settings.phone}
        </a>
        .
      </p>
    </Section>
  )
}
