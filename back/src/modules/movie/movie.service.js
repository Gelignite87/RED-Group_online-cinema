import { TelegramService } from '../../telegram/telegram.service.js'

import { MovieModel } from './movie.model.js'

export const MovieService = {
	async getAll(searchTerm = '') {
		let options = {}
		if (searchTerm)
			options = {
				$or: [{ title: new RegExp(searchTerm, 'i') }],
			}
		return MovieModel.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.populate('actors genres')
			.exec()
	},

	async bySlug(slug) {
		const doc = await MovieModel.findOne({ slug: slug })
			.populate('actors genres') //разворачиваем id в объекты
			.exec()
		if (!doc) throw new Error('Movie not found!')
		return doc
	},

	async byActor(actorId) {
		const docs = await MovieModel.find({ actors: actorId }).exec()
		if (!docs) throw new Error('Movies not found!')
		return docs
	},

	async byGenres(genresIds) {
		genresIds.forEach((el) => {
			if (el.toString().length !== 24)
				throw new ConflictException(
					`One element contain ${el.toString().length} symbols. Must be 24!`
				)
		})
		const docs = await MovieModel.find(
			{ genres: { $in: genresIds } } //перебираем массив и ищем его элементы в поле genres
		).exec()
		if (!docs) throw new Error('Movies not found!')
		return docs
	},

	async getMostPopular() {
		return MovieModel.find({ countOpened: { $gt: 0 } }) //$gt означает >, то есть countOpened > 0
			.sort({ countOpened: -1 }) //сортируем числа в обратную сторону
			.populate('genres')
			.exec()
	},

	async updateCountOpened(slug) {
		const updateMovie = await MovieModel.findOneAndUpdate(
			{ slug: slug },
			{ $inc: { countOpened: 1 } }, //функция инкремента, увеличиваем countOpened на 1
			{ new: true } //возвращаем обновленную версию
		).exec()
		if (!updateMovie) throw new Error('Movie not found!')
		return updateMovie
	},

	/*Secondary functions*/

	async updateRating(id, newRating) {
		return MovieModel.findByIdAndUpdate(
			id,
			{ rating: newRating },
			{ new: true }
		).exec()
	},

	async findMovie(movieId) {
		return MovieModel.findById(movieId)
	},

	/* Admin place */

	async byId(_id) {
		const movie = await MovieModel.findById(_id)
		if (!movie) throw new Error('Movie not found!')
		return movie
	},

	async create() {
		const defaultValue = {
			poster: '',
			bigPoster: '',
			actors: [],
			genres: [],
			slug: '',
			title: '',
			videoUrl: '',
		}
		const movie = await MovieModel.create(defaultValue)
		return movie._id
	},

	async update(_id, dto) {
		const fetchChatIdFromTelegram = await fetch(process.env.TELEGRAM_URI).then(
			(data) => data.json()
		)
		const set = new Set()
		fetchChatIdFromTelegram.result.forEach((el) => {
			set.add(String(el.message.from.id))
		})
		const chatIds = [...set]

		if (!dto.isSendTelegram) {
			await this.sendNotification(dto, chatIds)
			dto.isSendTelegram = true
		}
		const updateMovie = await MovieModel.findByIdAndUpdate(
			_id,
			dto,
			{ new: true } //new: true означает что findByIdAndUpdate возвращает новую версию
		).exec()
		if (!updateMovie) throw new Error('Movie not found!')
		return updateMovie
	},

	async delete(id) {
		const deleteMovie = await MovieModel.findByIdAndDelete(id).exec()
		if (!deleteMovie) throw new Error('Movie not found!')
		return deleteMovie
	},

	async sendNotification(dto, chatIds) {
		const link =
			'https://images.fanart.tv/fanart/john-wick-chapter-4-63f368322144f.jpg'
		await TelegramService.sendPhoto(chatIds, link, dto.slug)
		await TelegramService.sendMessage(chatIds, `<b>${dto.title}</b>`, {
			reply_markup: {
				inline_keyboard: [
					[
						{
							url: 'https://okko.tv/movie/free-guy',
							text: 'Go to watch',
						},
					],
				],
			},
		})
	},
}
