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
    <section className="bg-surface-warm">
      <div className="container-nusra grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-20">
        <div>
          <p className="section-kicker">Serving Queens since {settings.sinceYear || '2020'}</p>
          <h1 className="max-w-2xl text-brand-primary">{headline || 'Tax, Notary & Business Services for Queens Families & Businesses'}</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">{supportingCopy || 'Clear, careful assistance from a multilingual local team — tax preparation, immigration forms, notary, defensive driving, TLC transportation, and business services.'}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="premium-button premium-button-primary">Book Appointment</Link>
            <a href={buildWhatsAppHref(settings.whatsApp)} className="premium-button premium-button-secondary"><WhatsAppIcon className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp</a>
          </div>
          {languages.length > 0 ? <p className="mt-7 text-xs font-semibold text-muted">Languages spoken: {languages.join(' · ')}</p> : null}
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-[var(--radius-card)] bg-brand-primary shadow-[0_20px_55px_rgba(16,42,67,0.16)] md:min-h-[500px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image?.url ?? '/images/nusra-office-hero.jpg'} alt={image?.alt ?? 'Nusra Tax & Notary office in Queens'} className="h-full min-h-[360px] w-full object-cover md:min-h-[500px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/65 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute bottom-5 left-5 border-l-2 border-brand-lime pl-4 text-white md:bottom-8 md:left-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-lime">Nusra Tax &amp; Notary</p>
            <p className="mt-1 text-sm text-white/85">A real local office for your next step.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
