import LoginPage from './pages/loginPage'
import RegistrationPage from './pages/registrationPage'
import NotFound from './pages/notFound'
import ChatPage from './pages/chatPage'
import ProfilePage from './pages/profilePage'
import ServerError from './pages/serverError'

type Route = () => HTMLElement

interface Routes {
  [key: string]: Route
}

const routes: Routes = {
  '/': LoginPage,
  '/registration': RegistrationPage,
  '/chats': ChatPage,
  '/profile': ProfilePage,
  '/404': NotFound,
  '/500': () => ServerError(500),
}

export function router(): void {
  const path = window.location.pathname
  const render = routes[path] || NotFound

  const appElement = document.getElementById('app')
  if (appElement) {
    const page = render()
    document.getElementById('app')?.appendChild(page)
  } else {
    console.error('App element not found')
  }
}

window.addEventListener('popstate', router)
window.addEventListener('load', router)
