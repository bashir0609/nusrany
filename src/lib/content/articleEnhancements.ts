type ArticleEnhancements = {
  summary: string
  faqs: Array<{ question: string; answer: string }>
  links: Array<{ href: string; title: string; description: string }>
}

// Specific editorial content takes precedence over the shared article defaults.
const articles: Record<string, ArticleEnhancements> = {
  'tax-preparation-jamaica-ny-expect': {
    summary: 'Preparing for a tax appointment in Jamaica, Queens? Gather your photo ID, tax documents, prior-year return, and records of income and expenses. Contact Nusra Tax & Notary before your visit to confirm which documents apply to your situation and request an appointment.',
    faqs: [
      { question: 'What should I bring to a tax preparation appointment?', answer: 'Bring a photo ID, Social Security information for everyone on the return, your prior-year return if available, and all W-2 and 1099 forms. Include records supporting income, expenses, deductions, and credits. Ask the office which additional documents your situation requires.' },
      { question: 'What records do self-employed taxpayers need?', answer: 'Gather income records, business expense receipts, and any applicable 1099 forms. Bring mileage records if you use a vehicle for business, and rental income and expense records if you own rental property. Your preparer can explain which records are relevant to your return.' },
      { question: 'How much will tax preparation cost?', answer: 'The fee depends on the forms and complexity of your return. Contact Nusra Tax & Notary with a brief description of your tax situation to request a current quote before scheduling.' },
      { question: 'Can I review my return before it is filed?', answer: 'Ask your preparer to explain the completed return, including income, deductions, credits, and any refund or balance due. Review the details and resolve questions before authorizing electronic filing.' },
      { question: 'How do I request an appointment in Queens?', answer: 'Use the contact page or call the phone number shown on this page to request an appointment. Confirm availability, the office location, and the documents you need before visiting. Do not send Social Security numbers or tax documents through the general contact form.' },
    ],
    links: [
      { href: '/tax-preparation', title: 'Explore tax preparation services', description: 'Learn about support for your individual or business tax return.' },
      { href: '/business-services', title: 'Planning your next business step?', description: 'Explore business services and discuss the support you need.' },
      { href: '/contact', title: 'Prepare for your visit', description: 'Find contact details and request an appointment with the team.' },
    ],
  },
  'notary-services-jamaica-queens': {
    summary: 'Need a notary in Jamaica, Queens? Contact the office to confirm your document can be handled and ask what identification and witnesses are required. Bring the complete document and follow the notary’s instructions about when to sign.',
    faqs: [
      { question: 'What should I bring to a notary appointment?', answer: 'Bring the complete document and identification acceptable to the notary. Confirm identification requirements before your visit and ask whether any additional signers or witnesses must attend.' },
      { question: 'Should I sign my document before the appointment?', answer: 'Ask the notary before signing. Some notarial acts require you to sign in the notary’s presence; others require you to acknowledge an existing signature. The requirements depend on the document and the requested notarial act.' },
      { question: 'Can a notary tell me which legal document to use?', answer: 'Notarization does not replace legal advice. If you are unsure which document or notarial act you need, ask the receiving organization or a qualified attorney before your appointment.' },
      { question: 'How do I confirm availability and fees?', answer: 'Call the office or use the contact page to describe the service you need and request current availability and fees. Do not send sensitive document contents through the general contact form.' },
    ],
    links: [
      { href: '/services', title: 'Explore our services', description: 'See the services available and find the right support for your visit.' },
      { href: '/about', title: 'Get to know Nusra', description: 'Learn more about the business before your appointment.' },
      { href: '/contact', title: 'Ask about your document', description: 'Confirm requirements and request a notary appointment.' },
    ],
  },
}

export function getArticleEnhancements(slug: string, excerpt = ''): ArticleEnhancements {
  if (Object.hasOwn(articles, slug)) return articles[slug]

  return {
    summary: excerpt.trim() || 'Explore this guide from Nusra Tax & Notary, then contact the team to discuss which services and next steps apply to your situation.',
    faqs: [
      { question: 'How can I ask a question about this guide?', answer: 'Contact Nusra Tax & Notary by phone or through the contact page. Mention the article and briefly describe what you need help with so the team can discuss appropriate next steps.' },
      { question: 'Does this guide replace advice about my individual situation?', answer: 'This article provides general information. Requirements can vary by service and individual circumstances. Confirm current requirements with the relevant organization or a qualified professional before acting.' },
      { question: 'What should I confirm before visiting?', answer: 'Contact the office to confirm service availability, appointment requirements, current fees, and any documents or identification you should bring.' },
      { question: 'Should I send personal documents through the contact form?', answer: 'Do not submit Social Security numbers, financial records, or other sensitive documents through the general contact form. Ask the team how to share any required documents securely.' },
    ],
    links: [
      { href: '/services', title: 'Explore our services', description: 'Find the support that fits your needs before arranging a visit.' },
      { href: '/blog', title: 'Read more practical guides', description: 'Browse more articles from Nusra Tax & Notary.' },
      { href: '/contact', title: 'Discuss your next steps', description: 'Ask a question or request an appointment with the team.' },
    ],
  }
}
