import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const ALLOWED_AUTHORS = [
  'Christ Louis',
  'Nyla Mccalla',
  'Colin Fredericks jr',
  'Latoya Ashman',
  'Tyrone Hargobin',
  'Margalie Legerme',
]

async function main() {
  const payload = await getPayload({ config })
  const all = await payload.find({
    collection: 'reviews',
    overrideAccess: true,
    limit: 100,
  })

  let deleted = 0
  for (const doc of all.docs) {
    if (!ALLOWED_AUTHORS.includes(doc.authorName as string)) {
      await payload.delete({ collection: 'reviews', id: doc.id, overrideAccess: true })
      console.log(`Deleted review: ${doc.authorName} (${doc.id})`)
      deleted++
    }
  }

  console.log(`\nCleanup complete: deleted ${deleted} stale reviews`)
  process.exit(0)
}

main().catch((error) => {
  console.error('Cleanup failed:', error)
  process.exit(1)
})
