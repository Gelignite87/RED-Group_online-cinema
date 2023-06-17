import axios from 'axios'
import ffmpegPath from 'ffmpeg-static'
import ffmpeg from 'fluent-ffmpeg'
import { createWriteStream } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { unlink } from 'fs/promises'

class OggConverter {
	constructor() {
		this.__dirname = path.resolve(fileURLToPath(import.meta.url), '../../..')
		ffmpeg.setFfmpegPath(ffmpegPath)
	}
	toMp3(oggPath, filename) {
		const mp3Path = path.join(this.__dirname, `/uploads/voices/${filename}.mp3`)
		return new Promise((resolve, reject) => {
			ffmpeg(oggPath)
				.output(mp3Path)
				.on('end', () => {
					resolve(mp3Path)
					unlink(oggPath)
				})
				.on('error', (err) => {
					reject(err)
				})
				.run()
		})
	}
	async create(url, filename) {
		const oggPath = path.join(this.__dirname, `/uploads/voices/${filename}.ogg`)
		const responseOgg = await axios.get(url, {
			responseType: 'stream', //ответ будет представлен как поток данных
		})
		return new Promise((resolve, reject) => {
			const stream = createWriteStream(oggPath) //создается файловый поток для записи данных
			responseOgg.data.pipe(stream) //данные, поступающие в responseOgg.data, автоматически записываются в файловый поток stream
			stream
				.on('finish', () => {
					resolve(oggPath)
				})
				.on('error', (err) => {
					reject(err)
				})
		})
	}
}

export const OggService = new OggConverter()
