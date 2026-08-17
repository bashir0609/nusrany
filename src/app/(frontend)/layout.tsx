import React from 'react'
import '@/styles/globals.css'

// v1: render CMS content per request so published changes are visible on the
// next request and Local API reads are never frozen at build time.
export const dynamic = 'force-dynamic'

export const metadata = {
  description: 'Nusra Tax & Notary — tax preparation, notary, immigration forms and more in Queens, NY.',
  title: 'Nusra Tax & Notary',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
