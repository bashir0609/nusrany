import dotenv from 'dotenv'; dotenv.config({ path: '.env' }); dotenv.config({ path: '.env.local' });
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@nusrany.com' } },
    limit: 100,
  })

  console.log(`Found ${existing.totalDocs} user(s)`)

  if (existing.totalDocs === 0) {
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@nusrany.com',
        password: 'nusra-local-admin-password-2026',
        name: 'Admin',
      },
    })
    console.log(`Created user: ${user.email} (id: ${user.id})`)
  } else {
    console.log(`User already exists: ${existing.docs[0].email}`)
  }

  // Delete the test post
  const testPost = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: 'test-simple-post' } },
    limit: 1,
    draft: true,
  })
  if (testPost.totalDocs > 0) {
    await payload.delete({ collection: 'blog-posts', id: testPost.docs[0].id })
    console.log('Deleted test-simple-post')
  }

  await payload.destroy()
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
