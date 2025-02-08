import Auth from '../modules/auth/auth'

export default function LoginPage(): HTMLElement {
  const authComponent = new Auth()
  authComponent.render()

  return document.createElement('div')
}
