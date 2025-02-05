import './auth.css'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import { Block } from '../../core/Block'
import { compileTemplate } from '../../utils/template'
import templateSource from './auth.hbs'
import { validateInput, PatternType } from '../../utils/validation'

const appElement = document.getElementById('app')

export default class Auth extends Block<Record<string, unknown>> {
  constructor(props: Record<string, unknown> = {}) {
    super(props)
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
      onClick: (e: MouseEvent) => {
        e.preventDefault()
        this.validateForm(loginInput, passwordInput)
        const login = loginInput.getValue()
        const password = passwordInput.getValue()
        console.log({ login, password })
      },
    })

    this.addValidationListeners(loginInput, passwordInput)

    const imageSrc = 'unlocked.svg'

    const renderedContent = compileTemplate(templateSource, {
      loginInput: loginInput.getContent(),
      passwordInput: passwordInput.getContent(),
      submitButton: submitButton.getContent(),
      imageSrc,
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

    if (isValid) {
      console.log('Form is valid!')
    }
  }
}
