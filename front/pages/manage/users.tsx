import UsersList from '@/screens/admin/users/UsersList'

import { FCPageAuth } from '@/shared/types/auth.types'

const UsersListPage: FCPageAuth = () => {
	return <UsersList />
}

UsersListPage.isOnlyAdmin = true

export default UsersListPage
