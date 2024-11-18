import dynamic from 'next/dynamic'
import { FC } from 'react'

import Banner from '@/ui/banner/Banner'
import Gallery from '@/ui/gallery/Gallery'
import SubHeading from '@/ui/heading/SubHeading'
import stylesVK from '@/ui/video-player-VK/VideoPlayerVK.module.sass'
import stylesYT from '@/ui/video-player-YT/VideoPlayerYT.module.sass'
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
	const videoIdsYT = ['CeHLVPhOHvA', 'K_HMA8bgbRg'] //набор идентификаторов видео на YouTube
	const videoIdsVK = ['226031859_456239033', '198730437_456239841'] //набор идентификаторов видео на VK
	useVideoPlayerYT(videoIdsYT) //инициализация YouTube видеоплеера
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
					id={`youtube-player-${videoIdsYT[0]}`}
					className={stylesYT.videoPlayerYT}
				/>
			</div>
			{/* VK Player */}
			<iframe
				src={`https://vk.com/video_ext.php?oid=-${
					videoIdsVK[0].split('_')[0]
				}&id=${videoIdsVK[0].split('_')[1]}&hd=4&t=00h01m36s&autoplay=1`}
				className={stylesVK.videoPlayerVK}
				allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
			></iframe>
			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>
			<DinamicRateMovie id={movie._id} slug={movie.slug} />
		</Meta>
	)
}

export default SingleMovie
