import './sidebar.css'
import templateSource from './sidebar.hbs'
import Handlebars from 'handlebars'
import { Block } from '../../core/Block'

const template = Handlebars.compile(templateSource)

export default class Sidebar extends Block<Record<string, unknown>> {
  constructor() {
    super({})
  }

  render(): string {
    return template({})
  }
}
