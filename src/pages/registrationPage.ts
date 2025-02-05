import Reg from '../modules/reg/reg'

export default function RegistrationPage(): HTMLElement {
  const authComponent = new Reg()
  authComponent.render()

  return document.createElement('div')
}
