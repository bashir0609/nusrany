'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Google Analytics 4 (gtag.js). Renders nothing when NEXT_PUBLIC_GA_ID is
 * unset, so local/CI environments and non-Analytics deployments stay clean.
 * Page-view tracking is only enabled when an ID is configured.
 */
export function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!GA_ID) return
    window.gtag?.('config', GA_ID, { page_path: pathname })
  }, [pathname])

  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
