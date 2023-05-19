import { axiosAuth } from 'api/interceptors'

export const FileService = {
	async upload(file: FormData, folder?: string) {
		return axiosAuth.post<{ url: string; name: string }[]>('/files', file, {
			params: { folder }, //создаем query параметр /files?folder=(переменная folder)
			headers: { 'Content-Type': 'multipart/form-data' }, //меняем headers чтобы сервер понял что передается FormData
		})
	},
}
