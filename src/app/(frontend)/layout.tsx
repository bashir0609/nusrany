import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileContactBar } from '@/components/layout/MobileContactBar'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { getPublishedServices, getSiteSettings } from '@/lib/content/queries'

// v1: render CMS content per request so published changes are visible on the
// next request and Local API reads are never frozen at build time.
export const dynamic = 'force-dynamic'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://nusrany.com'),
  description: 'Nusra Tax & Notary — tax preparation, notary, immigration forms, defensive driving and TLC transportation in Queens, NY.',
  title: {
    default: 'Nusra Tax & Notary | Queens, NY',
    template: '%s | Nusra Tax & Notary',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const settings = await getSiteSettings()
  const services = await getPublishedServices()

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <GoogleAnalytics />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header settings={settings} services={services} />
        <main id="main" className="min-h-screen">{children}</main>
        <Footer settings={settings} services={services} />
        <MobileContactBar settings={settings} />
      </body>
    </html>
  )
}
