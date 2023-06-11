import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const movieSchema = mongoose.Schema(
	{
		poster: { type: String, required: true },
		bigPoster: { type: String, required: true },
		title: { type: String, required: true },
		slug: { type: String, unique: true, required: true },
		parameters: {
			year: { type: Number, required: true },
			duration: { type: Number, required: true },
			country: { type: String, required: true },
		},
		rating: { type: Number, default: 4.0, required: false },
		videoUrl: { type: String, required: true },
		countOpened: { type: Number, default: 0, required: false },
		genres: [{ type: ObjectId, ref: 'Genre', required: true }],
		actors: [{ type: ObjectId, ref: 'Actor', required: true }],
		isSendTelegram: { type: Boolean, default: false, required: false },
	},
	{
		minimize: false, // получаем все свойства объекта даже если они пустые
		timestamps: true, // дата и время записи и изменения
	}
)

export const MovieModel = mongoose.model('Movie', movieSchema, 'Movie')
