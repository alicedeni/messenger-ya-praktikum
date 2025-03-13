import { HTTPTransport } from '../core/HTTPTransport.ts'
import { API_CONFIG } from '../utils/config.ts'

const http = new HTTPTransport()

export class UserService {
  private baseURL = `${API_CONFIG.BASE_URL}/user`

  public async changeUserProfile(data: Record<string, unknown>): Promise<unknown> {
    return http.put(`${this.baseURL}/profile`, { data })
  }

  public async changeUserAvatar(data: FormData): Promise<unknown> {
    return http.put(`${this.baseURL}/profile/avatar`, { data })
  }

  public async changeUserPassword(data: Record<string, unknown>): Promise<void> {
    return http.put(`${this.baseURL}/password`, { data })
  }

  public async searchUser(login: string): Promise<unknown> {
    return http.post(`${this.baseURL}/search`, { data: { login } })
  }
}
