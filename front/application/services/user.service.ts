import { axiosAuth } from 'api/interceptors'

import { IProfileInput } from '@/screens/profile/profile.interface'

import { getUsersUrl } from '@/config/api.config'

import { IMovie } from '@/shared/interfaces/movie.interfaces'
import { IUser } from '@/shared/interfaces/user.interface'

export const UserService = {
	async getAll(searchTerm?: string) {
		return axiosAuth.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},
	async getProfile() {
		return axiosAuth.get<IUser>(getUsersUrl('/profile'))
	},
	async getFavoriteMovies() {
		return axiosAuth.get<IMovie[]>(getUsersUrl('/profile/favorites'))
	},
	async toggleFavoriteMovies(movieId: string) {
		return axiosAuth.put<never>(getUsersUrl('/profile/favorites'), {
			movieId,
		})
	},
	async updateProfile(data: IProfileInput) {
		return axiosAuth.put<never>(getUsersUrl('/profile'), data)
	},
	async getById(_id: string) {
		return axiosAuth.get<IUser>(getUsersUrl(`/${_id}`))
	},
	async update(_id: string, data: IProfileInput) {
		return axiosAuth.put<IUser>(getUsersUrl(`/${_id}`), data)
	},
	async deleteUser(_id: string) {
		return axiosAuth.delete<string>(getUsersUrl(`/${_id}`))
	},
}
