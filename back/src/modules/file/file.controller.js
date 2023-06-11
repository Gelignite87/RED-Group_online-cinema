import { FileService } from './file.service.js'

export const FileController = async (req, res) => {
	const files = req.files
	const folder = req.query.folder || 'default'
	try {
		const result = await FileService.saveFiles(files, folder)
		res.status(200).json(result)
	} catch (error) {
		console.error('Ошибка при сохранении файлов', error)
		res.status(500).json({ error: 'Ошибка при сохранении файлов' })
	}
}
