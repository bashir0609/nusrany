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
  'Serving Queens Since 2020',
  'Authorized IRS e-file Provider',
  'PTIN Registered Tax Preparer',
  'Certified NY Notary Public',
  '5 Languages Spoken',
]

export function ReferenceHeroSection({ headline, supportingCopy, heroImage, settings }: ReferenceHeroSectionProps) {
  const image = typeof heroImage === 'object' && heroImage ? heroImage : null

  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-brand-primary text-white lg:min-h-[92svh]" aria-labelledby="home-hero-title">
      <div className="absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image?.url ?? '/images/nusra-office-hero.jpg'}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(5,25,45,0.80) 0%, rgba(5,25,45,0.45) 54%, rgba(5,25,45,0.15) 100%)' }}
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 lg:pb-28 lg:pt-48">
        <div className="w-full lg:max-w-[50%]">
          <p className="section-kicker text-brand-lime">Serving Queens since {settings.sinceYear || '2020'}</p>
          <h1 id="home-hero-title" className="max-w-3xl text-[2.25rem] leading-[1.12] text-white md:text-[3rem] lg:text-[4rem]">{headline || 'Tax, Notary & Business Services for Queens Families & Businesses'}</h1>
          <p className="mt-6 max-w-[550px] text-base leading-7 text-white/90 md:text-lg md:leading-8">{supportingCopy || 'Clear, careful assistance from a multilingual local team — tax preparation, immigration forms, notary, defensive driving, TLC transportation, and business services.'}</p>
          <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
            <Link href="/contact" className="premium-button premium-button-lime">Book Appointment</Link>
            <a href={buildWhatsAppHref(settings.whatsApp)} className="premium-button border border-white/45 bg-brand-primary/30 text-white backdrop-blur-sm hover:bg-white hover:text-brand-primary"><WhatsAppIcon className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp Us</a>
          </div>
          <ul className="mt-10 grid max-w-3xl grid-cols-2 gap-x-5 gap-y-4 border-t border-white/25 pt-5 sm:flex sm:flex-wrap sm:gap-x-0 sm:gap-y-3 lg:flex-nowrap">
            {trustItems.map((item) => (
              <li key={item} className="border-l border-brand-lime/80 pl-3 text-xs font-semibold leading-5 text-white/90 sm:mr-5 sm:last:mr-0 lg:mr-4 lg:flex-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
