import { useEffect } from 'react'

declare global {
	interface Window {
		VK: any
		onVKAPIReady: (() => void) | undefined
	}
}

export const useVideoPlayerVK = (videoIds: string[]) => {
	useEffect(() => {
		const onVKAPIReady = () => {
			videoIds.forEach((videoId) => {
				const playerContainer = document.getElementById(`vk-player-${videoId}`)
				if (playerContainer) {
					window.VK.Widgets.Video(
						`vk-player-${videoId}`,
						{
							width: 640,
							autoplay: 0,
						},
						videoId
					)
				}
			})
		}

		// Проверяем, загружен ли VK API
		if (window.VK && window.VK.Widgets && window.VK.Widgets.Video) {
			onVKAPIReady()
		} else {
			// Загружаем VK API, если он еще не загружен
			const vkScript = document.createElement('script')
			vkScript.src = 'https://vk.com/js/api/openapi.js?169'
			vkScript.async = true
			vkScript.onload = () => {
				if (window.VK) {
					window.VK.init({
						apiId: 52705374, // Замените на ваш VK application ID
					})
					onVKAPIReady()
				}
			}
			document.body.appendChild(vkScript)
		}

		return () => {
			// Очистка ресурсов при размонтировании компонента
			delete window.onVKAPIReady
		}
	}, [videoIds])
}
