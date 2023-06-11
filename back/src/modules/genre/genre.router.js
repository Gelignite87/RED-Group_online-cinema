import express from 'express'

import { authAdmin } from '../../middleware/authAdminMiddleware.js'

import { GenreController } from './genre.controller.js'

const router = express.Router()

router.route('/by-slug/:slug').get(GenreController.bySlug)
router.route('/collections').get(GenreController.getCollections)
router
	.route('/')
	.get(GenreController.getAll)
	.post(authAdmin, GenreController.create)
router
	.route('/:id')
	.get(authAdmin, GenreController.get)
	.put(authAdmin, GenreController.update)
	.delete(authAdmin, GenreController.delete)

export default router
