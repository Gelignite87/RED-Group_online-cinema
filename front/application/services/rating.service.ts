import { axiosAuth } from 'api/interceptors'

export const RatingService = {
	async setRating(movieId: string, value: number) {
		return axiosAuth.post<string>('/ratings/set-rating', {
			movieId,
			value,
		})
	},
	async getByUserMovie(movieId: string) {
		return axiosAuth.get<number>(`/ratings/${movieId}`)
	},
}
