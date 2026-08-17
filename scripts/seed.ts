import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedBaselineContent } from '../src/seed/baselineContent'

async function main() {
  const payload = await getPayload({ config })
  const result = await seedBaselineContent(payload)
  console.log(
    `Seed complete: ${result.services} services, ${result.teamMembers} team members, ` +
      `${result.blogCategories} blog categories, ${result.faqs} FAQs, ` +
      `globals: ${result.globals.join(', ')}` +
      (result.adminCreated ? ', admin user created' : ''),
  )
  process.exit(0)
}

main().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
