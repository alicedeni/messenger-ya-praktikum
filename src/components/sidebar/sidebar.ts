import './sidebar.css'
import templateSource from './sidebar.hbs'
import Handlebars from 'handlebars'
import { Block } from '../../core/Block'
import router from '../../core/Router'

const template = Handlebars.compile(templateSource)

export default class Sidebar extends Block<Record<string, unknown>> {
  constructor() {
    super({})
  }

  render(): string {
    return template({})
  }

  protected addEvents(): void {
    const sidebarElement = this.getContent()
    if (!sidebarElement) return

    const links = sidebarElement.querySelectorAll('a')

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const href = link.getAttribute('href')

        if (href) {
          router.go(href)
        }
      })
    })
  }
}
