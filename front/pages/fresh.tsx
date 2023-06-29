import { GetStaticProps } from 'next'
import { FC } from 'react'

import Catalog from '@/ui/catalog-movies/Catalog'

import { MovieServiceBuild } from '@/services/movie.service'

import { IMovie } from '@/shared/interfaces/movie.interfaces'

const FreshPage: FC<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Fresh movies"
			description="<i>New movies and series in excellent quality: <u>legal, safe, without ads</u></i>"
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieServiceBuild.getAll()
		return { props: { movies: movies }, revalidate: 60 }
	} catch (e) {
		return { notFound: true }
	}
}

export default FreshPage
