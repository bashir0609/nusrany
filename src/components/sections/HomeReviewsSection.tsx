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
      <SectionHeading
        title={heading || 'Trusted by Queens families & businesses'}
        lead={reviews.length > 0 ? 'Hear directly from clients who have worked with our local team.' : 'Verified reviews will appear here once the team has permission to publish them.'}
      />
      {reviews.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reviews.map((review) => (
            <figure key={review.id} className="premium-card relative overflow-hidden">
              <blockquote className="relative mt-4 pl-5 pr-2 pb-2 text-[0.9rem] leading-relaxed text-brand-primary break-normal">
                <span aria-hidden="true" className="absolute -left-1 -top-1/2 -translate-y-1/2 font-display text-5xl leading-none text-brand-lime/45">“</span>
                <span className="relative break-normal">{review.reviewText}</span>
              </blockquote>
              <figcaption className="mt-4 pt-4 border-t border-border/80">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <cite className="text-sm font-bold not-italic text-brand-primary">{review.authorName}</cite>
                    {review.serviceReceived ? (
                      <p className="text-xs leading-relaxed text-muted">{review.serviceReceived}</p>
                    ) : null}
                  </div>
                  {review.sourceUrl ? (
                    <a
                      href={review.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-brand-secondary underline decoration-brand-lime/70 underline-offset-4 transition hover:text-brand-primary"
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
          <p className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-brand-primary">Trusted by Queens families & businesses.</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">Verified reviews will appear here once the team has permission to publish them. We do not use placeholder testimonials.</p>
        </div>
      )}
    </Section>
  )
}