import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const parentDir = path.resolve(__filename, '..', '..', '..')
const __dirname = path.dirname(parentDir)

export const FileService = {
	async saveFiles(files, folder = 'default') {
		const uploadFolder = path.join(__dirname, `uploads/${folder}`)
		await new Promise((resolve, reject) => {
			fs.mkdir(uploadFolder, { recursive: true }, (error) => {
				if (error) {
					reject(error)
				} else {
					resolve()
				}
			})
		})
		const res = await Promise.all(
			files.map(async (file) => {
				await new Promise((resolve, reject) => {
					fs.writeFile(
						`${uploadFolder}/${file.originalname}`,
						file.buffer,
						(error) => {
							if (error) {
								reject(error)
							} else {
								resolve()
							}
						}
					)
				})
				return {
					url: `/uploads/${folder}/${file.originalname}`,
					name: file.originalname,
				}
			})
		)
		return res
	},
}
