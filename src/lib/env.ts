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
let _env: ServerEnv | null = null
export function getEnv(): ServerEnv {
  if (!_env) {
    _env = parseServerEnv(process.env)
  }
  return _env
}
