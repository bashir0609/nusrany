import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/content/queries'
import { isReservedServiceSlug } from '@/lib/site/reservedSlugs'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params

  // Reserved slugs belong to real routes or the application; never treat them as services.
  if (isReservedServiceSlug(slug)) notFound()

  const { isEnabled } = await draftMode()
  const service = await getServiceBySlug(slug, isEnabled)

  if (!service) notFound()

  return (
    <main>
      <h1>{service.heroTitle || service.title}</h1>
    </main>
  )
}
