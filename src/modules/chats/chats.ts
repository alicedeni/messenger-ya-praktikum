import './chats.css'
import templateSource from './chats.hbs'
import { Block } from '../../core/Block'
import IncomingMessage from '../../components/incomingMessage/incomingMessage'
import OutgoingMessage from '../../components/outgoingMessage/outgoingMessage'
import Sidebar from '../../components/sidebar/sidebar'
import ChatList from '../../components/chatList/chatList'
import { compileTemplate } from '../../utils/template'

const appElement = document.getElementById('app') // Получаем элемент #app

interface Message {
  text: string
  time: string
  isUser: boolean
}

interface ChatDisplayProps extends Record<string, unknown> {
  chatName?: string
  avatar?: string
  messages: Message[]
  onSendMessage: (message: string) => void
}

export default class Chats extends Block<ChatDisplayProps> {
  private sidebar: Sidebar
  private chatList: ChatList

  constructor(props: ChatDisplayProps) {
    super(props)

    this.sidebar = new Sidebar()
    this.chatList = new ChatList({
      chats: [
        { name: 'Andrey', time: '10:49', text: 'Hello!', unread: 2, image: 'gray.jpg' },
        { name: 'Ivan', time: '10:30', text: 'Wassup?', unread: 1, image: 'gray.jpg' },
        { name: 'Maria', time: '09:15', text: 'See you later.', unread: 0, image: 'gray.jpg' },
      ],
      onChatSelect: (chat) => {
        console.log('Selected chat:', chat)
      },
    })
  }

  render(): string {
    const renderedContent = compileTemplate(templateSource, {
      sidebar: this.sidebar.getContent(),
      chatList: this.chatList.getContent(),
      chatName: this.props.chatName,
      avatar: this.props.avatar,
      messagesContainer: '',
    })

    if (appElement) {
      appElement.innerHTML = ''
      appElement.appendChild(renderedContent)
    }

    this.renderMessages()
    this.setEventListeners()

    return ''
  }

  private setEventListeners(): void {
    const sendButton = document.getElementById('sendButton') as HTMLButtonElement | null
    const messageInput = document.getElementById('messageInput') as HTMLInputElement | null

    if (sendButton && messageInput) {
      sendButton.onclick = () => {
        const messageText = messageInput.value.trim()
        if (messageText) {
          console.log('Message to send:', messageText)
          this.props.onSendMessage(messageText)
          messageInput.value = ''
        } else {
          console.log('Input field is empty')
        }
      }
    } else {
      console.error('Submit button or input field not found')
    }
  }

  public renderMessages(): void {
    const messagesContainer = document.querySelector(
      '.chat-display__messages',
    ) as HTMLElement | null

    if (messagesContainer) {
      messagesContainer.innerHTML = ''

      this.props.messages.forEach((message) => {
        let messageComponent

        if (message.isUser) {
          messageComponent = new OutgoingMessage({ text: message.text, time: message.time })
        } else {
          messageComponent = new IncomingMessage({ text: message.text, time: message.time })
        }

        messagesContainer.appendChild(messageComponent.getContent())
      })
    }
  }
}
