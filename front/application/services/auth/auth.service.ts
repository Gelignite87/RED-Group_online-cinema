// import { getContentType } from 'api/api.helpers'
import { axiosClassic } from 'api/interceptors'
import Cookies from 'js-cookie'

import { IAuthResponse } from '@/store/user/user.interface'

import { removeTokensFromCookie, saveToStorage } from './auth.helper'

export const AuthService = {
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>('/auth/register', {
			email,
			password,
		})
		if (response.data.accessToken) saveToStorage(response.data)
		return response
	},

	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>('/auth/login', {
			email,
			password,
		})
		if (response.data.accessToken) saveToStorage(response.data)
		return response
	},

	logout() {
		removeTokensFromCookie()
		localStorage.removeItem('user')
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token',
			{ refreshToken }
		)
		if (response.data.accessToken) saveToStorage(response.data)
		return response
	},
}
