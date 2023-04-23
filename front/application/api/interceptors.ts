import axios from 'axios'

import { APP_URL } from '@/config/api.config'

export const axiosClassic = axios.create({
	baseURL: APP_URL,
	headers: { 'Content-Type': 'application/json' },
})
