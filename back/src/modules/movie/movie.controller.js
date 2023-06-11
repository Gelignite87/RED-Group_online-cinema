import { MovieService } from './movie.service.js'

export const MovieController = {
	async bySlug(req, res) {
		const slug = req.params.slug
		try {
			const result = await MovieService.bySlug(slug)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController:bySlug', error)
			res.status(500).json({ error: 'Ошибка в MovieController:bySlug' })
		}
	},
	async byActor(req, res) {
		const actorId = req.params.actorId
		try {
			const result = await MovieService.byActor(actorId)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController:byActor', error)
			res.status(500).json({ error: 'Ошибка в MovieController:byActor' })
		}
	},
	async byGenres(req, res) {
		const { genreIds } = req.body
		try {
			const result = await MovieService.byGenres(genreIds)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController:byGenres', error)
			res.status(500).json({ error: 'Ошибка в MovieController:byGenres' })
		}
	},
	async getAll(req, res) {
		const searchTerm = req.query.searchTerm
		try {
			const result = await MovieService.getAll(searchTerm)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController:getAll', error)
			res.status(500).json({ error: 'Ошибка в MovieController:getAll' })
		}
	},
	async getMostPopular(req, res) {
		try {
			const result = await MovieService.getMostPopular()
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController:getMostPopular', error)
			res.status(500).json({ error: 'Ошибка в MovieController:getMostPopular' })
		}
	},
	async updateCountOpened(req, res) {
		const { slug } = req.body
		try {
			const result = await MovieService.updateCountOpened(slug)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController:updateCountOpened', error)
			res
				.status(500)
				.json({ error: 'Ошибка в MovieController:updateCountOpened' })
		}
	},
	async get(req, res) {
		const id = req.params.id
		try {
			const result = await MovieService.byId(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController:get', error)
			res.status(500).json({ error: 'Ошибка в MovieController:get' })
		}
	},
	async create(req, res) {
		try {
			const result = await MovieService.create()
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController:create', error)
			res.status(500).json({ error: 'Ошибка в MovieController:create' })
		}
	},
	async update(req, res) {
		const id = req.params.id
		const dto = req.body
		try {
			const result = await MovieService.update(id, dto)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController:update', error)
			res.status(500).json({ error: 'Ошибка в MovieController:update' })
		}
	},
	async delete(req, res) {
		const id = req.params.id
		try {
			const result = await MovieService.delete(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в MovieController:delete', error)
			res.status(500).json({ error: 'Ошибка в MovieController:delete' })
		}
	},
}
