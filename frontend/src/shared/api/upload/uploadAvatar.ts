const BASE = process.env.NEXT_PUBLIC_API_URL

export async function uploadAvatar(file: File) {
  const formData = new FormData()

  formData.append('file', file)

  const res = await fetch(`${BASE}/user/upload-avatar`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Upload failed')
  }

  return res.json() as Promise<{
    url: string
  }>
}
