'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type ServicesNavProps = {
  services: Array<{ title: string; slug: string }>
}

export function ServicesNav({ services }: ServicesNavProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function cancelClose() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  function scheduleClose() {
    cancelClose()
    closeTimerRef.current = setTimeout(() => {
      setOpen(false)
      closeTimerRef.current = null
    }, 250)
  }

  useEffect(() => {
    return () => cancelClose()
  }, [])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative" onMouseEnter={() => { cancelClose(); setOpen(true) }} onMouseLeave={scheduleClose}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => { cancelClose(); setOpen((value) => !value) }}
        className="flex items-center gap-1 rounded-sm px-2.5 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
      >
        Services
        <span aria-hidden="true" className={`text-[0.65rem] transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open ? (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[34rem] -translate-x-1/2 rounded-[var(--radius-card)] border border-border bg-white p-4 shadow-[0_24px_70px_rgba(15,43,70,0.16)]" role="menu">
          <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
            <div>
              <p className="eyebrow">What we do</p>
              <p className="mt-1 text-sm text-muted">Practical support for Queens families and businesses.</p>
            </div>
            <Link href="/services" role="menuitem" onClick={() => setOpen(false)} className="text-sm font-bold text-brand-secondary hover:text-brand-primary">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="group rounded-[var(--radius-card-sm)] border border-transparent px-3 py-3 transition hover:border-brand-secondary/20 hover:bg-surface-tint"
              >
                <span className="block text-sm font-bold text-brand-primary group-hover:text-brand-secondary">{service.title}</span>
                <span className="mt-1 block text-xs text-muted">Explore service →</span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
