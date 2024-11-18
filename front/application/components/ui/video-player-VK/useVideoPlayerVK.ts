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

		if (window.VK && window.VK.Widgets && window.VK.Widgets.Video) {
			onVKAPIReady()
		} else {
			// Load VK API script if it's not already loaded
			const vkScript = document.createElement('script')
			vkScript.src = 'https://vk.com/js/api/openapi.js?169'
			vkScript.onload = () => {
				window.VK.init({
					apiId: 52705374, // Replace with your VK application ID
				})
				onVKAPIReady()
			}
			document.body.appendChild(vkScript)
			window.onVKAPIReady = onVKAPIReady
		}

		return () => {
			// Clean up resources when unmounting
			delete window.onVKAPIReady
		}
	}, [videoIds])
}
