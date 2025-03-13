import Reg from '../modules/reg/reg.ts'
import { Block } from '../core/Block.ts'

export default function RegistrationPage(): Block {
  const authComponent = new Reg()
  return authComponent
}
