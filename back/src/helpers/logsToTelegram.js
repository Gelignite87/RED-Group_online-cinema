import { TelegramService } from '../telegram/telegram.service.js'

export const logsToTelegram = (req, res, next) => {
	if (!req.url.includes('/uploads'))
		TelegramService.sendMessage(
			['1097212668'],
			`<b>${req.method} ${res.statusCode}</b>
		from: ${req.headers.referer}
		to: ${req.headers.host}${req.url}
		params: ${JSON.stringify(req.params)}
		query: ${JSON.stringify(req.query)}
		body: ${JSON.stringify(req.body)}
		authorization: ${req.headers.authorization ? true : false}`
		)
	next()
}

export const logsFilesToTelegram = (req, res, next) => {
	if (!req.url.includes('/uploads'))
		TelegramService.sendMessage(
			process.env.TELEGRAM_CHATS,
			`<b>${req.method} ${res.statusCode}</b>
		from: ${req.headers.referer}
		to: ${req.headers.host}/...${req.url}
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
	next()
}
