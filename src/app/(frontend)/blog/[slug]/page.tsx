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
import { buildTelHref } from '@/lib/site/contactLinks'
import { getArticleEnhancements } from '@/lib/content/articleEnhancements'
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
  const enhancements = getArticleEnhancements(post.slug, post.excerpt)
  const faqs = enhancements?.faqs ?? []
  const links = enhancements?.links ?? []
  const ldJson = [buildArticleJsonLd(post, settings)]
  if (faqs.length > 0) {
    ldJson.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    })
  }
  const image = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null
  const relatedServices = post.relatedServices?.filter((s): s is Service => typeof s !== 'number') ?? []

  return (
    <main>
      {ldJson.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }])} />
      <article className="blog-article container-nusra py-10 md:py-16">
        <p className="text-sm">
          <Link href="/blog" className="font-medium text-brand-secondary hover:underline">
            ← All articles
          </Link>
        </p>
        <header className="blog-article-header">
          <p className="section-kicker">NusraNY · Practical guides</p>
          <h1 className="max-w-4xl text-balance">{post.title}</h1>
          <div className="mt-4">
            <PostMeta post={post} />
          </div>
          {post.excerpt ? <p className="mt-5 max-w-2xl text-lg text-muted">{post.excerpt}</p> : null}
        </header>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.url ?? ''}
            alt={image.alt ?? ''}
            className="blog-article-cover"
          />
        ) : null}
        <div className="blog-article-layout">
          <div className="min-w-0">
            {enhancements?.summary ? (
              <section id="article-summary" aria-labelledby="article-summary-title" className="blog-article-summary">
                <p className="eyebrow">The short answer</p>
                <h2 id="article-summary-title">At a glance</h2>
                <p>{enhancements.summary}</p>
              </section>
            ) : null}
            <section id="article-guide" aria-label="Article guide">
              <RichTextContent data={post.content} className="blog-article-content" />
            </section>

            {faqs.length > 0 ? (
              <section id="article-faq" aria-labelledby="article-faq-title" className="blog-article-section">
                <p className="section-kicker">Helpful answers</p>
                <h2 id="article-faq-title">Frequently asked questions</h2>
                <div className="blog-article-faqs">
                  {faqs.map(({ question, answer }) => (
                    <details key={question} open>
                      <summary>{question}</summary>
                      <p>{answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {links.length > 0 ? (
              <section id="article-links" aria-labelledby="article-links-title" className="blog-article-section">
                <p className="section-kicker">Explore further</p>
                <h2 id="article-links-title">Useful next steps</h2>
                <ul className="blog-article-links">
                  {links.map(({ href, title, description }) => (
                    <li key={href}>
                      <Link href={href}>
                        <span className="font-semibold text-brand-secondary">{title} <span aria-hidden="true">↗</span></span>
                        <span className="mt-2 block text-sm leading-relaxed text-muted">{description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="blog-article-sidebar" aria-label="Article navigation and contact">
            <nav className="blog-article-nav" aria-label="On this page">
              <h2>On this page</h2>
              <ul>
                {enhancements?.summary ? <li><a href="#article-summary">At a glance</a></li> : null}
                <li><a href="#article-guide">Read the guide</a></li>
                {faqs.length > 0 ? <li><a href="#article-faq">Frequently asked questions</a></li> : null}
                {links.length > 0 ? <li><a href="#article-links">Useful next steps</a></li> : null}
                <li><a href="#article-contact">Contact NusraNY</a></li>
              </ul>
            </nav>
            <section id="article-contact" className="blog-article-contact" aria-labelledby="article-contact-title">
              <p className="eyebrow">Let’s talk</p>
              <h2 id="article-contact-title">Have a question?</h2>
              <p>Contact {settings.businessName} to discuss your needs and what to bring.</p>
              <div className="mt-5 flex flex-col gap-3">
                <ButtonLink href="/contact">Contact us</ButtonLink>
                <ButtonLink href={buildTelHref(settings.phone)} variant="secondary">
                  Call {settings.phone}
                </ButtonLink>
              </div>
            </section>
            {relatedServices.length > 0 ? (
              <section className="blog-article-nav" aria-labelledby="article-services-title">
                <h2 id="article-services-title">Related services</h2>
                <ul>
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link href={`/${service.slug}`}>{service.title}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </div>
      </article>

      <RelatedPosts posts={related} />
    </main>
  )
}
