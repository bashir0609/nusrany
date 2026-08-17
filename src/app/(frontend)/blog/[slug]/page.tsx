import type { Metadata } from 'next'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Service } from '@/payload-types'
import { getPostBySlug, getRelatedPosts, getSiteSettings } from '@/lib/content/queries'
import { RichTextContent } from '@/lib/content/richText'
import { PostMeta } from '@/components/blog/PostMeta'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { buildTelHref, buildWhatsAppHref } from '@/lib/site/contactLinks'
import { buildMetadata } from '@/lib/seo/metadata'
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo/jsonLd'
import { getMediaUrl } from '@/lib/site/media'
import { JsonLd } from '@/components/seo/JsonLd'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    seoTitle: post.seo?.title,
    description: post.seo?.description ?? post.excerpt,
    imageUrl: getMediaUrl(post.featuredImage),
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const post = await getPostBySlug(slug, isEnabled)
  if (!post) notFound()

  const [related, settings] = await Promise.all([getRelatedPosts(post), getSiteSettings()])
  const ldJson = [buildArticleJsonLd(post, settings)]
  const image = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null
  const relatedServices = post.relatedServices?.filter((s): s is Service => typeof s !== 'number') ?? []

  return (
    <main>
      {ldJson.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }])} />
      <article className="container-nusra py-12 md:py-16">
        <p className="text-sm">
          <Link href="/blog" className="font-medium text-brand-secondary hover:underline">
            ← All articles
          </Link>
        </p>
        <h1 className="mt-4 max-w-3xl">{post.title}</h1>
        <div className="mt-4">
          <PostMeta post={post} />
        </div>
        {post.excerpt ? <p className="mt-5 max-w-2xl text-lg text-muted">{post.excerpt}</p> : null}
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.url ?? ''}
            alt={image.alt ?? ''}
            className="mt-8 h-auto w-full max-w-3xl rounded-[var(--radius-card)] object-cover"
          />
        ) : null}
        <div className="mt-8 max-w-3xl">
          <RichTextContent data={post.content} className="space-y-4 text-ink" />
        </div>

        {relatedServices.length > 0 ? (
          <aside className="mt-10 rounded-[var(--radius-card)] bg-surface-warm p-6">
            <h2 className="text-xl">Related services</h2>
            <ul className="mt-3 space-y-2">
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/${service.slug}`} className="font-medium text-brand-secondary hover:underline">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-muted">Questions? Call us — we are happy to help.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ButtonLink href={buildTelHref(settings.phone)} variant="primary">
                {settings.callNowLabel || 'Call Now'}
              </ButtonLink>
              <ButtonLink href={buildWhatsAppHref(settings.whatsApp)} variant="whatsapp" external>
                {settings.whatsAppLabel || 'WhatsApp'}
              </ButtonLink>
            </div>
          </aside>
        ) : null}
      </article>

      <RelatedPosts posts={related} />
    </main>
  )
}
