import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')

  const previewSecret = process.env.PREVIEW_SECRET
  if (!previewSecret || previewSecret.length < 32) {
    return new Response('Preview is not configured', { status: 503 })
  }
  if (secret !== previewSecret || !path) {
    return new Response('Invalid preview request', { status: 401 })
  }
  if (!path.startsWith('/') || path.includes('//') || path.includes('..') || path.includes('\\')) {
    return new Response('Invalid preview path', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
