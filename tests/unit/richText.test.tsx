import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { RichTextContent } from '../../src/lib/content/richText'

const text = (value: string) => ({ type: 'text', text: value, version: 1 })
const item = (children: unknown[], extra = {}) => ({
  type: 'listitem', version: 1, children, ...extra,
})

// Match the generated blog lists without importing the database-writing script.
const list = (listType: string, children = [item([text('List entry')])], extra = {}) => ({
  type: 'list', version: 1, listType, start: 1,
  direction: null, format: '', indent: 0, children, ...extra,
})
const document = (...children: unknown[]) => ({
  root: { type: 'root', version: 1, direction: null, format: '', indent: 0, children },
})

function deepFreeze(value: unknown) {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(deepFreeze)
    Object.freeze(value)
  }
}

afterEach(cleanup)

describe('RichTextContent lists', () => {
  it.each([['bullet', 'ul'], ['number', 'ol']])(
    'renders legacy %s lists without a tag as %s',
    (listType, tag) => {
      const data = document(list(listType))
      const before = JSON.stringify(data)
      deepFreeze(data)
      const { container } = render(<RichTextContent data={data} />)
      expect(container.querySelector(`${tag}.list-${listType} > li`)?.textContent).toBe('List entry')
      expect(JSON.stringify(data)).toBe(before)
    },
  )

  it('renders nested legacy lists using the same fallback', () => {
    const data = document(list('bullet', [item([
      list('number', [item([text('Nested entry')])]),
    ])]))
    const { container } = render(<RichTextContent data={data} />)
    expect(container.querySelector('ul > li.nestedListItem > ol > li')?.textContent).toBe('Nested entry')
  })

  it.each(['ul', 'ol'])('preserves an explicit %s tag', (tag) => {
    const { container } = render(<RichTextContent data={document(list('number', undefined, { tag }))} />)
    expect(container.querySelector(`${tag}.list-number > li`)?.textContent).toBe('List entry')
  })

  it('preserves Payload checklist item semantics', () => {
    const data = document(list('check', [item([text('Checked entry')], { checked: true, value: 2 })], { tag: 'ul' }))
    const { container } = render(<RichTextContent data={data} />)
    const checkbox = container.querySelector('li[role="checkbox"]')
    expect(checkbox?.getAttribute('aria-checked')).toBe('true')
    expect(checkbox?.getAttribute('value')).toBe('2')
    expect(container.querySelector<HTMLInputElement>('input[type="checkbox"]')?.checked).toBe(true)
  })

  it('still renders paragraphs and empty content', () => {
    const { container, rerender } = render(<RichTextContent className="blog-content" data={document({
      type: 'paragraph', version: 1, children: [text('Paragraph content')],
    })} />)
    expect(container.querySelector('.blog-content p')?.textContent).toBe('Paragraph content')
    rerender(<RichTextContent data={null} />)
    expect(container.innerHTML).toBe('')
  })
})
