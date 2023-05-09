import { axiosAuth } from 'api/interceptors'

import { getUsersUrl } from '@/config/api.config'

export const AdminService = {
	async getCountUsers() {
		return await axiosAuth.get<number>(getUsersUrl('/count'))
	},
}
