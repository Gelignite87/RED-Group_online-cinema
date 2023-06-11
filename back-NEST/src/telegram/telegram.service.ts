import { Injectable } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'

@Injectable()
export class TelegramService {
  bot: Telegraf

  constructor() {
    this.bot = new Telegraf(process.env.TELEGRAM_TOKEN)
  }

  async sendMessage(
    chatIds: string[],
    msg: string,
    options?: ExtraReplyMessage
  ) {
    await Promise.all(
      chatIds.map(async (chatId) => {
        await this.bot.telegram.sendMessage(chatId, msg, {
          parse_mode: 'HTML', //теги считываются и преобразуют текст, переданный в msg
          ...options,
        })
      })
    )
  }

  async sendPhoto(chatIds: string[], photo: string, msg?: string) {
    await Promise.all(
      chatIds.map(async (chatId) => {
        await this.bot.telegram.sendPhoto(
          chatId,
          photo,
          msg ? { caption: msg } : {}
        )
      })
    )
  }
}
