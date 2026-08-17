import Link from 'next/link'
import type { Service, SiteSetting } from '@/payload-types'
import { buildMailtoHref, buildTelHref, buildWhatsAppHref } from '@/lib/site/contactLinks'
import { Logo } from './Logo'
import { LanguageLine } from '@/components/ui/LanguageLine'
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'

type FooterProps = {
  settings: SiteSetting
  services: Service[]
}

const year = new Date().getFullYear()

export function Footer({ settings, services }: FooterProps) {
  const languages = (settings.languages ?? []).map((l) => l.label).filter(Boolean)
  const hours = settings.officeHours ?? []
  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ]

  return (
    <footer className="border-t border-border bg-brand-primary text-white">
      <div className="container-nusra grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo dark />
          {settings.footerText ? <p className="mt-4 text-sm text-white/80">{settings.footerText}</p> : null}
          <div className="mt-4">
            <LanguageLine languages={languages} dark />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-white/60">Services</h2>
          <ul className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/${service.slug}`} className="text-white/90 hover:text-white hover:underline">
                  {service.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="font-semibold text-brand-lime hover:underline">
                All services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-white/60">Company</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/about" className="text-white/90 hover:text-white hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/team" className="text-white/90 hover:text-white hover:underline">
                Team
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-white/90 hover:text-white hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white/90 hover:text-white hover:underline">
                Contact
              </Link>
            </li>
          </ul>
          <ul className="mt-6 space-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/70 hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-white/60">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={buildTelHref(settings.phone)} className="inline-flex items-center gap-2 text-white/90 hover:text-white hover:underline">
                <PhoneIcon className="h-4 w-4" aria-hidden="true" /> {settings.phone}
              </a>
            </li>
            <li>
              <a href={buildWhatsAppHref(settings.whatsApp)} className="inline-flex items-center gap-2 text-white/90 hover:text-white hover:underline">
                <WhatsAppIcon className="h-4 w-4" aria-hidden="true" /> {settings.whatsApp}
              </a>
            </li>
            <li>
              <a href={buildMailtoHref(settings.publicEmail)} className="inline-flex items-center gap-2 text-white/90 hover:text-white hover:underline">
                <MailIcon className="h-4 w-4" aria-hidden="true" /> {settings.publicEmail}
              </a>
            </li>
            <li className="flex items-start gap-2 text-white/90">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
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
              className="mt-3 inline-block font-semibold text-brand-lime hover:underline"
            >
              Get Directions
            </a>
          ) : null}
          {hours.length > 0 ? (
            <div className="mt-4">
              <p className="text-sm font-bold text-white/60">Office hours</p>
              <ul className="mt-1 space-y-1 text-sm text-white/90">
                {hours.map((row) => (
                  <li key={row.id ?? `${row.days}-${row.hours}`}>
                    {row.days}: {row.hours}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {settings.paymentsAccepted ? (
            <p className="mt-4 text-sm text-white/70">Payments: {settings.paymentsAccepted}</p>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-nusra py-6">
          <p className="text-sm text-white/70">
            Nusra Tax &amp; Notary is operated by {settings.legalBusinessName}. We provide administrative
            assistance with tax preparation, immigration forms and supporting documents. We are not a law
            firm and do not provide legal advice or legal representation.
          </p>
          <p className="mt-3 text-sm text-white/50">
            © {year} {settings.legalBusinessName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
