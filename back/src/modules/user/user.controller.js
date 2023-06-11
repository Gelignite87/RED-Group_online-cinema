import { UserService } from './user.service.js'

export const UserController = {
	async getProfile(req, res) {
		const _id = req.user._id
		try {
			const result = await UserService.byId(_id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в UserController:getProfile', error)
			res.status(500).json({ error: 'Ошибка в UserController:getProfile' })
		}
	},

	async updateProfile(req, res) {
		const _id = req.user._id
		const body = req.body
		try {
			const result = await UserService.updateProfile(_id, body)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в UserController:updateProfile', error)
			res.status(500).json({ error: 'Ошибка в UserController:updateProfile' })
		}
	},

	async getFavorites(req, res) {
		const _id = req.user._id
		try {
			const result = await UserService.getFavoriteMovies(_id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в UserController:getFavorites', error)
			res.status(500).json({ error: 'Ошибка в UserController:getFavorites' })
		}
	},

	async toggleFavorite(req, res) {
		const user = req.user
		const { movieId } = req.body
		try {
			const result = await UserService.toggleFavorite(movieId, user)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в UserController:toggleFavorite', error)
			res.status(500).json({ error: 'Ошибка в UserController:toggleFavorite' })
		}
	},

	async getCountUsers(req, res) {
		try {
			const result = await UserService.getCount()
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в UserController:getCountUsers', error)
			res.status(500).json({ error: 'Ошибка в UserController:getCountUsers' })
		}
	},

	async getUsers(req, res) {
		let searchTerm = ''
		if (req.query.searchTerm) searchTerm = req.query.searchTerm
		try {
			const result = await UserService.getAll(searchTerm)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в UserController:getUsers', error)
			res.status(500).json({ error: 'Ошибка в UserController:getUsers' })
		}
	},

	async getUser(req, res) {
		const id = req.params.id
		try {
			const result = await UserService.userService.byId(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в UserController:getUser', error)
			res.status(500).json({ error: 'Ошибка в UserController:getUser' })
		}
	},

	async updateUser(req, res) {
		const id = req.params.id
		const body = req.body
		try {
			const result = await UserService.updateProfile(id, body)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в UserController:updateUser', error)
			res.status(500).json({ error: 'Ошибка в UserController:updateUser' })
		}
	},

	async deleteUser(req, res) {
		const id = req.params.id
		try {
			const result = await UserService.delete(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в UserController:deleteUser', error)
			res.status(500).json({ error: 'Ошибка в UserController:deleteUser' })
		}
	},
}
