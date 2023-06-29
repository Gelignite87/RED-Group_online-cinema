import { axiosAuth } from 'api/interceptors'

export const AdminService = {
	async getCountUsers() {
		return await axiosAuth.get<number>('/users/count')
	},
}
