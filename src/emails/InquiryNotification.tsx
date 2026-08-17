import { Body, Container, Heading, Html, Preview, Section, Text } from '@react-email/components'

export type InquiryNotificationProps = {
  name: string
  phone: string
  email?: string | null
  preferredContactMethod: 'phone' | 'whatsapp' | 'email'
  service: string
  message?: string | null
  submittedAt: string
}

export function InquiryNotification({
  name,
  phone,
  email,
  preferredContactMethod,
  service,
  message,
  submittedAt,
}: InquiryNotificationProps) {
  return (
    <Html>
      <Preview>New Nusra website inquiry: {service}</Preview>
      <Body style={{ fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: '1.5', color: '#1b2633' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '24px' }}>
          <Heading style={{ fontSize: '20px', color: '#0f2b46' }}>
            New Nusra website inquiry: {service}
          </Heading>
          <Section style={{ marginTop: '16px' }}>
            <Text>
              <strong>Name:</strong> {name}
            </Text>
            <Text>
              <strong>Phone:</strong> {phone}
            </Text>
            {email ? (
              <Text>
                <strong>Email:</strong> {email}
              </Text>
            ) : null}
            <Text>
              <strong>Preferred contact method:</strong> {preferredContactMethod}
            </Text>
            <Text>
              <strong>Service:</strong> {service}
            </Text>
            <Text>
              <strong>Submitted:</strong> {new Date(submittedAt).toLocaleString()}
            </Text>
            {message ? (
              <Text>
                <strong>Message:</strong> {message}
              </Text>
            ) : null}
          </Section>
          <Text style={{ marginTop: '24px', fontSize: '13px', color: '#5c6672' }}>
            Reply to this inquiry from the Nusra CMS admin panel, or contact the visitor directly using the
            details above.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
