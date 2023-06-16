import dotenv from 'dotenv'
import { createReadStream } from 'fs'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const OpenAIService = {
	async chat(messages) {
		const chat_completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages,
		})
		return chat_completion.data.choices[0].message.content
	},
	async transcription(filepath) {
		const response = await openai.createTranscription(
			createReadStream(filepath),
			'whisper-1'
		)
		return response.data.text
	},
}
