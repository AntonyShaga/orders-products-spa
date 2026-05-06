const BASE = process.env.NEXT_PUBLIC_API_URL

export async function updateAvatar(avatarUrl: string) {
  const res = await fetch(`${BASE}/graphql`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
          mutation UpdateAvatar(
            $avatarUrl: String!,
          ) {
            updateAvatar(
              avatarUrl: $avatarUrl,
            )
          }
        `,
      variables: {
        avatarUrl,
      },
    }),
  })

  return res.json()
}
