import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'

import Catalog from '@/ui/catalog-movies/Catalog'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import { IActor, IMovie } from '@/shared/interfaces/movie.interfaces'

interface IActorPage {
	movies: IMovie[]
	actor: IActor
}

const ActorPage: FC<IActorPage> = ({ movies, actor }) => {
	return <Catalog movies={movies || []} title={actor.name} />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await ActorService.getAll()
		const paths = actors.map((actor) => ({ params: { slug: actor.slug } })) //slug потому что [slug].tsx
		return { paths, fallback: 'blocking' } //'blocking' делает запрос на сервер когда пользователь заходит на страницу которой нет в статическом виде и, если найдет её, запишет в статику
	} catch (e) {
		return { paths: [], fallback: false }
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: actor } = await ActorService.getBySlug(params?.slug as string)
		const { data: movies } = await MovieService.getByActor(actor._id)
		return { props: { movies, actor }, revalidate: 60 }
	} catch (e) {
		return { notFound: true } //перебрасывает на 404 страницу
	}
}

export default ActorPage
