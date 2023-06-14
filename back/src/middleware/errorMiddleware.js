import { logsReqRes } from '../helpers/logsReqRes.js'

export const notFound = (req, res, next) => {
	const error = new Error(`Not found: ${req.originalUrl}`)
	res.status(404)
	next(error)
}

export const errorHandler = (error, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	console.error('Ошибка:'.red, error.message)
	res.status(statusCode).json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? null : error.stack,
	})
	logsReqRes(req, res)
}
