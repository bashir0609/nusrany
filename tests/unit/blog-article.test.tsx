import React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import BlogPostPage from '@/app/(frontend)/blog/[slug]/page'
import type { BlogPost, SiteSetting } from '@/payload-types'
import { getPostBySlug, getRelatedPosts, getSiteSettings } from '@/lib/content/queries'
import { getArticleEnhancements } from '@/lib/content/articleEnhancements'

vi.mock('@/lib/content/queries', () => ({
  getPostBySlug: vi.fn(),
  getRelatedPosts: vi.fn(),
  getSiteSettings: vi.fn(),
}))

vi.mock('next/headers', () => ({
  draftMode: vi.fn(async () => ({ isEnabled: false })),
}))

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => { throw new Error('Unexpected missing article') }),
}))

vi.mock('next/link', () => ({
  default: ({ children, ...props }: React.ComponentProps<'a'>) => <a {...props}>{children}</a>,
}))

const taxSlug = 'tax-preparation-jamaica-ny-expect'
const settings: SiteSetting = {
  id: 1,
  businessName: 'Nusra Tax & Notary',
  legalBusinessName: 'Nusra Tax & Notary',
  phone: '(718) 555-0100',
  whatsApp: '17185550100',
  publicEmail: 'office@example.com',
  inquiryNotificationEmail: 'office@example.com',
  street: '123 Test Street',
  city: 'Jamaica',
  state: 'NY',
  zip: '11432',
}

function makePost(slug: string): BlogPost {
  return {
    id: 1,
    title: 'Preparing for your appointment',
    slug,
    excerpt: 'Practical advice for your visit.',
    author: null,
    relatedServices: [],
    content: {
      root: {
        type: 'root', version: 1, direction: null, format: '', indent: 0,
        children: [{
          type: 'paragraph', version: 1,
          children: [{ type: 'text', version: 1, text: 'Article body content.' }],
        }],
      },
    },
    publishedAt: '2026-01-01T12:00:00.000Z',
    createdAt: '2026-01-01T12:00:00.000Z',
    updatedAt: '2026-01-02T12:00:00.000Z',
  }
}

async function renderArticle(slug = taxSlug) {
  vi.mocked(getPostBySlug).mockResolvedValue(makePost(slug))
  return render(await BlogPostPage({ params: Promise.resolve({ slug }) }))
}

function readSchemas(container: HTMLElement) {
  return Array.from(container.querySelectorAll('script[type="application/ld+json"]'),
    (script) => JSON.parse(script.textContent ?? 'null'))
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(getRelatedPosts).mockResolvedValue([])
  vi.mocked(getSiteSettings).mockResolvedValue(settings)
})

afterEach(cleanup)

describe('Blog article enhancements', () => {
  it('renders visible tax FAQ answers that exactly match the FAQ JSON-LD', async () => {
    const { container } = await renderArticle()
    const faqs = getArticleEnhancements(taxSlug)!.faqs
    expect(faqs.length).toBeGreaterThan(0)
    const section = screen.getByRole('region', { name: 'Frequently asked questions' })
    const details = Array.from(section.querySelectorAll('details'))
    expect(details).toHaveLength(faqs.length)

    const visibleFaqs = details.map((detail, index) => {
      expect(detail).toHaveAttribute('open')
      expect(within(detail).getByText(faqs[index].question, { selector: 'summary' })).toBeVisible()
      expect(within(detail).getByText(faqs[index].answer, { selector: 'p' })).toBeVisible()
      return {
        '@type': 'Question',
        name: detail.querySelector('summary')!.textContent,
        acceptedAnswer: { '@type': 'Answer', text: detail.querySelector('p')!.textContent },
      }
    })
    const schemas = readSchemas(container).filter((schema) => schema['@type'] === 'FAQPage')
    expect(schemas).toEqual([{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: visibleFaqs,
    }])
  })

  it('renders the editorial summary and internal next-step links', async () => {
    await renderArticle()
    const enhancements = getArticleEnhancements(taxSlug)!
    const summary = screen.getByRole('region', { name: 'At a glance' })
    expect(within(summary).getByText(enhancements.summary)).toBeVisible()
    expect(screen.getByText('Article body content.')).toBeVisible()

    const section = screen.getByRole('region', { name: 'Useful next steps' })
    const links = within(section).getAllByRole('link')
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/tax-preparation', '/business-services', '/contact',
    ])
    enhancements.links.forEach(({ title, description, href }, index) => {
      expect(links[index]).toHaveAttribute('href', href)
      expect(within(links[index]).getByText(title, { exact: false })).toBeVisible()
      expect(within(links[index]).getByText(description)).toBeVisible()
    })
    const nav = screen.getByRole('navigation', { name: 'On this page' })
    expect(within(nav).getByRole('link', { name: 'At a glance' })).toHaveAttribute('href', '#article-summary')
    expect(within(nav).getByRole('link', { name: 'Useful next steps' })).toHaveAttribute('href', '#article-links')
  })

  it('provides all enhancements for a future post with no related services', async () => {
    const slug = 'unrelated-community-update'
    const enhancements = getArticleEnhancements(slug, makePost(slug).excerpt)
    const { container } = await renderArticle(slug)
    const contact = screen.getByRole('region', { name: 'Have a question?' })
    expect(within(contact).getByRole('link', { name: 'Contact us' })).toBeVisible()
    expect(within(contact).getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', '/contact')
    const call = within(contact).getByRole('link', { name: `Call ${settings.phone}` })
    expect(call).toBeVisible()
    expect(call).toHaveAttribute('href', 'tel:7185550100')
    expect(screen.queryByRole('heading', { name: 'Related services' })).not.toBeInTheDocument()
    for (const name of ['At a glance', 'Frequently asked questions', 'Useful next steps']) {
      expect(screen.getByRole('region', { name })).toBeVisible()
      expect(screen.getByRole('link', { name })).toBeVisible()
    }
    const summary = screen.getByRole('region', { name: 'At a glance' })
    expect(within(summary).getByText(makePost(slug).excerpt)).toBeVisible()
    const links = screen.getByRole('region', { name: 'Useful next steps' })
    expect(within(links).getAllByRole('link').map((link) => link.getAttribute('href')))
      .toEqual(['/services', '/blog', '/contact'])
    const faq = screen.getByRole('region', { name: 'Frequently asked questions' })
    enhancements.faqs.forEach(({ question, answer }) => {
      expect(within(faq).getByText(question)).toBeVisible()
      expect(within(faq).getByText(answer)).toBeVisible()
    })
    expect(readSchemas(container).find((schema) => schema['@type'] === 'FAQPage').mainEntity)
      .toEqual(enhancements.faqs.map(({ question, answer }) => ({
        '@type': 'Question', name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })))
    expect(getPostBySlug).toHaveBeenCalledWith(slug, false)
  })

  it('provides a nonempty fallback summary when an excerpt is blank', () => {
    expect(getArticleEnhancements('new-post', '   ').summary.trim().length).toBeGreaterThan(0)
    expect(getArticleEnhancements('constructor').faqs.length).toBeGreaterThan(0)
  })

  it('uses Organization for the business fallback author in the rendered Article schema', async () => {
    const { container } = await renderArticle()
    const articles = readSchemas(container).filter((schema) => schema['@type'] === 'Article')
    expect(articles).toHaveLength(1)
    expect(articles[0].author).toEqual({
      '@type': 'Organization',
      name: settings.businessName,
    })
  })
})
