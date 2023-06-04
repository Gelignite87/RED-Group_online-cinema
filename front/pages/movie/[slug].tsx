import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'

import SingleMovie from '@/screens/single-movie/SingleMovie'

import { IGalleryItem } from '@/ui/gallery/gallery.interface'

import { MovieService } from '@/services/movie.service'

import { IMovie } from '@/shared/interfaces/movie.interfaces'

export interface IMoviePage {
	movie: IMovie
	similarMovies: IGalleryItem[]
}

const MoviePage: FC<IMoviePage> = ({ movie, similarMovies }) => {
	return <SingleMovie movie={movie} similarMovies={similarMovies} />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getAll()
		const paths = movies.map((movie) => ({ params: { slug: movie.slug } })) //slug потому что [slug].tsx
		return { paths, fallback: 'blocking' } //'blocking' делает запрос на сервер когда пользователь заходит на страницу которой нет в статическом виде и, если найдет её, запишет в статику
	} catch (e) {
		return { paths: [], fallback: false }
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(params?.slug as string)
		const { data: dataSimilarMovies } = await MovieService.getByGenres(
			movie.genres.map((g) => g._id)
		)
		const similarMovies: IGalleryItem[] = dataSimilarMovies
			.filter((m) => m._id !== movie._id)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: `/movie/${m.slug}`,
			}))
		return { props: { movie, similarMovies }, revalidate: 60 }
	} catch (e) {
		return { notFound: true } //перебрасывает на 404 страницу
	}
}

export default MoviePage
