import { axiosAuth } from 'api/interceptors'

import { IProfileInput } from '@/screens/profile/profile.interface'

import { IMovie } from '@/shared/interfaces/movie.interfaces'
import { IUser } from '@/shared/interfaces/user.interface'

export const UserService = {
	async getAll(searchTerm?: string) {
		return axiosAuth.get<IUser[]>('/users', {
			params: searchTerm ? { searchTerm } : {},
		})
	},
	async getProfile() {
		return axiosAuth.get<IUser>('/users/profile')
	},
	async getFavoriteMovies() {
		return axiosAuth.get<IMovie[]>('/users/profile/favorites')
	},
	async toggleFavoriteMovies(movieId: string) {
		return axiosAuth.put<never>('/users/profile/favorites', {
			movieId,
		})
	},
	async updateProfile(data: IProfileInput) {
		return axiosAuth.put<never>('/users/profile', data)
	},
	async getById(_id: string) {
		return axiosAuth.get<IUser>(`/users/${_id}`)
	},
	async update(_id: string, data: IProfileInput) {
		return axiosAuth.put<IUser>(`/users/${_id}`, data)
	},
	async deleteUser(_id: string) {
		return axiosAuth.delete<string>(`/users/${_id}`)
	},
}
