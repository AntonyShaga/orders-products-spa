'use client'

import { useRouter, useParams } from 'next/navigation'
import { AuthForm } from '../AuthForm/AuthForm'
import { register } from '@/shared/api/client'
import { AuthDictionary } from '@/shared'

type Props = {
  dict: AuthDictionary
}

export const RegisterForm = ({ dict }: Props) => {
  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()

  const handleRegister = async (email: string, password: string) => {
    const result = await register(email, password)

    if (result.error) {
      return result.error || dict.invalidCredentials
    }

    router.push(`/${locale}/orders`)
    return null
  }

  return (
    <AuthForm
      dict={dict}
      title={dict.registerTitle}
      buttonText={dict.registerButton}
      footerText={dict.haveAccount}
      footerLinkText={dict.loginLink}
      footerLinkHref={`/${locale}/login`}
      onSubmit={handleRegister}
      showConfirmPassword
    />
  )
}
