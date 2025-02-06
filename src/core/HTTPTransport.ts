type HTTPMethod = <R = unknown>(url: string, options?: RequestOptions) => Promise<R>

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  data?: Document | XMLHttpRequestBodyInit | null
  timeout?: number
}

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: HttpMethod.GET })
  post: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: HttpMethod.POST })
  put: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: HttpMethod.PUT })
  delete: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: HttpMethod.DELETE })

  private request<R = unknown>(url: string, options: RequestOptions): Promise<R> {
    const { method = HttpMethod.GET, headers = {}, data = null, timeout } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)

      if (timeout !== undefined) {
        xhr.timeout = timeout
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response)
        } else {
          reject(new Error(`Request failed with status ${xhr.status}`))
        }
      }

      xhr.onerror = () => reject(new Error('Network error'))
      xhr.ontimeout = () => reject(new Error('Request timed out'))

      Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value))

      xhr.send(data || null)
    })
  }
}
