import type { Access } from 'payload'

export const inquiryAdminOnly: Access = ({ req }) => Boolean(req.user)

export const denyPublicInquiryCreate: Access = () => false
