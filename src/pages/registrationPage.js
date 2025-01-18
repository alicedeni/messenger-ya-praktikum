import Reg from '../modules/reg/reg.js'
import AuthLayout from '../layout/authLayout/authLayout.js'

export default function RegistrationPage() {
  const content = Reg()

  return AuthLayout({
    form: content.innerHTML,
    imageSrc: 'unlocked.svg',
  })
}
