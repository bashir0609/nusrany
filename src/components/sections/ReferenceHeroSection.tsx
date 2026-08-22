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

export function ReferenceHeroSection({ headline, supportingCopy, heroImage, settings }: ReferenceHeroSectionProps) {
  const image = typeof heroImage === 'object' && heroImage ? heroImage : null
  const languages = (settings.languages ?? []).map((language) => language.label).filter(Boolean)

  return (
    <section className="relative flex min-h-[85svh] items-end overflow-hidden bg-brand-primary text-white lg:min-h-[92svh]" aria-labelledby="home-hero-title">
      <div className="absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image?.url ?? '/images/nusra-office-hero.jpg'}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/85 to-brand-primary/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-transparent to-brand-primary/20" />
      </div>
      <div className="container-nusra relative z-10 pb-14 pt-48 md:pb-20 md:pt-56 lg:pb-24 lg:pt-64">
        <div className="max-w-2xl">
          <p className="section-kicker text-brand-lime">Serving Queens since {settings.sinceYear || '2020'}</p>
          <h1 id="home-hero-title" className="max-w-2xl text-white">{headline || 'Tax, Notary & Business Services for Queens Families & Businesses'}</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 md:text-lg md:leading-8">{supportingCopy || 'Clear, careful assistance from a multilingual local team — tax preparation, immigration forms, notary, defensive driving, TLC transportation, and business services.'}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="premium-button premium-button-lime">Book Appointment</Link>
            <a href={buildWhatsAppHref(settings.whatsApp)} className="premium-button border border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-brand-primary"><WhatsAppIcon className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/20 pt-5 text-sm text-white/75">
            <span><strong className="text-white">Local office</strong> · Hollis, Queens</span>
            {languages.length > 0 ? <span><strong className="text-white">Languages</strong> · {languages.join(' · ')}</span> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
