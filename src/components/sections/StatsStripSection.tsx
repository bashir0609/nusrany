type StatsStripSectionProps = { sinceYear?: string | null; serviceCount: number; languageCount: number }

export function StatsStripSection({ sinceYear, serviceCount, languageCount }: StatsStripSectionProps) {
  const stats = [
    { value: sinceYear ? `${Math.max(1, new Date().getFullYear() - Number(sinceYear))}+` : '10+', label: 'Years of Experience' },
    { value: '5,000+', label: 'People Helped' },
    { value: `${Math.max(serviceCount, 6)}+`, label: 'Services Offered' },
    { value: String(Math.max(languageCount, 4)), label: 'Languages Supported' },
  ]
  return (
    <section className="bg-brand-primary text-white">
      <div className="container-nusra grid grid-cols-2 divide-x divide-white/15 py-5 md:grid-cols-4">
        {stats.map((stat) => <div key={stat.label} className="px-3 text-center first:pl-0 last:pr-0 md:px-6"><p className="text-xl font-extrabold tracking-tight text-white md:text-2xl">{stat.value}</p><p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white/65 md:text-xs">{stat.label}</p></div>)}
      </div>
    </section>
  )
}
