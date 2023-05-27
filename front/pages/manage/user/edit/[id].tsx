import UserEdit from '@/screens/admin/user/UserEdit'

import { FCPageAuth } from '@/shared/types/auth.types'

const UserEditPage: FCPageAuth = () => {
	return <UserEdit />
}

UserEditPage.isOnlyAdmin = true

export default UserEditPage
