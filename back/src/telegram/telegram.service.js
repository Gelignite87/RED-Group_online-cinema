import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'

dotenv.config() /* Загрузка переменных окружения */
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

export const TelegramService = {
	async sendMessage(chatIds, msg) {
		await Promise.all(
			chatIds.map(async (chatId) => {
				await bot.telegram.sendMessage(chatId, msg, {
					parse_mode: 'HTML',
				})
			})
		)
	},
	async sendPhoto(chatIds, photoPath, msg) {
		await Promise.all(
			chatIds.map(async (chatId) => {
				await bot.telegram.sendPhoto(
					chatId,
					photoPath,
					msg ? { caption: msg } : {}
				)
			})
		)
	},
}
