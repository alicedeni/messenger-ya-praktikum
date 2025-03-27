import { expect } from 'chai'
import { HTTPTransport } from './HTTPTransport.ts'

class MockXMLHttpRequest {
  public onload: (() => void) | null = null
  public onerror: (() => void) | null = null
  public ontimeout: (() => void) | null = null
  public status = 200
  public responseText = '{"success":true}'
  public timeout = 0

  public open(_method: string, _url: string): void {
    console.log(_method, _url)
  }

  public send(): void {
    setTimeout(() => {
      if (this.timeout > 0 && this.ontimeout) {
        this.ontimeout()
      } else if (this.status >= 200 && this.status < 300 && this.onload) {
        ;(this as any).response = this.responseText
        this.onload()
      } else if (this.onload) {
        this.onload()
      }
    }, 100)
  }

  public setRequestHeader(): void {}
}

describe('HTTPTransport', () => {
  let http: HTTPTransport

  before(() => {
    ;(global as any).XMLHttpRequest = MockXMLHttpRequest
  })

  after(() => {
    delete (global as any).XMLHttpRequest
  })

  beforeEach(() => {
    http = new HTTPTransport()
    MockXMLHttpRequest.prototype.status = 200
    MockXMLHttpRequest.prototype.responseText = '{"success":true}'
  })

  it('should initialize correctly', () => {
    expect(http).to.be.an.instanceof(HTTPTransport)
  })

  it('should send a request and receive a successful response', async () => {
    const response = await http.get('https://jsonplaceholder.typicode.com/posts/1')
    expect(response).to.deep.equal({ success: true })
  })

  it('should handle network errors correctly', async () => {
    MockXMLHttpRequest.prototype.send = function () {
      if (this.onerror) this.onerror()
    }

    try {
      await http.get('https://test.com/network')
      expect.fail('Expected network error was not thrown')
    } catch (error: any) {
      expect(error.message).to.equal('Network error')
    }
  })

  it('should handle timeouts correctly', async () => {
    MockXMLHttpRequest.prototype.send = function () {
      if (this.ontimeout) this.ontimeout()
    }

    try {
      await http.get('https://test.com/timeout', { timeout: 1000 })
      expect.fail('Expected timeout error was not thrown')
    } catch (error: any) {
      expect(error.message).to.equal('Request timed out')
    }
  })
})
