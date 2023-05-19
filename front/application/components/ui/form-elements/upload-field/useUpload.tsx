import { ChangeEvent, useCallback, useMemo } from 'react'
import { useMutation } from 'react-query'

import { FileService } from '@/services/file.service'

import { toastrError } from '@/utils/toastr-error'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const { mutateAsync, isLoading } = useMutation(
		'upload file',
		(data: FormData) => FileService.upload(data, folder),
		{
			onSuccess: ({ data }) => {
				onChange(data[0].url) //сервер вернул массив объектов с полями name и url, записываем url в value
			},
			onError: (error) => {
				toastrError(error, 'Upload file')
			},
		}
	)
	const uploadFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files //получаем объект с файлами из input
			console.table(files) //выводим в консоль выбранные файлы
			if (!files?.length) return //нет файлов - return

			const formData = new FormData()
			for (let key in files) formData.append('file', files[key]) //записываем каждый файл в formData с ключом 'file'
			await mutateAsync(formData)
		},
		[mutateAsync]
	)
	return useMemo(() => ({ uploadFile, isLoading }), [uploadFile, isLoading])
}
