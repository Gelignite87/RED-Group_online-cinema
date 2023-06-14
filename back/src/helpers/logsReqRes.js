import { TelegramService } from '../telegram/telegram.service.js'

export const logsReqRes = (req, res, next) => {
	if (process.env.NODE_ENV === 'development' && !req.url.includes('/uploads')) {
		TelegramService.sendMessage(
			process.env.TELEGRAM_CHATS.split(',').filter((value) => value !== ''),
			`<b>${req.method} ${res.statusCode}</b>
		from: ${req.headers.referer}
		to: <u>${req.headers.host}${req.url}</u>${
				Object.keys(req.body).length !== 0
					? req.body.description?.includes('<p>') ||
					  req.body.description?.includes('<span>')
						? '\n' + 'body: HTML'
						: '\n' + `body: ${JSON.stringify(req.body)}`
					: ''
			}
		authorization: ${req.headers.authorization ? true : false}`
		)
		const logs =
			(res.statusCode === 200
				? `${req.method} ${res.statusCode}`.green
				: res.statusCode === 304
				? `${req.method} ${res.statusCode}`
				: `${req.method} ${res.statusCode}`.red) +
			` from: ${req.headers.referer} to: ` +
			`${req.headers.host}${req.url}`.underline +
			` body: ${JSON.stringify(req.body)} authorization: ${
				req.headers.authorization ? req.headers.authorization : false
			}`
		console.log(logs)
	}
	next && next()
}

export const logsFilesReqRes = (req, res, next) => {
	if (process.env.NODE_ENV === 'development' && !req.url.includes('/uploads')) {
		TelegramService.sendMessage(
			process.env.TELEGRAM_CHATS.split(',').filter((value) => value !== ''),
			`<b>${req.method} ${res.statusCode}</b>
		from: ${req.headers.referer}
		to: <u>${req.headers.host}/...${req.url}</u>
		params: ${JSON.stringify(req.params)}
		query: ${JSON.stringify(req.query)}
		body: ${JSON.stringify(req.body)}
		authorization: ${req.headers.authorization ? true : false}
		files: {
			originalname: ${req.files[0]?.originalname}
			encoding: ${req.files[0]?.encoding}
			mimetype: ${req.files[0]?.mimetype}
			size: ${req.files[0]?.size}
		}`
		)
		const logs =
			(res.statusCode === 200
				? `${req.method} ${res.statusCode}`.green
				: res.statusCode === 304
				? `${req.method} ${res.statusCode}`
				: `${req.method} ${res.statusCode}`.red) +
			` from: ${req.headers.referer} to: ` +
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
