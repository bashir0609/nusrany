import type { SiteSetting } from '@/payload-types'
import Link from 'next/link'
import { buildTelHref, buildWhatsAppHref, formatDisplayPhone } from '@/lib/site/contactLinks'
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'

type HomeFinalCtaSectionProps = { headline: string; copy?: string | null; settings: SiteSetting }

export function HomeFinalCtaSection({ headline, copy, settings }: HomeFinalCtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-brand-primary py-20 text-white md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(168,200,56,0.18),transparent_28%),radial-gradient(circle_at_10%_100%,rgba(24,144,144,0.32),transparent_32%)]" />
      <div className="container-nusra relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="eyebrow text-brand-lime">Ready when you are</p>
          <h2 className="mt-4 max-w-3xl text-white">{headline || 'Let’s make the next step clear.'}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{copy || 'Tell us what you need help with and our local team will point you in the right direction.'}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link href="/contact" className="premium-button premium-button-lime">Book Consultation</Link>
          <a href={buildWhatsAppHref(settings.whatsApp)} className="premium-button border border-white/25 bg-white/10 text-white hover:bg-white hover:text-brand-primary"><WhatsAppIcon className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp</a>
          <a href={buildTelHref(settings.phone)} className="flex w-full items-center justify-center gap-2 text-sm font-bold text-white/80 hover:text-brand-lime sm:w-auto"><PhoneIcon className="h-4 w-4" aria-hidden="true" /> {formatDisplayPhone(settings.phone)}</a>
        </div>
      </div>
    </section>
  )
}
