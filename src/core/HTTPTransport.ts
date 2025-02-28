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
  data?: Document | XMLHttpRequestBodyInit | null | any
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
          try {
            const response = xhr.response ? JSON.parse(xhr.response) : xhr.response
            resolve(response)
          } catch (e) {
            console.error(e)
            resolve(xhr.response)
          }
        } else {
          try {
            const errorResponse = JSON.parse(xhr.responseText)
            reject({
              error: new Error(
                `Request failed with status ${xhr.status}. Response: ${xhr.statusText}`,
              ),
              response: errorResponse,
            })
          } catch (e) {
            console.error('Error parsing response:', e)
            reject(
              new Error(`Request failed with status ${xhr.status}. Response: ${xhr.responseText}`),
            )
          }
        }
      }

      xhr.onerror = () => reject(new Error('Network error'))
      xhr.ontimeout = () => reject(new Error('Request timed out'))

      Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value))

      xhr.setRequestHeader('Accept', 'application/json')
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json')
      }
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true')
      xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      xhr.withCredentials = true

      if (method === HttpMethod.GET || !data) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.send(typeof data === 'string' ? data : JSON.stringify(data))
      }
    })
  }
}
