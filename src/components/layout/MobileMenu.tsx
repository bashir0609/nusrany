'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { buildTelHref, buildWhatsAppHref } from '@/lib/site/contactLinks'
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'

type MobileMenuProps = {
  services: Array<{ title: string; slug: string }>
  phone: string
  whatsApp: string
}

export function MobileMenu({ services, phone, whatsApp }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface-warm md:hidden"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[72px] bottom-0 z-50 overflow-y-auto bg-surface px-4 pb-24 pt-4 md:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="divide-y divide-border">
              <li>
                <Link ref={firstLinkRef} href="/" onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold text-ink">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold text-ink">
                  About
                </Link>
              </li>
              <li>
                <p className="pt-3 text-sm font-bold uppercase tracking-wide text-muted">Services</p>
                <ul className="pb-2">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link href={`/${service.slug}`} onClick={() => setOpen(false)} className="block py-2 text-base text-ink">
                        {service.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/services" onClick={() => setOpen(false)} className="block py-2 font-semibold text-brand-secondary">
                      All services
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/team" onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold text-ink">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/blog" onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold text-ink">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold text-ink">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={buildTelHref(phone)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 font-semibold text-white"
              >
                <PhoneIcon className="h-5 w-5" aria-hidden="true" /> Call Now
              </a>
              <a
                href={buildWhatsAppHref(whatsApp)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1f7a3d] px-6 py-3 font-semibold text-white"
              >
                <WhatsAppIcon className="h-5 w-5" aria-hidden="true" /> WhatsApp
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-primary px-6 py-3 font-semibold text-brand-primary"
              >
                Request Assistance
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  )
}
