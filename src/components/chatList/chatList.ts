import './chatList.css'
import templateSource from './chatList.hbs'
import Handlebars from 'handlebars'
import { Block } from '../../core/Block'

interface Chat {
  id: string
  name: string
  time: string
  text: string
  unread: number
  image: string
}

interface ChatListProps extends Record<string, unknown> {
  chats: Chat[]
  onChatSelect: (chat: Chat) => void
}

export default class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super(props)
  }

  render(): string {
    const template = Handlebars.compile(templateSource)
    const renderedContent = template({ chats: this.props.chats })
    this.init()
    return renderedContent
  }

  init(): void {
    const wrapper = this.getContent()

    if (!wrapper) {
      console.error('Container for chat list not found')
      return
    }

    const chatItems = wrapper.querySelectorAll('.chat-list__item')

    chatItems.forEach((chatItem, index) => {
      const chatElement = chatItem as HTMLDivElement

      chatElement.onclick = () => {
        this.props.onChatSelect(this.props.chats[index])
      }
    })
  }
}
