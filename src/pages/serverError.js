import ErrorLayout from '../layout/error/error.js'

export default function ServerError(status) {
  return ErrorLayout({
    title: status,
    icon: 'sad.svg',
    message: 'We are already fixing it',
    linkText: 'Back to chats',
    linkHref: '/chats',
  })
}
