import GenreEdit from '@/screens/admin/genre/GenreEdit'

import { FCPageAuth } from '@/shared/types/auth.types'

const GenreEditPage: FCPageAuth = () => {
	return <GenreEdit />
}

GenreEditPage.isOnlyAdmin = true

export default GenreEditPage
