type ReferenceTrustSectionProps = { items: Array<{ title: string; description?: string | null }> }

const defaults = [
  ['Local & Trusted', 'Queens-based support'],
  ['Multilingual Support', 'Five languages'],
  ['Personalized Service', 'Clear next steps'],
  ['Convenient Location', 'Hollis office'],
  ['Certified & Bonded', 'Verified credentials'],
]

export function ReferenceTrustSection({ items }: ReferenceTrustSectionProps) {
  const cmsItems = items.map((item) => [item.title, item.description || 'Practical local support'])
  const trust = [...cmsItems, ...defaults].slice(0, 5)
  return <section className="bg-brand-primary py-9 text-white"><div className="container-nusra grid gap-6 sm:grid-cols-2 lg:grid-cols-5">{trust.map(([title, description]) => <div key={title} className="text-center"><span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-white/10 text-brand-lime">✓</span><p className="mt-3 text-sm font-bold text-white">{title}</p><p className="mt-1 text-xs text-white/60">{description}</p></div>)}</div></section>
}
