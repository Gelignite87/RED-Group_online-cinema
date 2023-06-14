import { logsReqRes } from '../../helpers/logsReqRes.js'

import { UserService } from './user.service.js'

export const UserController = {
	async getProfile(req, res) {
		const _id = req.user._id
		try {
			const result = await UserService.byId(_id)
			res.status(200).json(result)
		} catch (error) {
			console.error(
				'Ошибка'.red,
				'(in UserController.getProfile)',
				error.message
			)
			res.status(500).json({ error: 'Ошибка в UserController.getProfile' })
			logsReqRes(req, res)
		}
	},

	async updateProfile(req, res) {
		const _id = req.user._id
		const body = req.body
		try {
			const result = await UserService.updateProfile(_id, body)
			res.status(200).json(result)
		} catch (error) {
			console.error(
				'Ошибка'.red,
				'(in UserController.updateProfile)',
				error.message
			)
			res.status(500).json({ error: 'Ошибка в UserController.updateProfile' })
			logsReqRes(req, res)
		}
	},

	async getFavorites(req, res) {
		const _id = req.user._id
		try {
			const result = await UserService.getFavoriteMovies(_id)
			res.status(200).json(result)
		} catch (error) {
			console.error(
				'Ошибка'.red,
				'(in UserController.getFavorites)',
				error.message
			)
			res.status(500).json({ error: 'Ошибка в UserController.getFavorites' })
			logsReqRes(req, res)
		}
	},

	async toggleFavorite(req, res) {
		const user = req.user
		const { movieId } = req.body
		try {
			const result = await UserService.toggleFavorite(movieId, user)
			res.status(200).json(result)
		} catch (error) {
			console.error(
				'Ошибка'.red,
				'(in UserController.toggleFavorite)',
				error.message
			)
			res.status(500).json({ error: 'Ошибка в UserController.toggleFavorite' })
			logsReqRes(req, res)
		}
	},

	async getCountUsers(req, res) {
		try {
			const result = await UserService.getCount()
			res.status(200).json(result)
		} catch (error) {
			console.error(
				'Ошибка'.red,
				'(in UserController.getCountUsers)',
				error.message
			)
			res.status(500).json({ error: 'Ошибка в UserController.getCountUsers' })
			logsReqRes(req, res)
		}
	},

	async getUsers(req, res) {
		let searchTerm = ''
		if (req.query.searchTerm) searchTerm = req.query.searchTerm
		try {
			const result = await UserService.getAll(searchTerm)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка'.red, '(in UserController.getUsers)', error.message)
			res.status(500).json({ error: 'Ошибка в UserController.getUsers' })
			logsReqRes(req, res)
		}
	},

	async getUser(req, res) {
		const id = req.params.id
		try {
			const result = await UserService.byId(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка'.red, '(in UserController.getUser)', error.message)
			res.status(500).json({ error: 'Ошибка в UserController.getUser' })
			logsReqRes(req, res)
		}
	},

	async updateUser(req, res) {
		const id = req.params.id
		const body = req.body
		try {
			const result = await UserService.updateProfile(id, body)
			res.status(200).json(result)
		} catch (error) {
			console.error(
				'Ошибка'.red,
				'(in UserController.updateUser)',
				error.message
			)
			res.status(500).json({ error: 'Ошибка в UserController.updateUser' })
			logsReqRes(req, res)
		}
	},

	async deleteUser(req, res) {
		const id = req.params.id
		try {
			const result = await UserService.delete(id)
			res.status(200).json(result)
		} catch (error) {
			console.error(
				'Ошибка'.red,
				'(in UserController.deleteUser)',
				error.message
			)
			res.status(500).json({ error: 'Ошибка в UserController.deleteUser' })
			logsReqRes(req, res)
		}
	},
}
