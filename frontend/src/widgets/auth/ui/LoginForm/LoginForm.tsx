'use client'

import { useRouter, useParams } from 'next/navigation'
import { AuthForm } from '../AuthForm/AuthForm'
import { login, getOrders } from '@/shared/api/client'
import { useAppDispatch } from '@/providers/modal-provider/config/hooks'
import { setOrders } from '@/entities/order/model/orderSlice'
import { AuthDictionary } from '@/shared'

type Props = {
  dict: AuthDictionary
}

export const LoginForm = ({ dict }: Props) => {
  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()
  const dispatch = useAppDispatch()

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password)

    if (result.error) {
      return result.error || dict.invalidCredentials
    }

    const ordersRes = await getOrders()

    if (ordersRes.data) {
      dispatch(setOrders(ordersRes.data))
    }

    router.push(`/${locale}/orders`)
    return null
  }

  return (
    <AuthForm
      dict={dict}
      title={dict.loginTitle}
      buttonText={dict.loginButton}
      footerText={dict.noAccount}
      footerLinkText={dict.registerLink}
      footerLinkHref={`/${locale}/register`}
      onSubmit={handleLogin}
    />
  )
}
