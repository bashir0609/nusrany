'use client'

import { useRef, useState } from 'react'

type RequestAssistanceFormProps = {
  services: Array<{ title: string; slug: string }>
}

type FieldErrors = Record<string, string>

const SENSITIVE_WARNING =
  'Please do not submit Social Security numbers, passport numbers, tax documents, immigration documents, banking details, or other highly sensitive personal information through this form.'

function validateField(field: keyof FieldErrors, value: string, allValues: Record<string, string>): string | null {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'Please enter your name.'
      if (value.trim().length > 120) return 'Name must be 120 characters or fewer.'
      return null
    case 'phone':
      if (!value.trim()) return 'Please enter your phone number.'
      if (value.trim().length > 40) return 'Phone must be 40 characters or fewer.'
      return null
    case 'email':
      if (!value.trim()) {
        return allValues.preferredContactMethod === 'email' ? 'Email is required when you prefer to be contacted by email.' : null
      }
      if (value.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        return 'Please enter a valid email address.'
      }
      return null
    case 'service':
      if (!value) return 'Please choose a service.'
      return null
    case 'preferredContactMethod':
      if (!value) return 'Please choose a preferred contact method.'
      return null
    case 'message':
      if (value.length > 2000) return 'Message must be 2000 characters or fewer.'
      return null
    case 'consent':
      if (value !== 'true') return 'Please confirm you agree to be contacted about your request.'
      return null
    default:
      return null
  }
}

export function RequestAssistanceForm({ services }: RequestAssistanceFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({})
  const [serverMessage, setServerMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const startedAtRef = useRef<number>(Date.now())

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return
    setServerMessage('')

    const form = event.currentTarget
    const data = new FormData(form)
    const values: Record<string, string> = {
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      service: String(data.get('service') ?? ''),
      preferredContactMethod: String(data.get('preferredContactMethod') ?? ''),
      message: String(data.get('message') ?? ''),
      consent: String(data.get('consent') ?? ''),
      website: String(data.get('website') ?? ''),
    }

    // Honeypot: bots fill this hidden field. Drop silently.
    if (values.website) return

    const nextErrors: FieldErrors = {}
    for (const field of Object.keys(values) as Array<keyof FieldErrors>) {
      if (field === 'website') continue
      const message = validateField(field, values[field], values)
      if (message) nextErrors[field] = message
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      requestAnimationFrame(() => errorSummaryRef.current?.focus())
      return
    }

    setErrors({})
    setStatus('submitting')

    try {
      const response = await fetch('/api/request-assistance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          consent: values.consent === 'true',
          formStartedAt: startedAtRef.current,
        }),
      })

      if (response.ok) {
        setStatus('success')
        return
      }

      const payload = (await response.json().catch(() => null)) as
        | { errors?: FieldErrors; error?: string }
        | null

      if (response.status === 400 && payload?.errors) {
        setErrors(payload.errors)
        requestAnimationFrame(() => errorSummaryRef.current?.focus())
        setStatus('idle')
        return
      }

      if (response.status === 429) {
        setServerMessage(payload?.error ?? 'Too many requests. Please try again later.')
        setStatus('idle')
        return
      }

      setServerMessage(payload?.error ?? 'We could not submit your request. Please try again or call us directly.')
      setStatus('idle')
    } catch {
      setServerMessage('We could not submit your request. Please try again or call us directly.')
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="card border-brand-teal p-8 text-center"
      >
        <p className="text-2xl" aria-hidden="true">✓</p>
        <h2 className="mt-2 text-xl">Thank you — your request has been received</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Our Queens team will get back to you using your preferred contact method. If your matter is urgent,
          please call us directly.
        </p>
      </div>
    )
  }

  const fieldError = (field: string) => (errors[field] ? <span className="mt-1 block text-sm font-medium text-red-700">{errors[field]}</span> : null)
  const errorClass = (field: string) =>
    errors[field] ? 'border-red-600' : 'border-border'

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="card p-6">
      <p className="mb-5 rounded-lg border border-brand-amber/50 bg-[#fff8ec] px-4 py-3 text-sm text-ink">
        {SENSITIVE_WARNING}
      </p>

      <div ref={errorSummaryRef} tabIndex={-1} role="alert" aria-live="polite">
        {Object.keys(errors).length > 0 ? (
          <div className="mb-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3">
            <p className="font-semibold text-red-800">Please fix the following:</p>
            <ul className="mt-1 list-inside list-disc text-sm text-red-800">
              {Object.values(errors).map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {serverMessage ? (
        <div role="alert" className="mb-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {serverMessage}
        </div>
      ) : null}

      {/* Honeypot — hidden from humans, tempting for bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="hidden" name="formStartedAt" value={startedAtRef.current} />

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-1 block font-medium text-ink">
            Name <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full rounded-lg border px-3 py-2.5 text-ink focus:border-brand-secondary ${errorClass('name')}`}
          />
          {fieldError('name')}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block font-medium text-ink">
            Phone <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`w-full rounded-lg border px-3 py-2.5 text-ink focus:border-brand-secondary ${errorClass('phone')}`}
          />
          {fieldError('phone')}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full rounded-lg border px-3 py-2.5 text-ink focus:border-brand-secondary ${errorClass('email')}`}
          />
          <p className="mt-1 text-sm text-muted">Required when you prefer to be contacted by email.</p>
          {fieldError('email')}
        </div>

        <div>
          <label htmlFor="service" className="mb-1 block font-medium text-ink">
            Service needed <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? 'service-error' : undefined}
            className={`w-full rounded-lg border bg-surface px-3 py-2.5 text-ink focus:border-brand-secondary ${errorClass('service')}`}
          >
            <option value="" disabled>
              Choose a service…
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
          {fieldError('service')}
        </div>

        <fieldset>
          <legend className="mb-1 font-medium text-ink">
            Preferred contact method <span aria-hidden="true" className="text-red-600">*</span>
          </legend>
          <div className="flex flex-wrap gap-4">
            {(['phone', 'whatsapp', 'email'] as const).map((method) => (
              <label key={method} className="inline-flex items-center gap-2 font-medium text-ink">
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value={method}
                  aria-invalid={Boolean(errors.preferredContactMethod)}
                  className="h-4 w-4"
                />
                {method === 'phone' ? 'Phone call' : method === 'whatsapp' ? 'WhatsApp' : 'Email'}
              </label>
            ))}
          </div>
          {fieldError('preferredContactMethod')}
        </fieldset>

        <div>
          <label htmlFor="message" className="mb-1 block font-medium text-ink">
            Message <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={2000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full rounded-lg border px-3 py-2.5 text-ink focus:border-brand-secondary ${errorClass('message')}`}
          />
          {fieldError('message')}
        </div>

        <div>
          <label className="inline-flex items-start gap-2 text-sm text-ink">
            <input
              type="checkbox"
              name="consent"
              value="true"
              aria-invalid={Boolean(errors.consent)}
              className="mt-0.5 h-4 w-4"
            />
            <span>
              I agree to be contacted about my request by phone, WhatsApp, or email.{' '}
              <span aria-hidden="true" className="text-red-600">*</span>
            </span>
          </label>
          {fieldError('consent')}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Submitting…' : 'Request Assistance'}
        </button>
      </div>
    </form>
  )
}
