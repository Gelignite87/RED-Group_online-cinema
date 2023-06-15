import jwt from 'jsonwebtoken'

import { logsReqRes } from '../helpers/logsReqRes.js'
import { UserModel } from '../modules/user/user.model.js'

export const authUser = async (req, res, next) => {
	try {
		if (req.headers.authorization?.startsWith('Bearer')) {
			const token = req.headers.authorization.split(' ')[1]
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			const userFound = await UserModel.findById(decoded._id).select(
				'-password'
			)
			if (!userFound) throw new Error('User not found!')
			req.user = userFound
			next()
		} else throw new Error('Не авторизован, без токена!')
	} catch (error) {
		res.status(401).json({ error: 'Ошибка в authUser', message: error.message })
		logsReqRes(req, res)
		console.error('Ошибка в authUser'.red, error.message)
	}
}

export const authAdmin = async (req, res, next) => {
	try {
		if (!req.user.isAdmin) throw new Error('У вас нет прав доступа!')
		next()
	} catch (error) {
		res
			.status(401)
			.json({ error: 'Ошибка в authAdmin', message: error.message })
		logsReqRes(req, res)
		console.error('Ошибка в authAdmin'.red, error.message)
	}
}
