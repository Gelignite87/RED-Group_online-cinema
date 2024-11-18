import { HfInference } from '@huggingface/inference'
import dotenv from 'dotenv'

dotenv.config()
const huggingface = new HfInference(process.env.HUGGINGFACE_API_KEY)

export const HuggingFaceService = {
	async chat(messages) {
		const chat_completion = await huggingface.chatCompletion({
			model: 'Qwen/Qwen2.5-Coder-32B-Instruct',
			messages,
		})
		return chat_completion.choices[0].message.content
	},
}
