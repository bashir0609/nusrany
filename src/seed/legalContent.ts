/**
 * Client-review legal copy.
 *
 * These drafts are general information, not legal advice, and are not
 * attorney-reviewed. They render only after being published from the CMS;
 * the frontend shows a minimal notice when the CMS content is empty.
 */

type TextNode = {
  type: 'text'
  text: string
  format: 0
  version: 1
  detail: 0
  mode: 'normal'
  style: ''
}

type ParagraphNode = {
  type: 'paragraph'
  format: ''
  indent: 0
  version: 1
  direction: 'ltr'
  textFormat: 0
  textStyle: ''
  children: TextNode[]
}

export type LegalRichText = {
  root: {
    type: 'root'
    format: ''
    indent: 0
    version: 1
    direction: 'ltr'
    children: ParagraphNode[]
  }
}

export function richTextFromParagraphs(paragraphs: string[]): LegalRichText {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: [{ type: 'text', text, format: 0, version: 1, detail: 0, mode: 'normal', style: '' }],
      })),
    },
  }
}

const privacyParagraphs = [
  'This privacy notice describes how Nusra Tax & Notary (operated by Nusra Trading Inc.) collects and handles information when you use this website.',
  'Information you submit through the request-assistance form (name, phone, email, service, preferred contact method, and any message) is collected so our team can respond to your request. Consent to be contacted is recorded at the time of submission. Please do not submit Social Security numbers, passport numbers, tax documents, immigration documents, banking details, or other highly sensitive personal information through this form.',
  'Inquiry records are retained for up to 12 months unless you ask us to delete them sooner, or unless we close the record earlier.',
  'We operate standard web server logs for security and operational purposes. We do not intentionally log full form-message contents. Analytics may be enabled from time to time; when enabled, it collects aggregate page-view information only and never the contents of form messages.',
  'This website is hosted and operated using service providers: Vercel (hosting), Neon (database), Vercel Blob (website images), and Resend (inquiry notification email). These providers process data as needed to operate the website.',
  'We do not sell your information. Contact us at info@nusrany.com with any privacy questions.',
]

const termsParagraphs = [
  'These terms govern your use of the Nusra Tax & Notary website, operated by Nusra Trading Inc.',
  'We provide administrative assistance with tax preparation, immigration forms, and supporting documents. We are not a law firm and do not provide legal advice or legal representation. Content on this website is general information and is not a substitute for professional advice.',
  'Fees are quoted upfront and before work begins. Prices vary according to the complexity of your situation, forms, and schedules.',
  'To the fullest extent permitted by law, we are not liable for damages arising from your use of this website or reliance on its content.',
]

const disclaimerParagraphs = [
  'Content on this website is general information for visitors, not legal advice, and does not create a client relationship.',
  'Nusra Tax & Notary provides administrative assistance with tax and immigration forms and documents. We are not a law firm and do not provide legal advice or legal representation. Approval of any application is decided by the relevant government authorities.',
  'Credential and service claims are published only after verification with the business owner. Contact us with questions about any service described on this site.',
]

export const legalContentSeed = {
  privacyPolicy: richTextFromParagraphs(privacyParagraphs),
  terms: richTextFromParagraphs(termsParagraphs),
  disclaimer: richTextFromParagraphs(disclaimerParagraphs),
}

/** Production-safe minimal notices used when the corresponding CMS legal content is empty. */
export function getLegalFallback(kind: 'privacyPolicy' | 'terms' | 'disclaimer'): string {
  switch (kind) {
    case 'privacyPolicy':
      return 'Our privacy policy is being reviewed and will be published soon.'
    case 'terms':
      return 'Our terms and conditions are being reviewed and will be published soon.'
    case 'disclaimer':
      return 'This page provides general information and is not legal advice. Please contact us with any questions.'
  }
}
