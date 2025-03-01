import './chats.css'
import templateSource from './chats.hbs'
import { Block } from '../../core/Block'
import IncomingMessage from '../../components/incomingMessage/incomingMessage'
import OutgoingMessage from '../../components/outgoingMessage/outgoingMessage'
import Sidebar from '../../components/sidebar/sidebar'
import ChatList from '../../components/chatList/chatList'
import { compileTemplate } from '../../utils/template'
import WebSocketService from '../../services/webSocketService'
import { ChatService } from '../../services/chatService'
import { AuthService } from '../../services/authService'
import { Chat } from '../../components/chatList/chatList'

const appElement = document.getElementById('app')

interface Message {
  text: string
  time: string
  isUser: boolean
}

interface ChatDisplayProps extends Record<string, unknown> {
  chatId: number
  chatName?: string
  avatar?: string
  messages: Message[]
  chats: Chat[]
  onSendMessage: (message: string) => void
}

export default class Chats extends Block<ChatDisplayProps> {
  private sidebar: Sidebar
  private chatList: ChatList | undefined
  private webSocketService: WebSocketService | null = null
  private chatService: ChatService
  private authService: AuthService

  constructor(props: ChatDisplayProps) {
    super({ ...props, chats: props.chats || [] })
    this.chatService = new ChatService()
    this.authService = new AuthService()
    this.sidebar = new Sidebar()

    this.updateChatList().then(() => {
      this.chatList = new ChatList({
        chats: this.props.chats || [],
        onChatSelect: (chat) => {
          console.log('Selected chat:', chat)
          this.connectToChat(chat)
        },
      })
      this.render()
    })
  }

  render(): string {
    const renderedContent = compileTemplate(templateSource, {
      sidebar: this.sidebar.getContent(),
      chatList: this.chatList?.getContent(),
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
    const createChatButton = document.getElementById('createChatButton') as HTMLButtonElement | null
    const addUserButtons = document.querySelectorAll(
      '.add-user-button',
    ) as NodeListOf<HTMLButtonElement>
    const removeUserButtons = document.querySelectorAll(
      '.delete-user-button',
    ) as NodeListOf<HTMLButtonElement>

    removeUserButtons.forEach((button) => {
      button.onclick = () => {
        const userIds = prompt('Enter user IDs to remove, separated by commas')
        if (userIds) {
          const chatId = this.props.chatId
          this.deleteUsersFromChat(userIds.split(',').map(Number), chatId)
        }
      }
    })

    addUserButtons.forEach((button) => {
      button.onclick = () => {
        const userIds = prompt('Enter user IDs separated by commas')
        if (userIds) {
          const chatId = this.props.chatId
          this.addUsersToChat(userIds.split(',').map(Number), chatId)
        }
      }
    })

    if (createChatButton) {
      createChatButton.onclick = () => {
        const chatName = prompt('Enter the chat name')
        if (chatName) {
          this.createNewChat(chatName)
        }
      }
    }

    if (sendButton && messageInput) {
      sendButton.onclick = () => {
        const messageText = messageInput.value.trim()
        if (messageText) {
          console.log('Message to send:', messageText)
          if (this.webSocketService) {
            this.webSocketService.sendMessage({
              content: messageText,
              type: 'message',
            })
          } else {
            console.error('Connection not established')
          }
          this.updateChatList().then(() => {
            this.chatList = new ChatList({
              chats: this.props.chats || [],
              onChatSelect: (chat) => {
                console.log('Selected chat:', chat)
                this.connectToChat(chat)
              },
            })
            this.render()
          })

          messageInput.value = ''
        } else {
          console.log('Input field is empty')
        }
      }
    }
  }

  public async createNewChat(chatName: string): Promise<void> {
    try {
      const newChat = await this.chatService.createChat({ title: chatName })
      console.log('New chat:', newChat)
      this.updateChatList().then(() => {
        this.chatList = new ChatList({
          chats: this.props.chats || [],
          onChatSelect: (chat) => {
            console.log('Selected chat:', chat)
            this.connectToChat(chat)
          },
        })
        this.render()
      })
    } catch (error) {
      console.error('Error creating chat:', error)
    }
  }

  public async addUsersToChat(userIds: number[], chatId: number): Promise<void> {
    try {
      await this.chatService.addUsersToChat(userIds, chatId)
      console.log('Users added to chat')
      await this.updateChatList()
    } catch (error) {
      console.error('Error adding users to chat:', error)
    }
  }

  public async deleteUsersFromChat(userIds: number[], chatId: number): Promise<void> {
    try {
      await this.chatService.deleteUsersFromChat(userIds, chatId)
      console.log('Users removed from chat')
      await this.updateChatList()
    } catch (error) {
      console.error('Error when deleting users from chat:', error)
    }
  }

  private async updateChatList(): Promise<void> {
    try {
      const chats = await this.chatService.getChats()
      this.setProps({ chats: Array.isArray(chats) ? chats : [] })
    } catch (error) {
      console.error('Error updating chat list:', error)
      this.setProps({ chats: [] })
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

  private async connectToChat(chat: any): Promise<void> {
    const user = await this.authService.getUser()
    const userId = user.id.toString()
    const chatId = chat.id
    const tokenResponse = await this.chatService.getChatToken(chatId)

    if (tokenResponse && typeof tokenResponse === 'object' && 'token' in tokenResponse) {
      const token = tokenResponse.token as string
      this.webSocketService = new WebSocketService({ userId, chatId, token })
      this.webSocketService.connect()

      this.setProps({
        chatId: chat.id,
        chatName: chat.title,
        avatar: chat.avatar || 'gray.jpg',
        messages: [],
      })

      this.webSocketService.setOnMessageCallback((message) => {
        if (message.type === 'message') {
          this.setProps({
            messages: [
              ...this.props.messages,
              {
                text: message.content,
                time: new Date(message.time).toLocaleTimeString(),
                isUser: message.user_id.toString() === userId,
              },
            ],
          })
          this.updateChatList().then(() => {
            this.chatList = new ChatList({
              chats: this.props.chats || [],
              onChatSelect: (chat) => {
                console.log('Selected chat:', chat)
                this.connectToChat(chat)
              },
            })
            this.render()
          })
        } else if (Array.isArray(message)) {
          const oldMessages = message
            .map((msg) => ({
              text: msg.content,
              time: new Date(msg.time).toLocaleTimeString(),
              isUser: msg.user_id.toString() === userId,
            }))
            .reverse()
          this.setProps({ messages: [...this.props.messages, ...oldMessages] })
        }
      })

      this.webSocketService
        .connect()
        .then(() => {
          this.webSocketService?.sendMessage({ content: '0', type: 'get old' })
        })
        .catch((error) => {
          console.error('Connection error:', error)
        })
    } else {
      console.error('Error getting chat token')
    }
  }
}
