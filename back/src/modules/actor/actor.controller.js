import { ActorService } from './actor.service.js'

export const ActorController = {
	async bySlug(req, res) {
		const slug = req.params.slug
		try {
			const result = await ActorService.bySlug(slug)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в ActorController:bySlug', error)
			res.status(500).json({ error: 'Ошибка в ActorController:bySlug' })
		}
	},
	async getAll(req, res) {
		const searchTerm = req.query.searchTerm
		try {
			const result = await ActorService.getAll(searchTerm)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в ActorController:getAll', error)
			res.status(500).json({ error: 'Ошибка в ActorController:getAll' })
		}
	},
	async get(req, res) {
		const id = req.params.id
		try {
			const result = await ActorService.get(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в ActorController:get', error)
			res.status(500).json({ error: 'Ошибка в ActorController:get' })
		}
	},
	async create(req, res) {
		try {
			const result = await ActorService.create()
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в ActorController:create', error)
			res.status(500).json({ error: 'Ошибка в ActorController:create' })
		}
	},
	async update(req, res) {
		const id = req.params.id
		const dto = req.body
		try {
			const result = await ActorService.update(id, dto)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в ActorController:update', error)
			res.status(500).json({ error: 'Ошибка в ActorController:update' })
		}
	},
	async delete(req, res) {
		const id = req.params.id
		try {
			const result = await ActorService.delete(id)
			res.status(200).json(result)
		} catch (error) {
			console.error('Ошибка в ActorController:delete', error)
			res.status(500).json({ error: 'Ошибка в ActorController:delete' })
		}
	},
}
