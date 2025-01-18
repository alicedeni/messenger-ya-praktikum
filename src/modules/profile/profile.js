import './profile.css'
import templateSource from './profile.hbs'
import Handlebars from 'handlebars'
import InputProfile from '../../components/inputProfile/inputProfile.js'

const template = Handlebars.compile(templateSource)

export default function Profile() {
  const userData = {
    first_name: 'Ivan',
    second_name: 'Ivanov',
    display_name: 'Ivan',
    login: 'ivanivanov',
    email: 'pochta@yandex.ru',
    phone: '+7 (909) 967 30 30',
    avatar: 'avatar.png',
  }

  const html = template(userData)
  const wrapper = document.createElement('div')
  wrapper.innerHTML = html

  const avatarInput = wrapper.querySelector('#avatar')
  const avatarImage = wrapper.querySelector('#avatarImage')

  avatarImage.src = userData.avatar

  avatarInput.addEventListener('change', (event) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        avatarImage.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  })

  const editButton = wrapper.querySelector('#editData')
  const saveButton = wrapper.querySelector('#saveData')

  const inputsContainer = wrapper.querySelector('.profile-form__info')

  inputsContainer.innerHTML = ''

  const inputsData = [
    { name: 'email', placeholder: 'email', type: 'email', value: userData.email },
    { name: 'login', placeholder: 'username', type: 'text', value: userData.login },
    { name: 'first_name', placeholder: 'first name', type: 'text', value: userData.first_name },
    { name: 'second_name', placeholder: 'second name', type: 'text', value: userData.second_name },
    {
      name: 'display_name',
      placeholder: 'name in chat',
      type: 'text',
      value: userData.display_name,
    },
    { name: 'phone', placeholder: 'phone', type: 'text', value: userData.phone },
  ]

  inputsData.forEach((inputData) => {
    const inputComponent = InputProfile(inputData)
    inputsContainer.appendChild(inputComponent)
    const line = document.createElement('div')
    line.className = 'profile-form__info-line'
    inputsContainer.appendChild(line)
  })

  const inputs = inputsContainer.querySelectorAll('input')

  editButton.onclick = () => {
    inputs.forEach((input) => (input.disabled = false))
    editButton.style.display = 'none'
    saveButton.style.display = 'block'
  }

  saveButton.onclick = () => {
    const updatedProfileData = {
      first_name: wrapper.querySelector('input[name="first_name"]').value,
      second_name: wrapper.querySelector('input[name="second_name"]').value,
      display_name: wrapper.querySelector('input[name="display_name"]').value,
      login: wrapper.querySelector('input[name="login"]').value,
      email: wrapper.querySelector('input[name="email"]').value,
      phone: wrapper.querySelector('input[name="phone"]').value,
      avatar,
    }

    console.log('Updated Profile Data:', updatedProfileData)

    inputs.forEach((input) => (input.disabled = true))
    editButton.style.display = 'block'
    saveButton.style.display = 'none'
  }

  return wrapper.firstChild
}
