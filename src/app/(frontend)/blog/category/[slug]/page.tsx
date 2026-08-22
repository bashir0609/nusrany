import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostsByCategory } from '@/lib/content/queries'
import { Section } from '@/components/sections/Section'
import { PostCard } from '@/components/blog/PostCard'
import { buildMetadata } from '@/lib/seo/metadata'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const posts = await getPostsByCategory(slug, 1)
  return buildMetadata({
    title: slug.replace(/-/g, ' '),
    path: `/blog/category/${slug}`,
    noindex: posts.length === 0,
  })
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params
  const posts = await getPostsByCategory(slug, 12)

  return (
    <Section>
      <p className="text-sm">
        <Link href="/blog" className="font-medium text-brand-secondary hover:underline">
          ← All articles
        </Link>
      </p>
      <h1 className="mt-3">Category: {slug.replace(/-/g, ' ')}</h1>

      {posts.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-muted">No published articles in this category yet.</p>
      )}
    </Section>
  )
}
