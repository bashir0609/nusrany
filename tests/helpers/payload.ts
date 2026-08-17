import { getPayload } from 'payload'
import config from '../../src/payload.config.ts'

/**
 * Test-only Payload accessor. Uses a relative import of the Payload config
 * instead of `@/lib/payload/getPayload` (which imports `server-only` and is
 * intended for the Next.js server runtime).
 */
export async function getTestCms() {
  return getPayload({ config })
}
