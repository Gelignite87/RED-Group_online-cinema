import UserList from '@/screens/admin/users/UserList'

import { FCPageAuth } from '@/shared/types/auth.types'

const UserListPage: FCPageAuth = () => {
	return <UserList />
}

UserListPage.isOnlyAdmin = true

export default UserListPage
