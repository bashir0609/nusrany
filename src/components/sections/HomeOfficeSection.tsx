import type { SiteSetting } from '@/payload-types'
import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { buildTelHref } from '@/lib/site/contactLinks'

type HomeOfficeSectionProps = {
  settings: SiteSetting
}

export function HomeOfficeSection({ settings }: HomeOfficeSectionProps) {
  const hours = settings.officeHours ?? []
  return (
    <Section id="office">
      <SectionHeading title={`Visit our office in ${settings.city}, Queens`} />
      <div className="card grid gap-8 p-8 md:grid-cols-2">
        <div>
          <p className="font-semibold text-ink">
            {settings.street}, {settings.city}, {settings.state} {settings.zip}
          </p>
          {settings.directionsUrl ? (
            <a
              href={settings.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-semibold text-brand-secondary hover:underline"
            >
              {settings.getDirectionsLabel || 'Get Directions'}
            </a>
          ) : null}
          {settings.walkInsNote ? <p className="mt-3 text-muted">{settings.walkInsNote}</p> : null}
          <a
            href={buildTelHref(settings.phone)}
            className="mt-4 inline-block font-semibold text-brand-secondary hover:underline"
          >
            Call {settings.phone}
          </a>
        </div>
        <div>
          {hours.length > 0 ? (
            <>
              <p className="font-semibold text-ink">Office hours</p>
              <ul className="mt-2 space-y-1 text-muted">
                {hours.map((row) => (
                  <li key={row.id ?? `${row.days}-${row.hours}`}>
                    {row.days}: {row.hours}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {settings.paymentsAccepted ? (
            <p className="mt-4 text-muted">Payments accepted: {settings.paymentsAccepted}</p>
          ) : null}
        </div>
      </div>
    </Section>
  )
}
