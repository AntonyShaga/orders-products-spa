import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.text()

  const res = await fetch(`${process.env.INTERNAL_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

      cookie: req.headers.get('cookie') || '',
    },
    body,
  })

  return new Response(await res.text(), {
    status: res.status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
