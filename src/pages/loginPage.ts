import Auth from '../modules/auth/auth.ts'
import { Block } from '../core/Block.ts'

export default function LoginPage(): Block {
  return new Auth()
}
