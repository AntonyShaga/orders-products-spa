'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { z } from 'zod'
import './AuthForm.css'
import { AuthDictionary } from '@/shared'
import { authSchema } from '@/shared/schema/auth'
import { registerSchema } from '@/shared/schema/register'

type Props = {
  dict: AuthDictionary
  title: string
  buttonText: string
  footerText: string
  footerLinkText: string
  footerLinkHref: string
  showConfirmPassword?: boolean
  onSubmit: (email: string, password: string) => Promise<string | null>
}

export const AuthForm = ({
  dict,
  title,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkHref,
  showConfirmPassword,
  onSubmit,
}: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')

  const getErrorMessage = (err: z.ZodError) => {
    const issue = err.issues[0]
    if (!issue) return 'Invalid data'

    if (issue.path[0] === 'email') return dict.invalidEmail
    if (issue.path[0] === 'password') return dict.minPassword

    if (issue.message === 'passwordsMismatch') {
      return dict.passwordsMismatch
    }

    return issue.message
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = showConfirmPassword ? { email, password, confirmPassword } : { email, password }

    const schema = showConfirmPassword ? registerSchema : authSchema

    const parsed = schema.safeParse(data)

    if (!parsed.success) {
      setError(getErrorMessage(parsed.error))
      return
    }

    setLoading(true)
    setError(null)

    const resultError = await onSubmit(email, password)

    if (resultError) {
      setError(resultError)
      setLoading(false)
      return
    }

    setLoading(false)
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <h3 className="auth__title">{title}</h3>

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

          {showConfirmPassword && (
            <input
              className="auth__input"
              type="password"
              placeholder={dict.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button className="auth__button" disabled={loading}>
            {loading ? dict.loading : buttonText}
          </button>

          <div className="auth__footer">
            <span className="auth__footer-text">{footerText}</span>{' '}
            <Link href={footerLinkHref} className="auth__link">
              {footerLinkText}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
