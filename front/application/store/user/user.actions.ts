import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorCatch } from 'api/api.helpers'
import { toastr } from 'react-redux-toastr'

import { AuthService } from '@/services/auth/auth.service'

import { toastrError } from '@/utils/toastr-error'

import { IAuthResponse, IEmailPassword } from './user.interface'

/* register */
export const register = createAsyncThunk<IAuthResponse, IEmailPassword>( //createAsyncThunk принимает в себя два дженерика, первый отвечает за отдаваемые данные, второй за принимаемые
	'auth/register', //уникальное имя
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.register(email, password)
			toastr.success('Registration', 'You have successfully registered')
			return response.data
		} catch (error) {
			toastrError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

/* login */
export const login = createAsyncThunk<IAuthResponse, IEmailPassword>( //createAsyncThunk принимает в себя два дженерика, первый отвечает за отдаваемые данные, второй за принимаемые
	'auth/login', //уникальное имя
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.login(email, password)
			toastr.success('Login', 'You have successfully logged in')
			return response.data
		} catch (error) {
			toastrError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

/* logout */
export const logout = createAsyncThunk('auth/logout', async () => {
	await AuthService.logout()
})

/* checkAuth */
export const checkAuth = createAsyncThunk<IAuthResponse>( //createAsyncThunk принимает в себя два дженерика, первый отвечает за отдаваемые данные, второй за принимаемые
	'auth/check-auth', //уникальное имя
	async (_, thunkApi) => {
		//нижним подчеркиванием пропускаем первый аргумент
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				toastrError('Logout', 'Your session has expired, please login again')
				thunkApi.dispatch(logout())
			}

			return thunkApi.rejectWithValue(error)
		}
	}
)
