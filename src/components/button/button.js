import './button.css'
import templateSource from './button.hbs'
import Handlebars from 'handlebars'

const template = Handlebars.compile(templateSource)

export default function Button({ text, onClick }) {
  const buttonHTML = template({ text })

  const button = document.createElement('div')
  button.innerHTML = buttonHTML
  const innerButton = button.querySelector('button')

  innerButton.onclick = onClick
  return innerButton
}
