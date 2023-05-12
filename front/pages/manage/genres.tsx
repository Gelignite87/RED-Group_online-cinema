import GenresList from '@/screens/admin/genres/GenresList'

import { FCPageAuth } from '@/shared/types/auth.types'

const GenresListPage: FCPageAuth = () => {
	return <GenresList />
}

GenresListPage.isOnlyAdmin = true

export default GenresListPage
