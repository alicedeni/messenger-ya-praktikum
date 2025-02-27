import ErrorLayout from '../modules/error/error'
import { Block } from '../core/Block'

interface ServerErrorProps {
  [key: string]: unknown
  title: string
  icon: string
  message: string
  linkText: string
  linkHref: string
}

export default function ServerError(status: number): Block {
  const props: ServerErrorProps = {
    title: `${status}`,
    icon: 'sad.svg',
    message: 'We are already fixing it',
    linkText: 'Back to chats',
    linkHref: '/messenger',
  }

  return new ErrorLayout(props)
}
