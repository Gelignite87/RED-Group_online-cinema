import express from 'express'

import { authAdmin } from '../../middleware/authAdminMiddleware.js'

import { ActorController } from './actor.controller.js'

const router = express.Router()

router.route('/by-slug/:slug').get(ActorController.bySlug)
router
	.route('/')
	.get(ActorController.getAll)
	.post(authAdmin, ActorController.create)
router
	.route('/:id')
	.get(authAdmin, ActorController.get)
	.put(authAdmin, ActorController.update)
	.delete(authAdmin, ActorController.delete)

export default router
