/* Решаем проблему CORS */

export const CORS = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	)
	res.setHeader('Access-Control-Allow-Headers', '*')
	next()
}
