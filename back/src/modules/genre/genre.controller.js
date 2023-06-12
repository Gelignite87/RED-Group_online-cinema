import { GenreService } from './genre.service.js'

export const GenreController = {
	async bySlug(req, res) {
		const slug = req.params.slug
		try {
			const result = await GenreService.bySlug(slug)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в GenreController:bySlug', error)
			res.status(500).json({ error: 'Ошибка в GenreController:bySlug' })
		}
	},
	async getCollections(req, res) {
		try {
			const result = await GenreService.getCollections()
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в GenreController:getCollections', error)
			res.status(500).json({ error: 'Ошибка в GenreController:getCollections' })
		}
	},
	async getAll(req, res) {
		const searchTerm = req.query.searchTerm
		try {
			const result = await GenreService.getAll(searchTerm)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в GenreController:getAll', error)
			res.status(500).json({ error: 'Ошибка в GenreController:getAll' })
		}
	},
	async get(req, res) {
		const id = req.params.id
		try {
			const result = await GenreService.byId(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в GenreController:get', error)
			res.status(500).json({ error: 'Ошибка в GenreController:get' })
		}
	},
	async create(req, res) {
		try {
			const result = await GenreService.create()
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в GenreController:create', error)
			res.status(500).json({ error: 'Ошибка в GenreController:create' })
		}
	},
	async update(req, res) {
		const id = req.params.id
		const dto = req.body
		try {
			const result = await GenreService.update(id, dto)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в GenreController:update', error)
			res.status(500).json({ error: 'Ошибка в GenreController:update' })
		}
	},
	async delete(req, res) {
		const id = req.params.id
		try {
			const result = await GenreService.delete(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в GenreController:delete', error)
			res.status(500).json({ error: 'Ошибка в GenreController:delete' })
		}
	},
}
