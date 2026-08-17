import { LegalPageLayout, buildLegalMetadata } from '../legal/legal-page'

export const metadata = buildLegalMetadata('Terms & Conditions', '/terms')

export default async function TermsPage() {
  return <LegalPageLayout kind="terms" title="Terms & Conditions" />
}
