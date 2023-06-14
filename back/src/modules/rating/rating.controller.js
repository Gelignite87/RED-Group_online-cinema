import { logsReqRes } from '../../helpers/logsReqRes.js'

import { RatingService } from './rating.service.js'

export const RatingController = {
	async getMovieValueByUser(req, res) {
		const movieId = req.params.movieId
		const _id = req.user._id
		try {
			const result = await RatingService.getMovieValueByUser(movieId, _id)
			res.status(200).json(result)
		} catch (error) {
			console.error(
				'Ошибка'.red,
				'(in RatingController.getMovieValueByUser)',
				error.message
			)
			res
				.status(500)
				.json({ error: 'Ошибка в RatingController.getMovieValueByUser' })
			logsReqRes(req, res)
		}
	},
	async setRating(req, res) {
		const _id = req.user._id
		const dto = req.body
		try {
			const result = await RatingService.setRating(_id, dto)
			res.status(200).json(result)
		} catch (error) {
			console.error(
				'Ошибка'.red,
				'(in RatingController.setRating)',
				error.message
			)
			res.status(500).json({ error: 'Ошибка в RatingController.setRating' })
			logsReqRes(req, res)
		}
	},
}
