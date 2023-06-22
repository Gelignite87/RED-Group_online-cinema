import { MovieService } from '../movie/movie.service.js'

import { GenreModel } from './genre.model.js'

export const GenreService = {
	async bySlug(slug) {
		const doc = await GenreModel.findOne({ slug }).exec()
		if (!doc) throw new Error('Genre not found!')
		return doc
	},

	async getAll(searchTerm = '') {
		let options = {}
		if (searchTerm)
			options = {
				$or: [
					{ name: new RegExp(searchTerm, 'i') },
					{ slug: new RegExp(searchTerm, 'i') },
					{ description: new RegExp(searchTerm, 'i') },
				],
			}
		return GenreModel.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	},

	async getCollections() {
		const genres = await this.getAll()
		const collections = await Promise.all(
			//Promise.all нужен чтобы сделать асинхронный map
			genres.map(async (genre) => {
				const moviesByGenre = await MovieService.byGenres([genre._id])
				const result = {
					_id: String(genre._id),
					image: moviesByGenre[0]?.bigPoster
						? moviesByGenre[0]?.bigPoster
						: '/No movies',
					slug: genre.slug,
					title: genre.name,
				}
				return result
			})
		)
		return collections
	},

	/* Admin place */

	async byId(_id) {
		const genre = await GenreModel.findById(_id)
		if (!genre) throw new Error('Genre not found!')
		return genre
	},

	async create() {
		const defaultValue = {
			name: ' ',
			slug: ' ',
			description: ' ',
			icon: 'MdAutoFixHigh',
		}
		const genre = await GenreModel.create(defaultValue)
		return genre._id
	},

	async update(_id, dto) {
		const updateGenre = await GenreModel.findByIdAndUpdate(_id, dto, {
			new: true, //new: true означает что findByIdAndUpdate возвращает новую версию
		}).exec()

		if (!updateGenre) throw new Error('Genre not found!')

		return updateGenre
	},

	async delete(id) {
		const deleteGenre = await GenreModel.findByIdAndDelete(id).exec()

		if (!deleteGenre) throw new Error('Genre not found!')

		return deleteGenre
	},
}
