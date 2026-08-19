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
  const trustItems = [
    ['Serving Queens', 'Since 2020'],
    ['IRS e-file', 'Provider'],
    ['PTIN Registered', 'Tax Preparer'],
    ['Certified NY', 'Notary Public'],
    ['5 Languages', 'Spoken'],
  ]

  return (
    <section className="bg-white">
      <div className="container-nusra grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[0.96fr_1.04fr] lg:gap-14 lg:py-20">
        <div className="max-w-xl">
          <p className="eyebrow">Experienced. Reliable. Local.</p>
          <h1 className="mt-4 max-w-2xl text-brand-primary">Tax, Notary &amp; Business Services for Queens Families &amp; Businesses</h1>
          <p className="mt-5 text-base leading-7 text-muted md:text-lg">{supportingCopy || 'Professional advice with clear, practical guidance for individuals, families, drivers, and small businesses.'}</p>
          <p className="mt-3 text-sm font-semibold text-muted">We speak English, বাংলা, Español, हिंदी, and Français.</p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-5">
            {trustItems.map(([title, label]) => <div key={title} className="border-l-2 border-brand-lime bg-surface-tint px-3 py-3 text-left text-xs font-bold text-brand-primary"><span className="block">{title}</span><span className="block text-muted">{label}</span></div>)}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="premium-button premium-button-primary">Book a Consultation</Link>
            <a href={buildWhatsAppHref(settings.whatsApp)} className="premium-button premium-button-secondary"><WhatsAppIcon className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp Us</a>
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-muted">Call, text, or walk in · Clear next steps</p>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-brand-primary/5" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-warm shadow-[0_18px_40px_rgba(16,42,67,0.12)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image?.url ?? '/images/nusra-office.jpg'} alt={image?.alt ?? 'Nusra Tax & Notary office in Queens'} className="relative aspect-[4/3] w-full object-cover lg:aspect-[5/4]" />
            <div className="border-t border-border bg-white px-5 py-4"><p className="eyebrow">Our Queens office</p><p className="mt-1 text-sm font-semibold text-brand-primary">90-54 204th Street · Hollis, NY 11423</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}
