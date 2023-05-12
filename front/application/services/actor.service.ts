import { axiosAuth, axiosClassic } from 'api/interceptors'

import { getActorsUrl } from '@/config/api.config'

import { IActor } from '@/shared/interfaces/movie.interfaces'

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm ? searchTerm : {},
		})
	},

	async deleteActor(_id: string) {
		return axiosAuth.delete<string>(getActorsUrl(`/${_id}`))
	},
}
