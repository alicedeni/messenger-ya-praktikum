import { HTTPTransport } from '../core/HTTPTransport.ts'
import { API_CONFIG } from '../utils/config.ts'

const http = new HTTPTransport()

interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

interface SigninData {
  login: string
  password: string
}

interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export class AuthService {
  private baseURL = `${API_CONFIG.BASE_URL}/auth`

  public async signup(data: SignupData): Promise<void> {
    await http.post(`${this.baseURL}/signup`, { data })
  }

  public async signin(data: SigninData): Promise<void> {
    await http.post(`${this.baseURL}/signin`, { data })
  }

  public async logout(): Promise<void> {
    await http.post(`${this.baseURL}/logout`)
  }

  public async getUser(): Promise<User> {
    return await http.get(`${this.baseURL}/user`)
  }
}
