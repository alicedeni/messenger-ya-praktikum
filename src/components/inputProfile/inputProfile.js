import './inputProfile.css'
import templateSource from './inputProfile.hbs'
import Handlebars from 'handlebars'

const template = Handlebars.compile(templateSource)

export default function InputProfile({ name, placeholder, type = 'text', value }) {
  const inputHTML = template({ name, placeholder, type, value })

  const wrapper = document.createElement('div')
  wrapper.innerHTML = inputHTML

  return wrapper.firstChild
}
