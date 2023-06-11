import { Types } from 'mongoose'

import { MovieService } from '../movie/movie.service.js'

import { RatingModel } from './rating.model.js'

export const RatingService = {
	async getMovieValueByUser(movieId, userId) {
		return RatingModel.findOne({ movieId: movieId, userId: userId })
			.select('value')
			.exec()
			.then((data) => (data ? data.value : { message: 'Not found movie!' }))
	},

	async averageRatingByMovie(movieId) {
		const ratingsMovie = await RatingModel.aggregate()
			.match({ movieId: new Types.ObjectId(movieId) }) //принудительно приводим movieId к формату Types.ObjectId
			.exec()
		return (
			ratingsMovie.reduce((acc, el) => acc + el.value, 0) / ratingsMovie.length
		)
	},

	async setRating(userId, dto) {
		const { movieId, value } = dto

		const findMovie = await MovieService.findMovie(movieId)
		if (!findMovie) throw new Error('Not found movie!')

		const newRating = await RatingModel.findOneAndUpdate(
			//не только добавляет но и создает
			{ movieId, userId },
			{ movieId, userId, value },
			{ new: true, upsert: true, setDefaultsOnInsert: true } //создает элемент коллекции если его нет
		).exec()

		const averageRating = await this.averageRatingByMovie(movieId)
		await MovieService.updateRating(movieId, averageRating)
		return newRating
	},
}
