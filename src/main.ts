import LoginPage from './pages/loginPage.ts'
import RegistrationPage from './pages/registrationPage.ts'
import NotFound from './pages/notFound.ts'
import ChatPage from './pages/chatPage.ts'
import ProfilePage from './pages/profilePage.ts'
import ServerError from './pages/serverError.ts'
import Router from './core/Router.ts'

const app = document.getElementById('app')
if (!app) {
  throw new Error('App element not found')
}
const router = new Router('#app')

;(window as any).router = router

router
  .use('/', LoginPage)
  .use('/sign-up', RegistrationPage)
  .use('/messenger', ChatPage)
  .use('/settings', ProfilePage)
  .use('/404', NotFound)
  .use('/500', () => ServerError(500))

router.start()
