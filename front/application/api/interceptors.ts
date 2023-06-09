import axios from 'axios'
import Cookies from 'js-cookie'

import { removeTokensFromCookie } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

import { errorCatch } from './api.helpers'

export const axiosBuild = axios.create({
	baseURL: `${process.env.APP_SERVER_URL}/api`,
	headers: { 'Content-Type': 'application/json' },
})

export const axiosClassic = axios.create({
	baseURL: '/api',
	headers: { 'Content-Type': 'application/json' },
})

export const axiosAuth = axios.create({
	baseURL: '/api',
	headers: { 'Content-Type': 'application/json' },
})

axiosAuth.interceptors.request.use((config) => {
	//добавляем свойство Authorization к запросу (request)
	const accessToken = Cookies.get('accessToken')
	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

axiosAuth.interceptors.response.use(
	//обрабатываем ответ
	(config) => config,
	async (error) => {
		const originalRequest = error.config
		//если в ответ получили ошибку то достаем из неё config запроса
		if (
			(error.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true //добавляем новое поле в config запроса
			try {
				await AuthService.getNewTokens()
				return axiosAuth.request(originalRequest) //делаем запрос с измененным конфигом, где добавлено свойство _isRetry = true
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') {
					removeTokensFromCookie() //удаляем токены из куков
				}
			}
		}
		throw error
	}
)
