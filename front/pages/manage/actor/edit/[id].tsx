import ActorEdit from '@/screens/admin/actor/ActorEdit'

import { FCPageAuth } from '@/shared/types/auth.types'

const ActorEditPage: FCPageAuth = () => {
	return <ActorEdit />
}

ActorEditPage.isOnlyAdmin = true

export default ActorEditPage
