import { NextRequest, NextResponse } from 'next/server'

const MARKDOWN_CONTENT: Record<string, { title: string; description: string; content: string }> = {
  '/': {
    title: 'Nusra Tax & Notary',
    description: 'Professional tax preparation, notary services, immigration form assistance, defensive driving, and business services for Queens, NY.',
    content: `# Nusra Tax & Notary

Professional tax preparation, notary services, immigration form assistance, defensive driving, and business services for Queens, NY and surrounding communities.

## Services

- **Tax Preparation** — Professional tax filing for individuals and businesses
- **Notary Services** — Certified NY Notary Public, online notarization available
- **Immigration Form Assistance** — Help with immigration paperwork and forms
- **Defensive Driving** — Approved defensive driving courses
- **TLC Transportation** — TLC license and transportation services
- **Business Services** — Corporation setup and business assistance

## Contact

- **Phone**: (347) 582-3475
- **Address**: 150-15 Hillside Avenue, Jamaica, NY 11432
- **Website**: https://www.nusrany.com

## Hours

Call for current availability. Walk-ins welcome.
`,
  },
}

function generateMarkdown(path: string): string | null {
  const page = MARKDOWN_CONTENT[path]
  if (!page) return null

  return `---\ntitle: ${page.title}\ndescription: ${page.description}\n---\n\n${page.content}`
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const acceptHeader = request.headers.get('accept') || ''
  const formatParam = request.nextUrl.searchParams.get('format')

  // Check if client requested markdown via Accept header or ?format=md
  const wantsMarkdown =
    acceptHeader.includes('text/markdown') ||
    acceptHeader.includes('text/plain') ||
    formatParam === 'md' ||
    formatParam === 'markdown'

  if (wantsMarkdown && MARKDOWN_CONTENT[pathname]) {
    const markdown = generateMarkdown(pathname)
    if (markdown) {
      return new NextResponse(markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/about',
    '/services',
    '/team',
    '/contact',
    '/blog',
  ],
}
