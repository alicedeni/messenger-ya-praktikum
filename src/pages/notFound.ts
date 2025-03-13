import ErrorLayout from '../modules/error/error.ts'
import { Block } from '../core/Block.ts'

interface NotFoundProps {
  [key: string]: unknown
  title: string
  icon: string
  message: string
  linkText: string
  linkHref: string
}

export default function NotFound(): Block {
  const props: NotFoundProps = {
    title: '404',
    icon: 'sad.svg',
    message: 'You`ve come to the wrong place',
    linkText: 'Back to chats',
    linkHref: '/messenger',
  }

  return new ErrorLayout(props)
}
