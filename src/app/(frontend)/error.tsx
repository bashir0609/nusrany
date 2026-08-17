'use client'

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // The error is never rendered to the visitor; log minimally for operators.
    console.error('Page error', error.message)
  }, [error])

  return (
    <main className="py-20">
      <div className="container-nusra text-center">
        <h1>Something went wrong</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-primary px-6 py-3 font-semibold text-white hover:bg-brand-secondary"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
