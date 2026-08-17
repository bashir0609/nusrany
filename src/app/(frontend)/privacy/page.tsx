import { LegalPageLayout, buildLegalMetadata } from '../legal/legal-page'

export const metadata = buildLegalMetadata('Privacy Policy', '/privacy')

export default async function PrivacyPage() {
  return <LegalPageLayout kind="privacyPolicy" title="Privacy Policy" />
}
