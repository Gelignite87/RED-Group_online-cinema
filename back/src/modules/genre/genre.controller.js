import { logsReqRes } from '../../helpers/logsReqRes.js'

import { GenreService } from './genre.service.js'

export const GenreController = {
	async bySlug(req, res) {
		const slug = req.params.slug
		try {
			const result = await GenreService.bySlug(slug)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в GenreController.bySlug'.red, error.message)
			res.status(500).json({ error: 'Ошибка в GenreController.bySlug' })
			logsReqRes(req, res)
		}
	},
	async getCollections(req, res) {
		try {
			const result = await GenreService.getCollections()
			res.status(200).json(result)
		} catch (error) {
			console.error(
				'Ошибка в GenreController.getCollections'.red,
				error.message
			)
			res.status(500).json({ error: 'Ошибка в GenreController.getCollections' })
			logsReqRes(req, res)
		}
	},
	async getAll(req, res) {
		const searchTerm = req.query.searchTerm
		try {
			const result = await GenreService.getAll(searchTerm)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в GenreController.getAll'.red, error.message)
			res.status(500).json({ error: 'Ошибка в GenreController.getAll' })
			logsReqRes(req, res)
		}
	},
	async get(req, res) {
		const id = req.params.id
		try {
			const result = await GenreService.byId(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в GenreController.get'.red, error.message)
			res.status(500).json({ error: 'Ошибка в GenreController.get' })
			logsReqRes(req, res)
		}
	},
	async create(req, res) {
		try {
			const result = await GenreService.create()
			res.status(200).json(result)
		} catch (error) {
			cconsole.error('Ошибка в GenreController.create'.red, error.message)
			res.status(500).json({ error: 'Ошибка в GenreController.create' })
			logsReqRes(req, res)
		}
	},
	async update(req, res) {
		const id = req.params.id
		const dto = req.body
		try {
			const result = await GenreService.update(id, dto)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в GenreController.update'.red, error.message)
			res.status(500).json({ error: 'Ошибка в GenreController.update' })
			logsReqRes(req, res)
		}
	},
	async delete(req, res) {
		const id = req.params.id
		try {
			const result = await GenreService.delete(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в GenreController.delete'.red, error.message)
			res.status(500).json({ error: 'Ошибка в GenreController.delete' })
			logsReqRes(req, res)
		}
	},
}
