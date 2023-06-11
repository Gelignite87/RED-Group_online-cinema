import { Telegraf } from 'telegraf'

export const TelegramService = {
	async sendMessage(chatIds, msg, options = {}) {
		const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
		await Promise.all(
			chatIds.map(async (chatId) => {
				await bot.telegram.sendMessage(chatId, msg, {
					parse_mode: 'HTML', //теги считываются и преобразуют текст, переданный в msg
					...options,
				})
			})
		)
	},

	async sendPhoto(chatIds, photo, msg) {
		const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
		await Promise.all(
			chatIds.map(async (chatId) => {
				await bot.telegram.sendPhoto(chatId, photo, msg ? { caption: msg } : {})
			})
		)
	},
}
