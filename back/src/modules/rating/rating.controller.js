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
			res.status(500).json({
				error: 'Ошибка в RatingController.getMovieValueByUser',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error(
				'Ошибка в RatingController.getMovieValueByUser'.red,
				error.message
			)
		}
	},
	async setRating(req, res) {
		const _id = req.user._id
		const dto = req.body
		try {
			const result = await RatingService.setRating(_id, dto)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в RatingController.setRating',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в RatingController.setRating'.red, error.message)
		}
	},
}
