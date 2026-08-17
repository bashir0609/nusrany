import { LegalPageLayout, buildLegalMetadata } from '../legal/legal-page'

export const metadata = buildLegalMetadata('Disclaimer', '/disclaimer')

export default async function DisclaimerPage() {
  return <LegalPageLayout kind="disclaimer" title="Disclaimer" />
}
