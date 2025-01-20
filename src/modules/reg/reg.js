import './reg.css'
import Input from '../../components/input/input.js'
import Button from '../../components/button/button.js'
import templateSource from './reg.hbs'
import ServerError from '../../pages/serverError.js'
import { API_CONFIG } from '../../config'
import Handlebars from 'handlebars'

const template = Handlebars.compile(templateSource)

export default function Reg() {
  const form = document.createElement('form')

  const emailInput = Input({ name: 'email', placeholder: 'email', type: 'email' })
  const usernameInput = Input({ name: 'login', placeholder: 'username' })
  const firstNameInput = Input({ name: 'first_name', placeholder: 'first name' })
  const lastNameInput = Input({ name: 'last_name', placeholder: 'second name' })
  const phoneInput = Input({ name: 'phone', placeholder: 'phone', type: 'tel' })
  const passwordInput = Input({ name: 'password', placeholder: 'password', type: 'password' })
  const confirmPasswordInput = Input({
    name: 'confirm_password',
    placeholder: 'password (again)',
    type: 'password',
  })

  const submitButton = Button({
    text: 'Sign Up',
    onClick: async (e) => {
      e.preventDefault()
      const email = emailInput.value
      const username = usernameInput.value
      const firstName = firstNameInput.value
      const lastName = lastNameInput.value
      const phone = phoneInput.value
      const password = passwordInput.value
      const confirmPassword = confirmPasswordInput.value

      if (password !== confirmPassword) {
        alert('The passwords do not match')
        return
      }

      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, username, firstName, lastName, phone, password }),
        })

        if (response.status >= 500 && response.status < 600) {
          const serverErrorPage = ServerError(response.status)
          document.getElementById('app').innerHTML = ''
          document.getElementById('app').appendChild(serverErrorPage)
          return
        }

        if (!response.ok) {
          throw new Error('Error during registration')
        }

        const data = await response.json()
        console.log('Successful registration:', data)
      } catch (error) {
        console.error(error)
      }
    },
  })

  const formFields = `
        ${emailInput.outerHTML}
        ${usernameInput.outerHTML}
        ${firstNameInput.outerHTML}
        ${lastNameInput.outerHTML}
        ${phoneInput.outerHTML}
        ${passwordInput.outerHTML}
        ${confirmPasswordInput.outerHTML}
        ${submitButton.outerHTML}
    `

  form.innerHTML = template({ form: formFields })

  return form
}
