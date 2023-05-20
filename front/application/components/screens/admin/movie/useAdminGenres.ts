import { useQuery } from 'react-query'

import { IOption } from '@/ui/select/select.interface'

import { GenreService } from '@/services/genre.service'

import { toastrError } from '@/utils/toastr-error'

export const useAdminGenres = () => {
	const queryData = useQuery('List of genres', () => GenreService.getAll(), {
		//забираем все genres
		select: ({ data }) =>
			data.map((genre): IOption => {
				return {
					label: genre.name, //приводим genres к массиву объектов, понятному для react-select
					value: genre._id,
				}
			}),
		onError: (error) => {
			toastrError(error, 'List of genres')
		},
	})
	return queryData
}
