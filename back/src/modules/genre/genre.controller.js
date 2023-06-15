import { logsReqRes } from '../../helpers/logsReqRes.js'

import { GenreService } from './genre.service.js'

export const GenreController = {
	async bySlug(req, res) {
		const slug = req.params.slug
		try {
			const result = await GenreService.bySlug(slug)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в GenreController.bySlug',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в GenreController.bySlug'.red, error.message)
		}
	},
	async getCollections(req, res) {
		try {
			const result = await GenreService.getCollections()
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в GenreController.getCollections',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error(
				'Ошибка в GenreController.getCollections'.red,
				error.message
			)
		}
	},
	async getAll(req, res) {
		const searchTerm = req.query.searchTerm
		try {
			const result = await GenreService.getAll(searchTerm)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в GenreController.getAll',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в GenreController.getAll'.red, error.message)
		}
	},
	async get(req, res) {
		const id = req.params.id
		try {
			const result = await GenreService.byId(id)
			res.status(200).json(result)
		} catch (error) {
			res
				.status(500)
				.json({ error: 'Ошибка в GenreController.get', message: error.message })
			logsReqRes(req, res)
			console.error('Ошибка в GenreController.get'.red, error.message)
		}
	},
	async create(req, res) {
		try {
			const result = await GenreService.create()
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в GenreController.create',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в GenreController.create'.red, error.message)
		}
	},
	async update(req, res) {
		const id = req.params.id
		const dto = req.body
		try {
			const result = await GenreService.update(id, dto)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в GenreController.update',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в GenreController.update'.red, error.message)
		}
	},
	async delete(req, res) {
		const id = req.params.id
		try {
			const result = await GenreService.delete(id)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в GenreController.delete',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в GenreController.delete'.red, error.message)
		}
	},
}
