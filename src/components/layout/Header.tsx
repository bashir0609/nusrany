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

export function Header({ settings, services }: HeaderProps) {
  const navServices = services.map((service) => ({ title: service.title, slug: service.slug }))
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="container-nusra flex h-[72px] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            <li>
              <Link href="/" className="rounded-full px-3 py-2 font-medium text-ink hover:text-brand-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="rounded-full px-3 py-2 font-medium text-ink hover:text-brand-secondary">
                About
              </Link>
            </li>
            <li>
              <ServicesNav services={navServices} />
            </li>
            <li>
              <Link href="/team" className="rounded-full px-3 py-2 font-medium text-ink hover:text-brand-secondary">
                Team
              </Link>
            </li>
            <li>
              <Link href="/blog" className="rounded-full px-3 py-2 font-medium text-ink hover:text-brand-secondary">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="rounded-full px-3 py-2 font-medium text-ink hover:text-brand-secondary">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={buildTelHref(settings.phone)}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 font-semibold text-brand-primary hover:bg-surface-warm"
          >
            <PhoneIcon className="h-5 w-5" aria-hidden="true" />
            {formatDisplayPhone(settings.phone)}
          </a>
          <a
            href={buildWhatsAppHref(settings.whatsApp)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1f7a3d] px-4 py-2 font-semibold text-white hover:bg-[#175e2f]"
          >
            <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
            {settings.whatsAppLabel || 'WhatsApp'}
          </a>
        </div>
        <MobileMenu services={navServices} phone={settings.phone} whatsApp={settings.whatsApp} />
      </div>
    </header>
  )
}
