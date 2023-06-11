import jwt from 'jsonwebtoken'

import { UserModel } from '../modules/user/user.model.js'

export const authUser = async (req, res, next) => {
	let token
	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const userFound = await UserModel.findById(decoded._id).select('-password')
		if (userFound) {
			req.user = userFound
			next && next()
		} else {
			res.status(401)
			throw new Error('Не авторизован, токен не работает!!!')
		}
	}
	if (!token) {
		res.status(401)
		throw new Error('Не авторизован, без токена!!!')
	}
}
