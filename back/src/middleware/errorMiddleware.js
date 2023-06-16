import { logsReqRes } from './logsReqRes.js'

export const notFound = (req, res, next) => {
	const error = new Error(`Not found endpoint ${req.originalUrl}`)
	res.status(404)
	next(error)
}

export const errorHandler = (error, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res
		.status(statusCode)
		.json({ error: 'Ошибка в errorHandler', message: error.message })
	logsReqRes(req, res)
	console.error('Ошибка в errorHandler'.red, error.message)
}
