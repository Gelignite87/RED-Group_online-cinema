import installer from '@ffmpeg-installer/ffmpeg'
import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg'
import { createWriteStream } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { unlink } from 'fs/promises'

const __dirname = path.resolve(fileURLToPath(import.meta.url), '../../..')
ffmpeg.setFfmpegPath(installer.path)

class OggConverter {
	constructor() {}

	toMp3(oggPath, filename) {
		const mp3Path = path.join(__dirname, `/uploads/voices/${filename}.mp3`)
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
		const oggPath = path.join(__dirname, `/uploads/voices/${filename}.ogg`)
		const response = await axios.get(url, {
			responseType: 'stream',
		})
		return new Promise((resolve, reject) => {
			const stream = createWriteStream(oggPath)
			response.data.pipe(stream)
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

export const oggConverter = new OggConverter()
