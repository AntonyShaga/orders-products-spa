'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import AvatarPlaceholderIcon from '@/shared/assets/icons/avatar-placeholder.svg'
import { AvatarUploadButton } from './AvatarUploadButton'

import './AvatarImage.css'

type Props = {
  initialAvatarUrl: string | null
}

export function AvatarImage({ initialAvatarUrl }: Props) {
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl)
  const [isLoading, setIsLoading] = useState(Boolean(initialAvatarUrl))
  const [showLoader, setShowLoader] = useState(Boolean(initialAvatarUrl))
  const [isImageVisible, setIsImageVisible] = useState(!initialAvatarUrl)

  const src = avatarUrl || AvatarPlaceholderIcon

  useEffect(() => {
    if (isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowLoader(true)
      setIsImageVisible(false)
      return
    }

    setIsImageVisible(true)

    const timer = window.setTimeout(() => {
      setShowLoader(false)
    }, 250)

    return () => window.clearTimeout(timer)
  }, [isLoading])

  return (
    <>
      <div className="avatar-image">
        {showLoader && (
          <div
            className={`avatar-image__loader ${isLoading ? 'avatar-image__loader--visible' : ''}`}
            aria-hidden="true"
          >
            <span className="avatar-image__spinner" />
          </div>
        )}

        <Image
          unoptimized
          src={src}
          alt="User avatar"
          width={80}
          height={80}
          className={`avatar-image__img ${isImageVisible ? 'avatar-image__img--visible' : ''}`}
          onLoad={() => {
            setIsLoading(false)
          }}
          onError={() => {
            setAvatarUrl(null)
            setIsLoading(false)
          }}
        />
      </div>

      <AvatarUploadButton
        onUploaded={(url) => {
          setAvatarUrl(url)
          setIsLoading(true)
        }}
      />
    </>
  )
}
