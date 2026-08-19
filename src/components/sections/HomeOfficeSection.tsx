import type { SiteSetting } from '@/payload-types'
import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { buildTelHref, formatDisplayPhone } from '@/lib/site/contactLinks'

type HomeOfficeSectionProps = { settings: SiteSetting }

export function HomeOfficeSection({ settings }: HomeOfficeSectionProps) {
  const hours = settings.officeHours ?? []
  return (
    <Section id="location" tone="warm">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="section-kicker">Visit us</p>
          <SectionHeading title={`A real Queens office, close to home`} lead="Come by for a conversation, bring your questions, and leave with a clear next step." />
          <div className="mt-7 flex flex-wrap gap-3">
            {settings.directionsUrl ? <a href={settings.directionsUrl} target="_blank" rel="noopener noreferrer" className="premium-button premium-button-primary">{settings.getDirectionsLabel || 'Get Directions'} →</a> : null}
            <a href={buildTelHref(settings.phone)} className="premium-button premium-button-secondary">Call {formatDisplayPhone(settings.phone)}</a>
          </div>
        </div>
        <div className="premium-card overflow-hidden p-4 md:p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/office-workspace.jpg" alt="Nusra Tax & Notary office workspace" className="h-48 w-full rounded-[var(--radius-card-sm)] object-cover" />
          <div className="grid gap-8 p-3 pt-6 md:grid-cols-2 md:p-4 md:pt-7">
            <div>
              <p className="eyebrow">Our office</p>
              <p className="mt-4 text-lg font-bold leading-8 text-brand-primary">{settings.street}<br />{settings.city}, {settings.state} {settings.zip}</p>
              {settings.walkInsNote ? <p className="mt-4 text-sm leading-6 text-muted">{settings.walkInsNote}</p> : null}
            </div>
            <div>
              <p className="eyebrow">Office hours</p>
              {hours.length > 0 ? <ul className="mt-4 space-y-3 text-sm text-muted">{hours.map((row) => <li key={row.id ?? `${row.days}-${row.hours}`} className="flex justify-between gap-4 border-b border-border pb-2"><span className="font-semibold text-brand-primary">{row.days}</span><span>{row.hours}</span></li>)}</ul> : <p className="mt-4 text-sm text-muted">Call ahead for current availability.</p>}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
