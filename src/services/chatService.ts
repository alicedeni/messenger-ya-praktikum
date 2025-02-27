import { HTTPTransport } from '../core/HTTPTransport'
import { API_CONFIG } from '../utils/config'

const http = new HTTPTransport()

export class ChatService {
  private baseURL = `${API_CONFIG.BASE_URL}/chats`

  public async getChats(): Promise<unknown> {
    return http.get(this.baseURL)
  }

  public async createChat(data: Record<string, unknown>): Promise<unknown> {
    return http.post(this.baseURL, { data })
  }

  public async deleteChat(chatId: number): Promise<void> {
    return http.delete(this.baseURL, { data: { chatId: chatId } })
  }

  public async getChatFiles(chatId: string): Promise<unknown> {
    return http.get(`${this.baseURL}/${chatId}/files`)
  }

  public async getArchivedChats(): Promise<unknown> {
    return http.get(`${this.baseURL}/archive`)
  }

  public async archiveChat(chatId: string): Promise<void> {
    return http.post(`${this.baseURL}/archive`, { data: { chatId } })
  }

  public async unarchiveChat(chatId: string): Promise<void> {
    return http.post(`${this.baseURL}/unarchive`, { data: { chatId } })
  }

  public async getCommonChat(chatId: string): Promise<unknown> {
    return http.get(`${this.baseURL}/${chatId}/common`)
  }

  public async getChatUsers(chatId: string): Promise<unknown> {
    return http.get(`${this.baseURL}/${chatId}/users`)
  }

  public async getNewMessagesCount(chatId: string): Promise<unknown> {
    return http.get(`${this.baseURL}/new/${chatId}`)
  }

  public async uploadChatAvatar(data: FormData): Promise<unknown> {
    return http.put(`${this.baseURL}/avatar`, { data })
  }

  public async addUsersToChat(userIds: number[], chatId: number): Promise<void> {
    return http.put(`${this.baseURL}/users`, { data: { users: userIds, chatId: chatId } })
  }

  public async deleteUsersFromChat(userIds: number[], chatId: number): Promise<void> {
    return http.delete(`${this.baseURL}/users`, { data: { users: userIds, chatId: chatId } })
  }

  public async getChatToken(chatId: string): Promise<unknown> {
    return http.post(`${this.baseURL}/token/${chatId}`)
  }
}
