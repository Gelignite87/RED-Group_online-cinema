import MovieEdit from '@/screens/admin/movie/MovieEdit'

import { FCPageAuth } from '@/shared/types/auth.types'

const MovieEditPage: FCPageAuth = () => {
	return <MovieEdit />
}

MovieEditPage.isOnlyAdmin = true

export default MovieEditPage
