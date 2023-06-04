import { FC } from 'react'

import SkeletonLoader from '@/ui/SceletonLoader'

import MovieList from '../MovieList'

import NotAuthFavoriteMovies from './NotAuthFavoriteMovies'
import { useFavoriteMovies } from './useFavoriteMovies'

const FavoriteMovies: FC = () => {
	const { isLoading, dataFavoriteMovies, user } = useFavoriteMovies()

	if (!user) return <NotAuthFavoriteMovies />

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			link="/favorites"
			movies={dataFavoriteMovies?.slice(0, 3) || []}
			title="Favorite Movies"
		/>
	)
}
export default FavoriteMovies
