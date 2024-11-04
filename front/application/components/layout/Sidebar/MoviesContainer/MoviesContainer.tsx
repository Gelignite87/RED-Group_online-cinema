import dynamic from 'next/dynamic'
import { FC } from 'react'

import PopularMovies from './PopularMovies/PopularMovies'

const DinamicFavoriteMovies = dynamic(
	() => import('./FavoriteMovies/FavoriteMovies'),
	{ ssr: false }
)

const MoviesContainer: FC = () => {
	return (
		<div>
			<PopularMovies />
			{/* <DinamicFavoriteMovies /> */}
		</div>
	)
}
export default MoviesContainer
