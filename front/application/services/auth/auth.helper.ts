import Cookies from 'js-cookie'

import { IAuthResponse, ITokens } from '@/store/user/user.interface'

export const saveTokensToCookie = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken, {
		expires: 1 / 24, //без этой опции Cookie удаляются при закрытии браузера
	})
	Cookies.set('refreshToken', data.refreshToken, {
		expires: 1 / 12, //без этой опции Cookie удаляются при закрытии браузера
	})
}

export const removeTokensFromCookie = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensToCookie(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
