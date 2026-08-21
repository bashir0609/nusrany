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
        <div className="mt-10 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.id} className="premium-card relative overflow-hidden p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-brand-secondary">Google review</p>
                <span aria-label="5 out of 5 stars" className="shrink-0 text-sm tracking-[0.12em] text-brand-lime">★★★★★</span>
              </div>
              <blockquote className="relative mt-5 pl-5 text-[0.95rem] leading-7 text-brand-primary">
                <span aria-hidden="true" className="absolute -left-1 -top-5 font-display text-6xl leading-none text-brand-lime/45">“</span>
                <span className="relative">{review.reviewText}</span>
              </blockquote>
              <figcaption className="mt-6 border-t border-border/80 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <cite className="block truncate text-sm font-bold not-italic text-brand-primary">{review.authorName}</cite>
                    {review.serviceReceived ? <p className="mt-1 text-xs leading-5 text-muted">{review.serviceReceived}</p> : null}
                  </div>
                  {review.sourceUrl ? (
                    <a
                      href={review.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 text-xs font-bold text-brand-secondary underline decoration-brand-lime/70 underline-offset-4 transition hover:text-brand-primary"
                    >
                      View on Google
                    </a>
                  ) : null}
                </div>
              </figcaption>
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
