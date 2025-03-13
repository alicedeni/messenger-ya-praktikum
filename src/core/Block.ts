import { EventBus } from './EventBus.ts'

export class Block<P extends Record<string, unknown> = Record<string, unknown>> {
  private eventBus: EventBus
  private element: HTMLElement | null = null
  public props: P

  constructor(props: P, parent?: HTMLElement) {
    this.eventBus = new EventBus()
    this.props = this._makePropsProxy(props)

    this.eventBus.on('flow:render', this._render.bind(this))
    this.init()

    if (parent) {
      parent.appendChild(this.getContent())
    }
  }

  init(): void {}

  private _makePropsProxy(props: P): P {
    return new Proxy(props, {
      set: (target, prop: string, value) => {
        target[prop as keyof P] = value
        this.eventBus.emit('flow:render')
        return true
      },
      get(target, prop) {
        const value = target[prop as keyof P]
        return typeof value === 'function' ? value.bind(target) : value
      },
      deleteProperty() {
        throw new Error('No access')
      },
    })
  }

  setProps(nextProps: Partial<P>): void {
    if (!nextProps) {
      return
    }
    Object.assign(this.props, nextProps)
    this.eventBus.emit('flow:render')
  }

  private _render(): void {
    this._removeEvents()
    const content = this.render()
    if (this.element) {
      this.element.innerHTML = ''
      this.element.insertAdjacentHTML('beforeend', content)
    }
    this._addEvents()
  }

  render(): string {
    return ''
  }

  private _addEvents(): void {
    const { events } = this.props as { events?: Record<string, (e: Event) => void> }
    if (!events || !this.element) return

    Object.keys(events).forEach((eventName) => {
      const handler = events[eventName]
      if (typeof handler === 'function') {
        this.element!.addEventListener(eventName, handler)
      }
    })
  }

  private _removeEvents(): void {
    const { events = {} } = this.props as { events?: Record<string, (e: Event) => void> }

    Object.keys(events).forEach((eventName) => {
      if (typeof events[eventName] === 'function') {
        if (this.element) {
          try {
            this.element.removeEventListener(eventName, events[eventName])
          } catch (error) {
            console.error(`Error deleting listener ${eventName}:`, error)
          }
        }
      }
    })
  }

  getContent(): HTMLElement {
    if (!this.element) {
      this.element = document.createElement('div')
      this._render()
      this._addEvents()
    }
    return this.element
  }

  show(): void {
    const content = this.getContent()
    content.style.display = 'block'
  }

  hide(): void {
    const content = this.getContent()
    content.style.display = 'none'
  }
}
