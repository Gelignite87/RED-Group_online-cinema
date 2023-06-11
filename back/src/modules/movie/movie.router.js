import express from 'express'

import { authAdmin } from '../../middleware/authAdminMiddleware.js'

import { MovieController } from './movie.controller.js'

const router = express.Router()

router.route('/by-slug/:slug').get(MovieController.bySlug)
router.route('/by-slug/:actorId').get(MovieController.byActor)
router.route('/by-genres').post(MovieController.byGenres)
router
	.route('/')
	.get(MovieController.getAll)
	.post(authAdmin, MovieController.create)
router.route('/most-popular').get(MovieController.getMostPopular)
router.route('/update-count-opened').put(MovieController.updateCountOpened)
router
	.route('/:id')
	.get(authAdmin, MovieController.get)
	.put(authAdmin, MovieController.update)
	.delete(authAdmin, MovieController.delete)

export default router
