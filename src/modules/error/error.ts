import './error.css'
import templateSource from './error.hbs'
import Handlebars from 'handlebars'
import { Block } from '../../core/Block'

interface ErrorLayoutProps extends Record<string, unknown> {
  title: string
  icon: string
  message: string
  linkText: string
  linkHref: string
}

const template = Handlebars.compile(templateSource)

export default class ErrorLayout extends Block<ErrorLayoutProps> {
  constructor(props: ErrorLayoutProps) {
    super(props)
    this.render()
  }

  render(): string {
    return template(this.props)
  }
}
