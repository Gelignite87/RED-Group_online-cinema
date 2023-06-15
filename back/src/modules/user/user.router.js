import express from 'express'

import { authAdmin, authUser } from '../../middleware/authMiddleware.js'

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
router.route('/count').get(authUser, authAdmin, UserController.getCountUsers)
router.route('/').get(authUser, authAdmin, UserController.getUsers)
router
	.route('/:id')
	.get(authUser, authAdmin, UserController.getUser)
	.put(authUser, authAdmin, UserController.updateUser)
	.delete(authUser, authAdmin, UserController.deleteUser)

export default router
