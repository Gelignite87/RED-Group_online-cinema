import { axiosClassic } from 'api/interceptors'

import { IMovie } from '@/shared/interfaces/movie.interfaces'

import { getMoviesUrl } from '@/config/api.config'

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},
}
