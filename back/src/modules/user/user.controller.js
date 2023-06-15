import { logsReqRes } from '../../helpers/logsReqRes.js'

import { UserService } from './user.service.js'

export const UserController = {
	async getProfile(req, res) {
		const _id = req.user._id
		try {
			const result = await UserService.byId(_id)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в UserController.getProfile',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в UserController.getProfile'.red, error.message)
		}
	},

	async updateProfile(req, res) {
		const _id = req.user._id
		const body = req.body
		try {
			const result = await UserService.updateProfile(_id, body)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в UserController.updateProfile',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в UserController.updateProfile'.red, error.message)
		}
	},

	async getFavorites(req, res) {
		const _id = req.user._id
		try {
			const result = await UserService.getFavoriteMovies(_id)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в UserController.getFavorites',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в UserController.getFavorites'.red, error.message)
		}
	},

	async toggleFavorite(req, res) {
		const user = req.user
		const { movieId } = req.body
		try {
			const result = await UserService.toggleFavorite(movieId, user)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в UserController.toggleFavorite',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в UserController.toggleFavorite'.red, error.message)
		}
	},

	async getCountUsers(req, res) {
		try {
			const result = await UserService.getCount()
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в UserController.getCountUsers',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в UserController.getCountUsers'.red, error.message)
		}
	},

	async getUsers(req, res) {
		let searchTerm = ''
		if (req.query.searchTerm) searchTerm = req.query.searchTerm
		try {
			const result = await UserService.getAll(searchTerm)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в UserController.getUsers',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в UserController.getUsers'.red, error.message)
		}
	},

	async getUser(req, res) {
		const id = req.params.id
		try {
			const result = await UserService.byId(id)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в UserController.getUser',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в UserController.getUser'.red, error.message)
		}
	},

	async updateUser(req, res) {
		const id = req.params.id
		const body = req.body
		try {
			const result = await UserService.updateProfile(id, body)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в UserController.updateUser',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в UserController.updateUser'.red, error.message)
		}
	},

	async deleteUser(req, res) {
		const id = req.params.id
		try {
			const result = await UserService.delete(id)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в UserController.deleteUser',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в UserController.deleteUser'.red, error.message)
		}
	},
}
