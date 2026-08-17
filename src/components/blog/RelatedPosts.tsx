import Link from 'next/link'
import type { BlogPost } from '@/payload-types'
import { PostCard } from './PostCard'

type RelatedPostsProps = {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null
  return (
    <section className="bg-surface-warm py-12 md:py-16">
      <div className="container-nusra">
        <h2 className="mb-6">Related articles</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <p className="mt-6">
          <Link href="/blog" className="font-semibold text-brand-secondary hover:underline">
            All articles →
          </Link>
        </p>
      </div>
    </section>
  )
}
