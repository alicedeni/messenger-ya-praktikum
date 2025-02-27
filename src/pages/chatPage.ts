import Chats from '../modules/chats/chats'
import { Block } from '../core/Block'

export default function ChatPage(): Block {
  const chatDisplay = new Chats({
    chatId: -1,
    chatName: '',
    avatar: '',
    messages: [],
    chats: [],
    onSendMessage: (message) => {
      console.log(message)
      chatDisplay.renderMessages()
    },
  })

  return chatDisplay
}
