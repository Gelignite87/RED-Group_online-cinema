export const logsReqRes = async (req, res, next) => {
	if (process.env.NODE_ENV === 'development' && !req.url.includes('/uploads')) {
		const logs =
			(res.statusCode === 200
				? `${req.method} ${res.statusCode}`.green
				: res.statusCode === 304
				? `${req.method} ${res.statusCode}`
				: `${req.method} ${res.statusCode}`.red) +
			` from: ${req.headers.referer} ip: ${req.headers['x-real-ip']} to: ` +
			`${req.headers.host}${req.url}`.underline +
			` body: ${JSON.stringify(req.body)} authorization: ${
				req.headers.authorization ? req.headers.authorization : false
			}`
		console.log(logs)
	}
	next && next()
}

export const logsFilesReqRes = async (req, res, next) => {
	if (process.env.NODE_ENV === 'development' && !req.url.includes('/uploads')) {
		const logs =
			(res.statusCode === 200
				? `${req.method} ${res.statusCode}`.green
				: res.statusCode === 304
				? `${req.method} ${res.statusCode}`
				: `${req.method} ${res.statusCode}`.red) +
			` from: ${req.headers.referer} ip: ${req.headers['x-real-ip']} to: ` +
			`${req.headers.host}/...${req.url}`.underline +
			` params: ${JSON.stringify(req.params)} query: ${JSON.stringify(
				req.query
			)} body: ${JSON.stringify(req.body)} authorization: ${
				req.headers.authorization ? true : false
			} ` +
			`files:`.underline +
			` {originalname: ${req.files[0]?.originalname} encoding: ${req.files[0]?.encoding} mimetype: ${req.files[0]?.mimetype} size: ${req.files[0]?.size}}`
		console.log(logs)
	}
	next && next()
}
