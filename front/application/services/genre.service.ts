import { axiosAuth, axiosBuild, axiosClassic } from 'api/interceptors'

import { IGenreEditInput } from '@/screens/admin/genre/genre-edit.interface'
import { ICollection } from '@/screens/collections/collections.interface'

import { IGenre } from '@/shared/interfaces/movie.interfaces'

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>('/genres', {
			params: searchTerm ? searchTerm : {},
		})
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(`/genres/by-slug/${slug}`) //используем axios без авторизации так как этот сервис будет выполнятся только на серверной части
	},
	async getCollections() {
		return axiosClassic.get<ICollection[]>(`/genres/collections`)
	},
	async getById(_id: string) {
		return axiosAuth.get<IGenreEditInput>(`/genres/${_id}`) //указывает IGenreEditInput чтобы потом в useQuery были подсказки какие поля есть в data.data
	},
	async create() {
		return axiosAuth.post<string>('/genres')
	},
	async update(_id: string, data: IGenreEditInput) {
		return axiosAuth.put<string>(`/genres/${_id}`, data)
	},
	async delete(_id: string) {
		return axiosAuth.delete<string>(`/genres/${_id}`)
	},
}

export const GenreServiceBuild = {
	async getAll(searchTerm?: string) {
		return axiosBuild.get<IGenre[]>('/genres', {
			params: searchTerm ? searchTerm : {},
		})
	},
	async getBySlug(slug: string) {
		return axiosBuild.get<IGenre>(`/genres/by-slug/${slug}`) //используем axios без авторизации так как этот сервис будет выполнятся только на серверной части
	},
	async getCollections() {
		return axiosBuild.get<ICollection[]>(`/genres/collections`)
	},
}
