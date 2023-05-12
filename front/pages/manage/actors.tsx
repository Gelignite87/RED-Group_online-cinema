import ActorsList from '@/screens/admin/actors/ActorsList'

import { FCPageAuth } from '@/shared/types/auth.types'

const ActorsListPage: FCPageAuth = () => {
	return <ActorsList />
}

ActorsListPage.isOnlyAdmin = true

export default ActorsListPage
