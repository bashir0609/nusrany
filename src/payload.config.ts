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
// payload.config.ts runs during `next build` where env vars may not be
// fully available yet. Use process.env directly — the Zod-validated getEnv()
// is used by API routes and server code at runtime.

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function normalizeDatabaseUrl(connectionString: string) {
  if (!connectionString) return connectionString

  try {
    const url = new URL(connectionString)
    const sslMode = url.searchParams.get('sslmode')

    if (sslMode === 'prefer' || sslMode === 'verify-ca') {
      url.searchParams.set('sslmode', 'verify-full')
    } else if (sslMode === 'require') {
      // Preserve the current `require` behavior while opting into the
      // compatibility path before pg-connection-string changes defaults.
      url.searchParams.set('uselibpqcompat', 'true')
    }

    return url.toString()
  } catch {
    return connectionString
  }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Nusra CMS',
    },
    components: {
      beforeNavLinks: ['./components/admin/DashboardNavLink'],
      beforeDashboard: ['./components/admin/WelcomeDashboard'],
    },
  },
  collections: [Users, Media, Services, TeamMembers, BlogCategories, BlogPosts, Reviews, FAQs, Inquiries],
  globals: [SiteSettings, Homepage, AboutPage, ContactPage, LegalContent],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.SITE_URL || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: normalizeDatabaseUrl(process.env.DATABASE_URL || ''),
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
      // Always register the adapter. Vercel injects the encrypted token at
      // runtime; conditional registration can otherwise leave Payload trying
      // to write uploads to the read-only serverless filesystem.
      enabled: true,
      collections: {
        media: true,
      },
      clientUploads: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
