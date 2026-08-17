import type { Faq, Review, Service, TeamMember } from '@/payload-types'
import {
  getHomepage,
  getPublishedFAQs,
  getPublishedReviews,
  getPublishedServices,
  getPublishedTeam,
  getSiteSettings,
} from '@/lib/content/queries'
import { HeroSection } from '@/components/sections/HeroSection'
import { HomeServicesSection } from '@/components/sections/HomeServicesSection'
import { HomeTrustSection } from '@/components/sections/HomeTrustSection'
import { HomeTeamSection } from '@/components/sections/HomeTeamSection'
import { HomeReviewsSection } from '@/components/sections/HomeReviewsSection'
import { HomeHowItWorksSection } from '@/components/sections/HomeHowItWorksSection'
import { HomeFaqSection } from '@/components/sections/HomeFaqSection'
import { HomeOfficeSection } from '@/components/sections/HomeOfficeSection'
import { HomeFinalCtaSection } from '@/components/sections/HomeFinalCtaSection'

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
      <HeroSection
        headline={homepage.heroHeadline}
        supportingCopy={homepage.heroSupportingCopy}
        heroImage={homepage.heroImage}
        settings={settings}
      />
      <HomeServicesSection
        heading={homepage.servicesHeading}
        intro={homepage.servicesIntro}
        services={services}
        featuredService={homepage.featuredService}
        featuredHeadline={homepage.featuredHeadline}
        featuredBody={homepage.featuredBody}
      />
      <HomeTrustSection
        whyHeading={homepage.whyChooseUsHeading}
        whyItems={homepage.whyChooseUs ?? []}
        whoHeading={homepage.whoWeHelpHeading}
        whoItems={homepage.whoWeHelp ?? []}
      />
      <HomeTeamSection heading={homepage.teamHeading} members={teamMembers} />
      <HomeReviewsSection heading={homepage.reviewsHeading} reviews={reviewDocs} />
      <HomeHowItWorksSection heading={homepage.howItWorksHeading} steps={homepage.howItWorksSteps ?? []} />
      <HomeFaqSection heading={homepage.faqsHeading} faqs={faqDocs} />
      <HomeOfficeSection settings={settings} />
      <HomeFinalCtaSection headline={homepage.finalCtaHeadline} copy={homepage.finalCtaCopy} settings={settings} />
    </>
  )
}
