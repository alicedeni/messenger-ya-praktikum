import './profile.css'
import templateSource from './profile.hbs'
import { Block } from '../../core/Block'
import InputProfile from '../../components/inputProfile/inputProfile'
import { compileTemplate } from '../../utils/template'
import Sidebar from '../../components/sidebar/sidebar'
import { validateInput, PatternType } from '../../utils/validation'

interface UserData {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

interface ProfileProps extends Record<string, unknown> {
  userData: UserData
}

export default class Profile extends Block<ProfileProps> {
  private sidebar: Sidebar

  constructor(props: ProfileProps) {
    super(props)
    this.sidebar = new Sidebar()
  }

  render(): string {
    const { userData } = this.props

    const emailInput = new InputProfile({
      name: 'email',
      placeholder: 'email',
      type: 'email',
      value: userData.email,
      disabled: true,
    })

    const loginInput = new InputProfile({
      name: 'login',
      placeholder: 'username',
      type: 'text',
      value: userData.login,
      disabled: true,
    })

    const firstNameInput = new InputProfile({
      name: 'first_name',
      placeholder: 'first name',
      type: 'text',
      value: userData.first_name,
      disabled: true,
    })

    const secondNameInput = new InputProfile({
      name: 'second_name',
      placeholder: 'second name',
      type: 'text',
      value: userData.second_name,
      disabled: true,
    })

    const displayNameInput = new InputProfile({
      name: 'display_name',
      placeholder: 'name in chat',
      type: 'text',
      value: userData.display_name,
      disabled: true,
    })

    const phoneInput = new InputProfile({
      name: 'phone',
      placeholder: 'phone',
      type: 'text',
      value: userData.phone,
      disabled: true,
    })

    const renderedContent = compileTemplate(templateSource, {
      emailInput: emailInput.getContent(),
      loginInput: loginInput.getContent(),
      firstNameInput: firstNameInput.getContent(),
      secondNameInput: secondNameInput.getContent(),
      displayNameInput: displayNameInput.getContent(),
      phoneInput: phoneInput.getContent(),
      avatar: userData.avatar,
      display_name: userData.display_name,
      sidebar: this.sidebar.getContent(),
    })

    const appElement = document.getElementById('app')

    if (appElement) {
      appElement.innerHTML = ''
      appElement.appendChild(renderedContent)

      this.setEventListeners()
    }

    return ''
  }

  private setEventListeners() {
    const editButton = document.getElementById('editData') as HTMLButtonElement
    const saveButton = document.getElementById('saveData') as HTMLButtonElement

    if (editButton && saveButton) {
      editButton.addEventListener('click', () => this.enableEditing())
      saveButton.addEventListener('click', () => this.saveChanges())
    }

    this.addValidationListeners()
  }

  private addValidationListeners() {
    const inputs = document.querySelectorAll(
      '.input-profile__field',
    ) as NodeListOf<HTMLInputElement>

    inputs.forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input))
    })
  }

  private validateField(inputElement: HTMLInputElement): void {
    const value = inputElement.value
    let type: PatternType | undefined

    switch (inputElement.name) {
    case 'email':
      type = 'email'
      break
    case 'login':
      type = 'login'
      break
    case 'first_name':
      type = 'first_name'
      break
    case 'second_name':
      type = 'second_name'
      break
    case 'phone':
      type = 'phone'
      break
    }

    if (type) {
      const isValid = validateInput(value, type)

      const errorMessageElement = inputElement
        .closest('.input-profile')
        ?.querySelector('.input-profile__error') as HTMLElement

      if (!isValid) {
        if (errorMessageElement) {
          errorMessageElement.textContent = `invalid ${inputElement.name}`
          errorMessageElement.style.display = 'block'
        }
        inputElement.classList.add('input-error')
        return
      } else {
        this.clearErrorMessage(inputElement)
        console.log(`${inputElement.name} is valid`)
        inputElement.classList.remove('input-error')
      }
    }
  }

  private enableEditing() {
    const inputs = document.querySelectorAll(
      '.input-profile__field',
    ) as NodeListOf<HTMLInputElement>

    inputs.forEach((input) => (input.disabled = false))

    const editButton = document.getElementById('editData') as HTMLButtonElement
    const saveButton = document.getElementById('saveData') as HTMLButtonElement

    if (editButton && saveButton) {
      editButton.style.display = 'none'
      saveButton.style.display = 'block'
    }
  }

  private saveChanges() {
    let isValid = true

    const updatedUserData: UserData = {
      first_name: (document.querySelector('input[name="first_name"]') as HTMLInputElement).value,
      second_name: (document.querySelector('input[name="second_name"]') as HTMLInputElement).value,
      login: (document.querySelector('input[name="login"]') as HTMLInputElement).value,
      email: (document.querySelector('input[name="email"]') as HTMLInputElement).value,
      phone: (document.querySelector('input[name="phone"]') as HTMLInputElement).value,
      avatar: this.props.userData.avatar,
      display_name: (document.querySelector('input[name="display_name"]') as HTMLInputElement)
        .value,
    }

    const inputs = document.querySelectorAll(
      '.input-profile__field',
    ) as NodeListOf<HTMLInputElement>

    inputs.forEach((input) => {
      const value = input.value
      let type: PatternType | undefined

      switch (input.name) {
      case 'email':
        type = 'email'
        break
      case 'login':
        type = 'login'
        break
      case 'first_name':
        type = 'first_name'
        break
      case 'second_name':
        type = 'second_name'
        break
      case 'phone':
        type = 'phone'
        break
      }

      if (type) {
        const isFieldValid = validateInput(value, type)
        if (!isFieldValid) {
          isValid = false
          this.showErrorMessage(input)
        } else {
          this.clearErrorMessage(input)
        }
      }
    })

    if (!isValid) {
      console.log('Validation failed. Please correct the errors and try again.')
      return
    }

    console.log('Updated User Data:', updatedUserData)

    inputs.forEach((input) => (input.disabled = true))

    const editButton = document.getElementById('editData') as HTMLButtonElement
    const saveButton = document.getElementById('saveData') as HTMLButtonElement

    if (editButton && saveButton) {
      editButton.style.display = 'block'
      saveButton.style.display = 'none'
    }
  }

  private showErrorMessage(inputElement: HTMLInputElement): void {
    const errorMessageElement = inputElement
      .closest('.input-profile')
      ?.querySelector('.input-profile__error') as HTMLElement

    if (errorMessageElement) {
      errorMessageElement.textContent = `Invalid ${inputElement.name}`
      errorMessageElement.style.display = 'block'
      inputElement.classList.add('input-error')
    }
  }

  private clearErrorMessage(inputElement: HTMLInputElement): void {
    const errorMessageElement = inputElement
      .closest('.input-profile')
      ?.querySelector('.input-profile__error') as HTMLElement

    if (errorMessageElement) {
      errorMessageElement.textContent = ''
      errorMessageElement.style.display = 'none'
      inputElement.classList.remove('input-error')
    }
  }
}
