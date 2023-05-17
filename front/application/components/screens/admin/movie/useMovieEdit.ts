import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { getAdminUrl } from '@/config/url.config'

import { MovieService } from '@/services/movie.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastrError } from '@/utils/toastr-error'

import { IMovieEditInput } from './movies-edit.interface'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { push, query } = useRouter()

	const movieId = String(query.id) //оборачиваем в String на случай если придёт undefined

	const { isLoading } = useQuery(
		['movie', movieId],
		() => MovieService.getById(movieId),
		{
			onSuccess({ data }) {
				// console.log(getKeys(data).map((key) => ({ [key]: data[key] })))

				getKeys(data).forEach((key) => {
					//из ключей собираем массив
					setValue(key, data[key]) //setValue формирует массив объектов к которым можно получить доступ через register(key, options) или getValue(key)
				})
			},
			onError(err) {
				toastrError(err, 'Get movie')
			},
			enabled: !!query.id, //срабатывает только если есть query.id
		}
	)

	const { mutateAsync: mutateMovie } = useMutation(
		'update movie',
		(data: IMovieEditInput) => MovieService.update(movieId, data),
		{
			onError(err) {
				toastrError(err, 'Update movie')
			},
			onSuccess() {
				toastr.success('Update movie', 'movie successfully updated')
				push(getAdminUrl('movies'))
			},
		}
	)

	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateMovie(data)
	}

	return { onSubmit, isLoading }
}
