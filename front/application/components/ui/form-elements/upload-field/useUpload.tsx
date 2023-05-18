import { ChangeEvent, useCallback, useMemo, useState } from 'react'
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
				onChange(data[0].url) //сервер вернул name и url, записываем url в value
			},
			onError: (error) => {
				toastrError(error, 'Upload file')
			},
		}
	)
	const uploadFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files //получаем массив файлов из input
			if (!files?.length) return //нет файлов - return
			const formData = new FormData()
			formData.append('file', files[0]) //записываем файл в formData
			await mutateAsync(formData)
		},
		[mutateAsync]
	)
	return useMemo(() => ({ uploadFile, isLoading }), [uploadFile, isLoading])
}
