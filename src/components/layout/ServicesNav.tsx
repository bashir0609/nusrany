'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type ServicesNavProps = {
  services: Array<{ title: string; slug: string }>
}

export function ServicesNav({ services }: ServicesNavProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [open])

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <div ref={rootRef} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-full px-3 py-2 font-medium text-ink hover:text-brand-secondary"
      >
        Services
        <span aria-hidden="true" className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>
      {open ? (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-72 rounded-[var(--radius-card)] border border-border bg-surface p-2 shadow-lg"
          role="menu"
        >
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-surface-warm hover:text-brand-secondary"
            >
              {service.title}
            </Link>
          ))}
          <Link
            href="/services"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-lg border-t border-border px-3 py-2 text-sm font-semibold text-brand-secondary hover:bg-surface-warm"
          >
            All services
          </Link>
        </div>
      ) : null}
    </div>
  )
}
