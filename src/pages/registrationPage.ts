import Reg from '../modules/reg/reg'
import { Block } from '../core/Block'

export default function RegistrationPage(): Block {
  const authComponent = new Reg()
  return authComponent
}
