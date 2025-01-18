import ErrorLayout from '../layout/error/error.js'

export default function NotFound() {
  return ErrorLayout({
    title: '404',
    icon: 'sad.svg',
    message: "You've come to the wrong place",
    linkText: 'Back to chats',
    linkHref: '/chats',
  })
}
