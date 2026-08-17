import type { Review } from '@/payload-types'
import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

type HomeReviewsSectionProps = {
  heading: string
  reviews: Review[]
}

export function HomeReviewsSection({ heading, reviews }: HomeReviewsSectionProps) {
  if (reviews.length === 0) return null
  return (
    <Section tone="warm" id="reviews">
      <SectionHeading title={heading} />
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.id} className="card flex h-full flex-col p-6">
            <blockquote className="flex-1 text-ink">
              <p className="text-base leading-relaxed">&ldquo;{review.reviewText}&rdquo;</p>
            </blockquote>
            <footer className="mt-4 text-sm">
              <p className="font-semibold text-brand-primary">{review.authorName}</p>
              {review.serviceReceived ? <p className="text-muted">{review.serviceReceived}</p> : null}
              {review.sourceName && review.sourceUrl ? (
                <a
                  href={review.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-secondary hover:underline"
                >
                  {review.sourceName}
                </a>
              ) : review.sourceName ? (
                <p className="text-muted">{review.sourceName}</p>
              ) : null}
            </footer>
          </li>
        ))}
      </ul>
    </Section>
  )
}
