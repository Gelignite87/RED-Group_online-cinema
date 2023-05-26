import { axiosAuth, axiosClassic } from 'api/interceptors'

import { IActorEditInput } from '@/screens/admin/actor/actor-edit.interface'

import { getActorsUrl } from '@/config/api.config'

import { IActor } from '@/shared/interfaces/movie.interfaces'

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm ? searchTerm : {},
		})
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`)) //используем axios без авторизации так как этот сервис будет выполнятся только на серверной части
	},
	async getById(_id: string) {
		return axiosAuth.get<IActorEditInput>(getActorsUrl(`/${_id}`)) //указывает IGenreEditInput чтобы потом в useQuery были подсказки какие поля есть в data.data
	},
	async create() {
		return axiosAuth.post<string>(getActorsUrl(`/`))
	},
	async update(_id: string, data: IActorEditInput) {
		return axiosAuth.put<string>(getActorsUrl(`/${_id}`), data)
	},
	async delete(_id: string) {
		return axiosAuth.delete<string>(getActorsUrl(`/${_id}`))
	},
}
