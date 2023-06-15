import express from 'express'

import { authAdmin, authUser } from '../../middleware/authMiddleware.js'

import { ActorController } from './actor.controller.js'

const router = express.Router()

router.route('/by-slug/:slug').get(ActorController.bySlug)
router
	.route('/')
	.get(ActorController.getAll)
	.post(authUser, authAdmin, ActorController.create)
router
	.route('/:id')
	.get(authUser, authAdmin, ActorController.get)
	.put(authUser, authAdmin, ActorController.update)
	.delete(authUser, authAdmin, ActorController.delete)

export default router
