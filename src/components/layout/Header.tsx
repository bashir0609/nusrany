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

const navLinkClass = 'rounded-sm px-2.5 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white'

export function Header({ settings, services }: HeaderProps) {
  const navServices = services.map((service) => ({ title: service.title, slug: service.slug }))
  const languages = (settings.languages ?? []).map((language) => language.label).filter(Boolean)
  const firstOfficeHours = settings.officeHours?.[0]
  const officeHours = firstOfficeHours
    ? `${firstOfficeHours.days} · ${firstOfficeHours.hours}`
    : 'Call for current availability'

  return (
    <>
      <div className="border-b border-white/10 bg-brand-primary-deep text-xs text-white/90">
        <div className="container-nusra grid gap-x-6 gap-y-1 py-2 text-center sm:grid-cols-2 lg:grid-cols-4 lg:items-center lg:py-2.5">
          <span>Serving {settings.city || 'Queens'} &amp; the surrounding community</span>
          <span className="text-brand-lime">{languages.join(' • ')}</span>
          <span>Office hours: <strong className="text-white">{officeHours}</strong></span>
          <a href={buildTelHref(settings.phone)} className="font-bold text-brand-lime hover:underline">
            Call {formatDisplayPhone(settings.phone)}
          </a>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-primary text-white shadow-[0_4px_18px_rgba(16,42,67,0.12)]">
      <div className="container-nusra flex min-h-[68px] items-center justify-between gap-4">
        <Logo dark />
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            <li><Link href="/" className={navLinkClass}>Home</Link></li>
            <li><ServicesNav services={navServices} /></li>
            <li><Link href="/about" className={navLinkClass}>About</Link></li>
            <li><Link href="/#team" className={navLinkClass}>Team</Link></li>

            <li><Link href="/contact" className={navLinkClass}>Contact</Link></li>
          </ul>
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <a href={buildTelHref(settings.phone)} className="inline-flex min-h-9 shrink-0 items-center gap-1.5 whitespace-nowrap px-2 py-2 text-xs font-semibold text-white/85 hover:text-white">
            <PhoneIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDisplayPhone(settings.phone)}
          </a>
          <a href={buildWhatsAppHref(settings.whatsApp)} className="inline-flex min-h-9 items-center gap-1.5 rounded-sm bg-[#1f9d61] px-3 py-2 text-xs font-bold text-white hover:bg-[#168250]" aria-label={settings.whatsAppLabel || 'WhatsApp'}>
            <WhatsAppIcon className="h-3.5 w-3.5" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
        <div className="hidden items-center gap-2 lg:flex xl:hidden">
          <a href={buildWhatsAppHref(settings.whatsApp)} className="inline-flex min-h-9 items-center gap-1.5 rounded-sm bg-[#1f9d61] px-3 py-2 text-xs font-bold text-white" aria-label={settings.whatsAppLabel || 'WhatsApp'}>
            <WhatsAppIcon className="h-3.5 w-3.5" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
        <MobileMenu services={navServices} phone={settings.phone} whatsApp={settings.whatsApp} />
      </div>
      </header>
    </>
  )
}
