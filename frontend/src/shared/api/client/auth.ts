const BASE = process.env.NEXT_PUBLIC_API_URL

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      return { success: false, error: 'invalid credentials' }
    }

    return { success: true }
  } catch {
    return { success: false, error: 'network error' }
  }
}

export async function register(email: string, password: string) {
  try {
    const res = await fetch(`${BASE}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (res.status === 409) {
      return { success: false, error: 'user exists' }
    }

    if (!res.ok) {
      return { success: false, error: 'register failed' }
    }

    return { success: true }
  } catch {
    return { success: false, error: 'network error' }
  }
}

export async function logout() {
  try {
    await fetch(`${BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  } catch {}
}
