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
    ['Multilingual', 'Support'],
    ['Experienced', 'Team'],
    ['Personalized', 'Service'],
    ['Queens', 'Based'],
  ]

  return (
    <section className="bg-white">
      <div className="container-nusra grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[0.96fr_1.04fr] lg:gap-14 lg:py-20">
        <div className="max-w-xl">
          <p className="eyebrow">Experienced. Reliable. Local.</p>
          <h1 className="mt-4 text-brand-primary">{headline || 'Trusted Tax, Notary & Business Services for Queens Families and Businesses'}</h1>
          <p className="mt-5 text-base leading-7 text-muted md:text-lg">{supportingCopy || 'Professional advice with clear, practical guidance for individuals, families, drivers, and small businesses.'}</p>
          <p className="mt-3 text-sm font-semibold text-muted">We speak English, বাংলা, Español, हिंदी, and Français.</p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {trustItems.map(([title, label]) => <div key={title} className="rounded-[var(--radius-card-sm)] bg-surface-tint px-3 py-3 text-center text-xs font-bold text-brand-primary"><span className="block text-brand-secondary">✦</span><span className="mt-1 block">{title}</span><span className="block text-muted">{label}</span></div>)}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="premium-button premium-button-primary">Book a Consultation</Link>
            <a href={buildWhatsAppHref(settings.whatsApp)} className="premium-button premium-button-secondary"><WhatsAppIcon className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp Us</a>
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-muted">Call, text, or walk in · Clear next steps</p>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-brand-primary/5" aria-hidden="true" />
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image.url ?? ''} alt={image.alt ?? 'Nusra Tax & Notary office'} className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-[0_22px_55px_rgba(15,43,70,0.16)] lg:aspect-[4/4.6]" />
          ) : (
            <div className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-[linear-gradient(145deg,#ecf5f4,#c9e4df_55%,#0f2b46_56%,#0f2b46)] p-7 shadow-[0_22px_55px_rgba(15,43,70,0.16)] lg:aspect-[4/4.6]">
              <span className="absolute right-8 top-8 grid h-16 w-16 place-items-center rounded-2xl bg-brand-primary text-3xl font-extrabold text-brand-lime">N</span>
              <div className="relative rounded-xl bg-white/90 p-5 backdrop-blur-sm"><p className="eyebrow">Nusra Tax &amp; Notary</p><p className="mt-2 text-2xl font-extrabold tracking-tight text-brand-primary">Professional help, close to home.</p></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
