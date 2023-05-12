import MoviesList from '@/screens/admin/movies/MoviesList'

import { FCPageAuth } from '@/shared/types/auth.types'

const MoviesListPage: FCPageAuth = () => {
	return <MoviesList />
}

MoviesListPage.isOnlyAdmin = true

export default MoviesListPage
