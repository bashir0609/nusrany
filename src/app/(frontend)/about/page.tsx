import { getAboutPage, getSiteSettings } from '@/lib/content/queries'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { RichTextContent } from '@/lib/content/richText'
import { buildTelHref } from '@/lib/site/contactLinks'

export default async function AboutPage() {
  const about = await getAboutPage()
  const settings = await getSiteSettings()
  const ownerPhoto = typeof about.ownerPhoto === 'object' && about.ownerPhoto ? about.ownerPhoto : null
  const credentials = (about.credentials ?? []).filter((c) => c.label)

  return (
    <main>
      <section className="border-b border-border bg-surface-warm">
        <div className="container-nusra py-12 md:py-16">
          <h1>{about.headline}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{about.lead}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-nusra grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            {about.body ? (
              <RichTextContent data={about.body} className="max-w-3xl text-muted" />
            ) : null}
            {about.establishedYear ? (
              <p className="mt-6 font-semibold text-ink">Established {about.establishedYear}.</p>
            ) : null}
            {about.serviceArea ? <p className="mt-2 text-muted">{about.serviceArea}</p> : null}
          </div>
          <aside className="card h-fit p-6">
            {ownerPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ownerPhoto.url ?? ''}
                alt={ownerPhoto.alt ?? about.ownerName}
                className="mx-auto mb-4 h-28 w-28 rounded-full object-cover"
              />
            ) : null}
            <h2 className="text-xl">{about.ownerName}</h2>
            {about.ownerRole ? <p className="text-sm font-medium text-brand-secondary">{about.ownerRole}</p> : null}
            <a
              href={buildTelHref(settings.phone)}
              className="mt-4 inline-block font-semibold text-brand-secondary hover:underline"
            >
              Call {settings.phone}
            </a>
          </aside>
        </div>
      </section>

      {credentials.length > 0 ? (
        <section className="bg-surface-warm py-12 md:py-16">
          <div className="container-nusra">
            <h2 className="mb-6">{about.credentialsHeading || 'Verified credentials'}</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {credentials.map((credential, index) => (
                <li key={index} className="card p-5 font-medium text-brand-primary">
                  {credential.label}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="bg-brand-primary py-14 text-white">
        <div className="container-nusra text-center">
          <h2 className="text-white">Work with our Queens team</h2>
          <div className="mt-7 flex justify-center">
            <ButtonLink href={buildTelHref(settings.phone)} variant="secondary">
              {settings.callNowLabel || 'Call Now'}
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  )
}
