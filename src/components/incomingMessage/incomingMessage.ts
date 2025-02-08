import './incomingMessage.css'
import templateSource from './incomingMessage.hbs'
import Handlebars from 'handlebars'
import { Block } from '../../core/Block'

interface IncomingMessageProps extends Record<string, unknown> {
  text: string
  time: string
}

export default class IncomingMessage extends Block<IncomingMessageProps> {
  constructor(props: IncomingMessageProps) {
    super(props)
  }

  render(): string {
    const template = Handlebars.compile(templateSource)
    return template(this.props)
  }
}
