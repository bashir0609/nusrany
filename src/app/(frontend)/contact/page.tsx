import { getContactPage, getPublishedServices, getSiteSettings } from '@/lib/content/queries'
import { RequestAssistanceForm } from '@/components/forms/RequestAssistanceForm'
import { Section } from '@/components/sections/Section'
import { buildMailtoHref, buildTelHref, buildWhatsAppHref } from '@/lib/site/contactLinks'
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'

export default async function ContactPage() {
  const contact = await getContactPage()
  const settings = await getSiteSettings()
  const services = await getPublishedServices()
  const hours = settings.officeHours ?? []

  return (
    <Section>
      <h1>{contact.headline}</h1>
      {contact.lead ? <p className="mt-4 max-w-2xl text-lg text-muted">{contact.lead}</p> : null}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="card h-fit p-6">
          <h2 className="text-xl">Contact details</h2>
          <ul className="mt-4 space-y-3 text-muted">
            <li>
              <a href={buildTelHref(settings.phone)} className="inline-flex items-center gap-2 font-medium text-ink hover:text-brand-secondary">
                <PhoneIcon className="h-5 w-5 shrink-0 text-brand-secondary" aria-hidden="true" />
                {settings.phone}
              </a>
            </li>
            <li>
              <a href={buildWhatsAppHref(settings.whatsApp)} className="inline-flex items-center gap-2 font-medium text-ink hover:text-brand-secondary">
                <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#1f7a3d]" aria-hidden="true" />
                {settings.whatsApp}
              </a>
            </li>
            <li>
              <a href={buildMailtoHref(settings.publicEmail)} className="inline-flex items-center gap-2 font-medium text-ink hover:text-brand-secondary">
                <MailIcon className="h-5 w-5 shrink-0 text-brand-secondary" aria-hidden="true" />
                {settings.publicEmail}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary" aria-hidden="true" />
              <span>
                {settings.street}, {settings.city}, {settings.state} {settings.zip}
              </span>
            </li>
          </ul>
          {settings.directionsUrl ? (
            <a
              href={settings.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-semibold text-brand-secondary hover:underline"
            >
              {settings.getDirectionsLabel || 'Get Directions'}
            </a>
          ) : null}
          {hours.length > 0 ? (
            <div className="mt-5 border-t border-border pt-4">
              <p className="font-semibold text-ink">Office hours</p>
              <ul className="mt-1 space-y-1 text-muted">
                {hours.map((row) => (
                  <li key={row.id ?? `${row.days}-${row.hours}`}>
                    {row.days}: {row.hours}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {settings.walkInsNote ? <p className="mt-4 text-muted">{settings.walkInsNote}</p> : null}
          {settings.paymentsAccepted ? (
            <p className="mt-2 text-muted">Payments: {settings.paymentsAccepted}</p>
          ) : null}
        </div>

        <div>
          {contact.formIntro ? <p className="mb-6 text-muted">{contact.formIntro}</p> : null}
          <RequestAssistanceForm
            services={services.map((service) => ({ title: service.title, slug: service.slug }))}
          />
        </div>
      </div>
    </Section>
  )
}
