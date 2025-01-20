import Auth from '../modules/auth/auth.js'
import AuthLayout from '../layout/authLayout/authLayout.js'

export default function LoginPage() {
  const content = Auth()

  return AuthLayout({
    form: content.innerHTML,
    imageSrc: 'unlocked.svg',
  })
}
