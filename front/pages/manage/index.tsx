import Admin from '@/screens/admin/Admin'

import { FCPageAuth } from '@/shared/types/auth.types'

const AdminPage: FCPageAuth = () => {
	return <Admin />
}

AdminPage.isOnlyAdmin = true

export default AdminPage
