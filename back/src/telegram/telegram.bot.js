import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'

dotenv.config() /* Загрузка переменных окружения */
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.on('voice', async (ctx) => {
	try {
		const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)
		const userId = String(ctx.message.chat.id)
		console.log(link.href)
		// ctx.reply(JSON.stringify(link, null, 2))
	} catch (error) {
		console.error(`Ошибка в bot.on `.red, error.message)
	}
})
bot.command('start', (ctx) => {
	ctx.reply(`Welcome\n${JSON.stringify(ctx.message.chat, null, 2)}`)
	console.log(String(ctx.message.chat.id))
})

bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT')) // Signal Interrupt
process.once('SIGTERM', () => bot.stop('SIGTERM')) // Signal Terminate
