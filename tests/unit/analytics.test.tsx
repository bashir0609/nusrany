import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// next/script renders nothing outside the Next.js runtime, so mock it as a plain
// <script> passthrough and assert on the props our component passes it.
vi.mock('next/script', () => {
  const ScriptMock = (props: { id?: string; src?: string; children?: string }) => {
    const { id, src, children } = props
    return React.createElement('script', { id, src, 'data-mock-script': 'true' }, children)
  }
  return { __esModule: true, default: ScriptMock }
})

async function loadAnalytics(gaId: string | undefined) {
  vi.resetModules()
  vi.stubEnv('NEXT_PUBLIC_GA_ID', gaId ?? '')
  const mod = await import('@/components/analytics/GoogleAnalytics')
  return mod.GoogleAnalytics
}

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('GoogleAnalytics', () => {
  it('renders nothing when no GA ID is configured', async () => {
    const Component = await loadAnalytics(undefined)
    const { container } = render(React.createElement(Component))
    expect(container.querySelector('script[data-mock-script]')).toBeNull()
  })

  it('injects the gtag loader and init script when a GA ID is configured', async () => {
    const Component = await loadAnalytics('G-TEST123456')
    const { container } = render(React.createElement(Component))
    const loader = container.querySelector('script[src="https://www.googletagmanager.com/gtag/js?id=G-TEST123456"]')
    expect(loader).not.toBeNull()
    const init = container.querySelector('script#gtag-init')
    expect(init).not.toBeNull()
    expect(init?.textContent ?? '').toContain('G-TEST123456')
    expect(init?.textContent ?? '').toContain('window.dataLayer')
  })
})
