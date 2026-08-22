import type { CollectionConfig } from 'payload'
import { denyPublicInquiryCreate, inquiryAdminOnly } from '../access/inquiries'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    group: 'Business',
    defaultColumns: ['name', 'serviceLabelSnapshot', 'preferredContactMethod', 'submittedAt', 'status', 'notificationEmailStatus'],
    description:
      'Contact-request inquiries submitted through the public form. Do not enter Social Security numbers, passport numbers, tax documents, immigration documents, banking details, or other highly sensitive personal information here.',
  },
  access: {
    create: denyPublicInquiryCreate,
    read: inquiryAdminOnly,
    update: inquiryAdminOnly,
    delete: inquiryAdminOnly,
  },
  defaultSort: '-submittedAt',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
      index: true,
    },
    {
      name: 'serviceLabelSnapshot',
      type: 'text',
      admin: {
        description: 'Service title at the time of submission.',
        readOnly: true,
      },
    },
    {
      name: 'preferredContactMethod',
      type: 'select',
      required: true,
      options: [
        { label: 'Phone', value: 'phone' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Email', value: 'email' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      admin: {
        description: 'Optional message. Warns visitors not to send sensitive information.',
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      required: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'Server-controlled submission timestamp.',
      },
    },
    {
      name: 'consentAt',
      type: 'date',
      required: true,
      admin: {
        readOnly: true,
        description: 'Server-controlled consent timestamp.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'New',
      required: true,
      options: [
        { label: 'New', value: 'New' },
        { label: 'Contacted', value: 'Contacted' },
        { label: 'Closed', value: 'Closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notificationEmailStatus',
      type: 'select',
      defaultValue: 'Pending',
      required: true,
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Sent', value: 'Sent' },
        { label: 'Failed', value: 'Failed' },
      ],
      admin: {
        readOnly: true,
        description: 'Server-controlled notification status.',
      },
    },
    {
      name: 'notificationError',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
        description: 'Sanitized provider error when the notification email failed.',
      },
      access: {
        read: () => false,
      },
    },
    {
      name: 'rateLimitFingerprint',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        hidden: true,
        description: 'HMAC fingerprint used for rate limiting. Never contains a raw IP address.',
      },
      access: {
        read: () => false,
      },
    },
  ],
}
