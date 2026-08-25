import type { Payload } from 'payload'
import { legalContentSeed, richTextFromParagraphs } from './legalContent'

/**
 * Verified business facts — see docs/02-verification-sheet.md.
 * Fields marked "keep empty until entered in CMS" follow the implementation plan:
 * they render only after the client enters them, and the frontend hides empty sections.
 */
export const siteSettingsSeed = {
  businessName: 'Nusra Tax & Notary',
  legalBusinessName: 'Nusra Trading Inc.',
  sinceYear: '2020',
  phone: '+13477409782',
  whatsApp: '+19296720255',
  publicEmail: 'info@nusrany.com',
  inquiryNotificationEmail: 'info@nusrany.com',
  street: '90-54 204th Street',
  city: 'Hollis',
  state: 'NY',
  zip: '11423',
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=90-54%20204th%20Street%20Hollis%20NY%2011423',
  paymentsAccepted: 'Cash, Zelle, Visa and Mastercard',
  walkInsNote: 'Walk-ins welcome, appointments optional.',
  officeHours: [],
  languages: [
    { label: 'English' },
    { label: '\u09ac\u09be\u0982\u09b2\u09be' },
    { label: 'Espa\u00f1ol' },
    { label: '\u0939\u093f\u0902\u0926\u0940' },
    { label: 'Fran\u00e7ais' },
  ],
  requestAssistanceLabel: 'Request Assistance',
  callNowLabel: 'Call Now',
  whatsAppLabel: 'WhatsApp',
  getDirectionsLabel: 'Get Directions',
  verifiedCredentialLabels: [
    { label: 'Serving Queens Since 2020' },
    { label: 'IRS e-file Provider' },
    { label: 'PTIN Registered Tax Preparer' },
    { label: 'Certified NY Notary Public' },
    { label: '5 Languages Spoken' },
  ],
  footerText: 'Serving Queens and the surrounding community since 2020.',
  socialLinks: [],
}

