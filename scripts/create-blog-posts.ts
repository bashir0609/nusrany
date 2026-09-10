import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

// Type definitions for Payload's Lexical rich text
export type TextNode = { type: 'text'; text: string; version: 1 };
export type ParagraphNode = { type: 'paragraph'; version: 1; direction: null; format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'; indent: 0; children: TextNode[] };
export type HeadingNode = { type: 'heading'; version: 1; tag: 'h1' | 'h2' | 'h3'; direction: null; format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'; indent: 0; children: TextNode[] };
export type ListNode = { type: 'list'; version: 1; tag: 'ul' | 'ol'; listType: 'bullet' | 'number'; start: 1; direction: null; format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'; indent: 0; children: { type: 'listitem'; version: 1; children: TextNode[] }[] };
export type ListItemNode = { type: 'listitem'; version: 1; children: TextNode[] };

type BlockNode = ParagraphNode | HeadingNode | ListNode | ListItemNode;

export type RichTextContent = {
  type: 'root';
  version: 1;
  direction: null;
  format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify';
  indent: 0;
  children: BlockNode[];
};

export function text(content: string): TextNode {
  return { type: 'text', text: content, version: 1 };
}

export function paragraph(children: TextNode[] | string): ParagraphNode {
  return {
    type: 'paragraph',
    version: 1,
    direction: null,
    format: '',
    indent: 0,
    children: Array.isArray(children) ? children : [text(children)],
  };
}

export function heading(children: TextNode[] | string, level: 'h1' | 'h2' | 'h3' = 'h2'): HeadingNode {
  return {
    type: 'heading',
    version: 1,
    tag: level,
    direction: null,
    format: '',
    indent: 0,
    children: Array.isArray(children) ? children : [text(children)],
  };
}

export function bulletList(items: string[]): ListNode {
  return {
    type: 'list',
    version: 1,
    listType: 'bullet',
    tag: 'ul',
    start: 1,
    direction: null,
    format: '',
    indent: 0,
    children: items.map((item) => ({
      type: 'listitem',
      version: 1,
      children: [text(item)],
    })),
  };
}

export function orderedList(items: string[]): ListNode {
  return {
    type: 'list',
    version: 1,
    listType: 'number',
    tag: 'ol',
    start: 1,
    direction: null,
    format: '',
    indent: 0,
    children: items.map((item) => ({
      type: 'listitem',
      version: 1,
      children: [text(item)],
    })),
  };
}

export function richText(...blocks: BlockNode[]): {
  root: RichTextContent;
} {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: null,
      format: '',
      indent: 0,
      children: blocks,
    },
  };
}

async function main() {
  const payload = await getPayload({ config })

  const notaryCat = await payload.find({ collection: 'blog-categories', where: { slug: { equals: 'notary' } }, limit: 1 })
  const taxCat = await payload.find({ collection: 'blog-categories', where: { slug: { equals: 'tax' } }, limit: 1 })

  const notaryId = notaryCat.docs[0]?.id
  const taxId = taxCat.docs[0]?.id

  const posts = [
    {
      title: 'Simple Test Blog Post',
      slug: 'simple-test-post',
      excerpt:
        'This is a simple test blog post to verify the content structure works correctly.',
      category: notaryId,
      publishedAt: new Date('2026-08-25T10:00:00.000Z'),
      seo: {
        title: 'Simple Test Blog Post | Nusra',
        description:
          'Simple test blog post for verifying the rich text content structure.',
      },
      content: richText(
        heading('Test Heading'),
        paragraph('This is a simple paragraph to test the rich text structure.'),
        paragraph('If this loads correctly in the frontend, then the content structure is working.')
      ),
    },
    {
      title: 'Tax Preparation Services in Jamaica, NY: What to Expect When You Visit Nusra Tax & Notary',
      slug: 'tax-preparation-jamaica-ny-expect',
      excerpt:
        'Planning your visit to our Jamaica, Queens tax office? Here is what to expect — from documents to bring to how we file your return — so you can prepare with confidence.',
      category: taxId,
      publishedAt: new Date('2026-08-26T10:00:00.000Z'),
      seo: {
        title: 'Tax Preparation Jamaica NY | Nusra Tax & Notary',
        description:
          'Planning your visit to our Jamaica, Queens tax office? Here is what to expect from documents to bring to filing. Schedule your appointment today.',
      },
      content: richText(
        heading('Why Choose a Local Tax Preparer in Jamaica, Queens?'),
        paragraph(
          'Taxes in New York are complex — especially if you are a small business owner, have rental property, or filed for an extension. While "tax preparer" services are available everywhere, a local expert who understands Queens-specific rules and exemptions can make a real difference in your refund.'
        ),
        paragraph(
          'At Nusra Tax & Notary, we have served the Jamaica, Hollis, and greater Queens community since 2015. We handle individual returns, small business taxes, LLC filings, and more.'
        ),
        heading('What to Bring to Your Tax Preparation Appointment'),
        paragraph('To maximize your refund and avoid delays, bring the following:'),
        bulletList([
          'Photo ID (driver license, state ID, or passport)',
          'Social Security cards for you, your spouse, and all dependents',
          'Prior-year tax return (if available)',
          'All W-2s and 1099s received this year',
          'Receipts for charitable donations, medical expenses, or business expenses',
          'Proof of residency (utility bill, lease agreement, etc.)',
          'Bank account information (routing + account number) for direct deposit',
        ]),
        paragraph('If you are self-employed or have rental income, please also bring:'),
        bulletList([
          'Profit and loss statement (Schedule C)',
          'Mileage log or vehicle expense records',
          '1099-NEC, 1099-K, 1099-MISC forms',
          'Rental income and expense records',
        ]),
        heading('What to Expect During Your Appointment'),
        paragraph(
          'A typical tax preparation appointment with us takes 45–90 minutes, depending on complexity. Here is what happens step by step:'
        ),
        orderedList([
          'Initial consultation — we review your documents and identify all eligible deductions and credits',
          'Data entry — we input your information into professional tax software',
          'Review — we walk you through the return line by line before filing',
          'Filing — we electronically file your return (federal + NY state) and send you copies within 24 hours',
          'Follow-up — we monitor for any IRS requests or updates',
        ]),
        heading('Our Tax Services for Queens Residents'),
        paragraph('We specialize in the following tax services for individuals and small businesses in Queens:'),
        bulletList([
          'Federal and New York State individual tax returns (Form 1040 + IT-201)',
          'Small business and LLC tax returns (Form 1065, 1120, 1120S)',
          'Not-for-profit returns (Form 990)',
          'Taxpayer resolution and IRS notice response',
          'Amended returns (Forms 1040-X, IT-201-X)',
          'Estate and trust tax returns (Forms 1041, IT-205)',
        ]),
        heading('Pricing and Timeline'),
        paragraph(
          'Our pricing is transparent and starts at $125 for simple individual returns. Complex returns (business, rental, multiple properties) start at $250. Most returns are completed in 2–3 business days. Need it faster? Ask about our rush service.'
        ),
        heading('Schedule Your Tax Appointment in Jamaica, Queens'),
        paragraph(
          'We are located at 90-54 204th Street in Hollis, Queens — just minutes from downtown Jamaica. We are open Monday–Saturday, 9 AM–7 PM. Call us at (347) 786-1471 or book online to schedule your appointment.'
        ),
      ),
    },
  ]

  for (const post of posts) {
    const existing = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      const created = await payload.create({
        collection: 'blog-posts',
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          category: post.category,
          publishedAt: post.publishedAt.toISOString(),
          content: post.content,
          seo: post.seo,
        },
      })
      console.log(`Created: ${created.title} (slug: ${created.slug})`)
      // Update status to published like in test-simple-post.ts
      await payload.update({
        collection: 'blog-posts',
        id: created.id,
        data: { _status: 'published' },
      })
      console.log(`Published: ${created.title}`)
    } else {
      console.log(`Already exists: ${post.title}`)
    }
  }

  await payload.destroy()
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})