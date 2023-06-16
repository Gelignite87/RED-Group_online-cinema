import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'

import { oggConverter } from '../helpers/oggConverter.js'

dotenv.config() /* Загрузка переменных окружения */
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.on('voice', async (ctx) => {
	try {
		const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)
		const userId = String(ctx.message.chat.id)
		const oggPath = await oggConverter.create(link.href, userId)
		const mp3Path = await oggConverter.toMp3(oggPath, userId)
		await ctx.replyWithAudio(
			{ source: mp3Path },
			{ caption: 'конвертировано в mp3' }
		)
	} catch (error) {
		console.error(`Ошибка в bot.on `.red, error.message)
	}
})
bot.command('start', (ctx) => {
	ctx.reply(`Welcome\n${JSON.stringify(ctx.message.chat, null, 2)}`, {
		parse_mode: 'HTML',
	})
	console.log(String(ctx.message.chat.id))
})

bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT')) // Signal Interrupt
process.once('SIGTERM', () => bot.stop('SIGTERM')) // Signal Terminate
export default bot
