import type { Media, SiteSetting } from '@/payload-types'
import Link from 'next/link'
import { buildWhatsAppHref } from '@/lib/site/contactLinks'
import { WhatsAppIcon } from '@/components/ui/icons'

type ReferenceHeroSectionProps = {
  headline: string
  supportingCopy: string
  heroImage?: Media | number | null
  settings: SiteSetting
}

const trustItems = [
  ['Multilingual', 'Service'],
  ['Experienced', 'Professionals'],
  ['Personalized', 'Attention'],
  ['Queens', 'Proud'],
]

export function ReferenceHeroSection({ headline: _headline, supportingCopy, heroImage, settings }: ReferenceHeroSectionProps) {
  const image = typeof heroImage === 'object' && heroImage ? heroImage : null

  return (
    <section className="bg-white">
      <div className="container-nusra grid items-stretch gap-8 py-10 sm:py-12 lg:min-h-[500px] lg:grid-cols-[0.94fr_1.06fr] lg:gap-10 lg:py-0">
        <div className="flex flex-col justify-center py-2 lg:py-12">
          <p className="eyebrow">Experienced. Reliable. Local.</p>
          <h1 className="mt-4 max-w-xl text-brand-primary">Tax, Notary &amp; Business Services for Queens Families &amp; Businesses</h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-muted md:text-base">{supportingCopy || 'Professional assistance with taxes, notarization, immigration forms, TLC services, and more.'}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">We make complex paperwork simple.</p>
          <div className="mt-6 grid max-w-xl grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
            {trustItems.map(([title, label]) => <div key={title} className="flex items-start gap-2 text-left"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-brand-secondary/45 text-xs font-bold text-brand-secondary">✓</span><span><span className="block text-xs font-bold leading-4 text-brand-primary">{title}</span><span className="block text-[0.68rem] leading-4 text-muted">{label}</span></span></div>)}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="premium-button premium-button-primary">Book a Consultation</Link>
            <a href={buildWhatsAppHref(settings.whatsApp)} className="premium-button premium-button-secondary"><WhatsAppIcon className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp Us</a>
          </div>
          <p className="mt-5 text-xs font-semibold text-muted">We speak: English · বাংলা · Español · हिंदी · Français</p>
        </div>
        <div className="relative min-h-[360px] overflow-hidden border-l border-border/50 bg-surface-warm lg:min-h-[500px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image?.url ?? '/images/nusra-office.jpg'} alt={image?.alt ?? 'Nusra Tax & Notary office in Queens'} className="h-full min-h-[360px] w-full object-cover lg:min-h-[500px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-brand-primary/5" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
