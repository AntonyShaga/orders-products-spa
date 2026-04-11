'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import './RegisterForm.css'
import Link from 'next/link'
import { AuthDictionary } from '@/shared'
import { register } from '@/shared/api/client'

type Props = {
  dict: AuthDictionary
}

export const RegisterForm = ({ dict }: Props) => {
  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()

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

    try {
      const result = await register(email, password)

      if (!result.success) {
        // 🔥 тут используем словарь
        if (result.error === 'user exists') {
          setError(dict.userExists)
        } else {
          setError(result.error || dict.unexpectedError)
        }
        return
      }

      router.push(`/${locale}/orders`)
    } catch {
      setError(dict.unexpectedError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <h3 className="auth__title">{dict.registerTitle}</h3>

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
            {loading ? dict.loading : dict.registerButton}
          </button>

          <div className="auth__footer">
            <span className="auth__footer-text">{dict.haveAccount}</span>{' '}
            <Link href={`/${locale}/login`} className="auth__link">
              {dict.loginLink}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
