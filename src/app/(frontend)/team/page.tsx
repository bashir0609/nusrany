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
  description: 'Meet the verified team behind Nusra Tax & Notary serving Queens, NY.',
  path: '/team',
})

function MemberCard({ member }: { member: TeamMember }) {
  const photo = typeof member.photo === 'object' && member.photo ? member.photo : null
  const isAminul = member.name.trim().toLowerCase() === 'aminul islam khan'
  const imageSrc = photo?.url ?? (isAminul ? '/images/aminul-islam-khan.png' : null)
  const credentials = (member.credentials ?? []).filter((credential) => credential.label)
  const languages = (member.languages ?? []).filter((language) => language.label)

  return (
    <li className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-white shadow-[0_8px_24px_rgba(15,43,70,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,43,70,0.1)]">
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={photo?.alt ?? member.name}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center bg-brand-primary text-5xl font-bold text-white">
          {member.name.charAt(0)}
        </div>
      )}
      <div className="p-6">
        <p className="eyebrow">Verified team member</p>
        <h2 className="mt-2 text-xl text-brand-primary">{member.name}</h2>
        {member.role ? <p className="mt-1 font-semibold text-brand-secondary">{member.role}</p> : null}
        {member.bio ? <p className="mt-4 text-sm leading-6 text-muted">{member.bio}</p> : null}

        {credentials.length > 0 ? (
          <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-ink">
            {credentials.map((credential, index) => (
              <li key={`${credential.label}-${index}`} className="flex gap-2">
                <span aria-hidden="true" className="font-bold text-brand-secondary">✓</span>
                <span>{credential.label}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {languages.length > 0 ? (
          <p className="mt-4 text-sm text-muted">
            <span className="font-semibold text-ink">Languages: </span>
            {languages.map((language) => language.label).join(' · ')}
          </p>
        ) : null}

        {member.phone || member.email ? (
          <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-4 text-sm">
            {member.phone ? (
              <a href={buildTelHref(member.phone)} className="font-semibold text-brand-secondary hover:underline">
                Call {member.phone}
              </a>
            ) : null}
            {member.email ? (
              <a href={buildMailtoHref(member.email)} className="font-semibold text-brand-secondary hover:underline">
                Email
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </li>
  )
}

export default async function TeamPage() {
  const team = await getPublishedTeam()
  const settings = await getSiteSettings()

  return (
    <Section tone="warm">
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Team', path: '/team' }])} />
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Our team</p>
        <SectionHeading
          as="h1"
          title="Meet the people behind Nusra"
          lead="Professional experience, clear communication, and multilingual local support for Queens families, drivers, and small businesses."
        />
      </div>

      {team.length > 0 ? (
        <ul className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </ul>
      ) : (
        <div className="mx-auto mt-10 max-w-xl rounded-[var(--radius-card)] border border-border bg-white p-8 text-center shadow-[0_8px_24px_rgba(15,43,70,0.05)]">
          <h2 className="text-xl text-brand-primary">Our team profiles are being updated</h2>
          <p className="mt-3 text-muted">Call us to speak with the Queens team directly.</p>
        </div>
      )}

      <div className="mx-auto mt-12 max-w-2xl border-t border-border pt-8 text-center">
        <p className="text-muted">Have a question for our team?</p>
        <a href={buildTelHref(settings.phone)} className="mt-3 inline-flex premium-button premium-button-primary">
          Call {settings.phone}
        </a>
      </div>
    </Section>
  )
}
