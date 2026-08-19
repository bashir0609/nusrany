import Link from 'next/link'
import type { Service, SiteSetting } from '@/payload-types'
import { buildTelHref, buildWhatsAppHref, formatDisplayPhone } from '@/lib/site/contactLinks'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { ServicesNav } from './ServicesNav'
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'

type HeaderProps = {
  settings: SiteSetting
  services: Service[]
}

const navLinkClass =
  'rounded-full px-3 py-2 text-sm font-semibold text-ink transition hover:bg-surface-tint hover:text-brand-secondary'

export function Header({ settings, services }: HeaderProps) {
  const navServices = services.map((service) => ({ title: service.title, slug: service.slug }))

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur-xl">
      <div className="container-nusra flex min-h-[76px] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            <li><Link href="/" className={navLinkClass}>Home</Link></li>
            <li><ServicesNav services={navServices} /></li>
            <li><a href="/#why-us" className={navLinkClass}>Why Us</a></li>
            <li><a href="/#team" className={navLinkClass}>Team</a></li>
            <li><a href="/#reviews" className={navLinkClass}>Reviews</a></li>
            <li><a href="/#faq" className={navLinkClass}>FAQ</a></li>
            <li><a href="/#location" className={navLinkClass}>Location</a></li>
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <a
            href={buildTelHref(settings.phone)}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold text-brand-primary hover:bg-surface-warm"
          >
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            {formatDisplayPhone(settings.phone)}
          </a>
          <Link href="/contact" className="premium-button premium-button-primary min-h-11 px-5 py-2.5">
            Book Appointment
          </Link>
        </div>

        <div className="hidden items-center gap-2 lg:flex xl:hidden">
          <a href={buildWhatsAppHref(settings.whatsApp)} className="premium-button min-h-11 bg-[#1f7a3d] px-4 py-2.5 text-sm font-bold text-white" aria-label={settings.whatsAppLabel || 'WhatsApp'}>
            <WhatsAppIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>

        <MobileMenu services={navServices} phone={settings.phone} whatsApp={settings.whatsApp} />
      </div>
    </header>
  )
}
