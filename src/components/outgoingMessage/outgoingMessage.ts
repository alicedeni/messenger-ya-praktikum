import './outgoingMessage.css'
import templateSource from './outgoingMessage.hbs'
import Handlebars from 'handlebars'
import { Block } from '../../core/Block.ts'

interface OutgoingMessageProps extends Record<string, unknown> {
  text: string
  time: string
}

export default class OutgoingMessage extends Block<OutgoingMessageProps> {
  constructor(props: OutgoingMessageProps) {
    super(props)
  }

  render(): string {
    const template = Handlebars.compile(templateSource)
    return template(this.props)
  }
}
