import './error.css'
import templateSource from './error.hbs'
import Handlebars from 'handlebars'

const template = Handlebars.compile(templateSource)

export default function ErrorLayout({ title, icon, message, linkText, linkHref }) {
  const html = template({
    title,
    icon,
    message,
    linkText,
    linkHref,
  })

  const wrapper = document.createElement('div')
  wrapper.innerHTML = html

  return wrapper.firstChild
}
