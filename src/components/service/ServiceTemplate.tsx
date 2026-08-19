import type { Service, SiteSetting } from '@/payload-types'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { FaqAccordion } from '@/components/sections/FaqAccordion'
import { RichTextContent } from '@/lib/content/richText'
import { buildTelHref, buildWhatsAppHref } from '@/lib/site/contactLinks'

type ServiceTemplateProps = {
  service: Service
  settings: SiteSetting
  faqs: Array<{ question: string; answer: string }>
  relatedServices: Service[]
}

export function ServiceTemplate({ service, settings, faqs, relatedServices }: ServiceTemplateProps) {
  const audiences = service.audiences ?? []
  const benefits = service.benefits ?? []
  const steps = service.processSteps ?? []

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-primary text-white">
        <div className="container-nusra relative py-16 md:py-24">
          <p className="eyebrow text-brand-lime">Nusra Tax &amp; Notary</p>
          <h1 className="mt-5 max-w-4xl text-white">{service.heroTitle || service.title}</h1>
          {service.heroLead ? <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{service.heroLead}</p> : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={buildTelHref(settings.phone)} variant="primary">
              {settings.callNowLabel || 'Call Now'}
            </ButtonLink>
            <ButtonLink href={buildWhatsAppHref(settings.whatsApp)} variant="whatsapp" external>
              {settings.whatsAppLabel || 'WhatsApp'}
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              {settings.requestAssistanceLabel || 'Request Assistance'}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Explanation */}
      {service.explanationContent ? (
        <section className="py-20 md:py-28">
          <div className="container-nusra">
            <SectionHeading title={service.explanationHeading || 'How we help'} />
            <RichTextContent data={service.explanationContent} className="max-w-3xl text-muted" />
          </div>
        </section>
      ) : null}

      {/* Audiences */}
      {audiences.length > 0 ? (
        <section className="bg-surface-tint py-20 md:py-28">
          <div className="container-nusra">
            <SectionHeading title={service.audiencesHeading || 'Who it is for'} />
            <ul className="grid gap-4 sm:grid-cols-2">
              {audiences.map((audience) => (
                <li key={audience.id ?? audience.title} className="premium-card p-6">
                  <p className="font-semibold text-brand-primary">{audience.title}</p>
                  {audience.description ? <p className="mt-1 text-muted">{audience.description}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Benefits */}
      {benefits.length > 0 ? (
        <section className="py-20 md:py-28">
          <div className="container-nusra">
            <SectionHeading title={service.benefitsHeading || 'What to expect'} />
            <ul className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit.id ?? benefit.title} className="premium-card p-6">
                  <p className="font-semibold text-brand-primary">{benefit.title}</p>
                  {benefit.description ? <p className="mt-1 text-muted">{benefit.description}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Process */}
      {steps.length > 0 ? (
        <section className="bg-surface-tint py-20 md:py-28">
          <div className="container-nusra">
            <SectionHeading title={service.processHeading || 'How it works'} />
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step.id ?? step.title} className="premium-card p-7">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white"
                  >
                    {index + 1}
                  </span>
                  <p className="mt-3 font-semibold text-brand-primary">{step.title}</p>
                  {step.description ? <p className="mt-1 text-sm text-muted">{step.description}</p> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* FAQs */}
      {faqs.length > 0 ? (
        <section className="py-20 md:py-28">
          <div className="container-nusra">
            <SectionHeading title="Frequently asked questions" />
            <FaqAccordion items={faqs} />
          </div>
        </section>
      ) : null}

      {/* Related services */}
      {relatedServices.length > 0 ? (
        <section className="bg-surface-tint py-20 md:py-28">
          <div className="container-nusra">
            <SectionHeading title="Related services" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <ServiceCard
                  key={related.slug}
                  title={related.title}
                  description={related.shortDescription}
                  href={`/${related.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-brand-primary py-20 text-white md:py-28">
        <div className="container-nusra text-center">
          <h2 className="text-white">Ready to get started?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/85">
            Talk to a real person on our Queens team. We will tell you what is needed and what it costs.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href={buildTelHref(settings.phone)} variant="secondary">
              {settings.callNowLabel || 'Call Now'}
            </ButtonLink>
            <ButtonLink href={buildWhatsAppHref(settings.whatsApp)} variant="whatsapp" external>
              {settings.whatsAppLabel || 'WhatsApp'}
            </ButtonLink>
            <ButtonLink href="/contact">Request Assistance</ButtonLink>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-sm text-white/70">
            We provide administrative assistance with tax and immigration forms and documents. We are not a
            law firm and do not provide legal advice.
          </p>
        </div>
      </section>
    </main>
  )
}
