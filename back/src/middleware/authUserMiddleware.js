import jwt from 'jsonwebtoken'

import { logsReqRes } from '../helpers/logsReqRes.js'
import { UserModel } from '../modules/user/user.model.js'

export const authUser = async (req, res, next) => {
	if (req.headers.authorization?.startsWith('Bearer')) {
		const token = req.headers.authorization.split(' ')[1]
		try {
			if (!token) {
				res.status(401)
				throw new Error('Не авторизован, без токена!')
			}
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			const userFound = await UserModel.findById(decoded._id).select(
				'-password'
			)
			if (userFound) {
				req.user = userFound
				next && next()
			} else {
				res.status(401)
				throw new Error('User not found!')
			}
		} catch (error) {
			console.error('Ошибка в authUser'.red, error.message)
			next && res.status(500).json({ error: 'Ошибка в authUser' })
			logsReqRes(req, res)
		}
	}
}
