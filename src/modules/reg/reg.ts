import './reg.css'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import { Block } from '../../core/Block'
import { compileTemplate } from '../../utils/template'
import templateSource from './reg.hbs'
import { validateInput, PatternType } from '../../utils/validation'

const appElement = document.getElementById('app')

export default class Reg extends Block<Record<string, unknown>> {
  constructor(props: Record<string, unknown> = {}) {
    super(props)
  }

  render(): string {
    const emailInput = new Input({
      name: 'email',
      placeholder: 'Email',
      type: 'email',
    })

    const loginInput = new Input({
      name: 'login',
      placeholder: 'Username',
    })

    const firstNameInput = new Input({
      name: 'first_name',
      placeholder: 'First Name',
    })

    const lastNameInput = new Input({
      name: 'last_name',
      placeholder: 'Last Name',
    })

    const phoneInput = new Input({
      name: 'phone',
      placeholder: 'Phone',
      type: 'tel',
    })

    const passwordInput = new Input({
      name: 'password',
      placeholder: 'Password',
      type: 'password',
    })

    const confirmPasswordInput = new Input({
      name: 'confirm_password',
      placeholder: 'Confirm Password',
      type: 'password',
    })

    const submitButton = new Button({
      text: 'Sign Up',
      onClick: (e: MouseEvent) => {
        e.preventDefault()
        this.validateForm(
          emailInput,
          loginInput,
          firstNameInput,
          lastNameInput,
          phoneInput,
          passwordInput,
          confirmPasswordInput,
        )
        const formData = {
          email: emailInput.getValue(),
          login: loginInput.getValue(),
          firstName: firstNameInput.getValue(),
          lastName: lastNameInput.getValue(),
          phone: phoneInput.getValue(),
          password: passwordInput.getValue(),
        }
        console.log('Form Data:', formData)
      },
    })

    this.addValidationListeners(
      emailInput,
      loginInput,
      firstNameInput,
      lastNameInput,
      phoneInput,
      passwordInput,
      confirmPasswordInput,
    )

    const imageSrc = 'unlocked.svg'

    const renderedContent = compileTemplate(templateSource, {
      emailInput: emailInput.getContent(),
      loginInput: loginInput.getContent(),
      firstNameInput: firstNameInput.getContent(),
      lastNameInput: lastNameInput.getContent(),
      phoneInput: phoneInput.getContent(),
      passwordInput: passwordInput.getContent(),
      confirmPasswordInput: confirmPasswordInput.getContent(),
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
    let type: PatternType | undefined

    switch (input.props.name) {
    case 'email':
      type = 'email'
      break
    case 'login':
      type = 'login'
      break
    case 'first_name':
      type = 'first_name'
      break
    case 'last_name':
      type = 'second_name'
      break
    case 'phone':
      type = 'phone'
      break
    case 'password':
      type = 'password'
      break
    }

    if (type) {
      const isValid = validateInput(value, type)

      if (!isValid) {
        input.setError(`invalid ${input.props.name}`)
      } else {
        input.clearError()
      }
    }
  }

  private validateForm(
    emailInput: Input,
    loginInput: Input,
    firstNameInput: Input,
    lastNameInput: Input,
    phoneInput: Input,
    passwordInput: Input,
    confirmPasswordInput: Input,
  ): void {
    const emailValue = emailInput.getValue()
    const loginValue = loginInput.getValue()
    const firstNameValue = firstNameInput.getValue()
    const lastNameValue = lastNameInput.getValue()
    const phoneValue = phoneInput.getValue()
    const passwordValue = passwordInput.getValue()
    const confirmPasswordValue = confirmPasswordInput.getValue()

    let isValid = true

    if (!validateField(emailValue, emailInput, 'email')) isValid = false

    if (!validateField(loginValue, loginInput, 'login')) isValid = false

    if (!validateField(firstNameValue, firstNameInput, 'first_name')) isValid = false

    if (!validateField(lastNameValue, lastNameInput, 'second_name')) isValid = false

    if (!validateField(phoneValue, phoneInput, 'phone')) isValid = false

    if (!validateField(passwordValue, passwordInput, 'password')) isValid = false

    if (passwordValue !== confirmPasswordValue) {
      confirmPasswordInput.setError('passwords do not match')
      isValid = false
    } else {
      confirmPasswordInput.clearError()
    }

    if (isValid) {
      console.log('Form is valid!')
    }
  }
}

function validateField(value: string, inputComponent: Input, type: PatternType): boolean {
  const isValid = validateInput(value, type)

  if (!isValid) {
    inputComponent.setError(`invalid ${inputComponent.props.name}`)
  } else {
    inputComponent.clearError()
  }

  return isValid
}
