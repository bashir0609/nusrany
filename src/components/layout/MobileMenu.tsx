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
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-brand-primary transition hover:bg-surface-tint lg:hidden"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[76px] z-[60] h-[calc(100dvh-76px)] max-h-[calc(100dvh-76px)] overflow-y-auto overscroll-contain bg-white px-5 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-5 shadow-2xl lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="mx-auto max-w-xl">
            <div className="mb-5 rounded-[var(--radius-card)] bg-brand-primary p-5 text-white">
              <p className="eyebrow text-brand-lime">Nusra Tax &amp; Notary</p>
              <p className="mt-2 text-sm leading-6 text-white/75">Professional expertise with multilingual local support.</p>
            </div>
            <ul className="divide-y divide-border">
              <li>
                <Link ref={firstLinkRef} href="/" onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold text-ink">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#why-us" onClick={() => setOpen(false)} className="block py-4 text-lg font-bold text-brand-primary">
                  Why Us
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
                <Link href="/#team" onClick={() => setOpen(false)} className="block py-4 text-lg font-bold text-brand-primary">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/#reviews" onClick={() => setOpen(false)} className="block py-4 text-lg font-bold text-brand-primary">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/#faq" onClick={() => setOpen(false)} className="block py-4 text-lg font-bold text-brand-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#location" onClick={() => setOpen(false)} className="block py-4 text-lg font-bold text-brand-primary">
                  Location
                </Link>
              </li>
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <a
                href={buildTelHref(phone)}
                className="premium-button premium-button-primary"
              >
                <PhoneIcon className="h-5 w-5" aria-hidden="true" /> Call Now
              </a>
              <a
                href={buildWhatsAppHref(whatsApp)}
                className="premium-button bg-[#1f7a3d] text-white hover:bg-[#175e2f]"
              >
                <WhatsAppIcon className="h-5 w-5" aria-hidden="true" /> WhatsApp
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="premium-button premium-button-secondary"
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
