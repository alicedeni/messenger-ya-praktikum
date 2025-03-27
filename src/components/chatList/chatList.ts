import './chatList.css'
import templateSource from './chatList.hbs'
import Handlebars from 'handlebars'
import { Block } from '../../core/Block.ts'
import { API_CONFIG } from '../../utils/config.ts'
import { sanitizeHTML } from '../../utils/helpers.ts'

export interface Chat {
  id: string
  title: string
  last_message?: {
    content: string
    time: string
  }
  unread_count: number
  avatar?: string
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

    const renderedContent = template({
      chats: this.props.chats.map((chat) => ({
        id: chat.id,
        title: chat.title,
        time: chat.last_message?.time ? new Date(chat.last_message.time).toLocaleTimeString() : '',
        text: chat.last_message?.content
          ? sanitizeHTML(chat.last_message.content).slice(0, 50)
          : 'Нет сообщений',
        unread_count: chat.unread_count,
        image: chat.avatar ? `${API_CONFIG.BASE_URL}/resources${chat.avatar}` : 'gray.jpg',
      })),
    })

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
