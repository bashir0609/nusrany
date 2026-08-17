import Link from 'next/link'
import type { BlogPost, TeamMember } from '@/payload-types'
import { formatPostDate } from './PostCard'

type PostMetaProps = {
  post: BlogPost
}

export function PostMeta({ post }: PostMetaProps) {
  const author = typeof post.author === 'object' && post.author ? (post.author as TeamMember) : null
  const category = typeof post.category === 'object' && post.category ? post.category : null
  const updated = post.updatedAtOverride ?? null

  return (
    <p className="text-sm text-muted">
      {author?.name ? <span className="font-medium text-ink">By {author.name}</span> : <span className="font-medium text-ink">Nusra Tax &amp; Notary</span>}
      {' · '}
      <time dateTime={post.publishedAt ?? undefined}>{formatPostDate(post.publishedAt)}</time>
      {updated ? (
        <>
          {' · Updated '}
          <time dateTime={updated}>{formatPostDate(updated)}</time>
        </>
      ) : null}
      {category ? (
        <>
          {' · '}
          <Link href={`/blog/category/${category.slug}`} className="font-medium text-brand-secondary hover:underline">
            {category.title}
          </Link>
        </>
      ) : null}
    </p>
  )
}
