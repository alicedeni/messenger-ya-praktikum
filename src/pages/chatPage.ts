import Chats from '../modules/chats/chats'

export default function ChatPage(): HTMLElement {
  const chatDisplay = new Chats({
    chatName: 'Andrey',
    avatar: 'gray.jpg',
    messages: [
      { text: 'Hello!', time: '10:00', isUser: true },
      { text: 'How are you?', time: '10:05', isUser: false },
      { text: 'I am fine, thanks!', time: '10:10', isUser: true },
      { text: 'Great!', time: '10:15', isUser: false },
    ],
    onSendMessage: (message) => {
      console.log('New message:', message)

      chatDisplay.props.messages.push({
        text: message,
        time: new Date().toLocaleTimeString(),
        isUser: true,
      })

      chatDisplay.renderMessages()
    },
  })

  chatDisplay.render()

  return document.createElement('div')
}
