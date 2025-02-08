import './input.css'
import templateSource from './input.hbs'
import Handlebars from 'handlebars'
import { Block } from '../../core/Block'

interface InputProps extends Record<string, unknown> {
  name: string
  placeholder: string
  type?: string
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props)
  }

  getValue(): string {
    const inputElement = this.getContent().querySelector('input')
    if (!inputElement) {
      return ''
    }
    return (inputElement as HTMLInputElement).value
  }

  setError(message: string): void {
    const errorElement = this.getContent().querySelector('.error-message') as HTMLElement
    if (errorElement) {
      errorElement.textContent = message
      errorElement.style.display = 'block'
    }
  }

  clearError(): void {
    const errorElement = this.getContent().querySelector('.error-message') as HTMLElement
    if (errorElement) {
      errorElement.textContent = ''
      errorElement.style.display = 'none'
    }
  }

  render(): string {
    const template = Handlebars.compile(templateSource)
    return template(this.props)
  }
}
