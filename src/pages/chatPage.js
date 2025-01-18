import ChatLayout from '../layout/chats/chats.js'
import ChatList from '../modules/chats/chatList/chatList.js'
import ChatDisplay from '../modules/chats/chatDisplay/chatDisplay.js'

export default function ChatPage() {
  const chatList = ChatList()

  const chatDisplay = ChatDisplay({})

  const layout = ChatLayout({
    chatList,
    chatDisplay,
  })

  return layout
}
