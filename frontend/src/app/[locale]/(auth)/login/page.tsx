import { LoginForm } from '@/widgets/auth/ui/LoginForm/LoginForm'
import { getDictionary, type Locale } from '@/shared'

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const dict = await getDictionary(locale as Locale)
  return <LoginForm dict={dict.auth} />
}
