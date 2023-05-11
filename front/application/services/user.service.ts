import { axiosAuth } from 'api/interceptors'

import { getUsersUrl } from '@/config/api.config'

import { IUser } from '@/shared/interfaces/user.interface'

export const UserService = {
	async getAll(searchTerm?: string) {
		return axiosAuth.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async deleteUser(_id: string) {
		return axiosAuth.delete<string>(getUsersUrl(`/${_id}`))
	},
}
