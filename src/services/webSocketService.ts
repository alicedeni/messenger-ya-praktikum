interface WebSocketOptions {
  userId: string
  chatId: string
  token: string
}

class WebSocketService {
  private socket: WebSocket | null = null
  private onMessageCallback: ((message: any) => void) | null = null

  constructor(private options: WebSocketOptions) {}

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const socketYa = `wss://ya-praktikum.tech/ws/chats/${this.options.userId}`
      const socketUrl = `${socketYa}/${this.options.chatId}/${this.options.token}`
      this.socket = new WebSocket(socketUrl)

      this.socket.addEventListener('open', () => {
        console.log('Connection established')
        this.startPing()
        resolve()
      })

      this.socket.addEventListener('close', (event: CloseEvent) => {
        this.stopPing()
        if (event.wasClean) {
          console.log('Connection closed clear')
        } else {
          console.log('Connection broken')
        }

        console.log(`Code: ${event.code} | Cause: ${event.reason}`)
      })

      this.socket.addEventListener('message', (event: MessageEvent) => {
        console.log('Data received', event.data)
        this.handleIncomingMessage(event.data)
      })

      this.socket.addEventListener('error', (event: Event) => {
        console.log('Error', event)
        reject(event)
      })
    })
  }

  public sendMessage(message: { content: string; type: string }): void {
    if (this.socket) {
      this.socket.send(JSON.stringify(message))
    } else {
      console.error('Connection not established')
    }
  }

  public setOnMessageCallback(callback: (message: any) => void): void {
    this.onMessageCallback = callback
  }

  private handleIncomingMessage(data: string): void {
    try {
      const message = JSON.parse(data)
      if (this.onMessageCallback) {
        this.onMessageCallback(message)
      }
    } catch (error) {
      console.error('Error parsing message:', error)
    }
  }

  private pingInterval: NodeJS.Timeout | null = null

  private startPing(): void {
    this.pingInterval = setInterval(() => {
      if (this.socket) {
        this.socket.send(JSON.stringify({ type: 'ping' }))
      }
    }, 10000)
  }

  private stopPing(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval)
      this.pingInterval = null
    }
  }
}

export default WebSocketService
