import ErrorLayout from '../modules/error/error'

interface ServerErrorProps {
  [key: string]: unknown
  title: string
  icon: string
  message: string
  linkText: string
  linkHref: string
}

export default function ServerError(status: number): HTMLElement {
  const props: ServerErrorProps = {
    title: `${status}`,
    icon: 'sad.svg',
    message: 'We are already fixing it',
    linkText: 'Back to chats',
    linkHref: '/chats',
  }

  return new ErrorLayout(props).getContent()
}
