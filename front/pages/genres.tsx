import { GetStaticProps } from 'next'
import { FC } from 'react'

import Catalog from '@/ui/catalog-movies/Catalog'

import { MovieService } from '@/services/movie.service'

import { IMovie } from '@/shared/interfaces/movie.interfaces'

const GenresPage: FC<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Trending movies"
			description="<i>Trending movies in excellent quality: <u>legal, safe, without ads</u></i>"
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const movies = await MovieService.getMostPopularMovies()
		return { props: { movies: movies } }
	} catch (e) {
		return { notFound: true }
	}
}

export default GenresPage
