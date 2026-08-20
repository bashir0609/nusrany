import React from 'react'

const actions = [
  { label: 'Edit Homepage', detail: 'Update the first impression', href: '/admin/globals/homepage', tone: 'primary' },
  { label: 'Manage Services', detail: 'Keep offerings current', href: '/admin/collections/services', tone: 'light' },
  { label: 'View Inquiries', detail: 'Respond to new requests', href: '/admin/collections/inquiries', tone: 'light' },
  { label: 'Business Information', detail: 'Hours, contact, and address', href: '/admin/globals/site-settings', tone: 'light' },
]

const workflow = [
  ['01', 'Review inquiries', 'Respond to people who contacted the business.'],
  ['02', 'Refresh services', 'Keep descriptions, pricing notes, and availability accurate.'],
  ['03', 'Check homepage', 'Make sure the headline, office details, and calls to action are current.'],
]

export default function WelcomeDashboard() {
  return (
    <section className="nusra-admin-dashboard" aria-labelledby="nusra-admin-title">
      <div className="nusra-admin-welcome">
        <div className="nusra-admin-welcome__copy">
          <p className="nusra-admin-eyebrow">Nusra Tax &amp; Notary · Admin workspace</p>
          <h1 id="nusra-admin-title">Good to see you</h1>
          <p>Manage your public website, client inquiries, services, and business information from one focused workspace.</p>
        </div>
        <div className="nusra-admin-welcome__mark" aria-hidden="true">N</div>
      </div>

      <div className="nusra-admin-overview" aria-label="Workspace overview">
        <div className="nusra-admin-overview-card">
          <span className="nusra-admin-overview-card__label">Content</span>
          <strong>Homepage &amp; services</strong>
          <span>Keep your public information clear and current.</span>
        </div>
        <div className="nusra-admin-overview-card">
          <span className="nusra-admin-overview-card__label">Communication</span>
          <strong>Client inquiries</strong>
          <span>Review requests and follow up promptly.</span>
        </div>
        <div className="nusra-admin-overview-card">
          <span className="nusra-admin-overview-card__label">Business</span>
          <strong>Site settings</strong>
          <span>Update hours, contact details, and location.</span>
        </div>
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
            <span>
              <strong>{action.label}</strong>
              <small>{action.detail}</small>
            </span>
            <span aria-hidden="true" className="nusra-admin-action__arrow">→</span>
          </a>
        ))}
      </div>

      <div className="nusra-admin-workflow">
        <div className="nusra-admin-section-heading">
          <div>
            <p className="nusra-admin-eyebrow nusra-admin-eyebrow--dark">Recommended workflow</p>
            <h2>A simple rhythm for keeping Nusra current</h2>
          </div>
        </div>
        <ol className="nusra-admin-workflow__list">
          {workflow.map(([number, title, description]) => (
            <li key={number}>
              <span className="nusra-admin-workflow__number">{number}</span>
              <span><strong>{title}</strong><small>{description}</small></span>
            </li>
          ))}
        </ol>
      </div>

      <p className="nusra-admin-note">
        <strong>Publishing tip</strong>
        <span>Review contact details, office hours, and service availability before publishing changes.</span>
      </p>
    </section>
  )
}
