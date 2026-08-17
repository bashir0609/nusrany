import type { Media, SiteSetting } from '@/payload-types'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { LanguageLine } from '@/components/ui/LanguageLine'
import { buildTelHref, buildWhatsAppHref, formatDisplayPhone } from '@/lib/site/contactLinks'

type HeroSectionProps = {
  headline: string
  supportingCopy: string
  heroImage?: Media | number | null
  settings: SiteSetting
}

export function HeroSection({ headline, supportingCopy, heroImage, settings }: HeroSectionProps) {
  const languages = (settings.languages ?? []).map((l) => l.label).filter(Boolean)
  const image = typeof heroImage === 'object' && heroImage ? heroImage : null

  return (
    <section className="border-b border-border bg-surface-warm">
      <div className="container-nusra grid items-center gap-10 py-14 md:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <h1>{headline}</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{supportingCopy}</p>
          <div className="mt-4">
            <LanguageLine languages={languages} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={buildTelHref(settings.phone)} variant="primary">
              {settings.callNowLabel || 'Call Now'} — {formatDisplayPhone(settings.phone)}
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              {settings.requestAssistanceLabel || 'Request Assistance'}
            </ButtonLink>
            <ButtonLink href={buildWhatsAppHref(settings.whatsApp)} variant="whatsapp" external>
              {settings.whatsAppLabel || 'WhatsApp'}
            </ButtonLink>
          </div>
        </div>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.url ?? ''}
            alt={image.alt ?? ''}
            className="mx-auto w-full max-w-md rounded-[var(--radius-card)] object-cover shadow-lg"
          />
        ) : null}
      </div>
    </section>
  )
}
