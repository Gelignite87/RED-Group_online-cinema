import { GetStaticProps } from 'next'

import Home from '@/screens/home/Home'

import { ISlide } from '@/ui/slider/slider.interface'

import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'

export default function HomePage({ slides }: { slides: ISlide[] }) {
	return <Home slides={slides} />
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
		return { props: { slides } }
	} catch (e) {
		return { props: { slides: [] } }
	}
}
