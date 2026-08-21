import type { Review } from '@/payload-types'
import { Section } from './Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

type HomeReviewsSectionProps = {
  heading: string
  reviews: Review[]
}

export function HomeReviewsSection({ heading, reviews }: HomeReviewsSectionProps) {
  return (
    <Section id="reviews">
      <SectionHeading title={heading || 'Trusted by Queens families & businesses'} lead="We are collecting verified client feedback and will share it here as it becomes available." />
      {reviews.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.id} className="premium-card flex h-full flex-col p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary">Google review</p>
              <blockquote className="mt-5 flex-1 text-lg leading-8 text-brand-primary">“{review.reviewText}”</blockquote>
              <figcaption className="mt-5 text-sm font-bold text-muted">{review.authorName}{review.serviceReceived ? ` · ${review.serviceReceived}` : ''}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-brand-secondary/35 bg-surface-tint p-8 md:p-12">
          <p className="eyebrow">Coming soon</p>
          <p className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-brand-primary">Trusted by Queens families &amp; businesses.</p>
          <p className="mt-3 max-w-2xl leading-7 text-muted">Verified reviews will appear here once the team has permission to publish them. We do not use placeholder testimonials.</p>
        </div>
      )}
    </Section>
  )
}
