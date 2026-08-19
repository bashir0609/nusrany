import Link from 'next/link'
import type { SiteSetting } from '@/payload-types'
import { buildTelHref, buildWhatsAppHref } from '@/lib/site/contactLinks'
import { MapPinIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'

type MobileContactBarProps = {
  settings: SiteSetting
}

export function MobileContactBar({ settings }: MobileContactBarProps) {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="grid grid-cols-4">
        <a
          href={buildTelHref(settings.phone)}
          className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-brand-primary"
        >
          <PhoneIcon className="h-5 w-5" aria-hidden="true" />
          {settings.callNowLabel || 'Call'}
        </a>
        <a
          href={buildWhatsAppHref(settings.whatsApp)}
          className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-[#1f7a3d]"
        >
          <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
          {settings.whatsAppLabel || 'WhatsApp'}
        </a>
        {settings.directionsUrl ? (
          <a
            href={settings.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-brand-primary"
          >
            <MapPinIcon className="h-5 w-5" aria-hidden="true" />
            {settings.getDirectionsLabel || 'Directions'}
          </a>
        ) : null}
        <Link
          href="/contact"
          className="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-brand-primary text-xs font-semibold text-white"
        >
          {settings.requestAssistanceLabel || 'Request Assistance'}
        </Link>
      </div>
    </nav>
  )
}
