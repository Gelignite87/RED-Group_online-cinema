import { Telegram } from 'src/telegram/telegram.interface'

export const getTelegramConfig = (): Telegram => ({
  chatId: '1097212668', //chatId берём из ответа по ссылке
  //https://api.telegram.org/bot6174061390:AAFGvU_v86g5ZUc_ZxxJ_dET7FEPTHrdel4/getUpdates
  token: '6174061390:AAFGvU_v86g5ZUc_ZxxJ_dET7FEPTHrdel4',
})
