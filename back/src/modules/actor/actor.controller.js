import { logsReqRes } from '../../helpers/logsReqRes.js'

import { ActorService } from './actor.service.js'

export const ActorController = {
	async bySlug(req, res) {
		const slug = req.params.slug
		try {
			const result = await ActorService.bySlug(slug)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в ActorController.bySlug'.red, error.message)
			res.status(500).json({ error: 'Ошибка в ActorController.bySlug' })
			logsReqRes(req, res)
		}
	},
	async getAll(req, res) {
		const searchTerm = req.query.searchTerm
		try {
			const result = await ActorService.getAll(searchTerm)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в ActorController.getAll'.red, error.message)
			res.status(500).json({ error: 'Ошибка в ActorController.getAll' })
			logsReqRes(req, res)
		}
	},
	async get(req, res) {
		const id = req.params.id
		try {
			const result = await ActorService.byId(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в ActorController.get'.red, error.message)
			res.status(500).json({ error: 'Ошибка в ActorController.get' })
			logsReqRes(req, res)
		}
	},
	async create(req, res) {
		try {
			const result = await ActorService.create()
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в ActorController.create'.red, error.message)
			res.status(500).json({ error: 'Ошибка в ActorController.create' })
			logsReqRes(req, res)
		}
	},
	async update(req, res) {
		const id = req.params.id
		const dto = req.body
		try {
			const result = await ActorService.update(id, dto)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в ActorController.update'.red, error.message)
			res.status(500).json({ error: 'Ошибка в ActorController.update' })
			logsReqRes(req, res)
		}
	},
	async delete(req, res) {
		const id = req.params.id
		try {
			const result = await ActorService.delete(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в ActorController.delete'.red, error.message)
			res.status(500).json({ error: 'Ошибка в ActorController.delete' })
			logsReqRes(req, res)
		}
	},
}
