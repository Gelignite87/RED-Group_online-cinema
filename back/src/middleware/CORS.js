/* Решаем проблему CORS */

export const CORS = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://fdasite.ru')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
}
