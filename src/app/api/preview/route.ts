import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getEnv } from '@/lib/env'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')

  if (secret !== getEnv().PREVIEW_SECRET || !path) {
    return new Response('Invalid preview request', { status: 401 })
  }
  if (!path.startsWith('/') || path.includes('//') || path.includes('..') || path.includes('\\')) {
    return new Response('Invalid preview path', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
