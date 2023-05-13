import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'

import { getAdminUrl } from '@/config/url.config'

import { GenreService } from '@/services/genre.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastrError } from '@/utils/toastr-error'

import { IGenreEditInput } from './genre-edit.interface'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { push, query } = useRouter()

	const genreId = String(query.id) //оборачиваем в String на случай если придёт undefined

	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess({ data }) {
				// console.log(getKeys(data).map((key) => ({ [key]: data[key] })))

				getKeys(data).forEach((key) => {
					//из ключей собираем массив
					setValue(key, data[key]) //setValue формирует массив объектов к которым можно получить доступ через register(key, options) или getValue(key)
				})
			},
			onError(err) {
				toastrError(err, 'Get genre')
			},
			enabled: !!query.id, //срабатывает только если есть query.id
		}
	)

	const { mutateAsync: mutateGenre } = useMutation(
		'update genre',
		(data: IGenreEditInput) => GenreService.update(genreId, data),
		{
			onError(err) {
				toastrError(err, 'Update genre')
			},
			onSuccess() {
				toastrError('Update genre', 'genre successfully updated')
				push(getAdminUrl('genres'))
			},
		}
	)

	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateGenre(data)
	}

	return { onSubmit, isLoading }
}
