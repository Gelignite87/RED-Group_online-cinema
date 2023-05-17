import { axiosAuth, axiosClassic } from 'api/interceptors'

import { IGenreEditInput } from '@/screens/admin/genre/genre-edit.interface'

import { getGenresUrl } from '@/config/api.config'

import { IGenre } from '@/shared/interfaces/movie.interfaces'

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? searchTerm : {},
		})
	},
	async getById(_id: string) {
		return axiosAuth.get<IGenreEditInput>(getGenresUrl(`/${_id}`)) //указывает IGenreEditInput чтобы потом в useQuery были подсказки какие поля есть в data.data
	},
	async create() {
		return axiosAuth.post<string>(getGenresUrl(`/`))
	},
	async update(_id: string, data: IGenreEditInput) {
		return axiosAuth.put<string>(getGenresUrl(`/${_id}`), data)
	},
	async delete(_id: string) {
		return axiosAuth.delete<string>(getGenresUrl(`/${_id}`))
	},
}
