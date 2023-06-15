import express from 'express'

import { authAdmin, authUser } from '../../middleware/authMiddleware.js'

import { GenreController } from './genre.controller.js'

const router = express.Router()

router.route('/by-slug/:slug').get(GenreController.bySlug)
router.route('/collections').get(GenreController.getCollections)
router
	.route('/')
	.get(GenreController.getAll)
	.post(authUser, authAdmin, GenreController.create)
router
	.route('/:id')
	.get(authUser, authAdmin, GenreController.get)
	.put(authUser, authAdmin, GenreController.update)
	.delete(authUser, authAdmin, GenreController.delete)

export default router
