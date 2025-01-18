import LoginPage from './pages/loginPage.js'
import RegistrationPage from './pages/registrationPage.js'
import NotFound from './pages/notFound.js'
import ChatPage from './pages/chatPage.js'
import ProfilePage from './pages/profilePage.js'
import ServerError from './pages/ServerError.js'

const routes = {
  '/': LoginPage,
  '/registration': RegistrationPage,
  '/chats': ChatPage,
  '/profile': ProfilePage,
  '/404': NotFound,
  '/500': ServerError,
}

export function router() {
  const path = window.location.pathname
  const render = routes[path] || NotFound
  document.getElementById('app').innerHTML = ''
  const page = render()
  document.getElementById('app').appendChild(page)
}

window.addEventListener('popstate', router)
window.addEventListener('load', router)
