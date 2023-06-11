import { ActorModel } from './actor.model.js'

export const ActorService = {
	async bySlug(slug) {
		const doc = await ActorModel.findOne({ slug }).exec()
		if (!doc) throw new Error('Actor not found!')
		return doc
	},

	async getAll(searchTerm = '') {
		let options = {}
		if (searchTerm)
			options = {
				$or: [
					{ name: new RegExp(searchTerm, 'i') },
					{ slug: new RegExp(searchTerm, 'i') },
				],
			}
		return ActorModel.aggregate() //Агрегация
			.match(options) //то же самое что и find
			.lookup({
				from: 'Movie', //смотрим в коллекцию Movie
				foreignField: 'actors', //в коллекции Movie обращаемся к полю actors (там лежат id актеров)
				localField: '_id', //в коллекции Actor обращаемся к _id
				as: 'movies', //записываем в новое поле movies массив фильмов где играет актер
			})
			.addFields({ countMovies: { $size: '$movies' } }) //добавляем поле countMovies, обращаемся к полю movies и с помощью оператора $size узнаем размер массива
			.project({
				__v: 0,
				updatedAt: 0, //аналог .select('-__v -updatedAt')
				movies: {
					poster: 0,
					bigPoster: 0,
					description: 0,
					slug: 0,
					rating: 0,
					videoUrl: 0,
					countOpened: 0,
					genres: 0,
					actors: 0,
					isSendTelegram: 0,
					createdAt: 0,
					updatedAt: 0,
					__v: 0,
					parameters: 0,
				},
			})
			.sort({ createdAt: -1 })
			.exec()
	},

	/* Admin place */

	async byId(_id) {
		// const genre = await ActorModel.findById(_id)
		// if (!genre) throw new Error('Actor not found!')

		const ObjectId = new mongoose.Types.ObjectId(_id)

		const aggregate = await ActorModel.aggregate()
			.match({ _id: ObjectId })
			.lookup({
				from: 'Movie', //смотрим в коллекцию Movie
				foreignField: 'actors', //в коллекции Movie обращаемся к полю actors (там лежат id актеров)
				localField: '_id', //в коллекции Actor обращаемся к _id
				as: 'movies', //записываем в новое поле movies массив фильмов где играет актер
			})
			.addFields({ countMovies: { $size: '$movies' } }) //добавляем поле countMovies, обращаемся к полю movies и с помощью оператора $size узнаем размер массива
			.project({
				__v: 0,
				updatedAt: 0, //аналог .select('-__v -updatedAt')
				movies: 0,
			})
			.exec()

		if (aggregate.length === 0) throw new Error('Actor not found!')

		return aggregate[0]
	},

	async create() {
		const defaultValue = {
			name: '',
			slug: '',
			photo: '',
		}
		const genre = await ActorModel.create(defaultValue)
		return genre._id
	},

	async update(_id, dto) {
		const updateGenre = await ActorModel.findByIdAndUpdate(_id, dto, {
			new: true, //new: true означает что findByIdAndUpdate возвращает новую версию
		}).exec()
		if (!updateGenre) throw new Error('Actor not found!')
		return updateGenre
	},

	async delete(id) {
		const deleteGenre = await ActorModel.findByIdAndDelete(id).exec()
		if (!deleteGenre) throw new Error('Actor not found!')
		return deleteGenre
	},
}
