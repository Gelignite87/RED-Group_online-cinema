import axios from 'axios'
import { createWriteStream } from 'fs'

class OggConverter {
	constructor() {}

	async create(url, filename) {
		try {
			const response = await axios.get(url, {
				responseType: 'stream',
			})
			const stream = createWriteStream(filename)
			response.data.pipe(stream)
		} catch (error) {
			console.error(`Ошибка в OggConverter.create `.red, error.message)
		}
	}
}

export const oggConverter = new OggConverter()