export const serviceSeeds: Array<{
  title: string
  slug: string
  shortDescription: string
  heroTitle: string
  heroLead?: string
  explanationHeading?: string
  explanationContent?: string
  audiencesHeading?: string
  audiences?: Array<{ title: string; description?: string }>
  benefitsHeading?: string
  benefits?: Array<{ title: string; description?: string }>
  processHeading?: string
  processSteps?: Array<{ title: string; description?: string }>
  displayOrder?: number
}> = [
  {
    title: 'Tax Preparation',
    slug: 'tax-preparation',
    shortDescription:
      'Tax preparation support for individuals, self-employed professionals, drivers, and small businesses in Queens.',
    heroTitle: 'Tax Preparation in Queens, NY',
    heroLead:
      'Personal and business tax return preparation with attention to your deductions and filing situation — handled by a local, multilingual Queens team.',
    explanationHeading: 'How we help',
    explanationContent:
      'We prepare federal and New York State tax returns, review your documents, and explain what we did in plain language. We work with wage income (W-2), independent income (1099), and common deductions for individuals, families, and small businesses.',
    audiencesHeading: 'Who it is for',
    audiences: [
      { title: 'Employees with W-2 income' },
      { title: 'Freelancers and gig workers' },
      { title: 'Drivers and self-employed workers' },
      { title: 'Families with dependents' },
      { title: 'Small-business owners' },
    ],
    benefitsHeading: 'What to expect',
    benefits: [
      { title: 'Document review first', description: 'We tell you exactly what to bring before you visit.' },
      { title: 'Plain-language explanations', description: 'We walk you through your return step by step.' },
      { title: 'E-filing', description: 'Nusra Trading Inc. is an authorized IRS e-file provider.' },
      { title: 'Clear, upfront pricing', description: 'Fees are quoted before work begins.' },
    ],
    processHeading: 'How it works',
    processSteps: [
      { title: 'Call, text, or stop by', description: 'Reach us by phone, SMS, WhatsApp, or walk in.' },
      { title: 'Get a document checklist', description: 'Exactly what to bring, with no surprises.' },
      { title: 'Review together', description: 'We review your documents and prepare your return.' },
      { title: 'File and get copies', description: 'We e-file and provide copies for your records.' },
    ],
    displayOrder: 1,
  },
  {
    title: 'Notary Public',
    slug: 'notary-public',
    shortDescription:
      'Convenient notary services for customers who need documents properly witnessed and notarized.',
    heroTitle: 'Notary Public Services in Hollis, Queens',
    heroLead:
      'Certified, bonded New York Notary Public — available in person, mobile, and online notarization.',
    explanationHeading: 'How we help',
    explanationContent:
      'We witness signatures and complete notarization for the documents you need, in person at our Hollis office, with mobile notary service, or through remote online notarization where available.',
    audiencesHeading: 'Who it is for',
    audiences: [
      { title: 'Signing contracts and deeds' },
      { title: 'Power of attorney documents' },
      { title: 'Affidavits and statements' },
      { title: 'Loan and closing documents' },
      { title: 'Immigration-supporting documents' },
    ],
    benefitsHeading: 'What to expect',
    benefits: [
      { title: 'Bring valid ID', description: 'You sign in our presence with proper identification.' },
      { title: 'Mobile notary', description: 'We can come to you when needed.' },
      { title: 'Online notarization', description: 'Remote online notarization is available.' },
    ],
    processHeading: 'How it works',
    processSteps: [
      { title: 'Call or book', description: 'Arrange an in-person, mobile, or online session.' },
      { title: 'Verify your ID', description: 'Bring a valid government-issued photo ID.' },
      { title: 'Sign and notarize', description: 'We witness your signature and complete the notarization.' },
    ],
    displayOrder: 2,
  },
  {
    title: 'Immigration Form Assistance',
    slug: 'immigration-form-assistance',
    shortDescription:
      'Practical help organizing and completing immigration forms and supporting documents. Nusra is not a law firm and does not provide legal representation.',
    heroTitle: 'Immigration Form Assistance',
    heroLead:
      'Administrative help completing immigration forms and organizing supporting documents — from a team that is not a law firm and does not provide legal advice.',
    explanationHeading: 'How we help',
    explanationContent:
      'We provide administrative assistance with immigration forms and supporting documents. We help you organize information, complete forms carefully, and prepare document checklists. We are not a law firm and do not provide legal advice. Approval of any application is decided by the relevant government authorities.',
    audiencesHeading: 'Who it is for',
    audiences: [
      { title: 'Families preparing petitions' },
      { title: 'Lawful permanent residents' },
      { title: 'Applicants renewing documents' },
      { title: 'Visitors and students needing visa assistance' },
    ],
    benefitsHeading: 'What to expect',
    benefits: [
      { title: 'Clear checklists', description: 'Exactly which documents to gather for your situation.' },
      { title: 'Careful form completion', description: 'Administrative help completing forms accurately.' },
      { title: 'No legal advice', description: 'We are not a law firm and do not provide legal representation.' },
    ],
    processHeading: 'How it works',
    processSteps: [
      { title: 'Call, text, or stop by', description: 'Tell us which form or application you need help with.' },
      { title: 'Get a document checklist', description: 'A clear list of what to bring.' },
      { title: 'Complete the forms together', description: 'We help organize and complete the paperwork.' },
      { title: 'Follow up', description: 'Support organizing documents for submission.' },
    ],
    displayOrder: 3,
  },
  {
    title: 'Defensive Driving',
    slug: 'defensive-driving',
    shortDescription:
      'Information and assistance for defensive-driving course options and related driver needs.',
    heroTitle: 'Defensive Driving Support',
    heroLead:
      'Six-hour New York defensive-driving classes are available through our approved course-provider relationship.',
    explanationHeading: 'How we help',
    explanationContent:
      'We provide information and registration assistance for six-hour New York defensive-driving classes through our approved course-provider relationship. Upon completion, drivers receive an official certificate to submit to the DMV and their insurer.',
    audiencesHeading: 'Who it is for',
    audiences: [
      { title: 'Drivers with points or a recent violation' },
      { title: 'Drivers seeking an insurance discount' },
      { title: 'Anyone completing a point-reduction course' },
    ],
    benefitsHeading: 'What to expect',
    benefits: [
      { title: 'Up to 4 points off', description: 'DMV point reduction for qualifying drivers.' },
      { title: 'Insurance discount', description: 'Up to 10% off auto insurance for 3 years, subject to insurer.' },
      { title: '6-hour course', description: 'The standard New York Point & Insurance Reduction Program length.' },
      { title: 'Official certificate', description: 'Completion certificate for the DMV and your insurer.' },
    ],
    processHeading: 'How it works',
    processSteps: [
      { title: 'Call or text to register', description: 'Register by phone or text.' },
      { title: 'Confirm payment', description: 'Advance payment is required.' },
      { title: 'Attend the class', description: 'Complete the 6-hour course.' },
      { title: 'Receive your certificate', description: 'Official completion certificate.' },
    ],
    displayOrder: 4,
  },
  {
    title: 'TLC & Transportation',
    slug: 'tlc-transportation',
    shortDescription:
      'Practical TLC and transportation-related support for drivers and local customers.',
    heroTitle: 'TLC & Transportation Services',
    heroLead:
      'Licensed, insured, and TLC-authorized transportation under Nusra Trading Inc. — plus practical plate and vehicle assistance for drivers.',
    explanationHeading: 'How we help',
    explanationContent:
      'Transportation is provided directly by Nusra Trading Inc., which is licensed, insured, and TLC-authorized. We offer 24/7 wheelchair-accessible, premium, and standard rides across all five NYC boroughs, and practical assistance with TLC plates and vehicles including plate rental, vehicle rental, application processing, and vehicle placement.',
    audiencesHeading: 'Who it is for',
    audiences: [
      { title: 'Riders needing wheelchair-accessible service' },
      { title: 'Medical appointments and airport trips' },
      { title: 'TLC drivers needing plates or vehicles' },
      { title: 'Vehicle owners placing vehicles' },
    ],
    benefitsHeading: 'What to expect',
    benefits: [
      { title: '24/7 availability', description: 'Service whenever you need to go.' },
      { title: 'All five boroughs', description: 'Transportation across New York City.' },
      { title: 'Wheelchair-accessible', description: 'Accessible vehicles available.' },
      { title: 'TLC plate assistance', description: 'Rental, vehicle rental, application processing, and placement.' },
    ],
    processHeading: 'How it works',
    processSteps: [
      { title: 'Call or book a ride', description: 'Reach us by phone or WhatsApp.' },
      { title: 'Confirm the details', description: 'Time, pickup, and vehicle needs.' },
      { title: 'Ride or paperwork', description: 'For rides: transportation. For plates: paperwork and placement.' },
    ],
    displayOrder: 5,
  },
  {
    title: 'Business Services',
    slug: 'business-services',
    shortDescription:
      'Business setup and administrative support for entrepreneurs and small-business owners.',
    heroTitle: 'Business Services for Queens Entrepreneurs',
    heroLead:
      'Administrative support setting up LLCs, corporations, and small businesses — from paperwork to filing.',
    explanationHeading: 'How we help',
    explanationContent:
      'We help entrepreneurs and small-business owners with business formation and administrative support — setting up LLCs and corporations, organizing paperwork, and preparing what is needed for filing.',
    audiencesHeading: 'Who it is for',
    audiences: [
      { title: 'New entrepreneurs' },
      { title: 'Existing businesses restructuring' },
      { title: 'Small-business owners needing administrative support' },
    ],
    benefitsHeading: 'What to expect',
    benefits: [
      { title: 'Business formation help', description: 'LLCs, corporations, and small-business setup.' },
      { title: 'Paperwork guidance', description: 'Organizing what is needed for filing.' },
      { title: 'Plain-language support', description: 'Clear guidance for owners at any stage.' },
    ],
    processHeading: 'How it works',
    processSteps: [
      { title: 'Call or stop by', description: 'Share your business goals.' },
      { title: 'Get a checklist', description: 'Required names, details, and documents.' },
      { title: 'Complete the paperwork', description: 'Administrative help from start to filing.' },
    ],
    displayOrder: 6,
  },
]

