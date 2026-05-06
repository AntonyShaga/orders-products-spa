'use client'

import React from 'react'

import { uploadAvatar } from '@/shared/api/upload/uploadAvatar'

import { updateAvatar } from '@/shared/api/graphql/mutations/updateAvatar'

type Props = {
  onUploaded: (url: string) => void
}

export function AvatarUploadButton({ onUploaded }: Props) {
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const upload = await uploadAvatar(file)

    await updateAvatar(upload.url)

    onUploaded(upload.url)
  }

  return (
    <label className="sidebar__settings-btn">
      ⚙️
      <input hidden type="file" accept="image/*" onChange={handleChange} />
    </label>
  )
}
