import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublishedCategories, getPublishedPosts } from '@/lib/content/queries'
import { Section } from '@/components/sections/Section'
import { PostCard } from '@/components/blog/PostCard'
import { buildMetadata } from '@/lib/seo/metadata'
import { buildBreadcrumbJsonLd } from '@/lib/seo/jsonLd'
import { JsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description: 'Practical information about taxes, notary services, forms, and more — from your Queens team.',
  path: '/blog',
})

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPublishedPosts(12), getPublishedCategories()])

  return (
    <Section>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])} />
      <h1>Blog</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Practical information about taxes, notary services, forms, and more — from your Queens team.
      </p>

      {categories.length > 0 ? (
        <nav aria-label="Blog categories" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/blog/category/${category.slug}`}
                  className="inline-block rounded-full border border-border px-4 py-1.5 text-sm font-medium text-brand-secondary hover:border-brand-teal hover:bg-surface-warm"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {posts.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-muted">New articles are being prepared and will appear here soon.</p>
      )}
    </Section>
  )
}
