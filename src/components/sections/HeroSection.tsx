import type { Media, SiteSetting } from '@/payload-types'
import Link from 'next/link'
import { buildTelHref, buildWhatsAppHref, formatDisplayPhone } from '@/lib/site/contactLinks'
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'

type HeroSectionProps = {
  headline: string
  supportingCopy: string
  heroImage?: Media | number | null
  settings: SiteSetting
}

const fallbackHeadline = 'Tax, Notary & Business Services for Queens Families and Businesses'

export function HeroSection({ headline, supportingCopy, heroImage, settings }: HeroSectionProps) {
  const languages = (settings.languages ?? []).map((language) => language.label).filter(Boolean)
  const image = typeof heroImage === 'object' && heroImage ? heroImage : null

  return (
    <section className="relative overflow-hidden bg-brand-primary text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(24,144,144,0.35),transparent_36%),linear-gradient(135deg,#0f2b46_0%,#092139_100%)]" />
      <div className="container-nusra relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow text-brand-lime">Serving Queens Since 2020</p>
          <h1 className="mt-5 max-w-3xl text-white">{headline || fallbackHeadline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">{supportingCopy}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-white/80">
            <span>English</span>
            <span className="text-brand-lime">•</span>
            {languages.slice(1, 5).map((language) => <span key={language}>{language}</span>)}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="premium-button premium-button-lime">Book Consultation</Link>
            <a href={buildWhatsAppHref(settings.whatsApp)} className="premium-button border border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-primary">
              <WhatsAppIcon className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp Us
            </a>
          </div>
          <div className="mt-9 flex items-center gap-3 text-sm text-white/70">
            <PhoneIcon className="h-4 w-4 text-brand-lime" aria-hidden="true" />
            <a href={buildTelHref(settings.phone)} className="font-semibold text-white hover:text-brand-lime">{formatDisplayPhone(settings.phone)}</a>
            <span aria-hidden="true">·</span>
            <span>Clear guidance. Secure handling. Local support.</span>
          </div>
        </div>

        <div className="relative lg:justify-self-end lg:w-full lg:max-w-xl">
          <div className="absolute -inset-4 rounded-[2rem] border border-white/10" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image.url ?? ''} alt={image.alt ?? 'Nusra Tax & Notary team'} className="aspect-[4/3] w-full rounded-[1.35rem] object-cover" />
            ) : (
              <div className="flex aspect-[4/3] flex-col justify-between rounded-[1.35rem] bg-[linear-gradient(145deg,#1a6170,#0c304b)] p-7">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/75">Queens, NY</span>
                  <span className="text-3xl text-brand-lime">✦</span>
                </div>
                <div>
                  <p className="text-5xl font-extrabold tracking-tight text-white">5</p>
                  <p className="mt-1 text-sm font-semibold text-white/70">languages supported by a local team</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2 px-2 pb-1 pt-3 text-center text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white/70">
              <span>IRS e-file</span><span>PTIN registered</span><span>NY notary</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