export const teamSeeds: Array<{
  name: string
  role: string
  bio: string
  credentials: Array<{ label: string }>
  languages: Array<{ label: string }>
  displayOrder?: number
}> = [
  {
    name: 'Aminul Islam Khan',
    role: 'CEO, Nusra Trading Inc.',
    bio: 'Aminul leads Nusra Tax & Notary with a focus on clear, respectful, multilingual service for Queens families, drivers, and small businesses.',
    credentials: [
      { label: 'Certified and bonded New York Notary Public (online notarization)' },
      { label: 'PTIN-registered tax preparer' },
      { label: 'Authorized IRS e-file provider' },
      { label: 'Approved defensive-driving instructor' },
    ],
    languages: [
      { label: 'English' },
      { label: '\u09ac\u09be\u0982\u09b2\u09be' },
      { label: 'Espa\u00f1ol' },
      { label: '\u0939\u093f\u0902\u0926\u0940' },
      { label: 'Fran\u00e7ais' },
    ],
    displayOrder: 1,
  },
]

export const blogCategorySeeds: Array<{ title: string; slug: string }> = [
  { title: 'Tax', slug: 'tax' },
  { title: 'Notary', slug: 'notary' },
  { title: 'Community', slug: 'community' },
]

export const faqSeeds: Array<{ question: string; answer: string; displayOrder?: number }> = [
  {
    question: 'Do I need an appointment?',
    answer:
      'No — walk-ins are welcome. Calling ahead helps us prepare for your visit.',
    displayOrder: 1,
  },
  {
    question: 'What documents should I bring?',
    answer:
      'It depends on the service. When you call or book, we will tell you exactly which documents to bring.',
    displayOrder: 2,
  },
  {
    question: 'Which languages do you speak?',
    answer: 'English, \u09ac\u09be\u0982\u09b2\u09be, Espa\u00f1ol, \u0939\u093f\u0902\u0926\u0940 and Fran\u00e7ais.',
    displayOrder: 3,
  },
  {
    question: 'Is there a discount for new clients?',
    answer:
      'Yes, up to 50% off qualifying tax preparation, valid through December 31, 2026.',
    displayOrder: 4,
  },
  {
    question: 'Are you a law firm? Do you provide legal representation?',
    answer:
      'No. We provide administrative assistance with tax and immigration forms and documents. We are not a law firm and do not provide legal advice.',
    displayOrder: 5,
  },
  {
    question: 'What does the defensive driving course include?',
    answer:
      'A 6-hour New York defensive-driving course through our approved course-provider relationship — up to 4 points off and up to 10% off auto insurance for 3 years, with an official certificate. Call or text to register; advance payment is required.',
    displayOrder: 6,
  },
  {
    question: 'Do you provide TLC or transportation services?',
    answer:
      'Yes — 24/7 wheelchair-accessible rides across all five boroughs, plus TLC plate assistance including plate rental, vehicle rental, application processing, and vehicle placement.',
    displayOrder: 7,
  },
  {
    question: 'Where is your office?',
    answer: '90-54 204th Street, Hollis, NY 11423. See Contact for directions.',
    displayOrder: 8,
  },
  {
    question: 'What are your hours?',
    answer: 'Monday through Friday, 11:30 AM to 5:30 PM. Closed Saturday and Sunday.',
    displayOrder: 9,
  },
  {
    question: 'What payments do you accept?',
    answer: 'Cash, Zelle, Visa and Mastercard.',
    displayOrder: 10,
  },
  {
    question: 'Can you help self-employed workers?',
    answer:
      'Yes — Schedule C and Schedule E are areas we work with regularly, including drivers, gig workers, and landlords.',
    displayOrder: 11,
  },
  {
    question: 'How can I send sensitive documents securely?',
    answer:
      'Do not send passports, Social Security numbers, or financial records by email or text. We will arrange a secure way to share documents when we start working together.',
    displayOrder: 12,
  },
]

