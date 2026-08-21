type StatsStripSectionProps = { sinceYear?: string | null; serviceCount: number; languageCount: number }
type TrustIconName = 'clock' | 'check' | 'notary' | 'transport' | 'lock' | 'language'

type TrustItem = {
  title: string
  detail: string
  icon: TrustIconName
}

const trustItems: TrustItem[] = [
  { title: 'Since 2020', detail: 'Serving Queens families, drivers & small businesses', icon: 'clock' },
  { title: 'Authorized IRS e-file Provider', detail: 'PTIN-registered tax preparer', icon: 'check' },
  { title: 'Certified NY Notary Public', detail: 'Bonded · online notarization available', icon: 'notary' },
  { title: '24/7 TLC Transportation', detail: 'Licensed & insured · all five boroughs · wheelchair-accessible', icon: 'transport' },
  { title: 'Secure & confidential process', detail: 'Documents handled securely — no unsecured uploads', icon: 'lock' },
  { title: '5 languages spoken', detail: 'English · বাংলা · Español · हिंदी · Français', icon: 'language' },
]

function TrustIcon({ name }: { name: TrustIconName }) {
  const common = {
    className: 'h-6 w-6 shrink-0 text-brand-lime',
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
    viewBox: '0 0 24 24',
  }

  if (name === 'clock') {
    return <svg {...common} aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></svg>
  }

  if (name === 'check') {
    return <svg {...common} aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="m8 12 2.6 2.6L16.5 9" /></svg>
  }

  if (name === 'notary') {
    return <svg {...common} aria-hidden="true"><path d="M5 8.5h14v10H5z" /><path d="M8 8.5V6a4 4 0 0 1 8 0v2.5M8 13h8" /></svg>
  }

  if (name === 'transport') {
    return <svg {...common} aria-hidden="true"><rect x="3.5" y="5" width="17" height="11" rx="1.5" /><path d="M7 19h.01M17 19h.01M3.5 16h17M7 9h10" /></svg>
  }

  if (name === 'lock') {
    return <svg {...common} aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="1.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" /></svg>
  }

  return <svg {...common} aria-hidden="true"><circle cx="12" cy="8" r="3" /><path d="M5 20c.7-3.2 3.1-5 7-5s6.3 1.8 7 5M19 5.5a2.5 2.5 0 0 1 0 5M5 5.5a2.5 2.5 0 0 0 0 5" /></svg>
}

export function StatsStripSection({ sinceYear: _sinceYear, serviceCount: _serviceCount, languageCount: _languageCount }: StatsStripSectionProps) {
  return (
    <section className="border-y border-white/10 bg-brand-primary" aria-label="Nusra trust and credentials">
      <div className="container-nusra py-7 md:py-8">
        <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <TrustIcon name={item.icon} />
              <div className="min-w-0">
                <p className="text-sm font-bold leading-5 text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/65">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
