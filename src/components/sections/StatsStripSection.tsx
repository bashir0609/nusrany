type StatsStripSectionProps = { sinceYear?: string | null; serviceCount: number; languageCount: number }

const trustItems = [
  { text: 'Since 2020', emphasis: true },
  { text: 'Serving Queens families, drivers & small businesses', emphasis: true },
  { text: 'Authorized IRS e-file Provider' },
  { text: 'PTIN-registered tax preparer' },
  { text: 'Certified NY Notary Public' },
  { text: 'Bonded · online notarization available' },
  { text: '24/7 TLC Transportation' },
  { text: 'Licensed & insured · all five boroughs · wheelchair-accessible' },
  { text: 'Secure & confidential process' },
  { text: 'Documents handled securely — no unsecured uploads' },
  { text: '5 languages spoken' },
  { text: 'English · বাংলা · Español · हिंदी · Français' },
]

export function StatsStripSection({ sinceYear: _sinceYear, serviceCount: _serviceCount, languageCount: _languageCount }: StatsStripSectionProps) {
  return (
    <section className="bg-brand-primary text-white" aria-label="Nusra trust and credentials">
      <div className="container-nusra py-7 md:py-8">
        <p className="mb-5 text-center text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-lime">Trusted local support</p>
        <div className="grid gap-x-8 gap-y-4 text-center sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item.text} className="flex min-h-10 items-center justify-center border-b border-white/10 px-2 pb-3 last:border-b-0 sm:last:border-b sm:nth-[3n]:border-b-0 lg:last:border-b lg:nth-[3n]:border-b-0">
              <p className={`text-xs leading-5 ${item.emphasis ? 'font-extrabold text-white' : 'font-semibold text-white/80'}`}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
