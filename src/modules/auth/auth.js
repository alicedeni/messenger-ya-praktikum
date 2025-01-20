import './auth.css'
import Input from '../../components/input/input.js'
import Button from '../../components/button/button.js'
import templateSource from './auth.hbs'
import ServerError from '../../pages/serverError.js'
import { API_CONFIG } from '../../config'
import Handlebars from 'handlebars'

const template = Handlebars.compile(templateSource)

export default function Auth() {
  const form = document.createElement('form')

  const loginInput = Input({ name: 'login', placeholder: 'username' })
  const passwordInput = Input({ name: 'password', placeholder: 'password', type: 'password' })

  const submitButton = Button({
    text: 'Sign in',
    onClick: async (e) => {
      e.preventDefault()
      const login = loginInput.value
      const password = passwordInput.value

      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login, password }),
        })

        if (response.status >= 500 && response.status < 600) {
          const serverErrorPage = ServerError(response.status)
          document.getElementById('app').innerHTML = ''
          document.getElementById('app').appendChild(serverErrorPage)
          return
        }

        if (!response.ok) {
          throw new Error('Error logging in')
        }

        const data = await response.json()
        console.log('Successful login:', data)
      } catch (error) {
        console.error(error)
      }
    },
  })

  const formFields = `${loginInput.outerHTML}${passwordInput.outerHTML}${submitButton.outerHTML}`

  form.innerHTML = template({ form: formFields })

  return form
}
