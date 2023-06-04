import { GetStaticProps } from 'next'

import Home from '@/screens/home/Home'

import { IGalleryItem } from '@/ui/gallery/gallery.interface'
import { ISlide } from '@/ui/slider/slider.interface'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'

export default function HomePage({
	slides,
	trendingMovies,
	actors,
}: {
	slides: ISlide[]
	trendingMovies: IGalleryItem[]
	actors: IGalleryItem[]
}) {
	return (
		<Home slides={slides} trendingMovies={trendingMovies} actors={actors} />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	//данные которые сервер получает на этапе build и отдает всем клиентам как статику
	try {
		const { data: movies } = await MovieService.getAll()

		const slides: ISlide[] = movies.slice(0, 3).map((movie) => ({
			_id: movie._id,
			link: `/movies/${movie.slug}`,
			bigPoster: movie.bigPoster,
			subTitle: getGenresList(movie.genres),
			title: movie.title,
		}))

		const dataTrendingMovies = await MovieService.getMostPopularMovies()

		const trendingMovies: IGalleryItem[] = dataTrendingMovies
			.slice(0, 7)
			.map((movie) => ({
				name: movie.title,
				posterPath: movie.poster,
				link: `/movie/${movie.slug}`,
			}))

		const { data: dataActors } = await ActorService.getAll()

		const actors: IGalleryItem[] = dataActors.slice(0, 7).map((actor) => ({
			name: actor.name,
			posterPath: actor.photo,
			link: `/actor/${actor.slug}`,
			content: {
				title: actor.name,
				subTitle: `+${actor.countMovies} movies`,
			},
		}))

		return { props: { slides, trendingMovies, actors }, revalidate: 60 }
	} catch (e) {
		return { props: { slides: [], trendingMovies: [], actors: [] } }
	}
}
