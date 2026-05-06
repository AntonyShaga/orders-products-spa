'use client'

import { useState } from 'react'
import Image from 'next/image'

import AvatarPlaceholderIcon from '@/shared/assets/icons/avatar-placeholder.svg'

import { AvatarUploadButton } from './AvatarUploadButton'

type Props = {
  initialAvatarUrl: string | null
}

export function AvatarImage({ initialAvatarUrl }: Props) {
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl)

  return (
    <>
      <Image
        unoptimized
        src={avatarUrl || AvatarPlaceholderIcon}
        alt="User"
        width={120}
        height={120}
      />

      <AvatarUploadButton onUploaded={setAvatarUrl} />
    </>
  )
}
