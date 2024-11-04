import dynamic from 'next/dynamic'
import { FC } from 'react'

import Banner from '@/ui/banner/Banner'
import Gallery from '@/ui/gallery/Gallery'
import SubHeading from '@/ui/heading/SubHeading'
import styles from '@/ui/video-player-YT/VideoPlayerYT.module.sass'
import { useVideoPlayerYT } from '@/ui/video-player-YT/useVideoPlayerYT'

import Meta from '@/utils/meta/Meta'

import Content from './Content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'
import { IMoviePage } from '@/pages/movie/[slug]'

const DinamicVideoPlayer = dynamic(
	() => import('@/ui/video-player/VideoPlayer'),
	{ ssr: false }
)

const DinamicRateMovie = dynamic(() => import('./RateMovie/RateMovie'), {
	ssr: false,
})

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	const videoIds = ['CeHLVPhOHvA', 'K_HMA8bgbRg'] //набор идентификаторов видео на YouTube
	useVideoPlayerYT(videoIds) //инициализация YouTube видеоплеера
	useUpdateCountOpened(movie.slug)
	return (
		<Meta title={movie.title} description={`Watch ${movie.title} online`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />} //используем стрелочную функцию потому что нам нужно пробросить movie в компонент
			/>
			<DinamicVideoPlayer slug={movie.slug} videoSource={movie.videoUrl} />
			{/* YouTube Player */}
			<div>
				{/* без обертки из div выводит ошибку при размонтировании компонента */}
				<div
					id={`youtube-player-${videoIds[0]}`}
					className={styles.videoPlayerYT}
				/>
			</div>
			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>
			<DinamicRateMovie id={movie._id} slug={movie.slug} />
		</Meta>
	)
}

export default SingleMovie
