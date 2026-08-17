import Link from 'next/link'
import { getSiteSettings } from '@/lib/content/queries'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { buildTelHref } from '@/lib/site/contactLinks'

export default async function NotFound() {
  const settings = await getSiteSettings()

  return (
    <main className="py-20">
      <div className="container-nusra text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-secondary">404</p>
        <h1 className="mt-2">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          The page you are looking for does not exist or has moved. Try one of these instead:
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            Services
          </ButtonLink>
          <ButtonLink href={buildTelHref(settings.phone)} variant="whatsapp">
            Call Now
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact
          </ButtonLink>
        </div>
        <p className="mt-8">
          <Link href="/contact" className="font-medium text-brand-secondary hover:underline">
            Or request assistance
          </Link>
        </p>
      </div>
    </main>
  )
}