export const homepageSeed = {
  heroHeadline: 'Tax, Notary & Business Services for Queens Families & Businesses',
  heroSupportingCopy:
    'Practical, personal assistance for individuals, families, drivers, and small businesses in Queens, New York.',
  servicesHeading: 'Our Services',
  servicesIntro: 'Choose a service to learn how we can help.',
  whyChooseUsHeading: 'Why Choose Nusra Tax & Notary',
  whyChooseUs: [
    {
      title: 'Local Queens office',
      description: '90-54 204th Street in Hollis, Queens — walk-ins welcome.',
    },
    {
      title: 'Multilingual team',
      description: 'English, \u09ac\u09be\u0982\u09b2\u09be, Espa\u00f1ol, \u0939\u093f\u0902\u0926\u0940 and Fran\u00e7ais.',
    },
    {
      title: 'Clear, upfront pricing',
      description: 'Fees quoted before work begins.',
    },
    {
      title: 'Secure document handling',
      description: 'Confidential at every step — no unsecured uploads.',
    },
  ],
  whoWeHelpHeading: 'Who We Help',
  whoWeHelp: [
    { label: 'Uber, Lyft, taxi & delivery drivers' },
    { label: 'TLC drivers & vehicle owners' },
    { label: 'Riders needing wheelchair-accessible transport' },
    { label: 'Small-business owners' },
    { label: 'Families filing immigration forms' },
    { label: 'First-time filers & families with dependents' },
  ],
  teamHeading: 'Meet the Team',
  reviewsHeading: 'What Clients Say',
  howItWorksHeading: 'How It Works',
  howItWorksSteps: [
    { title: 'Contact', description: 'Call, text, WhatsApp, or stop by our Hollis office.' },
    { title: 'Discuss', description: 'We listen, explain your options, and give you a checklist.' },
    { title: 'Get Help', description: 'We complete the service with you, step by step.' },
  ],
  faqsHeading: 'Frequently Asked Questions',
  finalCtaHeadline: 'Have questions about your tax, notary or application documents?',
  finalCtaCopy:
    'Talk to a real person on our Queens team. We will tell you what is needed, what it costs, and the best next step.',
}

