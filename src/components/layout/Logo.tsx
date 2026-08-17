import Link from 'next/link'
import { useId } from 'react'

function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  const gradientId = useId()
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f2b46" />
          <stop offset="1" stopColor="#12707a" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="61" height="61" rx="17" fill={`url(#${gradientId})`} />
      <g fill="none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 47 V17" stroke="#ffffff" />
        <path d="M19 17 L45 47" stroke="#ffffff" />
        <path d="M45 17 V47" stroke="#e8922a" />
      </g>
    </svg>
  )
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Nusra Tax & Notary — home">
      <LogoMark />
      <span className="leading-tight">
        <span className={`block text-lg font-extrabold tracking-tight ${dark ? 'text-white' : 'text-brand-primary'}`}>
          Nusra Tax &amp; Notary
        </span>
        <span className={`block text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-white/70' : 'text-muted'}`}>
          Tax · Notary · Immigration · TLC
        </span>
      </span>
    </Link>
  )
}
