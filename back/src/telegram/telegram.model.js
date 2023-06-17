import mongoose from 'mongoose'

const telegramSchema = mongoose.Schema(
	{
		chatIds: [{ type: Number, required: true }],
	},
	{
		minimize: false, // получаем все свойства объекта даже если они пустые
		timestamps: true, // дата и время записи и изменения
	}
)

export const TelegramModel = mongoose.model(
	'Telegram',
	telegramSchema,
	'Telegram'
)
