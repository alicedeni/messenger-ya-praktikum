import LoginPage from './pages/loginPage'
import RegistrationPage from './pages/registrationPage'
import NotFound from './pages/notFound'
import ChatPage from './pages/chatPage'
import ProfilePage from './pages/profilePage'
import ServerError from './pages/serverError'
import router from './core/Router'

const app = document.getElementById('app')
if (!app) {
  throw new Error('App element not found')
}

router
  .use('/', LoginPage)
  .use('/sign-up', RegistrationPage)
  .use('/messenger', ChatPage)
  .use('/settings', ProfilePage)
  .use('/404', NotFound)
  .use('/500', () => ServerError(500))

router.start()
