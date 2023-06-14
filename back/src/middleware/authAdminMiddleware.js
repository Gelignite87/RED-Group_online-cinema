import { logsReqRes } from '../helpers/logsReqRes.js'

import { authUser } from './authUserMiddleware.js'

export const authAdmin = async (req, res, next) => {
	try {
		await authUser(req, res)
		if (req.user?.isAdmin) {
			next()
		} else {
			res.status(401)
			throw new Error('У вас нет прав доступа!')
		}
	} catch (error) {
		console.error('Ошибка в authAdmin'.red, error.message)
		res.status(500).json({ error: error.message })
		logsReqRes(req, res)
	}
}
