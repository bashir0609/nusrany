import dotenv from 'dotenv'; dotenv.config({ path: '.env' }); dotenv.config({ path: '.env.local' });
import { getPayload } from 'payload'


async function main() {
  const { default: config } = await import('@payload-config')
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'blog-posts',
    where: {},
    limit: 100,
    draft: true,
  })

  console.log(`Found ${posts.totalDocs} blog post(s)`)

  for (const post of posts.docs) {
    console.log(`  Post: "${post.title}" — slug: ${post.slug} — status: ${post._status}`)
    if (post._status !== 'published') {
      await payload.update({
        collection: 'blog-posts',
        id: post.id,
        data: { _status: 'published' },
      })
      console.log(`  → Published: ${post.title}`)
    }
  }

  await payload.destroy()
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
