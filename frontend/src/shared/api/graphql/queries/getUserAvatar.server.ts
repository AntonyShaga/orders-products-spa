import { cookies } from 'next/headers'

const BASE = process.env.INTERNAL_API_URL

export async function getUserAvatarServer() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get('accessToken')?.value

  const res = await fetch(`${BASE}/graphql`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',

      Cookie: `accessToken=${accessToken}`,
    },

    body: JSON.stringify({
      query: `
          query {
            userAvatar
          }
        `,
    }),

    cache: 'no-store',
  })

  if (!res.ok) {
    return null
  }

  const data = await res.json()

  return data.data.userAvatar as string | null
}
