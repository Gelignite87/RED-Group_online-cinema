import { logsReqRes } from '../../helpers/logsReqRes.js'

import { AuthService } from './auth.service.js'

export const AuthController = {
	async login(req, res) {
		const body = req.body
		try {
			const result = await AuthService.login(body)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в AuthController.login',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в AuthController.login'.red, error.message)
		}
	},
	async getNewTokens(req, res) {
		const dto = req.body
		try {
			const result = await AuthService.getNewTokens(dto)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в AuthController.getNewTokens',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в AuthController.getNewTokens'.red, error.message)
		}
	},
	async register(req, res) {
		const dto = req.body
		try {
			const result = await AuthService.register(dto)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в AuthController.register',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в AuthController.register'.red, error.message)
		}
	},
}
