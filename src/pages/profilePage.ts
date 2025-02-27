import Profile from '../modules/profile/profile'
import { Block } from '../core/Block'
import { UserData } from '../modules/profile/profile'

export default function ProfilePage(): Block {
  const userData: UserData = {
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: '',
  }
  const profileComponent = new Profile({ userData })
  return profileComponent
}
