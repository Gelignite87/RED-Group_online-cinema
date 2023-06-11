import express from 'express'

import { authUser } from '../../middleware/authUserMiddleware.js'

import { RatingController } from './rating.controller.js'

const router = express.Router()

router.route('/:movieId').get(authUser, RatingController.getMovieValueByUser)
router.route('/set-rating').post(authUser, RatingController.setRating)

export default router
