import Profile from '../modules/profile/profile.js'
import ProfileLayout from '../layout/profile/profile.js'

export default function ProfilePage() {
  const profileContent = Profile().outerHTML

  return ProfileLayout({
    profileContent,
  })
}
