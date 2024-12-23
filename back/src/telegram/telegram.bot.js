import dotenv from 'dotenv'
import { Telegraf, session } from 'telegraf'
import { message } from 'telegraf/filters'
import { code } from 'telegraf/format'

import { HuggingFaceService } from '../service/huggingFace.service.js'

// import { OggService } from '../service/ogg.service.js'
// import { OpenAIService } from '../service/openAI.service.js'
import { TelegramService } from './telegram.service.js'

dotenv.config() /* Загрузка переменных окружения */
export const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
const allowedUsers = process.env.TELEGRAM_ALLOWED_USERS

bot
	.use((ctx, next) => {
		console.log(
			'id:'.green,
			ctx.from.id,
			'first_name:'.green,
			ctx.from.first_name,
			'username:'.green,
			ctx.from.username
		)
		if (ctx.from && allowedUsers.includes(ctx.from.id)) {
			// Пользователь разрешен, продолжаем выполнение других middleware
			return next()
		} else {
			ctx.reply('Извините, у вас нет доступа к этому боту.')
		}
	})
	.use(session())
	.command('start', async (ctx) => {
		ctx.session = { messages: [] }
		ctx.reply(
			`<b>Welcome!</b>\n${JSON.stringify(
				ctx.message.chat,
				null,
				2
			)}\nВаш ID добавлен в базу данных`,
			{
				parse_mode: 'HTML',
			}
		)
		TelegramService.updateChatIds(ctx.message.chat.id)
	})
	.command('new', (ctx) => {
		ctx.session = { messages: [] }
		ctx.reply('Контекст очищен')
	})
	// .on(message('voice'), async (ctx) => {
	// 	ctx.session ??= { messages: [] }
	// 	let messageLoading1
	// 	try {
	// 		messageLoading1 = await ctx.reply(code('Loading...'))
	// 		const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)
	// 		const userId = String(ctx.message.chat.id)
	// 		const oggPath = await OggService.create(link.href, userId)
	// 		const mp3Path = await OggService.toMp3(oggPath, userId)
	// await ctx.replyWithAudio(
	// 	{ source: mp3Path },
	// 	{ caption: 'конвертировано в mp3' }
	// )
	// const text = await OpenAIService.transcription(mp3Path)
	// 		if (text) {
	// 			await ctx.deleteMessage(messageLoading1.message_id)
	// 			await ctx.reply(code(`Ваш запрос: ${text}`))
	// 			const messageLoading2 = await ctx.reply(code('Loading...'))

	// 			ctx.session.messages.push({ role: 'user', content: text })
	// 			// const responseText = await OpenAIService.chat(ctx.session.messages)
	// 			const responseText = await HuggingFaceService.chat(ctx.session.messages)
	// 			ctx.session.messages.push({ role: 'assistant', content: responseText })

	// 			await ctx.deleteMessage(messageLoading2.message_id)
	// 			await ctx.reply(responseText)
	// 		} else {
	// 			await ctx.deleteMessage(messageLoading1.message_id)
	// 			ctx.reply(code('Голосовое сообщение не содержит текст'))
	// 			throw new Error('Голосовое сообщение не содержит текст')
	// 		}
	// 	} catch (error) {
	// 		console.error(
	// 			`Ошибка в bot.on.voice:`.red,
	// 			error.response ? error.response.data : error.message
	// 		)
	// 		await ctx.reply(
	// 			error.response ? error.response.data.error.message : error.message
	// 		)
	// 		await ctx.deleteMessage(messageLoading1.message_id)
	// 	}
	// })
	.on(message('text'), async (ctx) => {
		ctx.session ??= { messages: [] }
		let messageLoading
		try {
			messageLoading = await ctx.reply(code('Loading...'))

			ctx.session.messages.push({ role: 'user', content: ctx.message.text })
			// const responseText = await OpenAIService.chat(ctx.session.messages)
			const responseText = await HuggingFaceService.chat(ctx.session.messages)
			ctx.session.messages.push({ role: 'assistant', content: responseText })

			await ctx.deleteMessage(messageLoading.message_id)
			await ctx.reply(responseText)
		} catch (error) {
			console.error(
				`Ошибка в bot.on.text:`.red,
				error.response ? error.response.data : error.message
			)
			await ctx.reply(
				error.response ? error.response.data.error.message : error.message
			)
			await ctx.deleteMessage(messageLoading.message_id)
		}
	})
	.launch()
process.once('SIGINT', () => bot.stop('SIGINT')) // Signal Interrupt
process.once('SIGTERM', () => bot.stop('SIGTERM')) // Signal Terminate
