import './sidebar.css'
import templateSource from './sidebar.hbs'
import Handlebars from 'handlebars'

const template = Handlebars.compile(templateSource)

export default function Sidebar() {
  const html = template()
  const wrapper = document.createElement('div')
  wrapper.innerHTML = html

  return wrapper.firstChild
}
