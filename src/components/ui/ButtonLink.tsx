import type { ReactNode } from 'react'

type ButtonLinkProps = {
  href: string
  variant?: 'primary' | 'secondary' | 'whatsapp'
  external?: boolean
  children: ReactNode
  className?: string
  'aria-label'?: string
}

const variants = {
  primary: 'bg-brand-primary text-white hover:bg-brand-secondary',
  secondary: 'bg-white text-brand-primary border border-brand-primary hover:bg-surface-warm',
  whatsapp: 'bg-[#1f7a3d] text-white hover:bg-[#175e2f]',
}

export function ButtonLink({
  href,
  variant = 'primary',
  external = false,
  children,
  className = '',
  ...rest
}: ButtonLinkProps) {
  const rel = external ? 'noopener noreferrer' : undefined
  return (
    <a
      href={href}
      rel={rel}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-colors ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
