import type { SiteSetting } from '@/payload-types'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { buildTelHref, buildWhatsAppHref } from '@/lib/site/contactLinks'

type HomeFinalCtaSectionProps = {
  headline: string
  copy?: string | null
  settings: SiteSetting
}

export function HomeFinalCtaSection({ headline, copy, settings }: HomeFinalCtaSectionProps) {
  return (
    <section className="bg-brand-primary py-16 text-white">
      <div className="container-nusra text-center">
        <h2 className="mx-auto max-w-2xl text-white">{headline}</h2>
        {copy ? <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{copy}</p> : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={buildTelHref(settings.phone)} variant="secondary">
            {settings.callNowLabel || 'Call Now'}
          </ButtonLink>
          <ButtonLink href={buildWhatsAppHref(settings.whatsApp)} variant="whatsapp" external>
            {settings.whatsAppLabel || 'WhatsApp'}
          </ButtonLink>
          <ButtonLink href="/contact">Request Assistance</ButtonLink>
        </div>
      </div>
    </section>
  )
}
