import './chatDisplay.css'
import templateSource from './chatDisplay.hbs'
import Handlebars from 'handlebars'

const template = Handlebars.compile(templateSource)

export default function ChatDisplay({ chatName }) {
  const html = template({ chatName })
  const wrapper = document.createElement('div')
  wrapper.innerHTML = html

  return wrapper.firstChild
}
