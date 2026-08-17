import 'server-only'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function getCms() {
  return getPayload({ config })
}
