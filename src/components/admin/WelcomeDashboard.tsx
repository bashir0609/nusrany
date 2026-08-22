'use client'

import { useEffect, useState } from 'react'

const actions = [
  { label: 'Edit Homepage', detail: 'Update the first impression', href: '/admin/globals/homepage', tone: 'primary' },
  { label: 'Manage Services', detail: 'Keep offerings current', href: '/admin/collections/services', tone: 'light' },
  { label: 'Add Blog Post', detail: 'Share useful local guidance', href: '/admin/collections/blog-posts/create', tone: 'light' },
  { label: 'View Inquiries', detail: 'Respond to new requests', href: '/admin/collections/inquiries', tone: 'light' },
  { label: 'Business Information', detail: 'Hours, contact, and address', href: '/admin/globals/site-settings', tone: 'light' },
]

const overview = [
  { label: 'Services', endpoint: '/api/services?limit=0', href: '/admin/collections/services' },
  { label: 'Team members', endpoint: '/api/team-members?limit=0', href: '/admin/collections/team-members' },
  { label: 'Blog posts', endpoint: '/api/blog-posts?limit=0', href: '/admin/collections/blog-posts' },
  { label: 'New inquiries', endpoint: '/api/inquiries?limit=0&where[status][equals]=new', href: '/admin/collections/inquiries' },
]

export default function WelcomeDashboard() {
  const [counts, setCounts] = useState<Record<string, number | null>>({})

  useEffect(() => {
    let active = true
    Promise.all(overview.map(async (item) => {
      try {
        const response = await fetch(item.endpoint)
        const data = await response.json() as { totalDocs?: number }
        return [item.label, typeof data.totalDocs === 'number' ? data.totalDocs : null] as const
      } catch {
        return [item.label, null] as const
      }
    })).then((values) => { if (active) setCounts(Object.fromEntries(values)) })
    return () => { active = false }
  }, [])

  return (
    <section className="nusra-admin-dashboard" aria-labelledby="nusra-admin-title">
      <div className="nusra-admin-welcome">
        <div className="nusra-admin-welcome__copy">
          <p className="nusra-admin-eyebrow">Nusra Tax &amp; Notary · Admin workspace</p>
          <h1 id="nusra-admin-title">Welcome to Nusra Admin</h1>
          <p>Keep the public website, business information, resources, and client inquiries current from one focused workspace.</p>
        </div>
        <div className="nusra-admin-welcome__mark" aria-hidden="true">N</div>
      </div>

      <div className="nusra-admin-overview" aria-label="Workspace overview">
        {overview.map((item) => (
          <a key={item.label} href={item.href} className="nusra-admin-overview-card">
            <span className="nusra-admin-overview-card__label">Overview</span>
            <strong>{counts[item.label] ?? '—'} {item.label}</strong>
            <span>Open workspace →</span>
          </a>
        ))}
      </div>

      <div className="nusra-admin-section-heading">
        <div>
          <p className="nusra-admin-eyebrow nusra-admin-eyebrow--dark">Quick actions</p>
          <h2>What would you like to update?</h2>
        </div>
        <p>Choose a workspace to get started.</p>
      </div>
      <div className="nusra-admin-actions">
        {actions.map((action) => (
          <a key={action.href} href={action.href} className={`nusra-admin-action nusra-admin-action--${action.tone}`}>
            <span><strong>{action.label}</strong><small>{action.detail}</small></span>
            <span aria-hidden="true" className="nusra-admin-action__arrow">→</span>
          </a>
        ))}
      </div>

      <div className="nusra-admin-workflow">
        <div className="nusra-admin-section-heading">
          <div>
            <p className="nusra-admin-eyebrow nusra-admin-eyebrow--dark">Content management</p>
            <h2>Keep the details clients rely on accurate</h2>
          </div>
        </div>
        <ol className="nusra-admin-workflow__list">
          <li><span className="nusra-admin-workflow__number">01</span><span><strong>Homepage</strong><small>Maintain the hero, services, trust points, team, reviews, and FAQs.</small></span></li>
          <li><span className="nusra-admin-workflow__number">02</span><span><strong>Services</strong><small>Update descriptions, availability, and helpful service details.</small></span></li>
          <li><span className="nusra-admin-workflow__number">03</span><span><strong>Business information</strong><small>Keep phone, office hours, location, languages, and credentials current.</small></span></li>
        </ol>
      </div>

      <p className="nusra-admin-note"><strong>Publishing tip</strong><span>Review contact details, office hours, and service availability before publishing changes.</span></p>
    </section>
  )
}
