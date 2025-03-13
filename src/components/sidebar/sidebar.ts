import './sidebar.css'
import templateSource from './sidebar.hbs'
import Handlebars from 'handlebars'
import { Block } from '../../core/Block.ts'

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
          (window as any).router.go(href)
        }
      })
    })
  }
}
