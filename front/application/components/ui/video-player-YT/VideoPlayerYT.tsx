import { FC, useEffect, useState } from 'react'

import styles from './VideoPlayerYT.module.sass'

declare global {
	interface Window {
		YT: any
		onYouTubeIframeAPIReady: (() => void) | undefined
	}
}

export const VideoPlayerYT: FC<{ videoId: string }> = ({ videoId }) => {
	useEffect(() => {
		const onYouTubeIframeAPIReady = () => {
			new window.YT.Player('youtube-player', {
				videoId: videoId,
				events: {
					onReady: onPlayerReady,
				},
			})
		}

		const onPlayerReady = (event: any) => {
			event.target.playVideo()
		}

		if (window.YT && window.YT.Player) {
			onYouTubeIframeAPIReady()
		} else {
			// Загрузка API YouTube, если еще не загружено
			const youtubeScript = document.createElement('script')
			youtubeScript.src = 'https://www.youtube.com/iframe_api'
			document.body.appendChild(youtubeScript)
			window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
		}

		return () => {
			// Очистка ресурсов при размонтировании компонента
			delete window.onYouTubeIframeAPIReady
			window.YT = null
		}
	}, [videoId])

	return <div className={styles.videoPlayerYT} id="youtube-player"></div>
}
