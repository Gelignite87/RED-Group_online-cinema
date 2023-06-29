import { axiosAuth, axiosBuild, axiosClassic } from 'api/interceptors'

import { IActorEditInput } from '@/screens/admin/actor/actor-edit.interface'

import { IActor } from '@/shared/interfaces/movie.interfaces'

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>('/actors', {
			params: searchTerm ? searchTerm : {},
		})
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(`/actors/by-slug/${slug}`) //используем axios без авторизации так как этот сервис будет выполнятся только на серверной части
	},
	async getById(_id: string) {
		return axiosAuth.get<IActorEditInput>(`/actors/${_id}`) //указывает IGenreEditInput чтобы потом в useQuery были подсказки какие поля есть в data.data
	},
	async create() {
		return axiosAuth.post<string>('/actors')
	},
	async update(_id: string, data: IActorEditInput) {
		return axiosAuth.put<string>(`/actors/${_id}`, data)
	},
	async delete(_id: string) {
		return axiosAuth.delete<string>(`/actors/${_id}`)
	},
}

export const ActorServiceBuild = {
	async getAll(searchTerm?: string) {
		return axiosBuild.get<IActor[]>('/actors', {
			params: searchTerm ? searchTerm : {},
		})
	},
	async getBySlug(slug: string) {
		return axiosBuild.get<IActor>(`/actors/by-slug/${slug}`) //используем axios без авторизации так как этот сервис будет выполнятся только на серверной части
	},
}
