import './button.css'
import templateSource from './button.hbs'
import Handlebars from 'handlebars'
import { Block } from '../../core/Block.ts'

interface ButtonProps extends Record<string, unknown> {
  text: string
  onClick?: (event: MouseEvent) => void
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    })
  }

  render(): string {
    const template = Handlebars.compile(templateSource)
    return template({ text: this.props.text })
  }
}
