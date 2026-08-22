import type { SiteSetting } from '@/payload-types'

type StatsStripSectionProps = { settings: SiteSetting }

export function StatsStripSection({ settings }: StatsStripSectionProps) {
  const servingTitle = `Serving Queens Since ${settings.sinceYear || '2020'}`
  const credentials = (settings.verifiedCredentialLabels ?? []).map((item) => item.label).filter((label): label is string => Boolean(label) && label !== servingTitle)
  const languages = (settings.languages ?? []).map((item) => item.label).filter(Boolean)
  const items = [
    { title: servingTitle, detail: 'A local office for families and businesses.' },
    ...(credentials.length > 0 ? credentials.map((label) => ({ title: label, detail: 'Verified professional credential.' })) : [
      { title: 'Authorized IRS e-file Provider', detail: 'Professional tax filing support.' },
      { title: 'PTIN Registered Tax Preparer', detail: 'Careful, documented tax assistance.' },
      { title: 'Certified NY Notary Public', detail: 'Reliable document notarization.' },
    ]),
    { title: `${languages.length || 5} Languages Spoken`, detail: languages.length > 0 ? languages.join(' · ') : 'English · বাংলা · Español · हिंदी · Français' },
  ]

  return (
    <section className="border-y border-white/10 bg-brand-primary" aria-label="Nusra trust and credentials">
      <div className="container-nusra py-8 md:py-10">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-brand-lime">Why clients feel confident</p>
            <h2 className="mt-2 text-2xl text-white md:text-3xl">Credentials you can count on</h2>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.slice(0, 5).map((item) => (
            <div key={item.title} className="border-l border-brand-lime/70 pl-4">
              <p className="text-sm font-bold leading-5 text-white">{item.title}</p>
              <p className="mt-2 text-xs leading-5 text-white/65">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
