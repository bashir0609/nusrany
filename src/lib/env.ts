import { z } from 'zod'

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(32),
  SITE_URL: z.string().url(),
  PREVIEW_SECRET: z.string().min(32),
  RATE_LIMIT_HMAC_SECRET: z.string().min(32),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(12).optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  GOOGLE_SITE_VERIFICATION: z.string().optional(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

export function parseServerEnv(input: Record<string, string | undefined>) {
  return serverEnvSchema.parse(input)
}

// Lazy getter: env is only validated on first access at runtime, not at
// import time. This lets `next build` succeed without env vars — they are
// required only when the routes that use them are actually invoked.
//
// During `next build`, process.env has no real values, so we provide
// placeholder defaults that satisfy Zod's shape but will never be used at
// runtime (they're replaced by real env vars on the server).
let _env: ServerEnv | null = null
const BUILD_PLACEHOLDERS: Record<string, string> = {
  DATABASE_URL: 'postgresql://placeholder:placeholder@localhost/placeholder',
  PAYLOAD_SECRET: 'x'.repeat(32),
  SITE_URL: 'https://placeholder.example.com',
  PREVIEW_SECRET: 'x'.repeat(32),
  RATE_LIMIT_HMAC_SECRET: 'x'.repeat(32),
  ADMIN_EMAIL: 'placeholder@example.com',
  ADMIN_PASSWORD: 'x'.repeat(12),
}

export function getEnv(): ServerEnv {
  if (!_env) {
    // During `next build`, NEXT_RUNTIME is undefined. Real env vars may or
    // may not be present depending on the hosting platform. We always try
    // real vars first, then fall back to placeholders for build contexts.
    const isRuntime = process.env.NEXT_RUNTIME !== undefined
    try {
      _env = parseServerEnv(process.env)
    } catch {
      if (isRuntime) {
        // At runtime, missing env vars are a fatal config error.
        throw new Error('Missing or invalid environment variables')
      }
      // Build context — use placeholders so the build can complete.
      _env = parseServerEnv(BUILD_PLACEHOLDERS)
    }
  }
  return _env
}
