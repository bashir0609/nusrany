import type { Review } from '@/payload-types';
import { Section } from './Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

type HomeReviewsSectionProps = {
  heading: string
  reviews: Review[]
};

export function HomeReviewsSection({ heading, reviews }: HomeReviewsSectionProps) {
  return (
    <Section id="reviews">
      <SectionHeading
        title={heading || 'Trusted by Queens families & businesses'}
        lead={reviews.length > 0 ? 'Hear directly from clients who have worked with our local team.' : 'Verified reviews will appear here once the team has permission to publish them.'}
      />
      {reviews.length > 0 ? (
        <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.id}
              className="premium-card relative flex h-full flex-col overflow-hidden p-5 sm:p-6"
            >
              <div
                aria-label="5 out of 5 stars"
                className="flex justify-end text-sm tracking-[0.12em] text-brand-lime"
              >
                ★★★★★
              </div>
              <blockquote className="relative mt-4 grow pl-4 text-[0.92rem] leading-relaxed text-brand-primary">
                <span
                  aria-hidden="true"
                  className="absolute -left-1 -top-2 select-none font-display text-5xl leading-none text-brand-lime/45"
                >
                  “
                </span>
                <p className="relative">{review.reviewText}</p>
              </blockquote>
              <figcaption className="mt-5 border-t border-border/80 pt-4">
                <div className="flex items-center gap-2">
                  <cite className="block truncate text-sm font-bold not-italic text-brand-primary">
                    {review.authorName}
                  </cite>
                  {review.serviceReceived ? (
                    <p className="mt-0.5 truncate text-xs text-muted">{review.serviceReceived}</p>
                  ) : null}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-brand-secondary/35 bg-surface-tint p-8 md:p-12">
          <p className="eyebrow">Coming soon</p>
          <p className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-brand-primary">
            Trusted by Queens families & businesses.
          </p>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Verified reviews will appear here once the team has permission to publish them. We do not use placeholder testimonials.
          </p>
        </div>
      )}
    </Section>
  )
}