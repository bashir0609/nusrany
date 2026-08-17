import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { BlogCategories } from './collections/BlogCategories'
import { BlogPosts } from './collections/BlogPosts'
import { FAQs } from './collections/FAQs'
import { Inquiries } from './collections/Inquiries'
import { Media } from './collections/Media'
import { Reviews } from './collections/Reviews'
import { Services } from './collections/Services'
import { TeamMembers } from './collections/TeamMembers'
import { Users } from './collections/Users'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { Homepage } from './globals/Homepage'
import { LegalContent } from './globals/LegalContent'
import { SiteSettings } from './globals/SiteSettings'
import { env } from './lib/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Nusra CMS',
    },
  },
  collections: [Users, Media, Services, TeamMembers, BlogCategories, BlogPosts, Reviews, FAQs, Inquiries],
  globals: [SiteSettings, Homepage, AboutPage, ContactPage, LegalContent],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  serverURL: env.SITE_URL,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  sharp,
  upload: {
    abortOnLimit: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  },
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      clientUploads: true,
      token: env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
