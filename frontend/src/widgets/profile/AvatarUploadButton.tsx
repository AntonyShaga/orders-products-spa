'use client'

import { uploadAvatar } from '@/shared/api/upload/uploadAvatar'
import { updateAvatar } from '@/shared/api/graphql/mutations/updateAvatar'
import React from 'react'

export function AvatarUploadButton() {
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (!file) return

    // upload image
    const upload = await uploadAvatar(file)

    // save url to postgres
    await updateAvatar(upload.url)

    window.location.reload()
  }

  return (
    <label className="sidebar__settings-btn">
      ⚙️
      <input hidden type="file" accept="image/*" onChange={handleChange} />
    </label>
  )
}
