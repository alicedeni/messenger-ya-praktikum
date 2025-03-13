import './auth.css'
import Input from '../../components/input/input.ts'
import Button from '../../components/button/button.ts'
import { Block } from '../../core/Block.ts'
import { compileTemplate } from '../../utils/template.ts'
import templateSource from './auth.hbs'
import { validateInput, PatternType } from '../../utils/validation.ts'
import { AuthService } from '../../services/authService.ts'
import { sanitizeHTML } from '../../utils/helpers.ts'

const authService = new AuthService()

const appElement = document.getElementById('app')

export default class Auth extends Block<Record<string, unknown>> {
  private isValid: boolean

  constructor(props: Record<string, unknown> = {}) {
    super(props)
    this.isValid = false
  }

  render(): string {
    const loginInput = new Input({
      name: 'login',
      placeholder: 'username',
    })

    const passwordInput = new Input({
      name: 'password',
      placeholder: 'password',
      type: 'password',
    })

    const submitButton = new Button({
      text: 'Sign in',
      onClick: async (e: MouseEvent) => {
        e.preventDefault()
        this.validateForm(loginInput, passwordInput)

        if (this.isValid) {
          const login = sanitizeHTML(loginInput.getValue())
          const password = sanitizeHTML(passwordInput.getValue())
          /* eslint-disable indent */
          try {
            await authService.signin({ login, password })
            ;(window as any).router.go('/messenger')
          } catch (error: any) {
            if (error.response && error.response.reason === 'User already in system') {
              (window as any).router.go('/messenger')
            } else {
              console.error('Sign in failed:', error)
            }
          }
        }
      },
    })

    const createAccountLink = document.createElement('a')
    createAccountLink.href = '/sign-up'
    createAccountLink.textContent = 'Create account'
    createAccountLink.addEventListener('click', (e) => {
      e.preventDefault()
      ;(window as any).router.go('/sign-up')
    })

    this.addValidationListeners(loginInput, passwordInput)

    const imageSrc = 'unlocked.svg'

    const renderedContent = compileTemplate(templateSource, {
      loginInput: loginInput.getContent(),
      passwordInput: passwordInput.getContent(),
      submitButton: submitButton.getContent(),
      imageSrc,
      createAccountLink: createAccountLink.outerHTML,
    })

    if (appElement) {
      appElement.innerHTML = ''
      appElement.appendChild(renderedContent)
    }

    return ''
  }

  private addValidationListeners(...inputs: Input[]): void {
    inputs.forEach((input) => {
      input
        .getContent()
        .querySelector('input')
        ?.addEventListener('blur', () => {
          this.validateField(input)
        })
    })
  }

  private validateField(input: Input): void {
    const value = input.getValue()
    let type: PatternType
    /* eslint-disable indent */
    switch (input.props.name) {
      case 'login':
        type = 'login'
        break
      case 'password':
        type = 'password'
        break
      default:
        return
    }
    /* eslint-enable indent */

    const isValid = validateInput(value, type)

    if (!isValid) {
      input.setError(`invalid ${input.props.name}`)
    } else {
      input.clearError()
    }
  }

  private validateForm(loginInput: Input, passwordInput: Input): void {
    const loginValue = loginInput.getValue()
    const passwordValue = passwordInput.getValue()

    let isValid = true

    if (!validateInput(loginValue, 'login')) {
      loginInput.setError('invalid login')
      isValid = false
    } else {
      loginInput.clearError()
    }

    if (!validateInput(passwordValue, 'password')) {
      passwordInput.setError('invalid password')
      isValid = false
    } else {
      passwordInput.clearError()
    }

    this.isValid = isValid

    if (isValid) {
      console.log('Form is valid!')
    }
  }
}
