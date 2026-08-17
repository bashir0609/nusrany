'use client'

import { useState } from 'react'

type FaqItem = {
  question: string
  answer: string
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-border rounded-[var(--radius-card)] border border-border bg-surface">
      {items.map((item, index) => {
        const open = openIndex === index
        const panelId = `faq-panel-${index}`
        const buttonId = `faq-button-${index}`
        return (
          <div key={item.question}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink hover:text-brand-secondary"
              >
                {item.question}
                <span aria-hidden="true" className={`text-brand-secondary transition-transform ${open ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="px-5 pb-5 text-muted"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
