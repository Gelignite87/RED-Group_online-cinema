import express from 'express'

import { authAdmin, authUser } from '../../middleware/authMiddleware.js'

import { MovieController } from './movie.controller.js'

const router = express.Router()

router.route('/by-slug/:slug').get(MovieController.bySlug)
router.route('/by-actor/:actorId').get(MovieController.byActor)
router.route('/by-genres').post(MovieController.byGenres)
router
	.route('/')
	.get(MovieController.getAll)
	.post(authUser, authAdmin, MovieController.create)
router.route('/most-popular').get(MovieController.getMostPopular)
router.route('/update-count-opened').put(MovieController.updateCountOpened)
router
	.route('/:id')
	.get(authUser, authAdmin, MovieController.get)
	.put(authUser, authAdmin, MovieController.update)
	.delete(authUser, authAdmin, MovieController.delete)

export default router
