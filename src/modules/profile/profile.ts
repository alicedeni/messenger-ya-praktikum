import './profile.css'
import templateSource from './profile.hbs'
import { Block } from '../../core/Block'
import InputProfile from '../../components/inputProfile/inputProfile'
import { compileTemplate } from '../../utils/template'
import Sidebar from '../../components/sidebar/sidebar'
import { validateInput, PatternType } from '../../utils/validation'
import router from '../../core/Router'
import { AuthService } from '../../services/authService'
import { UserService } from '../../services/userService'
import { API_CONFIG } from '../../utils/config'

const authService = new AuthService()
const userService = new UserService()

export interface UserData {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
  [key: string]: unknown
}

interface ProfileProps extends Record<string, unknown> {
  userData: UserData
}

export default class Profile extends Block<ProfileProps> {
  private sidebar: Sidebar

  constructor(props: ProfileProps) {
    super(props)
    this.sidebar = new Sidebar()
    this.loadUserData()
  }

  private async loadUserData() {
    try {
      const user = await authService.getUser()
      console.log(user)
      const userData: UserData = {
        first_name: user.first_name,
        second_name: user.second_name,
        display_name: user.display_name,
        login: user.login,
        email: user.email,
        phone: user.phone,
        avatar: `${API_CONFIG.BASE_URL}/resources${user.avatar}` || 'avatar.png',
      }
      this.setProps({ userData })
    } catch (error) {
      console.error('Failed to get user data:', error)
      router.go('/')
    }
  }

  render(): string {
    if (!this.props.userData) {
      return 'Loading...'
    }

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
    const exitButton = document.querySelector('.profile-form__button-exit') as HTMLButtonElement
    const changePasswordButton = document.getElementById('editPassword') as HTMLButtonElement

    if (editButton && saveButton) {
      editButton.addEventListener('click', () => this.enableEditing())
      saveButton.addEventListener('click', () => this.saveChanges())
    }

    if (exitButton) {
      exitButton.addEventListener('click', async () => {
        try {
          await authService.logout()
          router.go('/')
        } catch (error) {
          console.error('Logout failed:', error)
        }
      })
    }

    if (changePasswordButton) {
      changePasswordButton.addEventListener('click', () => this.changePassword())
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
    /* eslint-disable indent */
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
    /* eslint-enable indent */
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

    const avatarInput = document.getElementById('avatar') as HTMLInputElement
    if (avatarInput) {
      avatarInput.style.display = 'block'
    }

    const editButton = document.getElementById('editData') as HTMLButtonElement
    const saveButton = document.getElementById('saveData') as HTMLButtonElement

    if (editButton && saveButton) {
      editButton.style.display = 'none'
      saveButton.style.display = 'block'
    }
  }

  private async saveChanges() {
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
      /* eslint-disable indent */
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
      /* eslint-enable indent */

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

    const avatarInput = document.getElementById('avatar') as HTMLInputElement
    if (avatarInput) {
      const avatarFile = avatarInput.files?.[0]
      if (avatarFile) {
        const formData = new FormData()
        formData.append('avatar', avatarFile)

        try {
          await userService.changeUserAvatar(formData)
          console.log('Avatar updated successfully')
        } catch (error) {
          console.error('Failed to update avatar:', error)
        }
      }
    }

    updatedUserData.avatar = this.props.userData.avatar

    inputs.forEach((input) => (input.disabled = true))

    const editButton = document.getElementById('editData') as HTMLButtonElement
    const saveButton = document.getElementById('saveData') as HTMLButtonElement

    if (editButton && saveButton) {
      editButton.style.display = 'block'
      saveButton.style.display = 'none'
    }

    this.updateProfile(updatedUserData)
    await this.loadUserData()
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

  private async updateProfile(data: UserData) {
    try {
      await userService.changeUserProfile(data as Record<string, unknown>)
      await this.loadUserData()
      console.log('Profile updated successfully')
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  private async changePassword() {
    const modal = document.getElementById('passwordModal') as HTMLElement
    const closeButton = document.querySelector('.close-button') as HTMLElement
    const passwordForm = document.getElementById('changePasswordForm') as HTMLFormElement

    modal.style.display = 'block'

    closeButton.onclick = () => {
      modal.style.display = 'none'
    }

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none'
      }
    }

    passwordForm.onsubmit = async (e) => {
      e.preventDefault()

      const oldPasswordInput = document.getElementById('oldPassword') as HTMLInputElement
      const newPasswordInput = document.getElementById('newPassword') as HTMLInputElement
      const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement

      if (newPasswordInput.value !== confirmPasswordInput.value) {
        alert('Passwords do not match')
        return
      }

      try {
        await userService.changeUserPassword({
          oldPassword: oldPasswordInput.value,
          newPassword: newPasswordInput.value,
        })
        console.log('Password changed successfully')
        modal.style.display = 'none'
      } catch (error) {
        console.error('Failed to change password:', error)
      }
    }
  }
}
