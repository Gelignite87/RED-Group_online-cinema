import { logsReqRes } from '../../helpers/logsReqRes.js'

import { MovieService } from './movie.service.js'

export const MovieController = {
	async bySlug(req, res) {
		const slug = req.params.slug
		try {
			const result = await MovieService.bySlug(slug)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController.bySlug'.red, error.message)
			res.status(500).json({ error: 'Ошибка в MovieController.bySlug' })
			logsReqRes(req, res)
		}
	},
	async byActor(req, res) {
		const actorId = req.params.actorId
		try {
			const result = await MovieService.byActor(actorId)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController.byActor'.red, error.message)
			res.status(500).json({ error: 'Ошибка в MovieController.byActor' })
			logsReqRes(req, res)
		}
	},
	async byGenres(req, res) {
		const { genreIds } = req.body
		try {
			const result = await MovieService.byGenres(genreIds)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController.byGenres'.red, error.message)
			res.status(500).json({ error: 'Ошибка в MovieController.byGenres' })
			logsReqRes(req, res)
		}
	},
	async getAll(req, res) {
		const searchTerm = req.query.searchTerm
		try {
			const result = await MovieService.getAll(searchTerm)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController.getAll'.red, error.message)
			res.status(500).json({ error: 'Ошибка в MovieController.getAll' })
			logsReqRes(req, res)
		}
	},
	async getMostPopular(req, res) {
		try {
			const result = await MovieService.getMostPopular()
			res.status(200).json(result)
		} catch (error) {
			console.error(
				'Ошибка в MovieController.getMostPopular'.red,
				error.message
			)
			res.status(500).json({ error: 'Ошибка в MovieController.getMostPopular' })
			logsReqRes(req, res)
		}
	},
	async updateCountOpened(req, res) {
		const { slug } = req.body
		try {
			const result = await MovieService.updateCountOpened(slug)
			res.status(200).json(result)
		} catch (error) {
			console.error(
				'Ошибка в MovieController.updateCountOpened'.red,
				error.message
			)
			res
				.status(500)
				.json({ error: 'Ошибка в MovieController.updateCountOpened' })
			logsReqRes(req, res)
		}
	},
	async get(req, res) {
		const id = req.params.id
		try {
			const result = await MovieService.byId(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController.get'.red, error.message)
			res.status(500).json({ error: 'Ошибка в MovieController.get' })
			logsReqRes(req, res)
		}
	},
	async create(req, res) {
		try {
			const result = await MovieService.create()
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController.create'.red, error.message)
			res.status(500).json({ error: 'Ошибка в MovieController.create' })
			logsReqRes(req, res)
		}
	},
	async update(req, res) {
		const id = req.params.id
		const dto = req.body
		try {
			const result = await MovieService.update(id, dto)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController.update'.red, error.message)
			res.status(500).json({ error: 'Ошибка в MovieController.update' })
			logsReqRes(req, res)
		}
	},
	async delete(req, res) {
		const id = req.params.id
		try {
			const result = await MovieService.delete(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController.delete'.red, error.message)
			res.status(500).json({ error: 'Ошибка в MovieController.delete' })
			logsReqRes(req, res)
		}
	},
}
