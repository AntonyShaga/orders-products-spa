import React from 'react'
import { serverFetch } from '@/shared/api/server'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const orders = await serverFetch('/orders')

  if (orders.data) {
    redirect(`/${locale}/orders`)
  }
  return <div className="flex items-center justify-center min-h-screen">{children}</div>
}
