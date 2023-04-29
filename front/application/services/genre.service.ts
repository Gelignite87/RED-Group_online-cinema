import { axiosClassic } from 'api/interceptors'

import { IGenre } from '@/shared/interfaces/movie.interfaces'

import { getGenresUrl } from '@/config/api.config'

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? searchTerm : {},
		})
	},
}