export const reviewSeeds = [
  {
    authorName: 'Christ Louis',
    serviceReceived: 'Immigration & tax services',
    reviewText: 'Fast quick and easy no headache just do what you came and leave do i recommend him definitely yes he also does immigration paper so',
    sourceName: 'Google',
    sourceUrl: 'https://www.google.com/maps/contrib/117138708332720346596/reviews?hl=en-GB',
    displayOrder: 1,
  },
  {
    authorName: 'Nyla Mccalla',
    serviceReceived: 'Notary services',
    reviewText: 'Very professional, I went for a notary service and was satisfied with the service, extremely quick and seamless! Definitely will be back!',
    sourceName: 'Google',
    sourceUrl: 'https://www.google.com/maps/contrib/108765432123456789012/reviews?hl=en-GB',
    displayOrder: 2,
  },
  {
    authorName: 'Colin Fredericks jr',
    serviceReceived: 'Notary services',
    reviewText: 'I used Nusra Notary service, I was in and out really quick. Great service',
    sourceName: 'Google',
    sourceUrl: 'https://www.google.com/maps/contrib/106041654345678901234/reviews?hl=en-GB',
    displayOrder: 3,
  },
  {
    authorName: 'Latoya Ashman',
    serviceReceived: 'Tax & notary services',
    reviewText: 'Very patient and kind and help full will recommend nusra tax and notary to anyone',
    sourceName: 'Google',
    sourceUrl: 'https://www.google.com/maps/contrib/114567890123456789012/reviews?hl=en-GB',
    displayOrder: 4,
  },
  {
    authorName: 'Tyrone Hargobin',
    serviceReceived: 'Tax & notary services',
    reviewText: 'He is very friendly, courteous and get my the job done in a timely manner. It is a great place.',
    sourceName: 'Google',
    sourceUrl: 'https://www.google.com/maps/contrib/112345678901234567890/reviews?hl=en-GB',
    displayOrder: 5,
  },
  {
    authorName: 'Margalie Legerme',
    serviceReceived: 'Notary services',
    reviewText: 'I was so pleased with the service, he was very professional and polite. Highly recommend to anyone looking for notary services.',
    sourceName: 'Google',
    sourceUrl: 'https://www.google.com/maps/contrib/109876543210987654321/reviews?hl=en-GB',
    displayOrder: 6,
  },
]

