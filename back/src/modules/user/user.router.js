import express from 'express'

import { authAdmin } from '../../middleware/authAdminMiddleware.js'
import { authUser } from '../../middleware/authUserMiddleware.js'

import { UserController } from './user.controller.js'

const router = express.Router()

router
	.route('/profile')
	.get(authUser, UserController.getProfile)
	.put(authUser, UserController.updateProfile)
router
	.route('/profile/favorites')
	.get(authUser, UserController.getFavorites)
	.put(authUser, UserController.toggleFavorite)
router.route('/count').get(authAdmin, UserController.getCountUsers)
router.route('/').get(authAdmin, UserController.getUsers)
router
	.route('/:id')
	.get(authAdmin, UserController.getUser)
	.put(authAdmin, UserController.updateUser)
	.delete(authAdmin, UserController.deleteUser)

export default router
