import { useQuery } from 'react-query'

import { IOption } from '@/ui/select/select.interface'

import { ActorService } from '@/services/actor.service'

import { toastrError } from '@/utils/toastr-error'

export const useAdminActors = () => {
	const queryData = useQuery('List of actors', () => ActorService.getAll(), {
		//забираем всеx actors
		select: ({ data }) =>
			data.map((actor): IOption => {
				return {
					label: actor.name, //приводим actors к массиву объектов, понятному для react-select
					value: actor._id,
				}
			}),
		onError: (error) => {
			toastrError(error, 'List of actors')
		},
	})
	return queryData
}