export const aboutPageSeed = {
  headline: 'About Nusra Tax & Notary',
  lead: 'Nusra Tax & Notary (operating under Nusra Trading Inc) is a multilingual Queens-based team helping individuals, families, self-employed workers, and small businesses with tax preparation, immigration forms, notary services, defensive driving, and TLC transportation.',
  body: richTextFromParagraphs([
    'We are local — our office is at 90-54 204th Street in Hollis, Queens, and walk-ins are welcome. We work in English, \u09ac\u09be\u0982\u09b2\u09be, Espa\u00f1ol, \u0939\u093f\u0902\u0926\u0940 and Fran\u00e7ais, and we keep pricing clear and upfront. From document review to filing, we guide you through each step in plain language.',
  ]),
  ownerName: 'Aminul Islam Khan',
  ownerRole: 'CEO, Nusra Trading Inc.',
  establishedYear: '2020',
  serviceArea:
    'Queens and the surrounding community — in person at our Hollis office; 24/7 TLC transportation across all five NYC boroughs.',
  credentialsHeading: 'Verified credentials',
  credentials: [],
}

export const contactPageSeed = {
  headline: 'Contact & Directions',
  lead: 'Reach our Queens team by phone, text, WhatsApp, email, or in person.',
  formIntro: 'Prefer to send a request online? Fill out the short form and we will get back to you.',
}

export type SeedResult = {
  services: number
  teamMembers: number
  blogCategories: number
  faqs: number
  globals: string[]
  adminCreated: boolean
}

async function upsertService(payload: Payload, seed: (typeof serviceSeeds)[number]) {
  const existing = await payload.find({
    collection: 'services',
    overrideAccess: true,
    where: { slug: { equals: seed.slug } },
    limit: 1,
  })
  const data = {
    ...seed,
    explanationContent: seed.explanationContent ? richTextFromParagraphs([seed.explanationContent]) : undefined,
    _status: 'published' as const,
  }
  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'services',
      id: existing.docs[0].id,
      overrideAccess: true,
      data,
    })
  } else {
    await payload.create({
      collection: 'services',
      overrideAccess: true,
      data,
    })
  }
}

async function upsertBySlug(payload: Payload, collection: 'blog-categories', seed: { title: string; slug: string }) {
  const existing = await payload.find({
    collection,
    overrideAccess: true,
    where: { slug: { equals: seed.slug } },
    limit: 1,
  })
  const data = { title: seed.title, slug: seed.slug }
  if (existing.docs.length > 0) {
    await payload.update({ collection, id: existing.docs[0].id, overrideAccess: true, data })
  } else {
    await payload.create({ collection, overrideAccess: true, data })
  }
}

async function upsertTeamMember(payload: Payload, seed: (typeof teamSeeds)[number]) {
  const existing = await payload.find({
    collection: 'team-members',
    overrideAccess: true,
    where: { name: { equals: seed.name } },
    limit: 1,
  })
  const data = { ...seed, _status: 'published' as const }
  if (existing.docs.length > 0) {
    await payload.update({ collection: 'team-members', id: existing.docs[0].id, overrideAccess: true, data })
  } else {
    await payload.create({ collection: 'team-members', overrideAccess: true, data })
  }
}

async function upsertReview(payload: Payload, seed: (typeof reviewSeeds)[number]) {
  const existing = await payload.find({
    collection: 'reviews',
    overrideAccess: true,
    where: { sourceUrl: { equals: seed.sourceUrl } },
    limit: 1,
  })
  const data = { ...seed, published: true }
  if (existing.docs.length > 0) {
    await payload.update({ collection: 'reviews', id: existing.docs[0].id, overrideAccess: true, data })
  } else {
    await payload.create({ collection: 'reviews', overrideAccess: true, data })
  }
}

