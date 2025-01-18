import './authLayout.css'
import templateSource from './authLayout.hbs'
import Handlebars from 'handlebars'

const template = Handlebars.compile(templateSource)

export default function AuthLayout({ form, imageSrc }) {
  const html = template({
    form,
    imageSrc,
  })

  const wrapper = document.createElement('div')
  wrapper.innerHTML = html

  return wrapper.firstChild
}
