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
}

export class HTTPTransport {
  get(url: string, options: RequestOptions = {}): Promise<unknown> {
    return this.request(url, { ...options, method: HttpMethod.GET })
  }

  post(url: string, options: RequestOptions = {}): Promise<unknown> {
    return this.request(url, { ...options, method: HttpMethod.POST })
  }

  put(url: string, options: RequestOptions = {}): Promise<unknown> {
    return this.request(url, { ...options, method: HttpMethod.PUT })
  }

  delete(url: string, options: RequestOptions = {}): Promise<unknown> {
    return this.request(url, { ...options, method: HttpMethod.DELETE })
  }

  private request(url: string, options: RequestOptions): Promise<unknown> {
    const { method = HttpMethod.GET, headers = {}, data } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response)
        } else {
          reject(xhr.response)
        }
      }

      xhr.onerror = () => reject(xhr.response)

      Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value))

      xhr.send(data || null)
    })
  }
}
