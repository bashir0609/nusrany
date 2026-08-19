import React from 'react'

const actions = [
  { label: 'Edit Homepage', href: '/admin/globals/homepage', tone: 'primary' },
  { label: 'Manage Services', href: '/admin/collections/services', tone: 'light' },
  { label: 'Add Blog Post', href: '/admin/collections/blog-posts/create', tone: 'light' },
  { label: 'View Inquiries', href: '/admin/collections/inquiries', tone: 'light' },
  { label: 'Business Information', href: '/admin/globals/site-settings', tone: 'light' },
]

export default function WelcomeDashboard() {
  return (
    <section className="nusra-admin-welcome" aria-labelledby="nusra-admin-title">
      <div className="nusra-admin-welcome__copy">
        <p className="nusra-admin-eyebrow">Nusra Tax &amp; Notary</p>
        <h1 id="nusra-admin-title">Welcome to Nusra Admin</h1>
        <p>Keep your website, services, and client communications current from one calm workspace.</p>
      </div>
      <div className="nusra-admin-actions">
        {actions.map((action) => (
          <a key={action.href} href={action.href} className={`nusra-admin-action nusra-admin-action--${action.tone}`}>
            {action.label}<span aria-hidden="true">→</span>
          </a>
        ))}
      </div>
      <div className="nusra-admin-note">
        <strong>Content tip</strong>
        <span>Update homepage copy, office hours, and service details whenever your business changes. Published edits appear on the next visitor request.</span>
      </div>
    </section>
  )
}
