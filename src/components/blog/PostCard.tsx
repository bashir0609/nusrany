import Link from 'next/link'
import type { BlogPost } from '@/payload-types'

export function formatPostDate(iso: string | null | undefined) {
  if (!iso) return ''
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(iso))
}

type PostCardProps = {
  post: BlogPost
}

export function PostCard({ post }: PostCardProps) {
  const image = typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null
  const category = typeof post.category === 'object' && post.category ? post.category : null

  return (
    <article className="card flex h-full flex-col overflow-hidden transition-colors hover:border-brand-teal">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.url ?? ''}
          alt={image.alt ?? ''}
          loading="lazy"
          className="h-44 w-full object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {category ? (
          <Link
            href={`/blog/category/${category.slug}`}
            className="text-sm font-semibold text-brand-secondary hover:underline"
          >
            {category.title}
          </Link>
        ) : null}
        <h2 className="mt-2 text-lg font-bold leading-snug text-brand-primary">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand-secondary">
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 flex-1 text-muted">{post.excerpt}</p>
        <p className="mt-4 text-sm text-muted">{formatPostDate(post.publishedAt)}</p>
      </div>
    </article>
  )
}
