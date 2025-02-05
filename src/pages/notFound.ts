import ErrorLayout from '../modules/error/error'

interface NotFoundProps {
  [key: string]: unknown
  title: string
  icon: string
  message: string
  linkText: string
  linkHref: string
}

export default function NotFound(): HTMLElement {
  const props: NotFoundProps = {
    title: '404',
    icon: 'sad.svg',
    message: 'You\'ve come to the wrong place',
    linkText: 'Back to chats',
    linkHref: '/chats',
  }

  return new ErrorLayout(props).getContent()
}
