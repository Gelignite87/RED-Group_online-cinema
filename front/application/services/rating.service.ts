import { axiosAuth } from 'api/interceptors'

import { getRatingsUrl } from '@/config/api.config'

export const RatingService = {
	async setRating(movieId: string, value: number) {
		return axiosAuth.post<string>(getRatingsUrl('/set-rating'), {
			movieId,
			value,
		})
	},
	async getByUserMovie(movieId: string) {
		return axiosAuth.get<number>(getRatingsUrl(`/${movieId}`))
	},
}