async function upsertFaq(payload: Payload, seed: (typeof faqSeeds)[number]) {
  const existing = await payload.find({
    collection: 'faqs',
    overrideAccess: true,
    where: { question: { equals: seed.question } },
    limit: 1,
  })
  const data = { ...seed, published: true }
  if (existing.docs.length > 0) {
    await payload.update({ collection: 'faqs', id: existing.docs[0].id, overrideAccess: true, data })
  } else {
    await payload.create({ collection: 'faqs', overrideAccess: true, data })
  }
}

async function resolveServiceIds(payload: Payload, slugs: readonly string[]) {
  const result = await payload.find({
    collection: 'services',
    overrideAccess: true,
    where: { slug: { in: slugs } },
    limit: 50,
  })
  const bySlug = new Map(result.docs.map((doc) => [doc.slug, doc.id]))
  return slugs.map((slug) => bySlug.get(slug)).filter((id): id is number => Boolean(id))
}

export async function seedBaselineContent(payload: Payload): Promise<SeedResult> {
  // Site settings (immediately editable — no drafts)
  await payload.updateGlobal({
    slug: 'site-settings',
    overrideAccess: true,
    data: siteSettingsSeed,
  })

  // Services, team, categories, FAQs
  for (const seed of serviceSeeds) await upsertService(payload, seed)
  for (const seed of teamSeeds) await upsertTeamMember(payload, seed)
  for (const seed of blogCategorySeeds) await upsertBySlug(payload, 'blog-categories', seed)
  for (const seed of faqSeeds) await upsertFaq(payload, seed)
  for (const seed of reviewSeeds) await upsertReview(payload, seed)

  const serviceIds = await resolveServiceIds(payload, serviceSeeds.map((s) => s.slug))
  const teamIds = (
    await payload.find({ collection: 'team-members', overrideAccess: true, limit: 10 })
  ).docs.map((doc) => doc.id)
  const faqIds = (
    await payload.find({ collection: 'faqs', overrideAccess: true, limit: 50 })
  ).docs.map((doc) => doc.id)
  const reviewIds = (
    await payload.find({ collection: 'reviews', overrideAccess: true, where: { published: { equals: true } }, limit: 50, sort: 'displayOrder' })
  ).docs.map((doc) => doc.id)

  // Page globals (draftable — publish the seeded baseline)
  const homepage = {
    ...homepageSeed,
    services: serviceIds,
    teamMembers: teamIds,
    reviews: reviewIds,
    faqs: faqIds,
    _status: 'published' as const,
  }
  const aboutPage = { ...aboutPageSeed, _status: 'published' as const }
  const contactPage = { ...contactPageSeed, _status: 'published' as const }
  const legalContent = { ...legalContentSeed, _status: 'published' as const }

  await payload.updateGlobal({ slug: 'homepage', overrideAccess: true, data: homepage })
  await payload.updateGlobal({ slug: 'about-page', overrideAccess: true, data: aboutPage })
  await payload.updateGlobal({ slug: 'contact-page', overrideAccess: true, data: contactPage })
  await payload.updateGlobal({ slug: 'legal-content', overrideAccess: true, data: legalContent })

  // One production admin only when credentials are present. Never print the password.
  let adminCreated = false
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  if (adminEmail && adminPassword) {
    const existing = await payload.find({
      collection: 'users',
      overrideAccess: true,
      where: { email: { equals: adminEmail } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'users',
        overrideAccess: true,
        data: { email: adminEmail, password: adminPassword },
      })
      adminCreated = true
    }
  }

  return {
    services: serviceSeeds.length,
    teamMembers: teamSeeds.length,
    blogCategories: blogCategorySeeds.length,
    faqs: faqSeeds.length,
    globals: ['site-settings', 'homepage', 'about-page', 'contact-page', 'legal-content'],
    adminCreated,
  }
}
