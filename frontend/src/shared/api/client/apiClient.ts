const BASE = process.env.NEXT_PUBLIC_API_URL

type ApiResponse<T> = {
  data: T | null
  error: string | null
}

/**
 * Generic HTTP client with built-in auth retry.
 *
 * Flow:
 * 1. Perform request with cookies (access token).
 * 2. If response is not 401 → return result.
 * 3. If 401 → attempt refresh token request.
 * 4. If refresh succeeds → retry original request once.
 * 5. If refresh fails → return unauthorized error.
 *
 * Notes:
 * - Uses `credentials: 'include'` to send HttpOnly cookies.
 * - Prevents infinite retry via `retry` flag.
 * - Assumes backend handles refresh token rotation.
 */
export async function apiClient<T>(
  path: string,
  options?: RequestInit,
  retry = true,
): Promise<ApiResponse<T>> {
  try {
    // Primary request (with access token via cookies)
    const res = await fetch(`${BASE}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...options,
    })

    // Non-auth errors handling
    if (res.status !== 401) {
      if (!res.ok) {
        return { data: null, error: 'request failed' }
      }

      const data = (await res.json()) as T
      return { data, error: null }
    }

    // Prevent infinite retry loop
    if (!retry) {
      return { data: null, error: 'unauthorized' }
    }

    // Attempt to refresh tokens using HttpOnly refresh cookie
    const refreshRes = await fetch(`${BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })

    // If refresh failed → user is not authenticated anymore
    if (!refreshRes.ok) {
      return { data: null, error: 'unauthorized' }
    }

    // Retry original request once after successful refresh
    return apiClient<T>(path, options, false)
  } catch {
    // Network-level failure (no response from server)
    return { data: null, error: 'network error' }
  }
}
