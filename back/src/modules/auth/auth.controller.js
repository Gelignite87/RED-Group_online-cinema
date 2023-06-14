import { logsReqRes } from '../../helpers/logsReqRes.js'

import { AuthService } from './auth.service.js'

export const AuthController = {
	async login(req, res) {
		const body = req.body
		try {
			const result = await AuthService.login(body)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в AuthController.login'.red, error.message)
			res.status(500).json({ error: 'Ошибка в AuthController.login' })
			logsReqRes(req, res)
		}
	},
	async getNewTokens(req, res) {
		const dto = req.body
		try {
			const result = await AuthService.getNewTokens(dto)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в AuthController.getNewTokens'.red, error.message)
			res.status(500).json({ error: 'Ошибка в AuthController.getNewTokens' })
			logsReqRes(req, res)
		}
	},
	async register(req, res) {
		const dto = req.body
		try {
			const result = await AuthService.register(dto)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в AuthController.register'.red, error.message)
			res.status(500).json({ error: 'Ошибка в AuthController.register' })
			logsReqRes(req, res)
		}
	},
}
