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

export function ReferenceHeroSection({ heroImage, settings }: ReferenceHeroSectionProps) {
  const image = typeof heroImage === 'object' && heroImage ? heroImage : null

  return (
    <section className="bg-white">
      <div className="container-nusra grid items-stretch gap-0 lg:max-w-none lg:grid-cols-[1fr_1fr] lg:py-0 lg:pl-[calc((100vw-72rem)/2)] lg:pr-0">
        <div className="flex flex-col justify-center py-12 pr-0 sm:py-14 lg:py-16 lg:pr-10 xl:pr-16">
          <p className="eyebrow">Experienced. Reliable. Local.</p>
          <h1 className="mt-5 max-w-2xl text-brand-primary">Tax, Notary &amp; Business Support in Queens</h1>
          <p className="mt-6 max-w-xl text-sm leading-6 text-muted md:text-base">Professional assistance with taxes, notarization, immigration forms, TLC services, and more.</p>
          <p className="mt-1 max-w-xl text-sm leading-6 text-muted md:text-base">We make complex paperwork simple.</p>
          <div className="mt-7 grid max-w-xl grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4">
            {trustItems.map(([title, label]) => <div key={title} className="flex flex-col items-center text-center"><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-brand-secondary text-sm font-bold text-brand-secondary">✓</span><span className="mt-2 block text-xs font-bold leading-4 text-brand-primary">{title}</span><span className="block text-[0.68rem] leading-4 text-muted">{label}</span></div>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="premium-button premium-button-primary">Book a Consultation</Link>
            <a href={buildWhatsAppHref(settings.whatsApp)} className="premium-button premium-button-secondary"><WhatsAppIcon className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp Us</a>
          </div>
          <p className="mt-7 text-xs font-semibold text-muted">We speak: English · বাংলা · Español · हिंदी · Français</p>
        </div>
        <div className="relative col-span-full mx-0 min-h-[390px] w-full max-w-full overflow-hidden bg-surface-warm lg:col-auto lg:mx-0 lg:min-h-[560px] lg:w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image?.url ?? '/images/nusra-office.jpg'} alt={image?.alt ?? 'Nusra Tax & Notary office in Queens'} className="h-full min-h-[390px] w-full object-cover lg:min-h-[560px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/35 to-transparent" aria-hidden="true" />
          <div className="absolute left-1/2 top-[28%] -translate-x-1/2 text-center text-brand-primary/80 drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)]" aria-label="Nusra Tax & Notary office branding">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-xl border-4 border-brand-primary/70 bg-white/70 text-4xl font-bold text-brand-primary shadow-lg">N</span>
            <p className="mt-2 text-3xl font-black tracking-[0.08em]">NUSRA</p>
            <p className="text-xs font-bold tracking-[0.25em]">TAX &amp; NOTARY</p>
          </div>
        </div>
      </div>
    </section>
  )
}
