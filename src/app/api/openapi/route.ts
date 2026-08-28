import { NextResponse } from 'next/server'

const openApiSpec = {
  openapi: '3.1.0',
  info: {
    title: 'Nusra Tax & Notary API',
    version: '1.0.0',
    description: 'Machine-readable description of public endpoints for Nusra Tax & Notary website',
    contact: {
      name: 'Nusra Tax & Notary',
      url: 'https://www.nusrany.com/contact',
    },
  },
  servers: [
    {
      url: 'https://www.nusrany.com',
    },
  ],
  paths: {},
}

export async function GET() {
  return NextResponse.json(openApiSpec, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
