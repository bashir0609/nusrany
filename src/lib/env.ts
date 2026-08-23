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
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  GOOGLE_SITE_VERIFICATION: z.string().optional(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

export function parseServerEnv(input: Record<string, string | undefined>) {
  return serverEnvSchema.parse(input)
}

// Lazy getter: env is only validated on first access at runtime, not at
// import time. This keeps API routes safe even if the module is imported
// during `next build` (payload.config.ts uses process.env directly).
let _env: ServerEnv | null = null

export function getEnv(): ServerEnv {
  if (!_env) {
    _env = parseServerEnv(process.env)
  }
  return _env
}
