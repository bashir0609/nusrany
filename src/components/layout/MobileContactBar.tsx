'use client'


import { buildTelHref, buildWhatsAppHref } from '@/lib/site/contactLinks'
import { MenuIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'

type MobileContactBarProps = {
  phone: string
  whatsApp: string
  callNowLabel?: string | null
  whatsAppLabel?: string | null
}

export function MobileContactBar({ phone, whatsApp, callNowLabel, whatsAppLabel }: MobileContactBarProps) {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="grid grid-cols-3">
        <a
          href={buildTelHref(phone)}
          className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-brand-primary"
        >
          <PhoneIcon className="h-5 w-5" aria-hidden="true" />
          {callNowLabel || 'Call'}
        </a>
        <a
          href={buildWhatsAppHref(whatsApp)}
          className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-[#1f7a3d]"
        >
          <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
          {whatsAppLabel || 'WhatsApp'}
        </a>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event('nusra:open-menu'))}
          className="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-brand-primary text-xs font-semibold text-white"
        >
          <MenuIcon className="h-5 w-5" aria-hidden="true" />
          Menu
        </button>
      </div>
    </nav>
  )
}
