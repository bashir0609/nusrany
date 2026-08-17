import Link from 'next/link'

type ServiceCardProps = {
  title: string
  description: string
  href: string
}

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="card group flex h-full flex-col p-6 transition-colors hover:border-brand-teal"
    >
      <h3 className="text-lg font-bold text-brand-primary group-hover:text-brand-secondary">
        {title}
      </h3>
      <p className="mt-2 text-muted">{description}</p>
      <span className="mt-4 font-semibold text-brand-secondary" aria-hidden="true">
        Learn more →
      </span>
    </Link>
  )
}
