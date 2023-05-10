import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/ui/SceletonLoader'
import SubHeading from '@/ui/heading/SubHeading'

import { IMovie } from '@/shared/interfaces/movie.interfaces'

import { MovieService } from '@/services/movie.service'

import { getMovieUrl } from '@/config/url.config'

import styles from '../Admin.module.sass'

const PopularMovie: FC = () => {
	const { isLoading, data } = useQuery(
		'Most popular movie in admin',
		() => MovieService.getMostPopularMovies(),
		{ select: (data): IMovie => data[0] }
	)
	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title="The most popular movie" />

			{isLoading ? (
				<div className="h-48 w-full">
					<SkeletonLoader className="h-full" />
				</div>
			) : (
				data && (
					<>
						<h3>Opened {data?.countOpened} times</h3>
						<Link href={getMovieUrl(data.slug)} className="w-full">
							<Image
								width={500}
								height={1}
								src={data.bigPoster}
								alt={data.title}
								className={styles.image}
							/>
						</Link>
					</>
				)
			)}
		</div>
	)
}

export default PopularMovie
