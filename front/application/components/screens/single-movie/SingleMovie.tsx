import { FC } from 'react'

import Banner from '@/ui/banner/Banner'
import Gallery from '@/ui/gallery/Gallery'
import SubHeading from '@/ui/heading/SubHeading'

import Meta from '@/utils/meta/Meta'

import Content from './Content/Content'
import { IMoviePage } from '@/pages/movie/[slug]'

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	return (
		<Meta title={movie.title} description={`Watch ${movie.title} online`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />} //используем стрелочную функцию потому что нам нужно пробросить movie в компонент
			/>
			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>
		</Meta>
	)
}

export default SingleMovie
