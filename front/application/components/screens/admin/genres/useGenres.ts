import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/adminTable/adminTable.interface'

import { getAdminUrl } from '@/config/url.config'

import { useDebounce } from '@/hooks/useDebounce'

import { GenreService } from '@/services/genre.service'

import { toastrError } from '@/utils/toastr-error'

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchTerm = useDebounce(searchTerm, 500) //получает searchTerm из input search и через 500ms отдает его обратно

	const queryData = useQuery(
		//useQuery срабатывает по умолчанию при строении компонента
		['genre list', debouncedSearchTerm], //useQuery срабатывает каждый раз при изменении debouncedSearchTerm
		() => GenreService.getAll(debouncedSearchTerm),
		{
			select: ({ data }) =>
				data.map((genre): ITableItem => {
					return {
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
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

	const { mutateAsync: deleteAsync } = useMutation(
		//useMutation не срабатывает по умолчанию и имеет функцию mutateAsync через которую его можно вызвать. Также не имеет свойства select
		'delete genre',
		(genreId: string) => GenreService.deleteGenre(genreId),
		{
			onError: (error) => {
				toastrError(error, 'Delete genre')
			},
			onSuccess() {
				toastr.success('Delete genre', 'delete was successful')
				queryData.refetch() //выполняем ранее определенный useQuery запрос
			},
		}
	)

	return useMemo(
		() => ({ handleSearch, ...queryData, searchTerm, deleteAsync }),
		[queryData, searchTerm, deleteAsync]
	)
}
