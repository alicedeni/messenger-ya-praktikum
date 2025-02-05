import Profile from '../modules/profile/profile'

export default function ProfilePage() {
  const userData = {
    first_name: 'Ivan',
    second_name: 'Ivanov',
    display_name: 'Ivan',
    login: 'ivanivanov',
    email: 'pochta@yandex.ru',
    phone: '+79277113996',
    avatar: 'avatar.png',
  }

  const profileComponent = new Profile({ userData })
  profileComponent.render()

  return document.createElement('div')
}
