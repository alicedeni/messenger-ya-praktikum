import Auth from '../modules/auth/auth'
import { Block } from '../core/Block'

export default function LoginPage(): Block {
  return new Auth()
}
