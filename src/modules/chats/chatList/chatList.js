import './chatList.css'
import templateSource from './chatList.hbs'
import Handlebars from 'handlebars'

const template = Handlebars.compile(templateSource)

export default function ChatList() {
  const chats = [
    { name: 'Andrey', time: '10:49', text: 'Привет!', unread: 2, image: 'gray.jpg' },
    { name: 'Ivan', time: '10:30', text: 'Как дела?', unread: 1, image: 'gray.jpg' },
    {
      name: 'Maria',
      time: '09:15',
      text: 'Увидимся позже.',
      unread: 0,
      image: 'gray.jpg',
    },
  ]

  const html = template({ chats })
  const wrapper = document.createElement('div')
  wrapper.innerHTML = html

  chats.forEach((chat, index) => {
    const chatItem = wrapper.querySelectorAll('.chat-list__item')[index]
    chatItem.onclick = () => {
      onChatSelect(chat)
    }
  })

  return wrapper.firstChild
}
