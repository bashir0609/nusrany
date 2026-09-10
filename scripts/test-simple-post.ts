import dotenv from 'dotenv'; dotenv.config({ path: '.env' }); dotenv.config({ path: '.env.local' });
import { getPayload } from 'payload'
import config from '../src/payload.config'

// Import type-safe rich text helpers from the fixed create-blog-posts script
import { text, paragraph, heading, bulletList, orderedList, richText } from './create-blog-posts'

async function main() {
  const payload = await getPayload({ config })

  const taxCat = await payload.find({ collection: 'blog-categories', where: { slug: { equals: 'tax' } }, limit: 1 })
  const taxId = taxCat.docs[0]?.id

  const existing = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: 'test-simple-post' } },
    limit: 1,
    draft: true,
  })

  if (existing.totalDocs === 0) {
    const created = await payload.create({
      collection: 'blog-posts',
      data: {
        title: 'Test Simple Post',
        slug: 'test-simple-post',
        excerpt: 'A simple test post to verify blog rendering.',
        category: taxId,
        publishedAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
        content: richText(
          paragraph('This is a simple test blog post.')
        ),
        seo: {
          title: 'Test Simple Post | Nusra',
          description: 'A simple test post.',
        },
      },
    })
    console.log(`Created: ${created.title} (id: ${created.id})`)
    await payload.update({
      collection: 'blog-posts',
      id: created.id,
      data: { _status: 'published' },
    })
    console.log('Published: test-simple-post')
  } else {
    console.log('Already exists: test-simple-post')
  }

  await payload.destroy()
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
