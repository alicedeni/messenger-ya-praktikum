import './profile.css'
import Sidebar from '../../components/sidebar/sidebar.js'
import templateSource from './profile.hbs'
import Handlebars from 'handlebars'

const template = Handlebars.compile(templateSource)

export default function ProfileLayout({ profileContent }) {
  const sidebar = Sidebar()
  const html = template({ sidebar: sidebar.outerHTML, profileContent })

  const wrapper = document.createElement('div')
  wrapper.innerHTML = html

  return wrapper.firstChild
}
