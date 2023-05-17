import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/adminTable/adminTable.interface'

import { getAdminUrl } from '@/config/url.config'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'
import { toastrError } from '@/utils/toastr-error'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchTerm = useDebounce(searchTerm, 500) //получает searchTerm из input search и через 500ms отдает его обратно
	const { push } = useRouter()

	const queryData = useQuery(
		//useQuery срабатывает по умолчанию при строении компонента
		['movie list', debouncedSearchTerm], //useQuery срабатывает каждый раз при изменении debouncedSearchTerm
		() => MovieService.getAll(debouncedSearchTerm),
		{
			select: ({ data }) =>
				data.map((movie): ITableItem => {
					return {
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					}
				}),
			onError: (error) => {
				toastrError(error, 'User list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation(
		//useMutation не срабатывает по умолчанию и имеет функцию mutateAsync через которую его можно вызвать. Не имеет свойства select, работает с data только внутри себя
		'create movie',
		() => MovieService.create(),
		{
			onError: (error) => {
				toastrError(error, 'Create movie')
			},
			onSuccess({ data }) {
				toastr.success('Create movie', 'create was successful')
				push(getAdminUrl(`movie/edit/${data}`))
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		//useMutation не срабатывает по умолчанию и имеет функцию mutateAsync через которую его можно вызвать. Также не имеет свойства select
		'delete movie',
		(movieId: string) => MovieService.delete(movieId),
		{
			onError: (error) => {
				toastrError(error, 'Delete movie')
			},
			onSuccess() {
				toastr.success('Delete movie', 'delete was successful')
				queryData.refetch() //выполняем ранее определенный useQuery запрос
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			createAsync,
			deleteAsync,
		}),
		[queryData, searchTerm, createAsync, deleteAsync]
	)
}
