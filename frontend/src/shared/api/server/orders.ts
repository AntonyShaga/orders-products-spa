import { cookies } from 'next/headers'

const BASE = process.env.INTERNAL_API_URL

export const fetchOrders = async () => {
  try {
    const cookieStore = await cookies()

    const cookie = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ')

    const res = await fetch(`${BASE}/orders`, {
      headers: {
        Cookie: cookie,
      },
      cache: 'no-store',
    })

    if (res.status === 401) {
      return { data: null, error: 'unauthorized' }
    }

    if (!res.ok) {
      return { data: null, error: 'error' }
    }

    const data = await res.json()
    return { data, error: null }
  } catch {
    return { data: null, error: 'network' }
  }
}
