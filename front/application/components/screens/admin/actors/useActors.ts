import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/adminTable/adminTable.interface'

import { getAdminUrl } from '@/config/url.config'

import { useDebounce } from '@/hooks/useDebounce'

import { ActorService } from '@/services/actor.service'

import { toastrError } from '@/utils/toastr-error'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchTerm = useDebounce(searchTerm, 500) //получает searchTerm из input search и через 500ms отдает его обратно

	const queryData = useQuery(
		//useQuery срабатывает по умолчанию при строении компонента
		['actor list', debouncedSearchTerm], //useQuery срабатывает каждый раз при изменении debouncedSearchTerm
		() => ActorService.getAll(debouncedSearchTerm),
		{
			select: ({ data }) =>
				data.map((actor): ITableItem => {
					return {
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
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
		'delete actor',
		(actorId: string) => ActorService.deleteActor(actorId),
		{
			onError: (error) => {
				toastrError(error, 'Delete actor')
			},
			onSuccess() {
				toastr.success('Delete actor', 'delete was successful')
				queryData.refetch() //выполняем ранее определенный useQuery запрос
			},
		}
	)

	return useMemo(
		() => ({ handleSearch, ...queryData, searchTerm, deleteAsync }),
		[queryData, searchTerm, deleteAsync]
	)
}