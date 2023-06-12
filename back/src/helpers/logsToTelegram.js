import { TelegramService } from '../telegram/telegram.service.js'

export const logsToTelegram = (req, res, next) => {
	if (!req.url.includes('/uploads')) {
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
	}
	next()
}

export const logsFilesToTelegram = (req, res, next) => {
	if (!req.url.includes('/uploads'))
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
	next()
}
