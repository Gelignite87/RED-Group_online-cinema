import { axiosAuth, axiosClassic } from 'api/interceptors'

import { getMoviesUrl } from '@/config/api.config'

import { IMovie } from '@/shared/interfaces/movie.interfaces'

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		)
		return movies
	},

	async deleteMovie(_id: string) {
		return axiosAuth.delete<string>(getMoviesUrl(`/${_id}`))
	},
}
