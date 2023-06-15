import { logsReqRes } from '../../helpers/logsReqRes.js'

import { ActorService } from './actor.service.js'

export const ActorController = {
	async bySlug(req, res) {
		const slug = req.params.slug
		try {
			const result = await ActorService.bySlug(slug)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в ActorController.bySlug',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в ActorController.bySlug'.red, error.message)
		}
	},
	async getAll(req, res) {
		const searchTerm = req.query.searchTerm
		try {
			const result = await ActorService.getAll(searchTerm)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в ActorController.getAll',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в ActorController.getAll'.red, error.message)
		}
	},
	async get(req, res) {
		const id = req.params.id
		try {
			const result = await ActorService.byId(id)
			res.status(200).json(result)
		} catch (error) {
			res
				.status(500)
				.json({ error: 'Ошибка в ActorController.get', message: error.message })
			logsReqRes(req, res)
			console.error('Ошибка в ActorController.get'.red, error.message)
		}
	},
	async create(req, res) {
		try {
			const result = await ActorService.create()
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в ActorController.create',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в ActorController.create'.red, error.message)
		}
	},
	async update(req, res) {
		const id = req.params.id
		const dto = req.body
		try {
			const result = await ActorService.update(id, dto)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в ActorController.update',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в ActorController.update'.red, error.message)
		}
	},
	async delete(req, res) {
		const id = req.params.id
		try {
			const result = await ActorService.delete(id)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({
				error: 'Ошибка в ActorController.delete',
				message: error.message,
			})
			logsReqRes(req, res)
			console.error('Ошибка в ActorController.delete'.red, error.message)
		}
	},
}
