const BASE = process.env.NEXT_PUBLIC_API_URL

type ApiResponse<T> = {
  data: T | null
  error: string | null
}

export async function apiClient<T>(
  path: string,
  options?: RequestInit,
  retry = true,
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...options,
    })

    if (res.status !== 401) {
      if (!res.ok) {
        return { data: null, error: 'request failed' }
      }

      const data = (await res.json()) as T
      return { data, error: null }
    }

    if (!retry) {
      return { data: null, error: 'unauthorized' }
    }

    const refreshRes = await fetch(`${BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })

    if (!refreshRes.ok) {
      return { data: null, error: 'unauthorized' }
    }

    return apiClient<T>(path, options, false)
  } catch {
    return { data: null, error: 'network error' }
  }
}
