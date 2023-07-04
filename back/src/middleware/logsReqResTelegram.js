import { TelegramService } from '../telegram/telegram.service.js'

export const logsReqResTelegram = async (req, res, next) => {
	if (process.env.NODE_ENV === 'development' && !req.url.includes('/uploads')) {
		try {
			await TelegramService.sendMessage(
				`<b>${req.method} ${res.statusCode}</b>
		from: ${req.headers.referer} ip: ${req.ip}
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
		} catch (error) {
			console.error('Ошибка в logsReqResTelegram'.red, error.message)
		}
	}
	next && next()
}

export const logsFilesReqResTelegram = async (req, res, next) => {
	if (process.env.NODE_ENV === 'development' && !req.url.includes('/uploads')) {
		try {
			await TelegramService.sendMessage(
				`<b>${req.method} ${res.statusCode}</b>
		from: ${req.headers.referer} ip: ${req.ip}
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
		} catch (error) {
			console.error('Ошибка в logsFilesReqResTelegram'.red, error.message)
		}
	}
	next && next()
}
