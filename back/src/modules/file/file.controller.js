import { logsFilesReqRes } from '../../helpers/logsReqRes.js'

import { FileService } from './file.service.js'

export const FileController = async (req, res) => {
	const files = req.files
	const folder = req.query.folder || 'default'
	try {
		const result = await FileService.saveFiles(files, folder)
		res.status(200).json(result)
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Ошибка в FileController', message: error.message })
		logsFilesReqRes(req, res)
		console.error('Ошибка в FileController)'.red, error.message)
	}
}
