'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import './LoginForm.css'
import Link from 'next/link'
import { AuthDictionary } from '@/shared'
import { getOrders, login } from '@/shared/api/client'
import { useAppDispatch } from '@/providers/modal-provider/config/hooks'
import { setOrders } from '@/entities/order/model/orderSlice'

type Props = {
  dict: AuthDictionary
}

export const LoginForm = ({ dict }: Props) => {
  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (!email.includes('@')) return dict.invalidEmail
    if (password.length < 6) return dict.minPassword
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const err = validate()
    if (err) {
      setError(err)
      return
    }

    setLoading(true)
    setError(null)

    const result = await login(email, password)

    if (result.error) {
      setError(result.error || dict.invalidCredentials)
      setLoading(false)
      return
    }

    const ordersRes = await getOrders()

    if (ordersRes.data) {
      dispatch(setOrders(ordersRes.data))
    }

    router.push(`/${locale}/orders`)
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <h3 className="auth__title">{dict.loginTitle}</h3>

        {error && <div className="auth__error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth__form">
          <input
            className="auth__input"
            type="email"
            placeholder={dict.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth__input"
            type="password"
            placeholder={dict.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth__button" disabled={loading}>
            {loading ? dict.loading : dict.loginButton}
          </button>

          <div className="auth__footer">
            <span className="auth__footer-text">{dict.noAccount}</span>{' '}
            <Link href={`/${locale}/register`} className="auth__link">
              {dict.registerLink}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
