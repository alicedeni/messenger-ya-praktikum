import './chats.css'
import Sidebar from '../../components/sidebar/sidebar.js'
import templateSource from './chats.hbs'
import Handlebars from 'handlebars'

const template = Handlebars.compile(templateSource)

export default function ChatLayout({ chatList, chatDisplay }) {
  const sidebar = Sidebar()
  const html = template({
    sidebar: sidebar.outerHTML,
    chatList: chatList.outerHTML,
    chatDisplay: chatDisplay.outerHTML,
  })
  const wrapper = document.createElement('div')
  wrapper.innerHTML = html

  return wrapper.firstChild
}
