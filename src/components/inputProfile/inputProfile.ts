import './inputProfile.css'
import templateSource from './inputProfile.hbs'
import Handlebars from 'handlebars'
import { Block } from '../../core/Block.ts'

interface InputProfileProps extends Record<string, unknown> {
  name: string
  placeholder: string
  type?: string
  value?: string
  disabled?: boolean
}

export default class InputProfile extends Block<InputProfileProps> {
  constructor(props: InputProfileProps) {
    super(props)
  }
  render(): string {
    const template = Handlebars.compile(templateSource)
    return template(this.props)
  }
}
