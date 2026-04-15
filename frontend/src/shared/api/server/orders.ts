import { cookies } from 'next/headers'

const BASE = process.env.INTERNAL_API_URL

export async function serverFetch<T>(path: string) {
  try {
    const cookieStore = await cookies()

    const cookie = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ')

    const res = await fetch(`${BASE}${path}`, {
      headers: {
        Cookie: cookie,
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    })

    if (res.status === 401) {
      return { data: null, error: 'unauthorized' }
    }

    if (!res.ok) {
      return { data: null, error: 'error' }
    }

    return { data: await res.json(), error: null }
  } catch {
    return { data: null, error: 'network' }
  }
}
