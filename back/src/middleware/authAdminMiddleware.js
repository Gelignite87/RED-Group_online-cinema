import { authUser } from './authUserMiddleware.js'

export const authAdmin = async (req, res, next) => {
	await authUser(req, res)
	if (req.user.isAdmin) {
		next()
	} else {
		res.status(401)
		throw new Error('У вас нет прав доступа!!!')
	}
}
