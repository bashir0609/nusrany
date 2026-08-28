import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import type { Redirect } from 'next/dist/lib/load-custom-routes'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const legacyRedirects: Redirect[] = [
  // Canonical host: redirect apex to www
  {
    source: '/:path*',
    has: [
      {
        type: 'host' as const,
        value: 'nusrany.com',
      },
    ],
    destination: 'https://www.nusrany.com/:path*',
    permanent: true,
  },
  { source: '/about-us', destination: '/about', permanent: true },
  { source: '/make-appoinment', destination: '/contact', permanent: true },
  { source: '/setting-up-corporations', destination: '/business-services', permanent: true },
  { source: '/community-services', destination: '/services', permanent: true },
  { source: '/us-visit-visa', destination: '/immigration-form-assistance', permanent: true },
  { source: '/student-visa', destination: '/immigration-form-assistance', permanent: true },
  { source: '/2023-income-tax-brackets', destination: '/tax-preparation', permanent: true },
  // Additional meaningful legacy URLs from the audit (docs/01, docs/06).
  { source: '/font-page', destination: '/about', permanent: true },
  { source: '/individual-tax-services', destination: '/tax-preparation', permanent: true },
  { source: '/immigration-services', destination: '/immigration-form-assistance', permanent: true },
  { source: '/tlc-car-rentals', destination: '/tlc-transportation', permanent: true },
  { source: '/ddc-class-for-drivers', destination: '/defensive-driving', permanent: true },
  { source: '/features', destination: '/', permanent: true },
  { source: '/pricing', destination: '/contact', permanent: true },
]

const nextConfig: NextConfig = {
  redirects: async () => legacyRedirects,
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/images/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value: '<https://www.nusrany.com/.well-known/api-catalog.json>; rel="api-catalog"',
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
