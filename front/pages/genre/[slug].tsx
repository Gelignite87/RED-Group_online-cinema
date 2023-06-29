import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'

import Catalog from '@/ui/catalog-movies/Catalog'

import { GenreServiceBuild } from '@/services/genre.service'
import { MovieServiceBuild } from '@/services/movie.service'

import { IGenre, IMovie } from '@/shared/interfaces/movie.interfaces'

interface IGenrePage {
	movies: IMovie[]
	genre: IGenre
}

const GenrePage: FC<IGenrePage> = ({ movies, genre }) => {
	return (
		<Catalog
			movies={movies || []}
			title={genre.name}
			description={genre.description}
		/>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await GenreServiceBuild.getAll()
		const paths = genres.map((genre) => ({ params: { slug: genre.slug } })) //slug потому что [slug].tsx
		return { paths, fallback: 'blocking' } //'blocking' делает запрос на сервер когда пользователь заходит на страницу которой нет в статическом виде и, если найдет её, запишет в статику
	} catch (e) {
		return { paths: [], fallback: false }
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: genre } = await GenreServiceBuild.getBySlug(
			params?.slug as string
		)
		const { data: movies } = await MovieServiceBuild.getByGenres([genre._id])
		return { props: { movies, genre }, revalidate: 60 }
	} catch (e) {
		return { notFound: true } //перебрасывает на 404 страницу
	}
}

export default GenrePage
