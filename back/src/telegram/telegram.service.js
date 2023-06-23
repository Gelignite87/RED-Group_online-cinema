import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'

import { TelegramModel } from './telegram.model.js'

dotenv.config() /* Загрузка переменных окружения */
// const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

export const TelegramService = {
	async updateChatIds(chatId) {
		if (!(await TelegramModel.find().count()))
			await TelegramModel.create({ chatIds: [chatId] })
		const dataTelegram = await TelegramModel.find()
		const _id = dataTelegram[0]._id
		const newChatIds = dataTelegram[0].chatIds
		if (!newChatIds.includes(chatId)) {
			newChatIds.push(chatId)
			await TelegramModel.findByIdAndUpdate(_id, { chatIds: newChatIds })
		}
	},
	async sendMessage(msg) {
		const dataTelegram = await TelegramModel.find()
		await Promise.all(
			dataTelegram[0].chatIds.map(async (chatId) => {
				await bot.telegram.sendMessage(chatId, msg, {
					parse_mode: 'HTML',
				})
			})
		)
	},
	async sendPhoto(photoPath, msg) {
		const dataTelegram = await TelegramModel.find()
		await Promise.all(
			dataTelegram[0].chatIds.map(async (chatId) => {
				await bot.telegram.sendPhoto(
					chatId,
					photoPath,
					msg ? { caption: msg } : {}
				)
			})
		)
	},
}
