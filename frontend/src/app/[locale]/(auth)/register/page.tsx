import { RegisterForm } from '@/widgets/auth/ui/RegisterForm/RegisterForm'
import { getDictionary, Locale } from '@/shared'

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const dict = await getDictionary(locale as Locale)
  return <RegisterForm dict={dict.auth} />
}
