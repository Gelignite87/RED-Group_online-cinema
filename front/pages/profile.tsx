import Profile from '@/screens/profile/Profile'

import { FCPageAuth } from '@/shared/types/auth.types'

const ProfilePage: FCPageAuth = () => {
	return <Profile />
}

ProfilePage.isOnlyUser = true

export default ProfilePage
