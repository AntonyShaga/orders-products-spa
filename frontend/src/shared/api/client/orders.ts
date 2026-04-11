const BASE = process.env.NEXT_PUBLIC_API_URL

export const deleteOrder = async (id: string) => {
  try {
    const res = await fetch(`${BASE}/orders/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (res.status === 401) {
      return { success: false, error: 'unauthorized' }
    }

    if (!res.ok) {
      return { success: false, error: 'failed to delete' }
    }

    return { success: true }
  } catch {
    return { success: false, error: 'network error' }
  }
}
