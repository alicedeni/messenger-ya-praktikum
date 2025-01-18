import './input.css'
import templateSource from './input.hbs'
import Handlebars from 'handlebars'

const template = Handlebars.compile(templateSource)

export default function Input({ name, placeholder, type = 'text' }) {
  const inputHTML = template({ name, placeholder, type })

  const wrapper = document.createElement('div')
  wrapper.innerHTML = inputHTML

  return wrapper.firstChild
}
