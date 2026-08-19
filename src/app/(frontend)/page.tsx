import type { Metadata } from 'next'
import type { Faq, Review, Service, TeamMember } from '@/payload-types'
import { buildMetadata } from '@/lib/seo/metadata'
import { buildLocalBusinessJsonLd } from '@/lib/seo/jsonLd'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  getHomepage,
  getPublishedFAQs,
  getPublishedReviews,
  getPublishedServices,
  getPublishedTeam,
  getSiteSettings,
} from '@/lib/content/queries'
import { ReferenceHeroSection } from '@/components/sections/ReferenceHeroSection'
import { StatsStripSection } from '@/components/sections/StatsStripSection'
import { ReferenceServicesSection } from '@/components/sections/ReferenceServicesSection'
import { ReferenceTrustSection } from '@/components/sections/ReferenceTrustSection'
import { HomeTeamSection } from '@/components/sections/HomeTeamSection'
import { HomeReviewsSection } from '@/components/sections/HomeReviewsSection'
import { HomeHowItWorksSection } from '@/components/sections/HomeHowItWorksSection'
import { HomeFaqSection } from '@/components/sections/HomeFaqSection'
import { HomeOfficeSection } from '@/components/sections/HomeOfficeSection'
import { HomeFinalCtaSection } from '@/components/sections/HomeFinalCtaSection'

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage()
  return buildMetadata({
    seoTitle: homepage.seo?.title,
    description: homepage.seo?.description ?? homepage.heroSupportingCopy,
    imageUrl: typeof homepage.heroImage === 'object' && homepage.heroImage ? homepage.heroImage.url ?? null : null,
    path: '/',
  })
}

export default async function HomePage() {
  const homepage = await getHomepage()
  const settings = await getSiteSettings()
  const allServices = await getPublishedServices()
  const team = await getPublishedTeam()
  const reviews = await getPublishedReviews()
  const faqs = await getPublishedFAQs()

  const selectedServices = homepage.services?.filter((s): s is Service => typeof s !== 'number') ?? []
  const services = selectedServices.length > 0 ? selectedServices : allServices
  const teamMembers = homepage.teamMembers?.filter((m): m is TeamMember => typeof m !== 'number') ?? []
  const reviewDocs = homepage.reviews?.filter((r): r is Review => typeof r !== 'number') ?? []
  const faqDocs = homepage.faqs?.filter((f): f is Faq => typeof f !== 'number') ?? []

  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd(settings)} />
      <ReferenceHeroSection
        headline={homepage.heroHeadline}
        supportingCopy={homepage.heroSupportingCopy}
        heroImage={homepage.heroImage}
        settings={settings}
      />
      <StatsStripSection sinceYear={settings.sinceYear} serviceCount={services.length} languageCount={settings.languages?.length ?? 0} />
      <ReferenceServicesSection heading={homepage.servicesHeading} intro={homepage.servicesIntro} services={services} />
      <ReferenceTrustSection items={homepage.whyChooseUs ?? []} />
      <HomeTeamSection heading={homepage.teamHeading} members={teamMembers} />
      <HomeReviewsSection heading={homepage.reviewsHeading} reviews={reviewDocs} />
      <HomeHowItWorksSection heading={homepage.howItWorksHeading} steps={homepage.howItWorksSteps ?? []} />
      <HomeFaqSection heading={homepage.faqsHeading} faqs={faqDocs} />
      <HomeOfficeSection settings={settings} />
      <HomeFinalCtaSection headline={homepage.finalCtaHeadline} copy={homepage.finalCtaCopy} settings={settings} />
    </>
  )
}
