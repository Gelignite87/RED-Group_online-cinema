import { axiosAuth, axiosClassic } from 'api/interceptors'

import { getGenresUrl } from '@/config/api.config'

import { IGenre } from '@/shared/interfaces/movie.interfaces'

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? searchTerm : {},
		})
	},

	async deleteGenre(_id: string) {
		return axiosAuth.delete<string>(getGenresUrl(`/${_id}`))
	},
}
