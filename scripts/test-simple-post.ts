import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

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
        content: {
          root: {
            type: 'root',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'This is a simple test blog post.',
                    style: '',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                  },
                ],
              },
            ],
          },
        },
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
